'use strict';

console.log('script.js loaded!');

$(document).ready( () => {
  $('#draft-results').on('click', showD3DraftResults);
  // $('#team-draft-results').on('click', renderTeams)

  $('#team-draft-results').on('click', () => {
    event.stopProbagation;
    let $teamNav = $('#team-nav');
    let $ul = $('<ul>');
    $teamNav.empty();
    $teamNav.append('<h4>Select a team to see its draft results!</h4>');
    $teamNav.append($ul);

    $.get('apis/teams')
      .done( (data) => {
        renderTeams(data, $ul);
        // make sure the click event handler is after all the teams are loaded
        clickTeam();
    });
  })
})

function showD3DraftResults() {
  event.stopProbagation;

  d3.json('/apis/draftresults', function(data) {
    console.log(data[0]);
  })
}

function renderTeams(data, $ul) {
  data.forEach( (el) => {
    let teamName = el.team_name;
    let teamID = el.fan_team_id;
    let $liTeam = $('<li class="team-list">').text(`${teamName}`).attr('id', teamID);
    let $a = $('<a href="#">');
    $ul.append($a.append($liTeam));
  })
}

function clickTeam() {
  $('.team-list').on('click', (event) => {
    event.stopProbagation;

    let $teamID = $(event.target).attr('id');

    let $dashboard = $('#dashboard');
    $dashboard.empty();

    // get the draft results route for a single team
    d3.json(`/apis/draftresults/${$teamID}`, function(data) {
      // call the method below
      showSingleTeamGraph(data);

    }); // end of d3.json
  }); // end of click handler

}

function showSingleTeamGraph(data) {
  // set the margins - gives space around each of the items
  let margins = {
    'left': 50,
    'right': 50,
    'top': 40,
    'bottom': 40
  };

  // set the height and width of the graph
  let width = 960;
  let height = 500;

  // set the colors of the circles with a predefined d3 color scale
  let colors = d3.scale.category10();

  // set the scales

  // x scale
  let x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d.round
    })])
    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
    .range([0, width - margins.left - margins.right]);

  // get a unique list of player positions for the y axis
  let positions = _.uniq(_.map(data, function(value) {
    return value.position
  }))


  // y scale
  let y = d3.scale.ordinal()
    .domain(positions)

    // Note that height goes first due to the weird SVG coordinate system
    .rangeRoundPoints([height - margins.top - margins.bottom, 0], .75);

  // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(20);
  let yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10);

  // add this svg component to the dashboard div
  let svg = d3.select('#dashboard')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

  // we add the axes to the SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
  // x axis and label
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (y.range()[0] + 21) + ')')
    .append('text')
      .attr('fill', '#414241')
      .attr('text-anchor', 'end')
      .attr('x', width / 2)
      .attr('y', margins.bottom)
      // .attr('dy', '.52em')
      .text('Draft Rounds');

  // y axis and label
  svg.append('g')
    .attr('class', 'y axis')
    .append('text')
      .attr("transform", "rotate(-90)")
      .attr("x", -height/2)
      .attr("y", -margins.bottom)
      .attr("dy", ".1em")
      .style("text-anchor", "middle")
      .text("Player Positions");

  // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
  svg.selectAll('g.y.axis').call(yAxis);
  svg.selectAll('g.x.axis').call(xAxis);

  // this is the chart label
  svg.append('text')
    .text(`${data[0].team_name} 2015 Draft Results`)
    .attr('class', 'title')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2);


  // this is our Y axis label. formatting can be added here
  svg.append('text')
    .attr('fill', '#414241')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height - 20)
    .text('Draft Rounds');

  // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
  let node = svg.selectAll('g.node').data(data, function (d) {
    return d.player_name;
  });

  // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
  let main = node.enter().append('g').attr('class', 'node')

  // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
  .attr('transform', function (d) {
    return 'translate(' + x(d.round) + ',' + y(d.position) + ')';
  });

  // we add our first graphics element! A circle!
  main.append('circle')
    .attr('r', 10)
    .attr('class', 'dot')
    .style('fill', function (d) {
      // Now each node will be coloured by the player's position
      return colors(d.position);
   });

  // now we add some text, so we can see what each item is.
  main.append('text')
    .style('text-anchor', 'middle')
    .attr('dy', -10)
    .text(function (d) {
      // this shouldn't be a surprising statement.
      return d.player_name;
   });
}
