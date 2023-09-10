const activityMovementsModel = (sequelize, Sequelize) => {
  const ActivityMovements = sequelize.define(
    "activity_movements",
    {
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  return ActivityMovements;
};

export default activityMovementsModel;
