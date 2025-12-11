import { User } from "./user.entity";

export interface IUserRepository {
  create(data: { name: string; email: string }): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
