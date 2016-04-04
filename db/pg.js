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

function showDraftResults(req, res, next) {
  db.any(`SELECT d.*, p.player_name, p.position, t.team_name, t.manager
    FROM draft_results AS d
      INNER JOIN nfl_players AS p
      ON p.nfl_player_id = d.player_id
      INNER JOIN fan_teams AS t
      ON t.fan_team_id = d.fan_team_id
    ORDER BY d.pick;`)
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
module.exports.showDraftResults = showDraftResults;
