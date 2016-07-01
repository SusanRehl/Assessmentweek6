var mongoose = require('mongoose');  // require mongoose for mongo db

var ourSchema = new mongoose.Schema({  // set up new mongoose schema. If don't use new, have to create the schema in db in terminal first.
  alias: String,// superhero name
  first_name: String,
  last_name: String,
  city: String,
  power_name: String,
});

var heroes = mongoose.model( 'heroes', ourSchema );  // sets schema to model var, 'heroes' param creates heroes collection

module.exports=heroes;
