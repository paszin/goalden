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
      targetUser = underscore.find(users, function(user){ return user._id == req.params.uid; });
      if (targetUser == null) {
        return res.status(404).send('User Not Found');
      }

      // users to object

      // var returnGames = {};
      // var upcoming = [];
      // var passed = [];
      // for (var i = 0; i < games.length; i++) {

      //   var date = games[i].date;
      //   var now = Date.now();
      //   if (now - date >= 0) { // upcoming
      //     upcoming.push(games[i]);
      //   } else { // the games that happened in the past and he attended.
      //     var thisUserInGame = false;
      //     var mentors = games[i].mentors;

      //     for (var j = 0 ; j < mentors.length; j ++) {
      //       if (mentors[j]._id === req.params.uid) 
      //         thisUserInGame = true;
      //     }

      //     var players = games[i].players;
      //     for (var j = 0 ; j < players.length; j ++) {
      //       if (players[j]._id === req.params.uid)
      //         thisUserInGame = true;
      //     }

      //     if (thisUserInGame)
      //       passed.push(games[i]);

      //   }

      // } // end for

      return res.status(200).json({
      games: games
    });


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