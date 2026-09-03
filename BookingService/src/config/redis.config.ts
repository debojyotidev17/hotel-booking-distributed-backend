import { Redis } from "ioredis";

const redis = new Redis({
    host: "localhost",
    port: 6380,
});

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (error) => {
    console.error("Redis error:", error);
});

export default redis;
