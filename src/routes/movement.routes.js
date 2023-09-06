import { Router } from "express";
import movementController from "../controllers/movement.controller.js";

const router = Router();

router.route("/").get(movementController.findAll);

export default router;
