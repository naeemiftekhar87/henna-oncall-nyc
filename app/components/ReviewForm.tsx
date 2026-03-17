"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    text: "",
    service: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", text: "", service: "" });
      setRating(5);
    } catch {
      setStatus("error");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-white/5 border border-white/10 text-white text-sm font-medium px-8 py-3 rounded-xl hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
      >
        Write a Review
      </button>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto bg-[#111111] border border-[#D4AF37]/20 rounded-3xl p-8">
        <p className="text-[#D4AF37] text-sm">
          Thank you for your review! It will appear after approval.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-[#111111] border border-white/5 rounded-3xl p-8 text-left">
      <h3 className="font-playfair text-2xl text-white mb-6">
        Share Your Experience
      </h3>

      {status === "error" && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star rating */}
        <div>
          <label className="text-sm text-[#A0A0A0] block mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-0.5"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "text-[#D4AF37]"
                      : "text-white/20"
                  }`}
                  fill="currentColor"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>

        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors"
        >
          <option value="">Service (optional)</option>
          <option value="blush">Blush</option>
          <option value="bloom">Bloom</option>
          <option value="lush">Lush</option>
          <option value="grace">Grace</option>
          <option value="petal-feet">Petal Feet</option>
          <option value="blooming-feet">Blooming Feet</option>
          <option value="regal-steps">Regal Steps</option>
          <option value="party">Party Henna</option>
        </select>

        <textarea
          placeholder="Tell us about your experience..."
          required
          rows={4}
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#D4AF37] text-black text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#E6C76B] transition-all disabled:opacity-50"
          >
            {status === "loading" ? "Submitting..." : "Submit Review"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[#A0A0A0] text-sm px-4 py-3 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
