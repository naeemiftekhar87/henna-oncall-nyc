import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";
import BookingTable from "../BookingTable";

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

export default async function ServicePage({
  serviceKey,
}: {
  serviceKey: string;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const bookings = await prisma.booking.findMany({
    where: { service: { contains: serviceKey } },
    orderBy: { createdAt: "desc" },
  });

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const label = SERVICE_LABELS[serviceKey] || serviceKey;

  const serialized = bookings.map((b) => ({
    ...b,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-2">{label}</h1>
          <p className="text-[#A0A0A0] text-sm">
            {bookings.length} total booking{bookings.length !== 1 ? "s" : ""}
            {pendingCount > 0 && (
              <span className="text-yellow-400 ml-2">
                • {pendingCount} pending
              </span>
            )}
          </p>
        </div>
      </div>

      <BookingTable initialBookings={serialized} />
    </div>
  );
}
