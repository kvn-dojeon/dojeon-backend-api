const scheduleModel = (sequelize, Sequelize) => {
  const Schedule = sequelize.define(
    "schedule",
    {},
    {
      underscored: true,
    }
  );

  return Schedule;
};

export default scheduleModel;
