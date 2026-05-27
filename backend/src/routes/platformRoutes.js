import { Router } from "express";

import {
    createPlatform,
    getPlatforms
}
from "../controllers/platformController.js";

const router = Router();

router.post(
    "/",
    createPlatform
);

router.get(
    "/",
    getPlatforms
);

export default router;