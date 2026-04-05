import { getSession } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { redirect } from "next/navigation";

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

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [total, pending, confirmed, completed, cancelled, revenueAgg, recent] =
    await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "pending" } }),
      prisma.booking.count({ where: { status: "confirmed" } }),
      prisma.booking.count({ where: { status: "completed" } }),
      prisma.booking.count({ where: { status: "cancelled" } }),
      prisma.booking.aggregate({
        _sum: { price: true },
        where: { status: "completed" },
      }),
      prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const revenue = revenueAgg._sum.price || 0;

  const stats = [
    {
      label: "Total Bookings",
      value: total,
      icon: Calendar,
      color: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/10",
    },
    {
      label: "Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Confirmed",
      value: confirmed,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-white mb-2">Dashboard</h1>
        <p className="text-[#A0A0A0] text-sm">
          Overview of all bookings and services
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111111] border border-white/5 rounded-xl p-5 flex items-center gap-4"
          >
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-[#A0A0A0] text-xs uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-white text-xl font-semibold mt-0.5">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-white text-lg font-medium">Recent Bookings</h2>
        </div>

        {recent.length === 0 ? (
          <div className="p-12 text-center text-[#A0A0A0]">
            <Calendar size={40} className="mx-auto mb-3 opacity-30" />
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                    Client
                  </th>
                  <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                    Service
                  </th>
                  <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                    Date
                  </th>
                  <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                    Price
                  </th>
                  <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-white/5 hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="text-white text-sm">{booking.name}</div>
                      <div className="text-[#666] text-xs">{booking.email}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#A0A0A0]">
                      {(() => {
                        const services = booking.service
                          .split(",")
                          .map((s) => s.trim());
                        const qty: Record<string, number> = booking.quantities
                          ? JSON.parse(booking.quantities)
                          : {};
                        return services
                          .map((s) => {
                            const label = SERVICE_LABELS[s] || s;
                            if (qty[s]) return `${label} (${qty[s]} qty)`;
                            if (
                              s !== "party" &&
                              booking.partySize &&
                              services.length === 1
                            )
                              return `${label} (${booking.partySize} qty)`;
                            return label;
                          })
                          .join(", ");
                      })()}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#A0A0A0]">
                      {booking.date}
                    </td>
                    <td className="px-5 py-4 text-sm text-white font-medium">
                      ${booking.price}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
