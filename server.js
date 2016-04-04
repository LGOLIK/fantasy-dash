'use strict'

require('dotenv').config();

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/pg');

// routes
const apiRoutes = require(path.join(__dirname, '/routes/apis'));

const app = express();

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

var pg = require('pg');

// config path
// var config = process.env.DATABASE_URL;
// var session = require('express-session');
// var pgSession = require('connect-pg-simple')(session);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set public path
app.use( express.static( path.join( __dirname, 'public' )));

// user session login info
// app.use(session({
//   store: new pgSession({
//     pg : pg,
//     conString : config,
//     tableName : 'session'
//   }),
//   secret: process.env.SECRET,
//   resave: false,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
//   saveUninitialized: true
// }));

// home page
app.get('/', (req, res) => {
  res.render('index')
});

// routes go here
app.use('/apis', apiRoutes);

// listen for the port
app.listen(app.get('port'), function() {
  console.log(`Listening on port ${app.get('port')}`);
});
