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

  const grouped = await prisma.booking.groupBy({
    by: ["service"],
    where: { status: "pending", service: { in: SERVICES } },
    _count: { service: true },
  });

  const pendingCounts: Record<string, number> = {};
  for (const s of SERVICES) pendingCounts[s] = 0;
  for (const g of grouped) pendingCounts[g.service] = g._count.service;

  return (
    <AdminLayoutClient pendingCounts={pendingCounts}>
      {children}
    </AdminLayoutClient>
  );
}
