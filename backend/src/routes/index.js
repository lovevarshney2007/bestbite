import { Router } from "express";
import healthRouter from "./healthRoutes.js";
import testRouter from "./testRoutes.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/test", testRouter);

export default router;