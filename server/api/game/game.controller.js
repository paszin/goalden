'use strict';

var _ = require('lodash');
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
exports.addUser = function(req, res) { // /api/games/:gid/users/:uid/join //to do : mentors duplicate remove
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
        return handleError (res, err2);
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