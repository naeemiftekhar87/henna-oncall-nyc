import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 60; // revalidate every 60 seconds

export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, string> = {};
  for (const c of configs) {
    map[c.key] = c.value;
  }
  return NextResponse.json(map);
}
