import { Router } from "express";
import levelController from "../controllers/level.controller.js";

const router = Router();

router.route("/").get(levelController.findAll);

export default router;
