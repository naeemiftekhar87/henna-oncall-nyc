"use client";
import Link from "next/link";

const Reviews = () => {
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
            data-lucide="star"
            aria-hidden="true"
            className="lucide lucide-star text-[#D4AF37] w-8 h-8"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
          </svg>
        </div>
        <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-16">
          What Brides Say
        </h2>

        <script src="https://elfsightcdn.com/platform.js" async></script>
        <div
          className="elfsight-app-b0150154-707e-4029-8a6c-1ddcb6628f7d"
          data-elfsight-app-lazy
        ></div>

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
            data-lucide="external-link"
            aria-hidden="true"
            className="lucide lucide-external-link w-4 h-4"
          >
            <path d="M15 3h6v6"></path>
            <path d="M10 14 21 3"></path>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Reviews;
