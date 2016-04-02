'use strict';

var _ = require('lodash');
var underscore = require('underscore');
var Group = require('./group.model');
var User = require('../user/user.model');
var request = require("request");
var moment = require("moment");
var async = require("async");

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

// Get a list of groups a user attended in the last 7 days
exports.getPast = function(req, res) {
  var uid = req.params.uid;
  Group.find(function(err, groups) {
    var selectedGroups = [];
    if (err) {
      return handleError(res, err);
    }
    for (var i = 0; i < groups.length; i++) {

      var now = moment();
      var target = moment(groups[i].date);

      if (underscore.contains(groups[i].participants, req.params.uid) && 1 <= now.diff(target, 'days') && now.diff(target, 'days') <= 7) {
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
      var userZipCode = docs.zip_code;

      for (var i = 1; i < timetable.length; i++) {
        if (timetable[i].checked) timetableArray.push(i);
      }

      underscore.each(groups, function(group) {
        var date = moment(group.date);
        var dow = date.day();
        if (underscore.contains(timetableArray, dow)) {
          selectedGroups.push(group);
        }
      });

      async.each(selectedGroups, function(group, callback) {

        request({
          uri: "https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyCck014vdNXDceMjZh44Dnx63QXbEc_s1Q&units=imperial&origins=" + userZipCode + "&destinations=" + group.zipCode,
        }, function(error, response, body) {
          if (error) return handleError(res, err);
          body = JSON.parse(body);
          var distanceTxt = body.rows[0].elements[0].distance.text;
          var distance = parseFloat(distanceTxt.split(" ")[0]);
          if (distance < 50) {
            closeGroups.push(group);
          }
          callback();
        });
      }, function(err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process');
        } else {
          return res.status(200).json(closeGroups);
          console.log('All files have been processed successfully');
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
exports.listByloc = function(req, res) { ///groups/users/:uid/location
  var userZipCode = 0;
  User.find(req.params.uid, function(err, users) {
    if (err) return next(err);
    if (!users) return res.status(401).send('Unauthorized');

    var targetUser = underscore.filter(users, function(user) {
      if (user._id == req.params.uid) return user;
    });

    if (underscore.isEmpty(targetUser)) return res.json(targetUser);

    userZipCode = targetUser[0].zip_code;
    if (userZipCode > 0) {
      Group.find(function(err, groups) {
        var selectedGroups = [];
        if (err) {
          return handleError(res, err);
        }

        var closeGroups = [];

        async.each(groups, function(group, callback) {

          request({
            uri: "https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyCck014vdNXDceMjZh44Dnx63QXbEc_s1Q&units=imperial&origins=" + userZipCode + "&destinations=" + groups.zipCode,
          }, function(error, response, body) {
            if (error) return handleError(res, err);
            body = JSON.parse(body);
            var distanceTxt = body.rows[0].elements[0].distance.text;
            var distance = parseFloat(distanceTxt.split(" ")[0]);
            if (distance < 50) {
              closeGroups.push(group);
            }
            callback();
          });
        }, function(err) {
          // if any of the file processing produced an error, err would equal that error
          if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A file failed to process');
          } else {
            return res.status(200).json(closeGroups);
            console.log('All files have been processed successfully');
          }
        });

      });
    }
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}