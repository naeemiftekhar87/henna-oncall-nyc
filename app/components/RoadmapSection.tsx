export default function RoadmapSection() {
  const steps = [
    {
      number: "01",
      title: "Your Bridal Inquiry",
      description:
        "Your journey begins when you share the details of your celebration. Brides typically reach out with: Wedding date, Location, Preferred bridal henna collection.",
      additionalText:
        "Because every bridal design requires dedicated time and attention, a limited number of bridal bookings are accepted each month.",
    },
    {
      number: "02",
      title: "Personalized Bridal Consultation",
      description:
        "Once your date is confirmed, we begin discussing your bridal vision. During this stage we explore: Your wedding attire and sleeve length, selected collection, design inspiration, and cultural elements.",
    },
    {
      number: "03",
      title: "Bridal Booking & Prep",
      description:
        "After confirming your bridal collection, your wedding date is officially reserved. You will receive my Personalized Bridal Preparation Guide designed to help prepare your skin for the richest and longest lasting henna stain.",
    },
    {
      number: "04",
      title: "Your Luxury Session",
      description:
        "This is the moment many brides look forward to the most. On the day of your appointment I travel directly to you bringing a relaxed and elevated henna experience.",
      additionalText:
        "Depending on your chosen bridal collection, sessions typically last two to seven hours ensuring every design receives the time and care it deserves.",
    },
    {
      number: "05",
      title: "Aftercare & Reveal",
      description:
        "Once your design is complete, I provide detailed aftercare guidance. Your stain will gradually deepen over the next two days revealing the rich and beautiful color.",
      additionalText:
        "Within 48 hours your henna stain reaches its full richness. It becomes a meaningful symbol of your celebration, heritage, and the beginning of a beautiful new chapter.",
    },
  ];

  return (
    <section
      id="roadmap"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] border-y border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4 block font-light">
            The Experience
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-6">
            A Thoughtfully Curated Journey
          </h2>
          <p className="text-base text-[#A0A0A0] font-light leading-relaxed max-w-2xl mx-auto">
            From your first inquiry to the final stain reveal, each step is
            thoughtfully guided so you can relax and fully enjoy this special
            moment before your wedding day.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-16 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-linear-to-b before:from-transparent before:via-[#D4AF37]/30 before:to-transparent">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37]/50 bg-[#0A0A0A] text-[#D4AF37] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <span className="text-xs sm:text-sm font-light">
                  {step.number}
                </span>
              </div>
              <div className="w-[calc(100%-4rem)] sm:w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 bg-[#111111] border border-white/5 rounded-2xl sm:rounded-3xl hover:border-white/10 hover:bg-[#141414] transition-all duration-300">
                <h3 className="font-playfair text-xl sm:text-2xl tracking-tight mb-3 sm:mb-4 text-[#FFFFFF]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] mb-4 font-light leading-relaxed">
                  {step.description}
                </p>
                {step.additionalText && (
                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                    {step.additionalText}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
