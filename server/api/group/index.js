'use strict';

var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

router.get('/users/:uid/groups', controller.index);
router.get('/:id', controller.show);
router.get('/groups/:id/participants', controller.showParticipants);
router.get('/users/:uid/groups/location', controller.listByloc);
router.get('/users/:uid/groups/:gid/add', controller.addUser);
router.get('/users/:uid/cal', controller.findByCal);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
