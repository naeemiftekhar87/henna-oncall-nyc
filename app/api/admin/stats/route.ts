import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    totalRevenue,
    bridalCount,
    feetCount,
    partyCount,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.booking.count({ where: { status: "confirmed" } }),
    prisma.booking.count({ where: { status: "completed" } }),
    prisma.booking.count({ where: { status: "cancelled" } }),
    prisma.booking.aggregate({
      _sum: { price: true },
      where: { status: { not: "cancelled" } },
    }),
    prisma.booking.count({ where: { service: "bridal" } }),
    prisma.booking.count({ where: { service: "feet" } }),
    prisma.booking.count({ where: { service: "party" } }),
  ]);

  const recent = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return NextResponse.json({
    stats: {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      revenue: totalRevenue._sum.price || 0,
      byService: { bridal: bridalCount, feet: feetCount, party: partyCount },
    },
    recent,
  });
}
