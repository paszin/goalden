/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */




'use strict';

var Game = require('../api/game/game.model');
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

User.find({}).remove(function() {
  User.create({
      provider: 'local',
      name: 'Genki',
      email: 'genki@test.com',
      sex: "female",
      is_mentor: false,
      age: 19,
      password: 'genki',
      skill_level: 3,
      zip_code: 94340,
      introduction: "I am Genki, love sports, work in a bike shop and i'm interested in EDM Festivals",
      positions: ["Midfielder"],
      offers: ["socks"],
      timetable: [{
        day: "monday",
        checked: true
      }, {
        day: "tuesday",
        checked: false
      }, {
        day: "wednesday",
        checked: true
      }, {
        day: "thursday",
        checked: false
      }, {
        day: "friday",
        checked: false
      }, {
        day: "saturday",
        checked: true
      }, {
        day: "sunday",
        checked: false
      }]

    }, {
      provider: 'local',
      name: 'Momo',
      email: 'momo@test.com',
      sex: "female",
      role: "admin",
      is_mentor: true,
      age: 35,
      password: 'momo',
      skill_level: 4,
      zip_code: 94340,
      introduction: "I am Momo and a Mentor",
      positions: ["Midfielder"],
      offers: ["socks"],
      timetable: [{
        day: "monday",
        checked: true
      }, {
        day: "tuesday",
        checked: false
      }, {
        day: "wednesday",
        checked: true
      }, {
        day: "thursday",
        checked: false
      }, {
        day: "friday",
        checked: false
      }, {
        day: "saturday",
        checked: true
      }, {
        day: "sunday",
        checked: false
      }]

    },
    function() {

      User.findOne({"name": "Genki"}, function(err, user) {
          Game.find({}).remove(function() {
              Game.create({
                name: "Beginners Game",
                date: Date.now() + (24*60*60*1000),
                location: "Bol Park",
                players: [{name: user.name, "_id": user._id}],
                mentors: []
              }, {
               name: "Pick Up Game",
                date: Date.now() - (2*24*60*60*1000),
                location: "Bol Park",
                players: [{name: user.name, "_id": user._id}],
                mentors: []
              }, {
               name: "SAP Soccer Group",
                date: Date.now() - (2*20*60*60*1000),
                location: "Rengstorff Park",
                players: [],
                mentors: []
              }, function() {
                   console.log('finished populating data');
                });
            }); //remove
      }); //findOne
    }); //user create
}); //user find

