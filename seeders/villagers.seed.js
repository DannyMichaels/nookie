require('dotenv').config();
const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // get the villagers from nookipedia api, then add them to our database.
    const reqInstance = axios.create({
      headers: {
        'x-api-key': '4983ed3c-b6f3-4276-b62c-59448cc307ac',
      },
    });

    const url = `https://api.nookipedia.com/villagers`;

    try {
      const resp = await reqInstance.get(url);
      const allVillagers = resp.data.map((villager) => ({
        name: villager.name,
        wikiUrl: villager.url,
        imageUrl: villager.image_url,
        species: villager.species,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const villagerCount = await queryInterface.bulkInsert(
        'Villagers',
        allVillagers
      );
      console.log(`created ${villagerCount} villagers!`);
      process.exit(1);
    } catch (error) {
      console.log('error UP:seeding villagers', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Villagers', null, {});
      console.log(`deleted all villagers!`);
      process.exit(1);
    } catch (error) {
      console.log('error DOWN:seeding villagers', error);
    }
  },
};
