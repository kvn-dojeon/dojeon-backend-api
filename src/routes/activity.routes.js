import { Router } from "express";
import activityController from "../controllers/activity.controller.js";
import { upload } from "../utils/upload.js";

const router = Router();

router.route("/").get(activityController.findAll);
router.route("/:id").get(activityController.findById);
router.use(upload.single("imageThumbnail"));
router.route("/").post(activityController.create);

export default router;
