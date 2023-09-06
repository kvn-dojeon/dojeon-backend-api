import Sequelize from "sequelize";
import { config } from "../config/db.config.js";
import userModels from "../models/user.model.js";
import activityModel from "./activity.model.js";
import levelModel from "./level.model.js";
import movementModel from "./movement.model.js";

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
db.movement = movementModel(sequelize, Sequelize);

db.activity.belongsToMany(db.level, {
  through: "activity_levels",
  as: "levels",
  foreignKey: "activity_id",
});

db.level.belongsToMany(db.activity, {
  through: "activity_levels",
  as: "activities",
  foreignKey: "level_id",
});

// db.activity.hasMany(db.movement, {
//   as: "movements",
// });
// db.movement.belongsTo(db.activity, {
//   foreignKey: "activity_id",
//   as: "activities",
// });
db.activity.belongsToMany(db.movement, {
  through: "activity_movements",
  as: "movements",
  foreignKey: "activity_id",
});
db.movement.belongsToMany(db.activity, {
  through: "activity_movements",
  as: "activities",
  foreignKey: "movement_id",
});

export default db;
