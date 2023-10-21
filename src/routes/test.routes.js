import { Router } from "express";
import testController from "../controllers/test.controller.js";

const router = Router();

router.route("/sequelize").get(testController.sequelize);

export default router;
