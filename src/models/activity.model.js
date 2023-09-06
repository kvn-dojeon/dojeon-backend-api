const activityModel = (sequelize, Sequelize) => {
  const Activity = sequelize.define(
    "activity",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      image_thumbnail: {
        type: Sequelize.STRING,
      },
      estimated_time_needed_per_session: {
        type: Sequelize.INTEGER,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      underscored: true,
    }
  );

  return Activity;
};

export default activityModel;
