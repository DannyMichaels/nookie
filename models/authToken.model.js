module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define(
    'AuthToken',
    {
      token: DataTypes.STRING,
    },
    { timestamps: true }
  );

  // set up the associations so we can make queries that include
  // the related objects
  AuthToken.associate = function ({ User }) {
    AuthToken.belongsTo(User);
  };

  // generates a random 15 character token and
  // associates it with a user
  AuthToken.generate = async function (UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID');
    }

    let token = '';

    const possibleCharacters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 15; i++) {
      const randomCharIndex = Math.floor(
        Math.random() * possibleCharacters.length
      );

      token += possibleCharacters.charAt(randomCharIndex);
    }

    return AuthToken.create({ token, UserId });
  };

  return AuthToken;
};
