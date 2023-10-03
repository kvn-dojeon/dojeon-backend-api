import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";
import { config } from "../config/auth.config.js";
import { formatPhoneNumber } from "../utils/formatPhoneNumber.js";
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

      const activity = await Activity.findByPk(id);
      const user = await User.findByPk(userId);

      await user.addActivity(activity);

      res.send({ message: "Book was been done successfully!" });
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
    })
      .then((userActivities) => {
        return res.json({
          data: userActivities,
        });
      })
      .catch((err) => {
        console.log(">> Error while retrieving User Activities: ", err);
        return next(err);
      });
  }
}

export default new UserActivityController();
