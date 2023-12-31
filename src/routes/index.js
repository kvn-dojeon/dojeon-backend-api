import { Router } from "express";
import testRoutes from "./test.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import activityRoutes from "./activity.routes.js";
import levelRoutes from "./level.routes.js";
import movementRoutes from "./movement.routes.js";
import userActivityRoutes from "./userActivity.routes.js";
import leaderBoardRoutes from "./leaderBoard.routes.js";

const router = Router();

router.use("/test", testRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/activity", activityRoutes);
router.use("/level", levelRoutes);
router.use("/movement", movementRoutes);
router.use("/user-activity", userActivityRoutes);
router.use("/leader-board", leaderBoardRoutes);

export default router;
