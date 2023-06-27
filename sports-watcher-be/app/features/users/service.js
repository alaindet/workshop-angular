const jwt = require('jsonwebtoken');

const { readJsonData } = require('../../common/utils/json-data');

// "The database"
let users = readJsonData('users');

function signIn(email, password) {
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // TODO: Add hashing please?
  if (user.password !== password) {
    throw new Error('Invalid credentials');
  }

  const jwt = generateAccessToken(user.email, user.role);

  return { jwt, user };
}

function generateAccessToken(email, role) {
  const payload = { email, role };
  const secret = process.env.SPORTS_WATCHER_JWT_SECRET ?? 'the-secret';
  const options = { expiresIn: '86400s' };
  return jwt.sign(payload, secret, options);
}

module.exports = {
  signIn,
};
