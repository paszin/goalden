'use strict';

var _ = require('lodash');
var underscore = require('underscore');
var Group = require('./group.model');

// Get a list of groups a given user is registered for
exports.index = function(req, res) {
  Group.find(function (err, groups) {
    var selectedGroups = [];
    if(err) { return handleError(res, err); }
    for (var i = 0 ; i < groups.length; i ++) {
      if (underscore.contains(groups[i].participants, req.params.uid)) {
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

// add this user to the group
exports.addUser = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Group.findById(req.params.gid, function (err, group) {
    if (err) { return handleError(res, err); }
    if(!group) { return res.status(404).send('Not Found'); }
    var thisUser = [];
    thisUser.push(req.params.uid);
    group.participants = underscore.union(group.participants, thisUser);
    group.save(function (err) {
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

function handleError(res, err) {
  return res.status(500).send(err);
}