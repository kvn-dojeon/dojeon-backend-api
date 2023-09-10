import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";
import { config } from "../config/auth.config.js";
import { formatPhoneNumber } from "../utils/formatPhoneNumber.js";
const User = db.user;

class AuthController {
  async signup(req, res) {
    try {
      const phoneNumber = formatPhoneNumber(req.body.phoneNumber);

      const alreadyHasUserWithSameUsername = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (alreadyHasUserWithSameUsername)
        return res.status(400).send({
          success: false,
          message: "Failed! Username is already in use!",
        });

      const alreadyHasUserWithSamePhoneNumber = await User.findOne({
        where: {
          phone_number: phoneNumber,
        },
      });

      if (alreadyHasUserWithSamePhoneNumber)
        res.status(400).send({
          success: false,
          message: "Failed! Phone Number is already in use!",
        });

      const user = await User.create({
        username: req.body.username,
        phone_number: phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
      });

      res.send({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          phone_number: user.phone_number,
          access_token: token,
        },
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  }

  async signin(req, res) {
    try {
      const phoneNumber = req.body?.phoneNumber
        ? formatPhoneNumber(req.body.phoneNumber)
        : "";

      const username = req.body?.username || "";

      const user = await User.findOne(
        username !== ""
          ? {
              where: {
                username: username,
              },
            }
          : {
              where: {
                phone_number: phoneNumber,
              },
            }
      );

      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          success: false,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
      });

      res.status(200).send({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          phone_number: user.phone_number,
          access_token: token,
        },
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  }
}

export default new AuthController();
