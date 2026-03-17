const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    className="text-[#D4AF37] text-lg group-open:rotate-180 transition-transform"
    aria-hidden="true"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m19 9l-7 6l-7-6"
    />
  </svg>
);

const FAQPage = () => {
  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden border-t border-white/5 bg-[#0A0A0A]/40"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4 font-normal block">
            Curiosity &amp; Care
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#D4AF37] tracking-tight mb-6 font-normal">
            Frequently Asked Questions
          </h2>
          <p className="text-[#C9C9C9] text-sm md:text-base font-light">
            Below are answers to some of the most common questions brides ask
            before their henna session with Henna On Call NYC.
          </p>
        </div>

        <div className="space-y-4">
          {/* Category: About Henna */}
          <h3 className="font-serif text-2xl text-white tracking-tight mt-10 mb-4 font-normal border-b border-white/10 pb-2">
            About Henna
          </h3>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              What is henna?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Henna is a natural plant-based dye made from powdered henna leaves
              that creates a temporary reddish-brown stain on the skin.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              Where does henna come from?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Henna traditions originate across South Asia, the Middle East, and
              North Africa where it has been used for centuries during weddings
              and celebrations.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              What type of henna do you use?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              At Henna On Call NYC I use fresh hand-mixed organic henna made
              from high quality body art henna powder, sugar, lemon juice, and
              essential oils.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              Do you offer Jagua henna?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Yes. Premium Jagua is available for clients who prefer a
              blue-black tattoo-style stain.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              Do you use black henna?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              No. Black chemical henna is not used because it can cause serious
              skin reactions.
            </p>
          </details>

          {/* Category: Booking Questions */}
          <h3 className="font-serif text-2xl text-white tracking-tight mt-12 mb-4 font-normal border-b border-white/10 pb-2">
            Booking Questions
          </h3>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              How do I book my bridal henna?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              To begin your booking please share your name, contact information,
              event date, location, and design inspiration. Your booking is
              secured once a 20 percent deposit is received.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              How far in advance should I book?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Bridal bookings should be made several months in advance since
              wedding season dates fill quickly.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              Do you accept last minute bookings?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Last minute bookings may be accepted depending on availability.
            </p>
          </details>

          {/* Category: Service Questions */}
          <h3 className="font-serif text-2xl text-white tracking-tight mt-12 mb-4 font-normal border-b border-white/10 pb-2">
            Service Questions
          </h3>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              What areas do you travel to?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Henna On Call NYC provides mobile services across New York, New
              Jersey, Connecticut, and Pennsylvania.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              How long does bridal henna take?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Session length depends on the bridal collection and typically
              ranges from two to seven hours.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              Can guests receive henna?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Yes, guest henna can be added depending on time and availability.
            </p>
          </details>

          {/* Category: Preparation & Stain Questions */}
          <h3 className="font-serif text-2xl text-white tracking-tight mt-12 mb-4 font-normal border-b border-white/10 pb-2">
            Preparation &amp; Stain
          </h3>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              How should I prepare for my henna appointment?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Shower and exfoliate the night before, avoid lotions on the day of
              your appointment, and schedule manicures before the session.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              When should I schedule my bridal henna?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Bridal henna is usually scheduled one to two days before the
              wedding so the stain reaches its deepest color.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              How dark will the stain be?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Henna stains develop over forty-eight hours and vary depending on
              skin type and aftercare.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              How long does the stain last?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Henna stains usually last one to two weeks.
            </p>
          </details>

          {/* Category: Safety & Policies */}
          <h3 className="font-serif text-2xl text-white tracking-tight mt-12 mb-4 font-normal border-b border-white/10 pb-2">
            Safety &amp; Policies
          </h3>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              What if I have allergies?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Clients should confirm they are not allergic to henna. Patch tests
              may be performed if requested.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              What is your cancellation policy?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Cancellations must be made at least forty-eight hours in advance.
            </p>
          </details>

          <details className="group bg-[#111111]/60 border border-white/5 rounded-2xl transition-all cursor-pointer hover:border-[#D4AF37]/30">
            <summary className="p-6 font-normal text-sm md:text-base text-white flex justify-between items-center outline-none">
              Will photos be taken during my session?
              <ChevronIcon />
            </summary>
            <p className="px-6 pb-6 text-[#C9C9C9] text-sm font-light leading-relaxed">
              Photos may be taken for portfolio or social media unless requested
              otherwise.
            </p>
          </details>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-normal text-black glossy-btn rounded-full transition-all tracking-tight"
          >
            Book Your Bridal Henna Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
