/**
 * Script to upload all local asset images to ImageKit and seed the database
 * with the resulting URLs.
 *
 * Usage: npx tsx scripts/upload-images-to-imagekit.ts
 */

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import fs from "fs";
import ImageKit from "imagekit";
import path from "path";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const ASSETS_DIR = path.join(__dirname, "..", "app", "assets");

// Map of site config keys to local file paths and ImageKit folders
const IMAGE_MAP: { key: string; localPath: string; folder: string }[] = [
  // Brand
  {
    key: "logo",
    localPath: path.join(ASSETS_DIR, "logo.jpg"),
    folder: "/henna-oncall/brand/",
  },
  {
    key: "hero_image",
    localPath: path.join(ASSETS_DIR, "Hero Banner.jpeg"),
    folder: "/henna-oncall/brand/",
  },

  // Bridal Services
  {
    key: "service_blush_image",
    localPath: path.join(ASSETS_DIR, "service", "Bridal BLUSH.jpg"),
    folder: "/henna-oncall/services/",
  },
  {
    key: "service_bloom_image",
    localPath: path.join(ASSETS_DIR, "service", "Bridal BLOOM.jpeg"),
    folder: "/henna-oncall/services/",
  },
  {
    key: "service_lush_image",
    localPath: path.join(ASSETS_DIR, "service", "Bridal LUSH.png"),
    folder: "/henna-oncall/services/",
  },
  {
    key: "service_grace_image",
    localPath: path.join(ASSETS_DIR, "service", "Bridal GRACE.jpeg"),
    folder: "/henna-oncall/services/",
  },

  // Gallery (1-12)
  {
    key: "gallery_1",
    localPath: path.join(ASSETS_DIR, "gallary", "1.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_2",
    localPath: path.join(ASSETS_DIR, "gallary", "2.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_3",
    localPath: path.join(ASSETS_DIR, "gallary", "3.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_4",
    localPath: path.join(ASSETS_DIR, "gallary", "4.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_5",
    localPath: path.join(ASSETS_DIR, "gallary", "5.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_6",
    localPath: path.join(ASSETS_DIR, "gallary", "6.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_7",
    localPath: path.join(ASSETS_DIR, "gallary", "7.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_8",
    localPath: path.join(ASSETS_DIR, "gallary", "8.jpg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_9",
    localPath: path.join(ASSETS_DIR, "gallary", "9.jpeg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_10",
    localPath: path.join(ASSETS_DIR, "gallary", "10.jpeg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_11",
    localPath: path.join(ASSETS_DIR, "gallary", "11.jpeg"),
    folder: "/henna-oncall/gallery/",
  },
  {
    key: "gallery_12",
    localPath: path.join(ASSETS_DIR, "gallary", "12.jpeg"),
    folder: "/henna-oncall/gallery/",
  },

  // Party Henna (using gallery images 3, 5, 6, 7 as the current fallbacks)
  {
    key: "party_1",
    localPath: path.join(ASSETS_DIR, "gallary", "3.jpg"),
    folder: "/henna-oncall/party/",
  },
  {
    key: "party_2",
    localPath: path.join(ASSETS_DIR, "gallary", "5.jpg"),
    folder: "/henna-oncall/party/",
  },
  {
    key: "party_3",
    localPath: path.join(ASSETS_DIR, "gallary", "6.jpg"),
    folder: "/henna-oncall/party/",
  },
  {
    key: "party_4",
    localPath: path.join(ASSETS_DIR, "gallary", "7.jpg"),
    folder: "/henna-oncall/party/",
  },
];

async function uploadImage(entry: (typeof IMAGE_MAP)[0]): Promise<string> {
  if (!fs.existsSync(entry.localPath)) {
    console.warn(`  ⚠ File not found: ${entry.localPath}, skipping`);
    return "";
  }

  const fileBuffer = fs.readFileSync(entry.localPath);
  const fileName = `${entry.key}-${Date.now()}`;

  const result = await imagekit.upload({
    file: fileBuffer,
    fileName,
    folder: entry.folder,
  });

  return result.url;
}

async function main() {
  console.log("🚀 Starting image upload to ImageKit...\n");

  const results: { key: string; url: string }[] = [];

  for (const entry of IMAGE_MAP) {
    process.stdout.write(`  Uploading ${entry.key}...`);
    try {
      const url = await uploadImage(entry);
      if (url) {
        results.push({ key: entry.key, url });
        console.log(` ✓ ${url}`);
      }
    } catch (err) {
      console.error(` ✗ Failed: ${err}`);
    }
  }

  console.log(`\n📦 Saving ${results.length} URLs to database...\n`);

  for (const { key, url } of results) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value: url },
      create: { key, value: url },
    });
    console.log(`  ✓ ${key} → saved`);
  }

  console.log(`\n✅ Done! ${results.length} images uploaded and saved.`);
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
