'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var underscore = require('underscore');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  //newUser.role = req.body.role || "user";
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session, {
      expiresInMinutes: 60 * 5
    });
    res.json({
      token: token
    });
  });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Get all games this user is registered for
 */
exports.games = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

exports.updateUser = function(req, res, next) {
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    user.skill_level = req.body.skill_level,
      user.positions = req.body.positions,
      user.introduction = req.body.introduction,
      user.zip_code = req.body.zip_code,
      user.timetable = req.body.timetable,
      user.languages = req.body.languages,
      user.age = req.body.age,
      user.sex = req.body.sex;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.status(200).send('OK');
    });
  });
};

// submit feedback, thumbs_up, positive_attitude, excellent_player, high_five
exports.submitFeedback = function(req, res, next) {
  var user_id_from = req.params.uid_from;
  var user_id_to = req.params.uid_to;
  var feedback = req.body.feedback;
  User.findById(user_id_to, function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.status(404).send('User Not Found');
    }
    underscore.mapObject(feedback, function(val, key) {
      var thisFeedback = underscore.find(user.feedback, function(currentFeedback) {
        return currentFeedback.name == key;
      });
      if (!thisFeedback) {
        var newFeedback = {};
        newFeedback["name"] = key;
        newFeedback["count"] = 1;
        user.feedback.push(newFeedback);
        thisFeedback = newFeedback;
      }
      thisFeedback["count"] += (val || 0);
    });
    user.save(function(err2) {
      if (err2) return validationError(res, err2);
      res.status(200).send('Feedback has been successfully submitted!');
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};