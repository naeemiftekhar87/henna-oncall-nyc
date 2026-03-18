import { prisma } from "@/app/lib/db";
import { ExternalLink, Star } from "lucide-react";
import ReviewForm from "./ReviewForm";

export default async function ReviewsSection() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 mb-6">
          <Star className="text-[#D4AF37] w-8 h-8" fill="currentColor" />
        </div>
        <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-16">
          What Brides Say
        </h2>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#111111] border border-white/5 rounded-3xl p-10 hover:border-white/10 transition-colors shadow-lg shadow-black/20"
              >
                <div className="flex gap-1 text-[#D4AF37] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "" : "opacity-20"}`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#A0A0A0] font-light leading-relaxed mb-8 italic">
                  {review.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37] font-playfair border border-white/10 text-xl">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-normal text-[#FFFFFF]">
                      {review.name}
                    </p>
                    {review.source === "google" && (
                      <p className="text-xs text-[#A0A0A0]">Google Review</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-16">
            <p className="text-[#A0A0A0] text-sm">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a
            href="https://share.google/XQsmX86pCv0Vl93Hm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-[#D4AF37] text-[#D4AF37] text-sm uppercase tracking-widest pb-1 hover:text-[#E6C76B] hover:border-[#E6C76B] transition-colors font-medium"
          >
            Read More Google Reviews <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Review Submission Form */}
        <ReviewForm />
      </div>
    </section>
  );
}
