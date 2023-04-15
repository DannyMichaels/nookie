const { Router } = require('express');
const controllers = require('../controllers/villagers.controllers');
const router = Router();

router.get('/villagers', controllers.findAll);

module.exports = router;
