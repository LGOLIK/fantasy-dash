'use strict';

require('dotenv').config();

const pgp = require('pg-promise')({
    // Initialization Options
});

const cn = process.env.DATABASE_URL;
const db = pgp(cn);

function showPlayers(req, res, next) {
  db.any(`SELECT * FROM nfl_players;`)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

function showTeams(req, res, next) {
  db.any(`SELECT * FROM fan_teams;`)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

// draft results for all teams
function allDraftResults(req, res, next) {
  db.any(`SELECT d.round, p.position, p.position_id, count(t.team_name) as position_count, array_agg(t.team_name) as team_names, array_agg(p.player_name) as players, array_agg(t.fan_team_id) as team_ids
  FROM draft_results AS d
    INNER JOIN nfl_players AS p
    ON p.nfl_player_id = d.player_id
    INNER JOIN fan_teams AS t
    ON t.fan_team_id = d.fan_team_id
  GROUP BY d.round, p.position, p.position_id
  ORDER BY d.round;`)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

// draft results for a single team
function teamDraftResults(req, res, next) {
  db.any(`SELECT d.*, p.player_name, p.position, t.team_name, t.team_logo, t.manager
    FROM draft_results AS d
      INNER JOIN nfl_players AS p
      ON p.nfl_player_id = d.player_id
      INNER JOIN fan_teams AS t
      ON t.fan_team_id = d.fan_team_id
    WHERE t.fan_team_id = $/id/
    ORDER BY d.pick;`, req.params)
  .then(function(data) {
    res.rows = data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}


// export it
module.exports.showPlayers = showPlayers;
module.exports.showTeams = showTeams;
module.exports.allDraftResults = allDraftResults;
module.exports.teamDraftResults = teamDraftResults;
