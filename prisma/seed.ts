import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hash = bcrypt.hashSync("admin123", 12);

  const existing = await prisma.admin.findUnique({
    where: { email: "admin@hennaoncall.com" },
  });

  if (!existing) {
    await prisma.admin.create({
      data: {
        email: "admin@hennaoncall.com",
        password: hash,
        name: "Jannatul",
      },
    });
    console.log("Admin seeded: admin@hennaoncall.com");
  } else {
    console.log("Admin already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
