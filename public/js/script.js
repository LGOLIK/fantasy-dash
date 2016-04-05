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
    'left': 40,
    'right': 40,
    'top': 40,
    'bottom': 40
  };

  // set the height and width of the graph
  let width = 960;
  let height = 500;
  let padding = 40;

  // here are the scale definitions

  // x scale
  let xScale = d3.scale.linear()
    .domain(d3.extent(data, function (d) {
      return d.round;
    }))
    .range([padding, width - margins.left - margins.right]);

  // y scale

  // first get a unique list of the positions
  let positions = _.uniq(_.map(data, function(value) {
    return value.position
  }));

  let yScale = d3.scale.ordinal()
    .domain(positions)
    .rangePoints([height - margins.top - margins.bottom, 0]);


  // here are the axis definitions

  // x axis
  let xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(20);

  // y axis
  let yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .tickPadding(2);

  // create svg element and append it to the dashboard div
  let svg = d3.select('#dashboard')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // create the x axis
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height - padding + 5) + ')')
    .call(xAxis);

  // create the y axis
  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(0,' + (padding + 5) + ')')
    .call(yAxis);

  // select the x axis in the chart
  svg.selectAll('x.axis')
    .call(xAxis);

  // select the y axis in the chart
  svg.selectAll('y.axis')
    .call(yAxis);





}
