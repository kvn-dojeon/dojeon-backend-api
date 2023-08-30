import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";
import { config } from "../config/auth.config.js";
const User = db.user;

class AuthController {
  async signup(req, res) {
    try {
      const alreadyHasUserWithSameUsername = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (alreadyHasUserWithSameUsername)
        throw new Error("Failed! Username is already in use!");

      const alreadyHasUserWithSameEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (alreadyHasUserWithSameEmail)
        throw new Error("Failed! Email is already in use!");

      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      res.send({ message: "User was registered successfully!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async signin(req, res) {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

export default new AuthController();
