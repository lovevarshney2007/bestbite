import { Router } from "express";
import { body } from "express-validator";

import { validate } from "../middleware/validate.js";
import { registerUser,loginUser } from "../controllers/authController.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
import {refreshAccessToken,logoutUser} from "../controllers/authController.js";

const router = Router();

router.post(
    "/register",
    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password minimum 6 chars"),

        validate
    ],
    registerUser
);

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .withMessage(
                "Valid email required"
            ),

        body("password")
            .notEmpty()
            .withMessage(
                "Password required"
            ),

        validate
    ],
    loginUser
);

router.post(
    "/refresh-token",
    refreshAccessToken
);

router.post(
    "/logout",
    verifyJWT,
    logoutUser
);

export default router;