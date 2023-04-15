require('dotenv').config();
const db = require('../models');
const axios = require('axios');
const Villager = db.villagers;

// get the villagers from nookipedia api, then add them to our database.
const run = async () => {
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
    }));

    const inserted = await Villager.bulkCreate(allVillagers);
    console.log(`created ${inserted.length} villagers!`);
    process.exit(1);
  } catch (error) {
    console.log('error seeding villagers', error);
  }
};

run();
