const db = require('../models');
const Villager = db.Villager;

const findAll = async (req, res) => {
  try {
    const villagers = await Villager.findAll();
    return res.status(200).json(villagers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findAll,
};
