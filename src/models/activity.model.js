const activityModel = (sequelize, Sequelize) => {
  const Activity = sequelize.define(
    "activity",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT("long"),
      },
      image_thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estimated_time_needed_per_session: {
        type: Sequelize.INTEGER,
      },
      xp_reward: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rest_xp_reward: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bonus_xp_reward: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
