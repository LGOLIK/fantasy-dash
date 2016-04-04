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


// export it
module.exports.showPlayers = showPlayers;
