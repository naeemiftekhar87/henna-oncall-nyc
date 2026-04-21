"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  street: string;
  apt: string | null;
  city: string;
  state: string;
  zip: string;
  service: string;
  message: string | null;
  price: number;
  partySize: number | null;
  numberOfHours: number | null;
  quantities: string | null;
  distanceFee: number | null;
  status: string;
  createdAt: string;
};

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

function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const parts = [];
  if (h > 0) parts.push(`${h} hr${h > 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} mins`);
  return parts.join(" ") || `${totalMinutes} mins`;
}

export default function BookingTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [distanceFeeInputs, setDistanceFeeInputs] = useState<
    Record<string, string>
  >({});

  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const distanceFee =
        status === "confirmed" ? distanceFeeInputs[id] : undefined;
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status,
          distanceFee:
            distanceFee !== undefined
              ? parseFloat(distanceFee) || 0
              : undefined,
        }),
      });

      if (res.ok) {
        const updatedDistanceFee =
          status === "confirmed" && distanceFee !== undefined
            ? parseFloat(distanceFee) || 0
            : undefined;
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id
              ? {
                  ...b,
                  status,
                  ...(updatedDistanceFee !== undefined
                    ? { distanceFee: updatedDistanceFee }
                    : {}),
                }
              : b,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider border transition-all ${
              filter === s
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
                : "text-[#A0A0A0] border-white/5 hover:border-white/10"
            }`}
          >
            {s} (
            {s === "all"
              ? bookings.length
              : bookings.filter((b) => b.status === s).length}
            )
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-[#111111] border border-white/5 rounded-xl p-12 text-center text-[#A0A0A0]">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p>No bookings found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden"
            >
              {/* Row summary */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === booking.id ? null : booking.id)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
              >
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <p className="text-white text-sm font-medium">
                      {booking.name}
                    </p>
                    <p className="text-[#666] text-xs">{booking.email}</p>
                  </div>
                  <div className="text-[#A0A0A0] text-sm">
                    {(() => {
                      const services = booking.service
                        .split(",")
                        .map((s) => s.trim());
                      const qty: Record<string, number> = booking.quantities
                        ? JSON.parse(booking.quantities)
                        : {};
                      return services.map((s, i) => (
                        <span key={s}>
                          {i > 0 && ", "}
                          {SERVICE_LABELS[s] || s}
                          {qty[s] ? (
                            <span className="text-[#D4AF37] ml-0.5">
                              ({qty[s]} qty)
                            </span>
                          ) : s !== "party" &&
                            booking.partySize &&
                            services.length === 1 ? (
                            <span className="text-[#D4AF37] ml-0.5">
                              ({booking.partySize} qty)
                            </span>
                          ) : null}
                        </span>
                      ));
                    })()}
                  </div>
                  {booking.numberOfHours && (
                    <div className="text-[#A0A0A0] text-sm">
                      {formatDuration(booking.numberOfHours)}
                    </div>
                  )}
                  <div className="text-[#A0A0A0] text-sm">{booking.date}</div>
                  <div className="text-white text-sm font-medium">
                    ${booking.price}
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-[#A0A0A0] transition-transform ${
                    expandedId === booking.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expanded details */}
              {expandedId === booking.id && (
                <div className="border-t border-white/5 p-5 bg-[#0A0A0A]/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <p className="text-white text-sm">{booking.phone}</p>
                    </div>
                    <div>
                      <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-white text-sm">
                        {booking.street}
                        {booking.apt ? `, ${booking.apt}` : ""}
                        <br />
                        {booking.city}, {booking.state} {booking.zip}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                        Booked On
                      </p>
                      <p className="text-white text-sm">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {booking.quantities ? (
                      <div>
                        <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                          Quantities
                        </p>
                        <p className="text-white text-sm">
                          {Object.entries(
                            JSON.parse(booking.quantities) as Record<
                              string,
                              number
                            >,
                          )
                            .map(
                              ([svc, qty]) =>
                                `${SERVICE_LABELS[svc] || svc}: ${qty}`,
                            )
                            .join(", ")}
                        </p>
                      </div>
                    ) : booking.partySize ? (
                      <div>
                        <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                          Quantity
                        </p>
                        <p className="text-white text-sm">
                          {booking.partySize}
                        </p>
                      </div>
                    ) : null}
                    {booking.numberOfHours && (
                      <div>
                        <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                          Duration
                        </p>
                        <p className="text-white text-sm">
                          {formatDuration(booking.numberOfHours)}
                        </p>
                      </div>
                    )}
                    {booking.message && (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <p className="text-[#666] text-xs uppercase tracking-wider mb-1">
                          Client Message
                        </p>
                        <p className="text-white text-sm bg-[#111111] rounded-lg p-3 border border-white/5">
                          {booking.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Distance fee */}
                  {booking.distanceFee !== null &&
                    booking.distanceFee !== undefined &&
                    booking.distanceFee > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[#666] text-xs uppercase tracking-wider">
                          Distance Fee:
                        </span>
                        <span className="text-[#D4AF37] text-sm font-medium">
                          ${booking.distanceFee}
                        </span>
                      </div>
                    )}

                  {/* Status actions */}
                  <div className="mt-5 pt-5 border-t border-white/5 flex gap-2 flex-wrap items-end">
                    <span className="text-[#A0A0A0] text-xs self-center mr-2">
                      Update status:
                    </span>
                    {["pending", "confirmed", "completed", "cancelled"].map(
                      (s) => (
                        <div key={s} className="flex flex-col gap-1">
                          {s === "confirmed" &&
                            booking.status !== "confirmed" && (
                              <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Distance fee ($)"
                                value={distanceFeeInputs[booking.id] ?? ""}
                                onChange={(e) =>
                                  setDistanceFeeInputs((prev) => ({
                                    ...prev,
                                    [booking.id]: e.target.value,
                                  }))
                                }
                                className="w-36 px-2 py-1 rounded-lg text-xs bg-[#1A1A1A] border border-[#D4AF37]/30 text-white placeholder-[#555] focus:outline-none focus:border-[#D4AF37]/60"
                              />
                            )}
                          <button
                            onClick={() => updateStatus(booking.id, s)}
                            disabled={
                              booking.status === s || updating === booking.id
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs capitalize border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                              booking.status === s
                                ? STATUS_STYLES[s]
                                : "text-[#A0A0A0] border-white/10 hover:border-white/20"
                            }`}
                          >
                            {updating === booking.id ? "..." : s}
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
