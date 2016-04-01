'use strict';

var _ = require('lodash');
var Group = require('./group.model');
var User = require('../user/user.model');
var request = require("request");

// Get a list of groups a given user is registered for
exports.index = function(req, res) {
  Group.find(function (err, groups) {
    var selectedGroups = [];
    if(err) { return handleError(res, err); }
    for (var i = 0 ; i < groups.length; i ++) {
      if (groups[i].participants.indexOf(req.params.uid) >= 0) {
        selectedGroups.push(groups[i]);
      }
    }
    return res.status(200).json(selectedGroups);
  });
};

// Get a single group
exports.show = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.status(404).send('Not Found'); }
    return res.json(group);
  });
};

// Creates a new group in the DB.
exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(group);
  });
};

// Updates an existing group in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Group.findById(req.params.id, function (err, group) {
    if (err) { return handleError(res, err); }
    if(!group) { return res.status(404).send('Not Found'); }
    var updated = _.merge(group, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(group);
    });
  });
};

// Deletes a group from the DB.
exports.destroy = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.status(404).send('Not Found'); }
    group.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get a list of groups within specific distance from location
exports.listByloc = function(req, res) {
  var userZipCode = 0;
  User.findById(req.params.uid, function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    userZipCode = user.zip_code;
    console.log('Users zipCode is ' + userZipCode);
    if (userZipCode > 0) {
      Group.find(function (err, groups) {
        var selectedGroups = [];
        if (err) {
          return handleError(res, err);
        }
        for (var i = 0; i < groups.length; i++) {
          request({
            uri: "http://maps.googleapis.com/maps/api/distancematrix/json",
            method: "GET",
            key: 'AIzaSyCck014vdNXDceMjZh44Dnx63QXbEc_s1Q',
            units: 'imperial',
            origins: userZipCode,
            destinations: groups[i].zipCode,
          }, function(error, response, body) {
            console.log('body from google api call ' + body);
            var distanceTxt = body.rows[0].elements[0].distance.text;
            var distance = parseFloat(distanceTxt.split(" ")[0]);
            if (distance < 30) {
              selectedGroups.push(groups[i]);
            }
          });
        }
        return res.status(200).json(selectedGroups);
      });
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
