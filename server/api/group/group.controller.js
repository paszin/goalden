'use strict';

var _ = require('lodash');
var underscore = require('underscore');
var Group = require('./group.model');
var User = require('../user/user.model');
var request = require("request");
var moment = require("moment");

// Get a list of groups a given user is registered for
exports.index = function(req, res) {
  Group.find(function(err, groups) {
    var selectedGroups = [];
    if (err) {
      return handleError(res, err);
    }
    for (var i = 0; i < groups.length; i++) {
      if (underscore.contains(groups[i].participants, req.params.uid)) {
        selectedGroups.push(groups[i]);
      }
    }
    return res.status(200).json(selectedGroups);
  });
};

// get a list of groups happening on the days a user checked
exports.findByCal = function(req, res) {
  var uid = req.params.uid;
  Group.find(function(err, groups) {
    var selectedGroups = [];
    if (err) {
      return handleError(res, err);
    }

    User.findById(uid, function(err, docs) {

      var timetableArray = [];
      var timetable = docs.timetable;

      for (var i = 1; i < timetable.length; i++) {
        if (timetable[i].checked) timetableArray.push(i);
      }

      underscore.each(groups, function(group) {
        var date = moment(group.date);
        var dow = date.day();
        if (underscore.contains(timetableArray, dow)) {
          selectedGroups.push(group._id);
        }
      });

      return res.json(selectedGroups);

    });

  });
};

// Get a single group
exports.show = function(req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    return res.json(group);
  });
};

// Get a list of participants given a group id
exports.showParticipants = function(req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }

    var participantIds = group.participants;
    User.find({
      '_id': {
        $in: participantIds
      }
    }, function(err, docs) {
      return res.json(docs);
    });

  });
};

// Creates a new group in the DB.
exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(group);
  });
};

// Updates an existing group in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Group.findById(req.params.id, function(err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(group, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(group);
    });
  });
};

// add this user to the group
exports.addUser = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Group.findById(req.params.gid, function(err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    var thisUser = [];
    thisUser.push(req.params.uid);
    group.participants = underscore.union(group.participants, thisUser);
    group.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(group);
    });
  });
};

// Deletes a group from the DB.
exports.destroy = function(req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (err) {
      return handleError(res, err);
    }
    if (!group) {
      return res.status(404).send('Not Found');
    }
    group.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

// Get a list of groups within specific distance from location
exports.listByloc = function(req, res) {
  var userZipCode = 0;
  User.findById(req.params.uid, function(err, user) {
    console.log(user);
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    userZipCode = user.zip_code;
    console.log('Users zipCode is ' + userZipCode);
    if (userZipCode > 0) {
      Group.find(function(err, groups) {
        var selectedGroups = [];
        if (err) {
          return handleError(res, err);
        }
        for (var i = 0; i < groups.length; i++) {
          request({
            uri: "http://maps.googleapis.com/maps/api/distancematrix/json",
            method: "GET",
            key: "AIzaSyCck014vdNXDceMjZh44Dnx63QXbEc_s1Q",
            units: "imperial",
            origins: userZipCode,
            destinations: groups[i].zipCode,
          }, function(error, response, body) {
            if (error) return handleError(res, err);
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