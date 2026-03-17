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

export default function BookingTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b)),
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
                    {SERVICE_LABELS[booking.service] || booking.service}
                  </div>
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

                  {/* Status actions */}
                  <div className="mt-5 pt-5 border-t border-white/5 flex gap-2 flex-wrap">
                    <span className="text-[#A0A0A0] text-xs self-center mr-2">
                      Update status:
                    </span>
                    {["pending", "confirmed", "completed", "cancelled"].map(
                      (s) => (
                        <button
                          key={s}
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
