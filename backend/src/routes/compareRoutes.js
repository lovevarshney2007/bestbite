import { Router } from "express";

import {
    compareFood
}
from "../controllers/compareController.js";

const router = Router();

router.get(
    "/",
    compareFood
);

export default router;