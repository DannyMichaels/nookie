module.exports = (sequelize, Sequelize) => {
  const Villager = sequelize.define('villager', {
    name: {
      type: Sequelize.STRING,
    },
    wikiUrl: {
      type: Sequelize.STRING,
    },
    species: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
  });

  return Villager;
};
