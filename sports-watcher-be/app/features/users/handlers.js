const jwt = require('jsonwebtoken');

const { readJsonData } = require('../../common/utils/json-data');

function signIn(req, res) {

  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  const err = () => res.status(400).send({ message: 'Invalid credentials' });

  if (!inputEmail || !inputPassword) {
    return err();
  }

  const users = readJsonData('users');
  const user = users.find(u => u.email === inputEmail);

  if (!user) {
    return err();
  }

  // TODO: Add hashing please?
  if (user.password !== inputPassword) {
    return err();
  }

  const jwt = generateAccessToken(user.email, user.role);
  res.json({
    message: `Welcome ${user.email}, your role is "${user.role}"`,
    data: {
      token: jwt,
      email: user.email,
      role: user.role,
    },
  });
}

function generateAccessToken(email, role) {

  const payload = { email, role };
  const secret = process.env.SPORTS_WATCHER_SECRET;
  const options = { expiresIn: '86400s' };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  signIn,
};
