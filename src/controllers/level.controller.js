import db from "../models/index.js";

const Activity = db.activity;
const Level = db.level;

class LevelController {
  async findAll(req, res, next) {
    return Level.findAll({
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
      .then((levels) => {
        return res.json({
          data: levels,
        });
      })
      .catch((err) => {
        console.log(">> Error while retrieving Levels: ", err);
        return next(err);
      });
  }

  async addActivity(levelId, activityId) {
    return Level.findByPk(levelId)
      .then((level) => {
        if (!level) {
          console.log("Level not found!");
          return null;
        }
        return Activity.findByPk(activityId).then((activity) => {
          if (!activity) {
            console.log("Activity not found!");
            return null;
          }

          level.addActivity(activity);
          console.log(
            `>> added Activity id=${activity.id} to Level id=${level.id}`
          );
          return level;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Activity to Level: ", err);
      });
  }
}

export default new LevelController();
