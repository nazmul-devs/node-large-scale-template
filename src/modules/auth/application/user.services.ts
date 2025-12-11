import { IUserRepository } from "../domain/userRepository.interface";
import { CacheClient } from "@core/cache/CacheClient";
import { UserCacheKeys } from "../infra/UserCacheKeys";
import { CreateUserDTO } from "./user.dtos";
import { User } from "../domain/user.entity";
import { emitEvent } from "@events/eventBus";
import { EventTypes } from "@events/eventTypes";

type UserServiceDeps = {
  userRepo: IUserRepository;
  cache: CacheClient;
};

export const makeCreateUser = ({ userRepo, cache }: UserServiceDeps) =>
  async (payload: CreateUserDTO): Promise<User> => {
    const existing = await userRepo.findByEmail(payload.email);
    if (existing) {
      throw Object.assign(new Error("Email already in use"), { statusCode: 409 });
    }

    const user = await userRepo.create(payload);

    await cache.set(UserCacheKeys.byId(user.id), user.toJSON(), 60);
    await cache.set(UserCacheKeys.byEmail(user.email), user.toJSON(), 60);

    emitEvent(EventTypes.USER_CREATED, user.toJSON());

    return user;
  };

export const makeGetUserById = ({ userRepo, cache }: UserServiceDeps) =>
  async (id: string): Promise<User | null> => {
    const cacheKey = UserCacheKeys.byId(id);
    const cached = await cache.get<any>(cacheKey);
    if (cached) {
      return new User({
        id: cached.id,
        name: cached.name,
        email: cached.email,
        createdAt: new Date(cached.createdAt),
      });
    }

    const user = await userRepo.findById(id);
    if (user) {
      await cache.set(cacheKey, user.toJSON(), 60);
    }
    return user;
  };
