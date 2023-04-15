module.exports = (sequelize, DataTypes) => {
  const Villager = sequelize.define(
    'Villager',
    {
      name: DataTypes.STRING,
      wikiUrl: DataTypes.STRING,
      species: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );

  // https://www.youtube.com/watch?v=HJGWu0cZUe8&ab_channel=WittCode
  // it actually works this way
  Villager.hasOne(sequelize.models.User, {
    as: 'villager',
    constraints: false,
  }); // it's actually the user has one villager idk why I have to do it like this for mysql to add villagerId column to user, video goes through it.

  return Villager;
};
