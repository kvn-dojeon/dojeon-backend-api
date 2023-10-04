import jwt from "jsonwebtoken";

import { config } from "../config/auth.config.js";
import db from "../models/index.js";
const Activity = db.activity;
const User = db.user;
const UserActivity = db.userActivity;

class UserActivityController {
  async book(req, res) {
    try {
      const { id } = req.params;
      const authorization = req.headers.authorization;

      if (!id) {
        return res
          .status(404)
          .send({ success: false, message: "Activity not found!" });
      }

      if (!authorization) {
        return res
          .status(401)
          .send({ success: false, message: "unauthorized" });
      }

      let decoded;

      try {
        decoded = jwt.verify(authorization, config.secret);
      } catch (e) {
        return res.status(401).send({
          success: false,
          message: "unauthorized",
        });
      }
      var userId = decoded.id;

      const userActivity = await UserActivity.findOne({
        where: {
          status: "in-progress",
          user_id: userId,
          activity_id: id,
        },
      });
      if (userActivity)
        return res.status(400).send({
          success: false,
          message:
            "You already subscribe to this activity and the status is still in progress",
        });

      const activity = await Activity.findByPk(id);
      const user = await User.findByPk(userId);

      await user.addActivity(activity);

      res.send({ success: true, message: "Book was been done successfully!" });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  }

  async findAll(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ success: false, message: "unauthorized" });
    }

    let decoded;

    try {
      decoded = jwt.verify(authorization, config.secret);
    } catch (e) {
      return res.status(401).send({
        success: false,
        message: "unauthorized",
      });
    }
    var userId = decoded.id;

    return UserActivity.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Activity,
        },
      ],
    })
      .then((userActivities) => {
        return res.json({
          success: true,
          data: userActivities,
        });
      })
      .catch((err) => {
        console.log(">> Error while retrieving User Activities: ", err);
        return next(err);
      });
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const userActivity = await UserActivity.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Activity,
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
          },
          {
            model: User,
          },
        ],
      });
      if (!userActivity) throw new DataNotFound("User Activity not found");

      return res.json({
        success: true,
        data: userActivity,
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  }
}

export default new UserActivityController();
