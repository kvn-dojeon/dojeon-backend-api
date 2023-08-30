const levelModel = (sequelize, DataTypes) => {
  const Level = sequelize.define("level", {
    name: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  });

  return Level;
};

export default levelModel;
