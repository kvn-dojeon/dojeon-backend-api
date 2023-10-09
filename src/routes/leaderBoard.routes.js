import { Router } from "express";
import leaderBoardController from "../controllers/leaderBoard.controller.js";

const router = Router();

router.route("/").get(leaderBoardController.findAll);

export default router;
