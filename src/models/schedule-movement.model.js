const scheduleMovementModel = (sequelize, DataTypes) => {
  const ScheduleMovement = sequelize.define(
    "ScheduleMovement",
    {
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  return ScheduleMovement;
};

export default scheduleMovementModel;
