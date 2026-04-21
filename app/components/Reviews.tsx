import Link from "next/link";

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
            <button className="cursor-pointer bg-[#D4AF37] text-black font-medium px-4 py-2 rounded-full hover:bg-[#E6C76B] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] text-md">
              Add Review
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
