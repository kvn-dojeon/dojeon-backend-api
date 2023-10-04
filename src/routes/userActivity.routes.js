import { Router } from "express";
import userActivityController from "../controllers/userActivity.controller.js";

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.route("/:id/book").post(userActivityController.book);
router.route("/").get(userActivityController.findAll);
router.route("/:id").get(userActivityController.findById);

export default router;
