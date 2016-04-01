'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  date: Date,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  participants: [String]
});

module.exports = mongoose.model('Group', GroupSchema);
