import db from "../models/index.js";
const Sequelize = db.sequelize;

class TestController {
  async sequelize(req, res) {
    try {
      await Sequelize.authenticate();
      res.status(200).send({
        success: true,
        message: "Connection has been established successfully.",
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  }
}

export default new TestController();
