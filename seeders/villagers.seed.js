require('dotenv').config();
const axios = require('axios');

// npx sequelize-cli db:seed:all
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // get the villagers from nookipedia api, then add them to our database.
    const reqInstance = axios.create({
      headers: {
        'x-api-key': process.env.NOOKIPEDIA_API_KEY,
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

      await queryInterface.bulkInsert('Villagers', allVillagers);
      console.log(`seeded ${allVillagers.length} villagers!`);
      process.exit(1);
    } catch (error) {
      console.log('error UP:seeding villagers', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // npx sequelize-cli db:seed:undo:all
    try {
      await queryInterface.bulkDelete('Villagers', null, {});
      console.log(`deleted all villagers!`);
      process.exit(1);
    } catch (error) {
      console.log('error DOWN:seeding villagers', error);
    }
  },
};
