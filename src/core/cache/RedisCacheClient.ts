import { createClient, RedisClientType } from "redis";
import { CacheClient } from "./CacheClient";

export class RedisCacheClient implements CacheClient {
  private client: RedisClientType;

  constructor(private url: string) {
    this.client = createClient({ url: this.url });
    this.client.on("error", (err) => console.error("Redis error:", err));
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log("🧠 Redis cache connected");
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  async set<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    const data = JSON.stringify(value);
    await this.client.set(key, data, { EX: ttlSeconds });
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
