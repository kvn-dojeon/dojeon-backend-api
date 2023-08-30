import ActivityModel from "../models/activity.model";
import LevelModel from "../models/level.model";

export const findAll = () => {
  return LevelModel.findAll({
    include: [
      {
        model: ActivityModel,
        as: "activities",
        attributes: ["id", "title", "description", "image_url"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((levels) => {
      return levels;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Levels: ", err);
    });
};
