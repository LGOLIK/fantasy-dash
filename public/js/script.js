'use strict';

console.log('script.js loaded!');

$(document).ready( () => {
  // load the main draft chart when the page first loads
  d3.json('/apis/draftresults', function(data) {
    showD3DraftResults(data);
  });


  // get links for each of the teams
  $.get('/apis/teams')
    .done( (data) => {
      renderTeams(data);
      // make sure the click event handler is after all the teams are loaded
      clickTeam();
  });


  $('#draft-results').on('click', function(event) {
    event.stopProbagation;

    let $dashboard = $('#dashboard');
    $dashboard.empty();

    d3.json('/apis/draftresults', function(data) {
      showD3DraftResults(data);
    });
  });

})

function renderTeams(data) {
  let $navList = $('#nav-list');
  data.forEach( (el) => {
    let teamName = el.team_name;
    let teamID = el.fan_team_id;
    let $liTeam = $('<li>');
    let $a = $('<a class="team-draft-results" href="#">').text(`${teamName}`).attr('id', teamID);
    $navList.append($liTeam.append($a));
  })
}

function clickTeam() {
  $('.team-draft-results').on('click', (event) => {
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

function showD3DraftResults(data) {
  // set the margins for each element
  let margin = {
    'left': 40,
    'right': 10,
    'top': 100,
    'bottom': 100
  }

  // set the width and height
  let width = 960 - margin.left - margin.right;
  let height = 600 - margin.top - margin.bottom;

  // set the size of various elements in the chart
  let unitSize = Math.floor(width / 15); // 15 rounds
  let legendUnitSize = unitSize*2;
  let buckets = 6;
    let colors = ['#ffffd9', '#c7e9b4', '#41b6c4', '#225ea8', '#081d58'];

  // get a unique list of player positions for the y axis
  let positions = ['QB', 'WR', 'RB', 'TE', 'DST', 'K'];

  // get a unique list of the rounds for the x axis
  let rounds = _.uniq(_.map(data, function(value) {
    return value.round;
  }));

  // set the color scale with the count of each position
  let colorScale = d3.scale.quantile()
    .domain([0, buckets - 1, d3.max(data, function (d) {
      return d.position_count;
    })])
    .range(colors);

  // establish the svg, append it to the dashboard
  let svg = d3.select('#dashboard').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // give the chart a title
  svg.append('text')
    .text('Golik Ballz Draft Results Heat Map')
    .attr('class', 'title')
    .attr('x', 0)
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'start');


  // add the y axis and labels to the grid
  let positionLabel = svg.selectAll('.positionLabel')
    .data(positions)
    .enter().append('text')
      .text(function (d) { return d })
      .attr('x', 0)
      .attr('y', function (d, i) {
        return i * unitSize;
      })
      .style('text-anchor', 'end')
      .attr('transform', `translate(-7, ${unitSize / 1.5})`)
      .attr('class', 'positionLabel mono axis axis-positions');

  // add the x axis and labels to the grid
  let roundLabel = svg.selectAll('.roundLabel')
    .data(rounds)
    .enter().append('text')
      .text(function (d) { return d })
      .attr('x', function (d, i) {
        return i * unitSize;
      })
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .attr('transform', `translate(${unitSize / 2}, -7)`)
      .attr('class', 'roundLabel mono axis axis-rounds');

  // now add the data - must be a unique list of all data points
  let cards = svg.selectAll('.card')
    .data(data, function (d) {
      // console.log(d.team_names);
      return d.team_names;
      // return `rd: ${d.round}, ${d.position_id}: ${d.position_count}`
    });

  // create a div for the tooltip of teams - this is the starting point.
  // data is defined on each card
  let div = d3.select('#dashboard')
    .append('div') // declare the tooltip
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // give each card element a title
  cards.append('title');

  // each element is a rectangle
  cards.enter().append('rect')
    .attr('x', function(d) {
      return (d.round - 1) * unitSize;
    })
    .attr('y', function(d) {
      return (d.position_id - 1) * unitSize;
    })
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('class', 'unit bordered')
    .attr('width', unitSize)
    .attr('height', unitSize)
    // initially set each card with the first color
    .style('fill', colors[0]);

  // set the color scale to transition in based on position count
  cards.transition().duration(1000)
    .style('fill', function (d) {
      return colorScale(d.position_count);
    });

  cards.select('title').text(function(d) { return d.position_count; });

    // add tooltip detail on click
  cards.on('click', function (d) {
    div.transition()
      .duration(500)
      .style('opacity', 0);
    div.transition()
      .duration(200)
      .style('opacity', .9);
    div.data(function () {
      console.log(d);
      let team_names = d.team_names;
      return d.team_names;
    })
    div.html(function() {
      `<a href="">${d.team_names}</a>`
    })
      .style('left', `${(d3.event.pageX)}px`)
      .style('top', `${(d3.event.pageY)}px`);
  })

  cards.exit().remove();

  // add the legend for the colors
  let legend = svg.selectAll('.legend')
    .data([0].concat(colorScale.quantiles()), function (d) {
      return d
    });

  legend.enter().append('g')
    .attr('class', 'legend')

  legend.append('rect')
    .attr('x', function (d, i) {
      return legendUnitSize * i;
    })
    .attr('y', height)
    .attr('width', legendUnitSize)
    .attr('height', unitSize / 2)
    .style('fill', function (d, i) {
      return colors[i];
    });

  legend.append('text')
    .attr('class', 'mono')
    .text(function (d) {
      return `≥ ${Math.round(d)}`;
    })
    .attr('x', function (d, i) {
      return legendUnitSize * i;
    })
    .attr('y', height + unitSize);

  legend.exit().remove();


}

function showSingleTeamGraph(data) {
  // set the margins - gives space around each of the items
  let margins = {
    'left': 50,
    'right': 50,
    'top': 80,
    'bottom': 100
  };

  // set the height and width of the graph
  let width = 800;
  let height = 430;


  // set the scales

  // set the colors of the circles with a predefined d3 color scale
  let colors = d3.scale.category20();

  // x scale
  let x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d.round
    })])
    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
    .range([0, width - margins.left - margins.right]);

  // get a unique list of player positions for the y axis
  let positions = ['K', 'DST', 'TE', 'RB', 'WR', 'QB'];


  // y scale
  let y = d3.scale.ordinal()
    .domain(positions)

    // Note that height goes first due to the weird SVG coordinate system
    .rangeRoundPoints([height - margins.top - margins.bottom, 0]);

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
    .attr('transform', 'translate(0,' + (y.range()[0] + 25) + ')')
    .append('text')
      .attr('fill', '#414241')
      .attr('text-anchor', 'end')
      .attr('x', width / 2)
      .attr('y', margins.bottom)
      // .attr('dy', '.52em')
      .text('Draft Rounds');

  // y axis and label
  svg.append('g')
    .attr('class', 'y axis');
    // .append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('x', -height / 2)
    //   .attr('y', -margins.bottom)
    //   .attr('dy', '.1em')
    //   .style('text-anchor', 'middle')
    //   .text('Player Positions');

  // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
  svg.selectAll('g.y.axis').call(yAxis);
  svg.selectAll('g.x.axis').call(xAxis);

  // this is the chart image
  svg.append('image')
    .attr('xlink:href', data[0].team_logo)
    .attr('class', 'team-img')
    .attr('height', 50)
    .attr('width', 50)
    .attr('x', width - margins.right)
    .attr('y', 0 - (margins.top / 1.75));

  // this is the chart label
  svg.append('text')
    .text(`${data[0].team_name} 2015 Draft Results`)
    .attr('class', 'title')
    .attr('text-anchor', 'start')
    .attr('x', 0)
    .attr('y', 0 - (margins.top / 1.75));

  // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
  let node = svg.selectAll('g.node')
    .data(data, function (d) {
      return d.player_name;
    });

  // create a div to store pop up card detail
  let div = d3.select('#dashboard')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
  let dataElement = node.enter()
    .append('g')
    .attr('class', 'node')

    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
    .attr('transform', function (d) {
      return 'translate(' + x(d.round) + ',' + y(d.position) + ')';
    })
    .style('fill', '#F5F5F5');

  // add a circle element
  dataElement.append('circle')
    .attr('r', 20)
    .attr('class', 'dot');

  // add transitions on the circle element
  dataElement.transition().duration(1000)
    .style('fill', function (d) {
      return colors(d.position);
    })

  // add pop up card detail to the circle element, for when you mouse over it
  dataElement.on('mouseover', function (d) {
    div.transition()
      .duration(500)
      .style('opacity', 0);
    div.transition()
      .duration(200)
      .style('opacity', .9);
    div.html(
      `<img src="${d.img_url}"></img>`
    )
  });

  dataElement.on('mouseout', function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
  })

  // now we add some text, so we can see what each item is.
  // dataElement.append('text')
  //   .style('text-anchor', 'middle')
  //   .attr('dy', -10)
  //   .text(function (d) {
  //     return d.player_name;
  //  });
}
