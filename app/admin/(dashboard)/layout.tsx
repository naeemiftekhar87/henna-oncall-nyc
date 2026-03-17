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

  const counts = await Promise.all(
    SERVICES.map((s) =>
      prisma.booking.count({ where: { service: s, status: "pending" } }),
    ),
  );

  const pendingCounts: Record<string, number> = {};
  SERVICES.forEach((s, i) => {
    pendingCounts[s] = counts[i];
  });

  return (
    <AdminLayoutClient pendingCounts={pendingCounts}>
      {children}
    </AdminLayoutClient>
  );
}
