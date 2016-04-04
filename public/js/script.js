'use strict';

console.log('script.js loaded!');

$(document).ready( () => {
  $('#draft-results').on('click', showD3DraftResults);
  // $('#team-draft-results').on('click', renderTeams)

  $('#team-draft-results').on('click', () => {
    event.stopProbagation;
    let $dashboard = $('#dashboard');
    let $ul = $('<ul>');
    $dashboard.empty();
    $dashboard.append('<h4>Select a team to see its draft results!</h4>');
    $dashboard.append($ul);

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
  $('.team-list').on('click', () => {
    event.stopProbagation;
    console.log('clicked!');
  });
}
