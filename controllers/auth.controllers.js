const { User } = require('../models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    // create a new user with the password hash from bcrypt
    const user = await User.create({
      nickname,
      email,
      password: hash,
    });

    // send back the new user and auth token to the
    // client { user, authToken }
    const data = await user.authorize();
    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!email || !password) {
    return res.status(400).json({ error: 'Request missing email or password' });
  }

  try {
    const user = await User.authenticate(email, password);
    return res.json(user);
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'invalid username or password', msg: error.message });
  }
};

const logout = async (req, res) => {
  // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const {
    user,
    cookies: { auth_token: authToken },
    headers,
  } = req;

  const token = authToken || headers.authorization;
  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && token) {
    await req.user.logout(token);
    return res.status(204).json({ message: 'success' });
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send({ error: 'not authenticated' });
};

module.exports = {
  register,
  login,
  logout,
};
