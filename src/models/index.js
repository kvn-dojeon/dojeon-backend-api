import Sequelize from "sequelize";
import { config } from "../config/db.config.js";
import userModels from "../models/user.model.js";
import activityModel from "./activity.model.js";
import levelModel from "./level.model.js";
import movementModel from "./movement.model.js";
import activityMovementsModel from "./activity-movements.model.js";

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
db.activityMovements = activityMovementsModel(sequelize, Sequelize);

db.activity.belongsTo(db.level, { foreignKey: "level_id" });

db.activity.belongsToMany(db.movement, {
  through: db.activityMovements,
  as: "movements",
  foreignKey: "activity_id",
});
db.movement.belongsToMany(db.activity, {
  through: db.activityMovements,
  as: "activities",
  foreignKey: "movement_id",
});

export default db;
