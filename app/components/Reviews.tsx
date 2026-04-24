import Link from "next/link";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="lucide lucide-star w-4 h-4"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

const reviews = [
  {
    name: "Remya Reghu",
    subtitle: "New York Bride",
    initial: "R",
    text: "I had my bridal henna done by HennaOnCall NYC, and I couldn't be happier with the experience! She was incredibly calm, sweet, and professional from start to finish. I wanted a design that blended traditional and modern elements with some floral touches, and she delivered something even more beautiful than I imagined. What truly impressed me was her focus and dedication. She worked for hours with such precision and artistry, clearly passionate about her craft.The final result was exceptional. The stain came out dark, rich, and long-lasting. I received so many compliments on the design, and it photographed beautifully. I'd highly recommend HennaOnCall NYC to any bride or anyone looking for stunning, high-quality henna applied by someone who truly knows and loves what she does.",
    href: "https://maps.app.goo.gl/9KrqRnx5Q2XSYdkb8",
  },
  {
    name: "Umama Salsabil Rinam",
    subtitle: "New Jersey Bride",
    initial: "U",
    text: "Such an amazing experience and Obsessed with my bridal henna! The detail was exactly what I wanted, but the best part was how chill the session felt. We talked the whole time, and it really helped me destress before the big day. If you're a bride-to-be, you need her.",
    href: "https://maps.app.goo.gl/hNSXXFzq7QbFu9s77",
  },
  {
    name: "Amena Mamoon",
    subtitle: "Happiest Bride",
    initial: "A",
    text: "LOVE LOVE LOVED my henna!! Truly a blessing to have found Jannatul, she made me feel like a princess!! I was sooo happy with the stain, I cannot recommend Jannatul enough!",
    href: "https://maps.app.goo.gl/8gN8yze9naFoQ3o6A",
  },
  {
    name: "Patricia Bradford",
    subtitle: "New York Visitor",
    initial: "P",
    text: "I booked this appointment while on a visit to New York. She is incredibly talented and efficient. She worked to make sure I had the design I wanted. This is some of the most beautiful henna I've ever had and the staining from the jagua ink is phenomenal.",
    href: "https://maps.app.goo.gl/3nJJvcsak4h6obKo7",
  },
  {
    name: "Garima Khanal",
    subtitle: "Classic Client",
    initial: "G",
    text: "Samiya is an amazing henna artist! She is so precise and is very hard working! Her designs are unique and gorgeous!",
    href: "https://maps.app.goo.gl/xEM1fAXCcZYj72Ne9",
  },
];

const Reviews = async () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="lucide lucide-star text-[#D4AF37] w-8 h-8"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
        </div>

        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-4">
          What Brides Say
        </h2>

        <div className="mt-12 mb-12 text-left space-y-6">
          {/* Row 1: 2 cards, first one wider */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {reviews.slice(0, 2).map((review, idx) => (
              <Link
                href={review.href}
                target="_blank"
                key={review.name}
                className={`flex h-full ${idx === 0 ? "md:col-span-3" : "md:col-span-2"}`}
              >
                <div className="flex flex-col h-full w-full bg-[#111111] border border-white/5 rounded-3xl p-10 hover:border-white/10 transition-colors shadow-lg shadow-black/20">
                  <div className="flex gap-1 text-[#D4AF37] mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed italic grow">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-8">
                    <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37] font-['Playfair_Display'] border border-white/10 text-xl shrink-0">
                      {review.initial}
                    </div>
                    <div>
                      <p className="text-base text-[#FFFFFF] font-normal">
                        {review.name}
                      </p>
                      <p className="text-xs text-[#A0A0A0] font-light">
                        {review.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2: 3 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(2).map((review) => (
              <Link
                href={review.href}
                target="_blank"
                key={review.name}
                className="flex h-full"
              >
                <div className="flex flex-col h-full w-full bg-[#111111] border border-white/5 rounded-3xl p-10 hover:border-white/10 transition-colors shadow-lg shadow-black/20">
                  <div className="flex gap-1 text-[#D4AF37] mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed italic grow">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-8">
                    <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37] font-['Playfair_Display'] border border-white/10 text-xl shrink-0">
                      {review.initial}
                    </div>
                    <div>
                      <p className="text-base text-[#FFFFFF] font-normal">
                        {review.name}
                      </p>
                      <p className="text-xs text-[#A0A0A0] font-light">
                        {review.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-x-3">
          <Link
            href="https://g.page/r/CZGmufb8mJLiEBM/review"
            target="_blank"
            className="inline-flex items-center mt-5 gap-2 border-b border-[#D4AF37] text-[#D4AF37] text-sm uppercase tracking-widest pb-1 hover:text-[#E6C76B] hover:border-[#E6C76B] transition-colors font-medium"
          >
            Read More Google Reviews{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="lucide lucide-external-link w-4 h-4"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </Link>

          <Link href="https://g.page/r/CZGmufb8mJLiEBM/review" target="_blank">
            <button className="cursor-pointer bg-[#D4AF37] text-black font-medium px-4 py-2 rounded-full hover:bg-[#E6C76B] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] text-md mt-5 lg:mt-0">
              Add Review
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
