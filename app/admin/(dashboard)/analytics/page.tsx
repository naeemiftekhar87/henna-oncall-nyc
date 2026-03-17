"use client";

import { DollarSign, Download, TrendingUp, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyData = { month: string; revenue: number; bookings: number };
type ServiceData = {
  service: string;
  key: string;
  count: number;
  revenue: number;
};
type AnalyticsData = {
  monthlyData: MonthlyData[];
  serviceData: ServiceData[];
  totalRevenue: number;
  totalBookings: number;
  mostSold: ServiceData | null;
};

const COLORS = [
  "#D4AF37",
  "#E8C547",
  "#C19B2E",
  "#A88425",
  "#8B6914",
  "#D4A017",
  "#FFD700",
  "#B8860B",
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-[#A0A0A0] text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-sm font-medium"
          style={{ color: entry.color }}
        >
          {entry.name}:{" "}
          {entry.name === "Revenue"
            ? `$${entry.value.toLocaleString()}`
            : entry.value}
        </p>
      ))}
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ServiceData }[];
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white text-sm font-medium">{data.service}</p>
      <p className="text-[#D4AF37] text-xs">{data.count} bookings</p>
      <p className="text-green-400 text-xs">${data.revenue.toLocaleString()}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const handleExport = () => {
    window.open("/api/admin/export", "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-red-400">Failed to load analytics data.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-white mb-2">
            Sales Analytics
          </h1>
          <p className="text-[#A0A0A0] text-sm">
            Revenue trends and service performance
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-sm hover:bg-[#D4AF37]/20 transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-500/10 p-3 rounded-lg">
            <DollarSign size={20} className="text-green-400" />
          </div>
          <div>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-wider">
              Total Revenue
            </p>
            <p className="text-white text-xl font-semibold mt-0.5">
              ${data.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
            <TrendingUp size={20} className="text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-wider">
              Total Bookings
            </p>
            <p className="text-white text-xl font-semibold mt-0.5">
              {data.totalBookings}
            </p>
          </div>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-yellow-500/10 p-3 rounded-lg">
            <Trophy size={20} className="text-yellow-400" />
          </div>
          <div>
            <p className="text-[#A0A0A0] text-xs uppercase tracking-wider">
              Most Popular
            </p>
            <p className="text-white text-xl font-semibold mt-0.5">
              {data.mostSold?.service || "N/A"}
            </p>
            <p className="text-[#666] text-xs">
              {data.mostSold ? `${data.mostSold.count} bookings` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Bar Chart */}
      <div className="bg-[#111111] border border-white/5 rounded-xl p-6 mb-6">
        <h2 className="text-white text-lg font-medium mb-1">Monthly Revenue</h2>
        <p className="text-[#666] text-xs mb-6">Last 12 months</p>
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666", fontSize: 11 }}
                axisLine={{ stroke: "#ffffff08" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#666", fontSize: 11 }}
                axisLine={{ stroke: "#ffffff08" }}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#D4AF37"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bookings Trend Line Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white text-lg font-medium mb-1">
            Booking Trends
          </h2>
          <p className="text-[#666] text-xs mb-6">Monthly booking count</p>
          <div className="h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#666", fontSize: 11 }}
                  axisLine={{ stroke: "#ffffff08" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#666", fontSize: 11 }}
                  axisLine={{ stroke: "#ffffff08" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  name="Bookings"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  dot={{ fill: "#D4AF37", r: 4 }}
                  activeDot={{ r: 6, fill: "#D4AF37" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Breakdown Pie Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white text-lg font-medium mb-1">
            Service Breakdown
          </h2>
          <p className="text-[#666] text-xs mb-6">Bookings by service</p>
          <div className="h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.serviceData.filter((s) => s.count > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="service"
                >
                  {data.serviceData
                    .filter((s) => s.count > 0)
                    .map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                        stroke="transparent"
                      />
                    ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {data.serviceData
              .filter((s) => s.count > 0)
              .map((s, i) => (
                <div key={s.key} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-[#A0A0A0] text-[10px]">
                    {s.service}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Revenue by Service Table */}
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-white text-lg font-medium">Revenue by Service</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                  Service
                </th>
                <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                  Bookings
                </th>
                <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                  Revenue
                </th>
                <th className="text-left text-xs text-[#A0A0A0] uppercase tracking-wider px-5 py-3">
                  Avg. Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.serviceData.map((s) => (
                <tr
                  key={s.key}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-white">{s.service}</td>
                  <td className="px-5 py-4 text-sm text-[#A0A0A0]">
                    {s.count}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#D4AF37] font-medium">
                    ${s.revenue.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#A0A0A0]">
                    ${s.count > 0 ? Math.round(s.revenue / s.count) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
