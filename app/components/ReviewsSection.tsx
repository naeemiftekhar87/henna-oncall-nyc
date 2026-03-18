import { ExternalLink, Star } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      initials: "S",
      text: "Jannatul made my bridal henna experience so peaceful and luxurious. The stain developed beautifully and was incredibly dark by my wedding day. I received so many compliments on the delicate details.",
      author: "Samira K.",
    },
    {
      initials: "M",
      text: "The entire process from booking to the aftercare was seamless. She incorporated my custom skyline request perfectly into the Grace package. Highly recommend for any modern bride!",
      author: "Meera P.",
    },
    {
      initials: "N",
      text: "Her energy is amazing. Taking a few hours just to relax and get my henna done was exactly what I needed. The organic paste smelled wonderful and the color was so rich.",
      author: "Noor H.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 mb-6">
          <Star className="text-[#D4AF37] w-8 h-8" fill="currentColor" />
        </div>
        <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-16">
          What Brides Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          {reviews.map((review) => (
            <div
              key={review.initials}
              className="bg-[#111111] border border-white/5 rounded-3xl p-10 hover:border-white/10 transition-colors shadow-lg shadow-black/20"
            >
              <div className="flex gap-1 text-[#D4AF37] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-[#A0A0A0] font-light leading-relaxed mb-8 italic">
                {review.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37] font-playfair border border-white/10 text-xl">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-normal text-[#FFFFFF]">
                    {review.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://share.google/XQsmX86pCv0Vl93Hm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b border-[#D4AF37] text-[#D4AF37] text-sm uppercase tracking-widest pb-1 hover:text-[#E6C76B] hover:border-[#E6C76B] transition-colors font-medium"
        >
          Read More Google Reviews <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
