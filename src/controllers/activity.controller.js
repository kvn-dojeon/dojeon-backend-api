import { Op } from "sequelize";
import db from "../models/index.js";
import { yupOptions } from "../utils/yupOptions.js";
import { activitySchema } from "../validators/activity.js";
import levelController from "./level.controller.js";

const Activity = db.activity;

class ActivityController {
  async create(req, res) {
    try {
      const {
        title,
        description,
        imageThumbnail,
        estimatedTimeNeededPerSession,
        levelId,
        xpReward,
        isPublic,
      } = activitySchema.validateSync(req.body, yupOptions);

      const schedules = req.body.schedules;

      const level = await db.level.findOne({
        where: {
          id: levelId,
        },
      });

      if (!level) throw new Error("Level not found");

      const activity = await Activity.create(
        {
          title: title,
          description: description,
          image_thumbnail: imageThumbnail,
          estimated_time_needed_per_session: estimatedTimeNeededPerSession,
          level_id: levelId,
          xp_reward: xpReward,
          is_public: isPublic,
        },
        {
          include: [
            {
              model: db.level,
              as: "level",
            },
          ],
        }
      );

      await levelController.addActivity(levelId, activity.id);

      for (const scheduleData of schedules) {
        const { movements } = scheduleData;

        const schedule = await db.schedule.create();

        await activity.addSchedule(schedule);

        for (const movementData of movements) {
          const { movementId, duration } = movementData;

          const movement = await db.movement.findByPk(movementId);

          await schedule.addMovement(movement, {
            through: { duration },
          });
        }
      }

      res.send({ message: "Activity was created successfully!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async findAll(req, res, next) {
    return Activity.findAll({ include: db.level })
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
            model: db.level,
            as: "level",
          },
          {
            model: db.schedule,
            include: [db.movement],
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
