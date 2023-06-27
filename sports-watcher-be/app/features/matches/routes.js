const express = require('express');

const handlers = require('./handlers');

const router = express.Router();

router.get('/', handlers.getMatches);
router.post('/', handlers.createMatch);
router.delete('/:id', handlers.deleteMatch);

module.exports = router;
