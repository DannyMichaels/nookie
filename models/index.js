const { Sequelize } = require('sequelize');

const URI =
  `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` ||
  process.env.DB_URI;

const sequelize = new Sequelize(URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.villagers = require('./villager.model.js')(sequelize, Sequelize);

const dbConnect = async () => {
  try {
    // await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

db.dbConnect = dbConnect;
module.exports = db;
