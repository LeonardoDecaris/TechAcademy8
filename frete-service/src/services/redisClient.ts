import { createClient } from "redis";

const url = process.env.REDIS_URL || "redis://redis:6379";
const redis = createClient({ url });

redis.on("error", (e) => console.error("[redis] error", e?.message));
redis.on("connect", () => console.log("[redis] connected", url));

(async () => { if (!redis.isOpen) await redis.connect(); })();

export default redis;