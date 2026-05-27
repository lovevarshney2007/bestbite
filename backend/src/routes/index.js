import { Router } from "express";
import healthRouter from "./healthRoutes.js";
import testRouter from "./testRoutes.js";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import platformRouter from "./platformRoutes.js";
import restaurantRouter from "./restaurantRoutes.js";
import menuRouter from "./menuRoutes.js";
import compareRouter from "./compareRoutes.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/test", testRouter);
router.use("/restaurants", restaurantRouter);
router.use("/auth", authRouter);
router.use("/users",userRouter);
router.use("/platforms", platformRouter);
router.use("/menus", menuRouter);
router.use("/compare", compareRouter);

export default router;