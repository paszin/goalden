'use strict';

var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

router.get('/users/:uid/groups', controller.index);
router.get('/:id', controller.show);
router.get('/users/:uid/groups/location', controller.listByloc);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
