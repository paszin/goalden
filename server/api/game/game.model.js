'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  info: String,
  players: [{name: String, id: Number}],
  mentors: [{name: String, id: Number}],
  date: Date,
  location: String
});

module.exports = mongoose.model('Game', GameSchema);