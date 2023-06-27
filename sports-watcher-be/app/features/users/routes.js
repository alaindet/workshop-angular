const express = require('express');

const handlers = require('./handlers');

const router = express.Router();

router.post('/signin', handlers.signIn);

module.exports = router;
