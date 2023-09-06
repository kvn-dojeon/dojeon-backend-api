const levelModel = (sequelize, DataTypes) => {
  const Level = sequelize.define(
    "level",
    {
      name: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
      },
    },
    { underscored: true }
  );

  return Level;
};

export default levelModel;
