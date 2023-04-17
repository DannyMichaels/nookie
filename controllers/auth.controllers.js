const { User, AuthToken } = require('../models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { nickname, email, password, villagerId } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password cannot be empty' });
    }

    const hash = bcrypt.hashSync(password, 10);

    // create a new user with the password hash from bcrypt
    const user = await User.create({
      nickname,
      email,
      password: hash,
      villagerId, // avatar from Nookipedia villagers api check villagers.seed.js
    });

    // send back the new user and auth token to the
    // client { user, token }
    const data = await user.authorize();
    return res.status(200).json(data);
  } catch (error) {
    const msg = errorMessage(error.message);
    const errors = msg.split(',');
    return res.status(400).json({ errors });
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
    const { user, token } = await User.authenticate(email, password);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: 'invalid email or password' });
  }
};

const logout = async (req, res) => {
  // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const { user, headers, cookies } = req;

  const token = cookies.auth_token || headers.authorization;
  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && token) {
    await req.user.logout(token);
    return res.status(200).json({ message: 'success' });
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send({ error: 'not authenticated' });
};

const errorMessage = (error) => {
  return error.replaceAll('Validation error:', '').trim();
};

const verify = async (req, res) => {
  try {
    const token = req.cookies?.auth_token || req.headers?.authorization;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const authToken = await AuthToken.findOne({
      where: { token },
      include: User,
    });

    const result = await User.findByPk(authToken.User.dataValues.id);
    if (result?.dataValues?.id) {
      return res.status(200).json({
        isAuthenticated: true,
        user: { ...result.dataValues },
        token: authToken.token,
      });
    }

    return res.status(401).json({ isAuthenticated: false });
  } catch (error) {
    console.log('verify error', error);
    return res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = {
  register,
  login,
  logout,
  verify,
};
