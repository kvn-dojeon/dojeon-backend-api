import { Router } from "express";
import activityController from "../controllers/activity.controller.js";

const router = Router();

router.route("/").get(activityController.findAll);
router.route("/:id").get(activityController.findById);
router.route("/").post(activityController.create);

export default router;
