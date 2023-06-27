const usersService = require('./service');

function signIn(req, res) {

  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  const invalidError = () => res.status(400).send({ message: 'Invalid credentials' });

  if (!inputEmail || !inputPassword) {
    return invalidError();
  }

  try {
    const { jwt, user } = usersService.signIn(inputEmail, inputPassword);
    const message = `Welcome ${user.email}, your role is "${user.role}"`;
    const { email, role } = user;
    const data = { token: jwt, email, role };
    return res.send({ data, message });
  }

  catch (err) {
    return invalidError();
  }
}

module.exports = {
  signIn,
};
