import { prisma } from "@/app/lib/db";
import { Calendar, DollarSign, PartyPopper } from "lucide-react";
import BookingTable from "../BookingTable";

export const dynamic = "force-dynamic";

export default async function PartyDashboard() {
  const bookings = await prisma.booking.findMany({
    where: { service: "party" },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-500/10 p-2 rounded-lg">
            <PartyPopper size={24} className="text-purple-400" />
          </div>
          <div>
            <h1 className="font-playfair text-3xl text-white">Party Henna</h1>
            <p className="text-[#A0A0A0] text-sm">
              Manage party henna bookings
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[#111111] border border-white/5 rounded-xl p-5 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#A0A0A0]" />
            <span className="text-[#A0A0A0] text-sm">
              <span className="text-white font-medium">{bookings.length}</span>{" "}
              total bookings
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-400" />
            <span className="text-[#A0A0A0] text-sm">
              <span className="text-green-400 font-medium">
                ${totalRevenue.toLocaleString()}
              </span>{" "}
              revenue
            </span>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <BookingTable
        initialBookings={bookings.map((b) => ({
          ...b,
          createdAt: b.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
