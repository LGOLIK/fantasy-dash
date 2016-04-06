'use strict';

const express = require('express');
const request = require('request');
const apis = express.Router();
const bodyParser = require('body-parser');

const db = require('../db/pg');

apis.get('/players', db.showPlayers, function(req, res) {
  res.send(res.rows);
})

apis.get('/teams', db.showTeams, function(req, res) {
  res.send(res.rows);
})

apis.get('/draftresults', db.allDraftResults, function(req, res) {
  res.send(res.rows);
})

apis.get('/draftresults/:id', db.teamDraftResults, function(req, res) {
  res.send(res.rows);
})

module.exports = apis;
