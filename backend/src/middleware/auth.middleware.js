import jwt from "jsonwebtoken";
import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(
    async (req, res, next) => {

        const token =
            req.header("Authorization")
            ?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(
                401,
                "Unauthorized request"
            );
        }

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        const user =
            await prisma.user.findUnique({
                where: {
                    id: decoded.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });

        if (!user) {
            throw new ApiError(
                401,
                "Invalid token"
            );
        }

        req.user = user;
        next();
    }
);

export { verifyJWT };