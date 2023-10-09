const userModel = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  return User;
};

export default userModel;
