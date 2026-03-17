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

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Service",
    "Date",
    "Price",
    "Status",
    "Address",
    "Message",
    "Created At",
  ];

  const rows = bookings.map((b) => [
    escapeCSV(b.id),
    escapeCSV(b.name),
    escapeCSV(b.email),
    escapeCSV(b.phone),
    escapeCSV(SERVICE_LABELS[b.service] || b.service),
    escapeCSV(b.date),
    b.price.toString(),
    escapeCSV(b.status),
    escapeCSV(
      [b.street, b.apt, b.city, b.state, b.zip].filter(Boolean).join(", "),
    ),
    escapeCSV(b.message || ""),
    escapeCSV(b.createdAt.toISOString()),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bookings-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
