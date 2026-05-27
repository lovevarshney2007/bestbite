import { Router } from "express";

import {
    createMenu,
    getMenus
}
from "../controllers/menuController.js";

const router = Router();

router.post(
    "/",
    createMenu
);

router.get(
    "/",
    getMenus
);

export default router;