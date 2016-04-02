'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  info: String,
  players: [{name: String, id: Number}],
  mentors: [{name: String, id: Number}],
  date: Date,
  location: String,
  zipcode: {type: Number, default: 94306}
});

module.exports = mongoose.model('Game', GameSchema);