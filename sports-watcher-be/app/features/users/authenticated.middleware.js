const jwt = require('jsonwebtoken');

function authenticated(req, res, next) {

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send({
      message: 'Please sign in and try again',
    });
  }

  const [_, token] = authHeader.split(' ');

  if (token == null) {
    return res.status(401).send({
      message: 'Invalid token',
    });
  }

  const appSecret = process.env.SPORTS_WATCHER_JWT_SECRET ?? 'the-secret';
  jwt.verify(token, appSecret, (err, payload) => {

    if (err) {
      console.error(err);
      return res.status(403).send({
        message: 'You cannot perform this request',
      });
    }

    req.user = payload;
    next();
  });
}

module.exports = authenticated;
