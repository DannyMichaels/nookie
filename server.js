const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const db = require('./models');
const villagerRoutes = require('./routes/villagers.routes');
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

async function createServer() {
  const app = express();
  app.use(logger('dev'));
  app.use(cors);
  app.use(helmet()); // security with express-helmet

  // parse requests of content-type - application/json
  app.use(express.json());

  await db.connect();

  app.get('/', (_req, res) => {
    res.send('<h1>Welcome</h1>');
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });

  // routes
  app.use('/api', villagerRoutes);

  // error handler
  app.use(function (err, req, res, next) {
    return res.status(500).json({
      error: err.message,
    });
  });
}

module.exports = createServer;
