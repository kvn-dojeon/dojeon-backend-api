const userActivityModel = (sequelize, DataTypes) => {
  const UserActivity = sequelize.define(
    "UserActivity",
    {
      current_progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["in-progress", "completed"]],
        },
        defaultValue: "in-progress",
      },
    },
    {
      underscored: true,
    }
  );

  return UserActivity;
};

export default userActivityModel;
