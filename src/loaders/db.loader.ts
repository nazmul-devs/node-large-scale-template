import { prisma } from "@core/db/prismaClient";

export async function connectDB() {
  await prisma.$connect();
  console.log("🗄️ Connected to database");
}
