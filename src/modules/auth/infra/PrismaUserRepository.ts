import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../domain/userRepository.interface";
import { User } from "../domain/user.entity";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: { name: string; email: string }): Promise<User> {
    const record = await this.prisma.user.create({ data });
    return new User({
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: record.createdAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) return null;
    return new User({
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: record.createdAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    if (!record) return null;
    return new User({
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: record.createdAt,
    });
  }
}
