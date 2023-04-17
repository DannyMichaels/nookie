const { Router } = require('express');
const {
  register,
  login,
  logout,
  verify,
} = require('../controllers/auth.controllers');
const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/verify', verify);

module.exports = router;
