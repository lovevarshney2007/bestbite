import Redis from "ioredis";

const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,

    maxRetriesPerRequest: null
});

redis.on(
    "connect",
    ()=>{
        console.log(
            "[REDIS] Connected"
        );
    }
);

redis.on(
    "error",
    (err)=>{
        console.log(
            "[REDIS ERROR]",
            err.message
        );
    }
);

export default redis;