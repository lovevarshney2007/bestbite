import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware.js"
import { ApiError } from "./utils/ApiError.js"
import { asyncHandler } from "./utils/asyncHandler.js"
import router from "./routes/index.js";
import logger from "./config/logger.js";
import prisma from "./db/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", router);

// app.get("/", (req, res) => {
//   res.json({
//     message: "BestBite API Running 🚀"
//   });
// });



app.get(
    "/test-error",
    asyncHandler(async (req, res) => {
        throw new ApiError(401, "Unauthorized access")
    })
)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});