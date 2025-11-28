import Redis from "ioredis";

if (!process.env.REDIS_HOST) {
  console.error("REDIS_HOST não está definido nas variáveis de ambiente");
  process.exit(1);
}
if (!process.env.REDIS_PORT) {
  console.error("REDIS_PORT não está definido nas variáveis de ambiente");
  process.exit(1);
}
if (!process.env.REDIS_PASSWORD) {
  console.error("REDIS_PASSWORD não está definido nas variáveis de ambiente");
  process.exit(1);
}

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;