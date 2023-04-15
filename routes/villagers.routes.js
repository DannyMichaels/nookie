const { Router } = require('express');
const { findAll } = require('../controllers/villagers.controllers');
const router = Router();

router.get('/villagers', findAll);

module.exports = router;
