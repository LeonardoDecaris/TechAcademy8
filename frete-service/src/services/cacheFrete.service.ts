import redis from "./redisClient";

export async function getJson<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

export async function setJson(key: string, value: any, ttlSec = 60): Promise<void> {
  await redis.set(key, JSON.stringify(value), { EX: ttlSec });
}

export async function delKey(key: string): Promise<void> {
  await redis.del(key);
}