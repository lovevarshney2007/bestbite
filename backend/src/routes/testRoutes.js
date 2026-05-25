import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.post(
    "/",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password minimum 6 chars"),

        validate
    ],
    (req, res) => {
        return res.status(200).json(
            new ApiResponse(
                200,
                req.body,
                "Validation passed"
            )
        );
    }
);

export default router;