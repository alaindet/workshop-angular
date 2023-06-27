function authorized(...roles) {

  const err = res => res.status(403).send({
    message: 'You are not authorized',
  });

  return function(req, res, next) {

    if (!req.user) {
      return err(res);
    }

    if (!req.user.role) {
      return err(res);
    }

    if (!roles.includes(req.user.role)) {
      return err(res);
    }

    next();
  }
}

module.exports = authorized;
