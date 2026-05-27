import { Router } from "express";
import healthRouter from "./healthRoutes.js";
import testRouter from "./testRoutes.js";
import authRouter from "./authRoutes.js";
import userRouter
from "./userRoutes.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/test", testRouter);
router.use("/auth", authRouter);
router.use(
    "/users",
    userRouter
);

export default router;