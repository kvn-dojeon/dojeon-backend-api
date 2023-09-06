import { Router } from "express";
import { findAll } from "../controllers/movement.controller.js";

const router = Router();

router.route("/").get(findAll);

export default router;
