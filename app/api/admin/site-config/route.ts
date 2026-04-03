import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, string> = {};
  for (const c of configs) {
    map[c.key] = c.value;
  }
  return NextResponse.json(
    { config: map },
    {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    },
  );
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { key, value } = await request.json();
    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value required" },
        { status: 400 },
      );
    }

    const config = await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    // Revalidate all pages that use site config (images, logo, etc.)
    revalidatePath("/", "layout");
    revalidatePath("/guide");
    revalidatePath("/about");
    revalidatePath("/faq");
    revalidatePath("/my-story");

    return NextResponse.json(
      { config },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  } catch (error) {
    console.error("Update site config error:", error);
    return NextResponse.json(
      { error: "Failed to update config" },
      { status: 500 },
    );
  }
}
