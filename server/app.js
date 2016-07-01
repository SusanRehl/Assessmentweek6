var express = require('express');  // require express
var app=express();
var path = require('path');  // sets up basic path
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var heroes=require('../models/heroes.js');  // requiring the heroes.js model
var mongoose = require('mongoose');  // require mongoose for mongo db

app.use( bodyParser.json() );

mongoose.connect('localhost:27017/herodb');  //no / after localhost!

app.get( '/', function( req, res ){    // set basic url
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.get( '/view', function( req, res ){  // makes view.html available
  res.sendFile( path.resolve( 'views/view.html' ) );
  });

app.get('/viewHeroes', function(req, res){  // gets pets to view
  heroes.find().then( function( data ){  // if found, then run function with data as parameter
    console.log("data from app.get: " + data);
    res.send( data );  // returns records as "data"
  });
});

app.get( '/add', function( req, res ){  // makes add.html page available
  res.sendFile( path.resolve( 'views/add.html' ) );
  });

app.post( '/add', function( req, res ){  // POST call to add hero to database
  var recordToAdd={  // adds record from input
    alias: req.body.alias,// superhero name
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    power_name: req.body.power_name
  };  // end var
  var newRecord=heroes( recordToAdd );  // saves record to database - use heroes - match what's on line 5
  newRecord.save();
  console.log("new record from app.post: " + newRecord);
});  // end post

app.post('/deleteHero', function(req, res) {  // delete hero
  console.log(req.body.id);
  heroes.findOne({'_id': req.body.id}, function(err, pet){  //DO I NEED 2nd PARAM?
    if(err){
      console.log(err);
    }else{
  heroes.remove({'_id': req.body.id}, function(err) {
    if(err){
      console.log('remove ' + err);
    }else{
    }
  });
}
});
}); //end delete function

app.listen( 4242, 'localhost', function( req, res ){ // spins up server
  console.log( 'listening on 4242' );
}); // end listen

app.use( express.static( 'public' ) );  // make public folder available
