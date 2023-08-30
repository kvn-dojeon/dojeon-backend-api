import db from "../models/index.js";

const Activity = db.activity;

export const create = (activity) => {
  return Activity.create({
    title: activity.title,
    description: activity.description,
  })
    .then((activity) => {
      console.log(">> Created Activity: " + JSON.stringify(activity, null, 4));
      return activity;
    })
    .catch((err) => {
      console.log(">> Error while creating Activity: ", err);
    });
};

export const findAll = (req, res, next) => {
  return Activity.findAll({
    //   include: [
    //     {
    //       model: db.level,
    //       as: "levels",
    //       attributes: ["id", "name"],
    //       through: {
    //         attributes: [],
    //       },
    //       // through: {
    //       //   attributes: ["level_id", "activity_id"],
    //       // },
    //     },
    //   ],
  })
    .then((activities) => {
      return res.json({
        data: activities,
      });
    })
    .catch((err) => {
      console.log(">> Error while retrieving Activities: ", err);
      return next(err);
    });
};
