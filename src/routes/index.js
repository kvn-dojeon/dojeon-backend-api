import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import activityRoutes from "./activity.routes.js";
import levelRoutes from "./level.routes.js";
import movementRoutes from "./movement.routes.js";
import userActivityRoutes from "./userActivity.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/activity", activityRoutes);
router.use("/level", levelRoutes);
router.use("/movement", movementRoutes);
router.use("/user-activity", userActivityRoutes);

export default router;
