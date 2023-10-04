const userActivityModel = (sequelize, DataTypes) => {
  const UserActivity = sequelize.define(
    "UserActivity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      completed_at: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      underscored: true,
    }
  );

  return UserActivity;
};

export default userActivityModel;
