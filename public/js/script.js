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
      // create array of json objects of each player name drafted
      // let playersDrafted = _.indexBy(data, 'player_name');
      // console.log(draftDataByPlayer);

      // call the method below
      showSingleTeamGraph(data);

    }); // end of d3.json
  }); // end of click handler

}

function showSingleTeamGraph(data) {
  // set the margins - gives space around each of the items
  let margins = {
    'left': 40,
    'right': 40,
    'top': 40,
    'bottom': 40
  };

  // set the height and width of the graph
  let width = 960;
  let height = 500;

  // set the colors of the circles with a predefined d3 color scale
  let colors = d3.scale.category10();

  // add this svg component to the dashboard div
  let svg = d3.select('#dashboard').append('svg').attr('width', width).attr('height', height).append('g')
    .attr('transform', 'translate(' + margins.left + "," + margins.top + ')');

  // this sets the scale that we're using for the X axis.
  // the domain define the min and max variables to show. In this case, it's the min and max draft rounds.
  // this is made a compact piece of code due to d3.extent which gives back the max and min of the draft round variable within the dataset
  let x = d3.scale.linear()
    .domain(d3.extent(data, function (d) {
    return d.round;
  }))

    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
    .range([0, width - margins.left - margins.right]);

  // get a unique list of player positions for the y axis
  let positions = _.uniq(_.map(data, function(value) {
    return value.position
  }))

  // set the Y axis with the unique list of positions
  let y = d3.scale.ordinal()
    .domain(positions)

    // Note that height goes first due to the weird SVG coordinate system
    // .range([height - margins.top - margins.bottom, 0]);
    .rangeBands([0, width]);

  // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
  svg.append("g").attr("class", "y axis");

    // this is our X axis label. Nothing too special to see here.
  svg.append("text")
    .attr("fill", "#414241")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .text("Draft Rounds");

  // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
  let xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
  let yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

  // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
  svg.selectAll("g.y.axis").call(yAxis);
  svg.selectAll("g.x.axis").call(xAxis);

  // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
  let player = svg.selectAll("g.node").data(data, function (d) {
    return d.player_name;
  });

  // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
  let playerGroup = player.enter().append("g").attr("class", "node")

  // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
  .attr('transform', function (d) {
    return "translate(" + x(d.round) + "," + y(d.position) + ")";
  });

  // we add our first graphics element! A circle!
  playerGroup.append("circle")
    .attr("r", 5)
    .attr("class", "dot")
    .style("fill", function (d) {
      // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
      // by the player's position
      return colors(d.position);
   });

  // now we add some text, so we can see what each item is.
  playerGroup.append("text")
    .style("text-anchor", "middle")
    .attr("dy", -10)
    .text(function (d) {
      // this shouldn't be a surprising statement.
      return d.player_name;
   });
}
