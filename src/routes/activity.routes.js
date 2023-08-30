import { Router } from "express";
import { create, findAll } from "../controllers/activity.controller.js";

const router = Router();

router.route("/").get(findAll);
router.route("/").post(create);

export default router;
