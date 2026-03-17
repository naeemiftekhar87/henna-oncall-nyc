"use client";

import { Check, MessageSquare, Star, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  service: string | null;
  approved: boolean;
  source: string;
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

export default function ReviewsManagementPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();
    setReviews(data.reviews);
    setLoading(false);
  };

  const toggleApproval = async (id: string, approved: boolean) => {
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved } : r)),
    );
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.approved).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-white mb-2">Reviews</h1>
        <p className="text-[#A0A0A0] text-sm">
          Manage customer reviews &middot; {reviews.length} total &middot;{" "}
          {pendingCount} pending approval
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
              filter === tab
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                : "text-[#A0A0A0] hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {tab}
            {tab === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#111111] border border-white/5 rounded-xl p-12 text-center">
          <MessageSquare
            size={40}
            className="mx-auto mb-3 text-[#A0A0A0] opacity-30"
          />
          <p className="text-[#A0A0A0]">No reviews found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="bg-[#111111] border border-white/5 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-medium text-sm">
                      {review.name}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "text-[#D4AF37] fill-[#D4AF37]"
                              : "text-[#333]"
                          }
                        />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        review.approved
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}
                    >
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                    {review.source === "google" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Google
                      </span>
                    )}
                  </div>
                  <p className="text-[#A0A0A0] text-sm mb-2">{review.text}</p>
                  <div className="flex items-center gap-3 text-[#666] text-xs">
                    <span>{review.email}</span>
                    {review.service && (
                      <span>
                        {SERVICE_LABELS[review.service] || review.service}
                      </span>
                    )}
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {review.approved ? (
                    <button
                      onClick={() => toggleApproval(review.id, false)}
                      className="p-2 rounded-lg text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                      title="Unapprove"
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleApproval(review.id, true)}
                      className="p-2 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
                      title="Approve"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
