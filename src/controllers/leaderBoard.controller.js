import db from "../models/index.js";

const User = db.user;

class LeaderBoardController {
  async findAll(req, res, next) {
    return User.findAll({
      offset: 0,
      limit: 10,
      order: [["xp", "DESC"]],
    })
      .then((users) => {
        return res.json({
          data: users,
        });
      })
      .catch((err) => {
        console.log(">> Error while retrieving Leader Boards: ", err);
        return next(err);
      });
  }
}

export default new LeaderBoardController();
