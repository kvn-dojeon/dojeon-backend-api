import db from "../models/index.js";

const Activity = db.activity;
const Movement = db.movement;

class MovementController {
  async findAll(req, res, next) {
    return Movement.findAll({
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
      .then((movements) => {
        return res.json({
          data: movements,
        });
      })
      .catch((err) => {
        console.log(">> Error while retrieving Movements: ", err);
        return next(err);
      });
  }

  // async addActivity(movementId, activityId) {
  //   return Movement.findByPk(movementId)
  //     .then((movement) => {
  //       if (!movement) {
  //         console.log("Movement not found!");
  //         return null;
  //       }
  //       return Activity.findByPk(activityId).then((activity) => {
  //         if (!activity) {
  //           console.log("Activity not found!");
  //           return null;
  //         }

  //         movement.addActivity(activity);
  //         console.log(
  //           `>> added Activity id=${activity.id} to Movement id=${movement.id}`
  //         );
  //         return movement;
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(">> Error while adding Activity to Movement: ", err);
  //     });
  // }
}

export default new MovementController();
