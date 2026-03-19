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

  // Seed services
  const services = [
    {
      key: "blush",
      name: "Blush",
      price: 195,
      duration: "2–3 hours",
      category: "bridal",
      sortOrder: 1,
    },
    {
      key: "bloom",
      name: "Bloom",
      price: 295,
      duration: "3–4 hours",
      category: "bridal",
      sortOrder: 2,
    },
    {
      key: "lush",
      name: "Lush",
      price: 395,
      duration: "4–5 hours",
      category: "bridal",
      sortOrder: 3,
    },
    {
      key: "grace",
      name: "Grace",
      price: 495,
      duration: "5–7 hours",
      category: "bridal",
      sortOrder: 4,
    },
    {
      key: "petal-feet",
      name: "Petal Feet",
      price: 120,
      duration: "~1 hour",
      category: "feet",
      sortOrder: 5,
    },
    {
      key: "blooming-feet",
      name: "Blooming Feet",
      price: 180,
      duration: "~1.5 hours",
      category: "feet",
      sortOrder: 6,
    },
    {
      key: "regal-steps",
      name: "Regal Steps",
      price: 250,
      duration: "2–3 hours",
      category: "feet",
      sortOrder: 7,
    },
    {
      key: "party",
      name: "Party Henna",
      price: 0,
      duration: "Varies",
      category: "party",
      sortOrder: 8,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { key: s.key },
      update: {
        name: s.name,
        price: s.price,
        duration: s.duration,
        category: s.category,
        sortOrder: s.sortOrder,
      },
      create: s,
    });
  }
  console.log("Services seeded");

  // Seed default site config (images/content)
  const siteDefaults: { key: string; value: string }[] = [
    { key: "logo", value: "" },
    { key: "hero_image", value: "" },
    { key: "service_blush_image", value: "" },
    { key: "service_bloom_image", value: "" },
    { key: "service_lush_image", value: "" },
    { key: "service_grace_image", value: "" },
    { key: "service_petal_feet_image", value: "" },
    { key: "service_blooming_feet_image", value: "" },
    { key: "service_regal_steps_image", value: "" },
    { key: "gallery_1", value: "" },
    { key: "gallery_2", value: "" },
    { key: "gallery_3", value: "" },
    { key: "gallery_4", value: "" },
    { key: "gallery_5", value: "" },
    { key: "gallery_6", value: "" },
    { key: "gallery_7", value: "" },
    { key: "gallery_8", value: "" },
    { key: "gallery_9", value: "" },
    { key: "gallery_10", value: "" },
    { key: "gallery_11", value: "" },
    { key: "gallery_12", value: "" },
    { key: "party_1", value: "" },
    { key: "party_2", value: "" },
    { key: "party_3", value: "" },
    { key: "party_4", value: "" },
  ];

  for (const cfg of siteDefaults) {
    await prisma.siteConfig.upsert({
      where: { key: cfg.key },
      update: {},
      create: cfg,
    });
  }
  console.log("Site config seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
