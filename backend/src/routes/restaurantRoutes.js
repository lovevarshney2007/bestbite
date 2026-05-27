import { Router } from "express";

import {
    createRestaurant,
    getRestaurants
}
from "../controllers/restaurantController.js";

const router = Router();

router.post(
    "/",
    createRestaurant
);

router.get(
    "/",
    getRestaurants
);

export default router;