const movementModel = (sequelize, DataTypes) => {
  const Movement = sequelize.define(
    "movement",
    {
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return Movement;
};

export default movementModel;
