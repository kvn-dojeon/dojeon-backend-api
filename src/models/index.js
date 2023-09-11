import Sequelize from "sequelize";
import { config } from "../config/db.config.js";
import userModels from "../models/user.model.js";
import activityModel from "./activity.model.js";
import levelModel from "./level.model.js";
import movementModel from "./movement.model.js";
import scheduleModel from "./schedule.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
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

db.activity.belongsTo(db.level, { foreignKey: "level_id" });

db.activity.hasMany(db.schedule);

db.schedule.belongsTo(db.activity);
db.schedule.belongsToMany(db.movement, { through: "ScheduleMovement" });

db.movement.belongsToMany(db.schedule, { through: "ScheduleMovement" });

export default db;
