import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SERVICE_LABELS: Record<string, string> = {
  blush: "Blush",
  bloom: "Bloom",
  lush: "Lush",
  grace: "Grace",
  "petal-feet": "Petal Feet",
  "blooming-feet": "Blooming Feet",
  "regal-steps": "Regal Steps",
  party: "Party Henna",
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { status: "completed" },
    orderBy: { createdAt: "asc" },
  });

  // Monthly revenue data (last 12 months)
  const now = new Date();
  const monthlyData: { month: string; revenue: number; bookings: number }[] =
    [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    const monthBookings = bookings.filter((b) => {
      const created = new Date(b.createdAt);
      return (
        created.getFullYear() === d.getFullYear() &&
        created.getMonth() === d.getMonth()
      );
    });
    monthlyData.push({
      month: label,
      revenue: monthBookings.reduce((sum, b) => sum + b.price, 0),
      bookings: monthBookings.length,
    });
  }

  // Service breakdown
  const serviceData = Object.entries(SERVICE_LABELS).map(([key, label]) => {
    const serviceBookings = bookings.filter((b) => b.service === key);
    return {
      service: label,
      key,
      count: serviceBookings.length,
      revenue: serviceBookings.reduce((sum, b) => sum + b.price, 0),
    };
  });
  serviceData.sort((a, b) => b.count - a.count);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const totalBookings = bookings.length;
  const mostSold = serviceData[0] || null;

  return NextResponse.json({
    monthlyData,
    serviceData,
    totalRevenue,
    totalBookings,
    mostSold,
  });
}
