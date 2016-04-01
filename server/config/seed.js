/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

// NO NEED TO RUN SEED DATA ANYMORE



'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Group = require('../api/group/group.model');

User.find({}).remove(function() {
  User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, {
      provider: 'local',
      name: 'Genki',
      email: 'genki@test.com',
      sex: "female",
      age: 19,
      password: 'genki',
      skill_level: 3,
      zip_code: 94340,
      introduction: "I am Genki, love sports, work in a bike shop and i'm interested in EDM Festivals",
      positions: ["Midfielder"],
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
      console.log('finished populating users');
    });
});


Group.find({}).remove(function() {
    Group.create({
      name: "Group #1",
      date: Date.now(),
      location: "Rengstorff Park",
      participants: []
    })
  });

