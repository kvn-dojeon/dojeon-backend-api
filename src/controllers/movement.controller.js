import db from "../models/index.js";

const Movement = db.movement;

export const findAll = (req, res, next) => {
  return Movement.findAll({})
    .then((movements) => {
      return res.json({
        data: movements,
      });
    })
    .catch((err) => {
      console.log(">> Error while retrieving Movements: ", err);
      return next(err);
    });
};
