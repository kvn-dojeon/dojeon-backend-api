import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import activityRoutes from "./activity.routes.js";
import movementRoutes from "./movement.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/activity", activityRoutes);
router.use("/movement", movementRoutes);

export default router;
