const express = require('express');

const handlers = require('./handlers');
const authenticated = require('../users/authenticated.middleware');
const authorized = require('../users/authorized.middleware');

const router = express.Router();

router.get('/', authenticated, authorized('basic', 'admin'), handlers.getTeams);
router.post('/', authenticated, authorized('admin') , handlers.createTeam);
router.delete('/:id', authenticated, authorized('admin'), handlers.deleteTeam);

module.exports = router;
