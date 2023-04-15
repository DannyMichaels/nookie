const { Router } = require('express');
const { register, login, logout } = require('../controllers/auth.controllers');
const router = Router();

router.post('/auth/signup', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

module.exports = router;
