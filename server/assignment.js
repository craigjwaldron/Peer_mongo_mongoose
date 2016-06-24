var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

var Assign = require('../models/assignments');

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

var router = express.Router();

router.use( bodyParser.json());
router.use( bodyParser.urlencoded({ extended: true }));

router.get('/allAssignments/:id', function(req, res) {
  console.log(req.params.id);

if ( req.params.id != "all" ) {
  Assign.find({ _id: req.params.id }, function(err, assignResult){
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(assignResult);
    }
  });
} else {

  Assign.find({}, function(err, assignments) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(assignments);
      }
    });
  }
});


router.post('/createAssignment', function(req, res) {
  console.log('create hit');

  var newAssigment = new Assign({
    "assignment_number": req.body.assignment_number,
    "student_name": req.body.student_name,
    "score": req.body.score,
    "date_completed": Date.now()
  });

  newAssigment.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log("user saved!");
      res.sendStatus(200);
      }
  });

});

module.exports = router;
