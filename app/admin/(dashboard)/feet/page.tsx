import { prisma } from "@/app/lib/db";
import { Calendar, Clock, DollarSign, Footprints } from "lucide-react";
import BookingTable from "../BookingTable";

export const dynamic = "force-dynamic";

const FEET_PACKAGES = [
  { key: "petal-feet", name: "Petal Feet", price: 120, duration: "~1 hour" },
  {
    key: "blooming-feet",
    name: "Blooming Feet",
    price: 180,
    duration: "~1.5 hours",
  },
  {
    key: "regal-steps",
    name: "Regal Steps",
    price: 250,
    duration: "2-3 hours",
  },
];

export default async function FeetDashboard() {
  const bookings = await prisma.booking.findMany({
    where: { service: "feet" },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  const packageCounts = FEET_PACKAGES.map((pkg) => ({
    ...pkg,
    count: bookings.filter((b) => b.package === pkg.key).length,
  }));

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-pink-500/10 p-2 rounded-lg">
            <Footprints size={24} className="text-pink-400" />
          </div>
          <div>
            <h1 className="font-playfair text-3xl text-white">Feet Henna</h1>
            <p className="text-[#A0A0A0] text-sm">Manage feet henna bookings</p>
          </div>
        </div>
      </div>

      {/* Package Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {packageCounts.map((pkg) => (
          <div
            key={pkg.key}
            className="bg-[#111111] border border-white/5 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-pink-400 text-xs uppercase tracking-wider font-medium">
                {pkg.name}
              </span>
              <span className="text-white text-lg font-semibold">
                {pkg.count}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#666]">
              <span className="flex items-center gap-1">
                <DollarSign size={12} />${pkg.price}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {pkg.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar */}
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
