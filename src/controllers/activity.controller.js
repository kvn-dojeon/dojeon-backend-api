import db from "../models/index.js";
import { yupOptions } from "../utils/yupOptions.js";
import { activitySchema } from "../validators/activity.js";
import movementController from "./movement.controller.js";

const Activity = db.activity;

class ActivityController {
  async create(req, res) {
    try {
      const {
        title,
        description,
        imageThumbnail,
        estimatedTimeNeededPerSession,
        isPublic,
      } = activitySchema.validateSync(req.body, yupOptions);

      const movementIds = req.body.movementIds;

      // let movements = [];

      await movementIds.split(",").forEach(async (movementId) => {
        const movement = await db.movement.findOne({
          where: {
            id: movementId,
          },
        });

        if (!movement) throw new Error("Movement not found");

        // movements.push(movement);
      });

      const activity = await Activity.create(
        {
          title: title,
          description: description,
          image_thumbnail: imageThumbnail,
          estimated_time_needed_per_session: estimatedTimeNeededPerSession,
          is_public: isPublic,
          // movements: movements,
        },
        {
          include: [
            {
              model: db.movement,
              as: "movements",
            },
          ],
        }
      );

      await movementIds.split(",").forEach(async (movementId) => {
        await movementController.addActivity(movementId, activity.id);
      });

      res.send({ message: "Activity was created successfully!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async findAll(req, res, next) {
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
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const activity = await Activity.findOne({
        where: {
          id,
        },
        include: [
          {
            model: db.movement,
            as: "movements",
            // attributes: ...
          },
        ],
      });
      if (!activity) throw new DataNotFound("Activity not found");

      return res.json({
        success: true,
        data: activity,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

export default new ActivityController();
