import Sequelize from "sequelize";
import { config } from "../config/db.config.js";
import userModels from "../models/user.model.js";
import activityModel from "./activity.model.js";
import levelModel from "./level.model.js";
import movementModel from "./movement.model.js";
import scheduleModel from "./schedule.js";
import scheduleMovementModel from "./schedule-movement.model.js";
import userActivityModel from "./user-activity.model.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectOptions: {
    ssl: true,
  },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModels(sequelize, Sequelize);
db.activity = activityModel(sequelize, Sequelize);
db.level = levelModel(sequelize, Sequelize);
db.schedule = scheduleModel(sequelize, Sequelize);
db.movement = movementModel(sequelize, Sequelize);
db.scheduleMovement = scheduleMovementModel(sequelize, Sequelize);
db.userActivity = userActivityModel(sequelize, Sequelize);

db.activity.belongsTo(db.level, { foreignKey: "level_id" });

db.activity.hasMany(db.schedule);

db.schedule.belongsTo(db.activity);

db.schedule.belongsToMany(db.movement, { through: db.scheduleMovement });
db.movement.belongsToMany(db.schedule, { through: db.scheduleMovement });

db.userActivity.belongsTo(db.activity, { foreignKey: "activity_id" });
db.userActivity.belongsTo(db.user, { foreignKey: "user_id" });
db.user.belongsToMany(db.activity, { through: db.userActivity });
db.activity.belongsToMany(db.user, { through: db.userActivity });

export default db;
