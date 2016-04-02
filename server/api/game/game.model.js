'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: String,
  info: String,
  participants: [{name: String, objectid: Schema.Types.ObjectId}],
  date: Date,
  location: String
});

module.exports = mongoose.model('Game', GameSchema);