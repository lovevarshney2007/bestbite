import { PrismaClient } from "@prisma/client";
import logger from "../config/logger.js";

const prisma = new PrismaClient({
    log: ["query", "error", "warn"]
});

prisma
    .$connect()
    .then(() => {
        logger.info("PostgreSQL connected");
    })
    .catch((err) => {
        logger.error("DB connection failed", err);
    });

export default prisma;