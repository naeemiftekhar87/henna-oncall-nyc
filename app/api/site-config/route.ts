import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 0; // always fetch fresh data

export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, string> = {};
  for (const c of configs) {
    map[c.key] = c.value;
  }
  return NextResponse.json(map, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
