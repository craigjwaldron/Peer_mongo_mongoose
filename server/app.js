// console.log("Hello from app.js");

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json());

var Assign = require('../models/assignments');

var assignments = require('./assignment');

app.use('/', assignments);

app.get('/',function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ));
});



// Spinning up the server --------------------------------------------------------
app.listen( 3000, 'localhost', function( req, res ){
  console.log( "lisening on port 3000" );
});

// Setting up static folder --------------------------------------------------------
app.use( express.static( 'public' ) );
