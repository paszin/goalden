'use strict';

var _ = require('lodash');
var underscore = require('underscore');
var Game = require('./game.model');
var User = require('../user/user.model');

// Get list of games
exports.index = function(req, res) {
  Game.find(function(err, games) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json({
      games: games
    });
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).send('Not Found');
    }
    return res.json(game);
  });
};

// show all games
exports.showGames = function(req, res) { // api/games/users/:uid

  Game.find(function(err, games) {
    if (err) {
      return handleError(res, err);
    }

    User.find(function(err2, users) {
      if (err2) {
        return handleError(res, err2);
      }

      // find target user
      var targetUser = null;
      targetUser = underscore.find(users, function(user) {
        return user._id == req.params.uid;
      });
      if (targetUser == null) {
        return res.status(404).send('User Not Found');
      }

      var returnGames = {};
      var upcoming = [];
      var passed = [];

      for (var i = 0; i < games.length; i++) {

        var userObject = {};
        userObject["_id"] = games[i]["_id"];
        userObject["name"] = games[i]["name"];
        userObject["date"] = games[i]["date"];
        userObject["location"] = games[i]["location"];
        userObject["__v"] = games[i]["__v"];
        userObject["zipcode"] = games[i]["zipcode"];
        userObject["mentors"] = games[i]["mentors"];
        userObject["players"] = games[i]["players"];

        var date = games[i].date;
        var now = Date.now();

        if (now <= date) { // upcoming
          var isJoined = false;
          underscore.each(userObject["mentors"], function(mentor) {
            if (mentor["_id"] == req.params.uid) isJoined = true;
          });
          underscore.each(userObject["players"], function(player) {
            if (player["_id"] == req.params.uid) isJoined = true;
          });
          userObject["joined"] = isJoined;
          upcoming.push(userObject);
        } else { // the games that happened in the past and he attended.
          var isJoined = false;
          underscore.each(userObject["mentors"], function(mentor) {
            if (mentor["_id"] == req.params.uid) isJoined = true;
          });
          underscore.each(userObject["players"], function(player) {
            if (player["_id"] == req.params.uid) isJoined = true;
          });
          userObject["joined"] = isJoined;
          passed.push(userObject);
        }

      } // end for
      returnGames["upcoming"] = upcoming;
      returnGames["passed"] = passed;

      return res.status(200).json(returnGames);
    });
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  Game.create(req.body, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(game);
  });
};

// delete user from game
exports.deleteUser = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Game.findById(req.params.gid, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).send('Game Not Found');
    }

    User.findById(req.params.uid, function(err2, user) {
      if (err2) {
        return handleError(res, err2);
      }
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      var is_mentor = user.is_mentor;

      // update game
      if (is_mentor) {
        game.mentors = underscore.reject(game.mentors, function(mentor) {
          return mentor._id == req.params.uid
        });
      } else {
        game.players = underscore.reject(game.players, function(mentor) {
          return mentor._id == req.params.uid
        });
      }
      game.save(function(err3) {
        if (err3) {
          return handleError(res, err3);
        }
        // update user
        user.games_count--;
        user.save(function(err4) {
          if (err4) {
            return handleError(res, err4);
          }
          return res.status(200).send("Successfully executed!");
        })
      });
    });
  });
};

// add user to game
exports.addUser = function(req, res) { //to do : mentors duplicate remove
  if (req.body._id) {
    delete req.body._id;
  }
  Game.findById(req.params.gid, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).send('Game Not Found');
    }

    User.findById(req.params.uid, function(err2, user) {
      if (err2) {
        return handleError(res, err2);
      }
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      var is_mentor = user.is_mentor;

      // update game
      if (is_mentor) {
        game.mentors.push(user);
      } else {
        game.players.push(user);
      }
      game.save(function(err3) {
        if (err3) {
          return handleError(res, err3);
        }
        // update user
        user.games_count++;
        user.save(function(err4) {
          if (err4) {
            return handleError(res, err4);
          }
          return res.status(200).send("Successfully executed!");
        })
      });
    });
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(game, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).send('Not Found');
    }
    game.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}