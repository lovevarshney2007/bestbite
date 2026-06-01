import { Queue } from "bullmq";
import redis from "./redis.js";

const menuQueue = new Queue(
    "menu-fetch-queue",
    {
        connection: redis
    }
);

export default menuQueue;