import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

const SERVICES = [
  "blush",
  "bloom",
  "lush",
  "grace",
  "petal-feet",
  "blooming-feet",
  "regal-steps",
  "party",
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const pendingBookings = await prisma.booking.findMany({
    where: { status: "pending" },
    select: { service: true },
  });

  const pendingCounts: Record<string, number> = {};
  for (const s of SERVICES) pendingCounts[s] = 0;
  for (const b of pendingBookings) {
    const services = b.service.split(",").map((s) => s.trim());
    for (const s of services) {
      if (s in pendingCounts) pendingCounts[s]++;
    }
  }

  return (
    <AdminLayoutClient pendingCounts={pendingCounts}>
      {children}
    </AdminLayoutClient>
  );
}
