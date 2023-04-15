const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRESQL_DB_URI // postgres://user:password@hostname:port/db_name
);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sql: sequelize,
  testDbConnection,
};
