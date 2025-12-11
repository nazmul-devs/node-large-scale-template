import { prisma } from "@core/db/prismaClient";
import { RedisCacheClient } from "@core/cache/RedisCacheClient";
import { PrismaUserRepository } from "./infra/PrismaUserRepository";
import { makeCreateUser, makeGetUserById } from "./application/user.services";

const redisClient = new RedisCacheClient(process.env.REDIS_URL || "redis://localhost:6379");

export async function initUserModule() {
  await redisClient.connect();

  const userRepo = new PrismaUserRepository(prisma);

  const createUser = makeCreateUser({ userRepo, cache: redisClient });
  const getUserById = makeGetUserById({ userRepo, cache: redisClient });

  return {
    createUser,
    getUserById,
  };
}
