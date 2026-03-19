import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ services });
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      id,
      name,
      price,
      duration,
      active,
      category,
      description,
      imageUrl,
      sortOrder,
      key,
      tagline,
      coverage,
      includes,
      guide,
    } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "Service ID required" },
        { status: 400 },
      );
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (price !== undefined) data.price = parseFloat(price);
    if (duration !== undefined) data.duration = duration;
    if (active !== undefined) data.active = active;
    if (category !== undefined) data.category = category;
    if (description !== undefined) data.description = description;
    if (tagline !== undefined) data.tagline = tagline;
    if (coverage !== undefined) data.coverage = coverage;
    if (includes !== undefined) data.includes = includes;
    if (guide !== undefined) data.guide = guide;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder, 10);
    if (key !== undefined) data.key = key;

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}
