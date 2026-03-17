import { prisma } from "@/app/lib/db";
import { Calendar, Clock, DollarSign, Gem } from "lucide-react";
import BookingTable from "../BookingTable";

export const dynamic = "force-dynamic";

const BRIDAL_PACKAGES = [
  { key: "blush", name: "Blush", price: 195, duration: "2-3 hours" },
  { key: "bloom", name: "Bloom", price: 295, duration: "3-4 hours" },
  { key: "lush", name: "Lush", price: 395, duration: "4-5 hours" },
  { key: "grace", name: "Grace", price: 495, duration: "5-7 hours" },
];

export default async function BridalDashboard() {
  const bookings = await prisma.booking.findMany({
    where: { service: "bridal" },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  const packageCounts = BRIDAL_PACKAGES.map((pkg) => ({
    ...pkg,
    count: bookings.filter((b) => b.package === pkg.key).length,
  }));

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#D4AF37]/10 p-2 rounded-lg">
            <Gem size={24} className="text-[#D4AF37]" />
          </div>
          <div>
            <h1 className="font-playfair text-3xl text-white">Bridal Henna</h1>
            <p className="text-[#A0A0A0] text-sm">
              Manage bridal henna bookings
            </p>
          </div>
        </div>
      </div>

      {/* Package Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {packageCounts.map((pkg) => (
          <div
            key={pkg.key}
            className="bg-[#111111] border border-white/5 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#D4AF37] text-xs uppercase tracking-wider font-medium">
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
