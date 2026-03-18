const MyStoryPage = () => {
  return (
    <>
      <section className="relative pb-24 z-20">
        <div className="max-w-5xl mx-auto px-6 -mt-16 md:-mt-24">
          <div className="backdrop-blur-md border border-white/5 p-8 md:p-14 rounded-3xl relative overflow-hidden shadow-2xl bg-[#0A0A0A]/90">
            <div className="absolute top-0 right-0 w-125 h-125 bg-[#D4AF37] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

            <h2 className="font-serif text-3xl md:text-4xl text-[#D4AF37] tracking-tight mb-10 font-normal text-center md:text-left">
              Welcome to Henna on Call NYC.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div className="space-y-6 text-sm md:text-base text-[#C9C9C9] leading-relaxed font-light">
                <p>
                  For me, bridal henna is more than a design. It is a meaningful
                  tradition, a moment of beauty, and a special part of a bride’s
                  wedding journey.
                </p>
                <p>
                  My name is Jannatul, and I founded Henna On Call NYC to offer
                  luxury bridal henna for modern brides who want their
                  experience to feel personal, elegant, and unforgettable.
                  Rooted in generations of henna tradition, my work blends
                  cultural heritage with modern bridal elegance, creating
                  designs that feel timeless, meaningful, and uniquely yours.
                </p>
              </div>

              <div className="space-y-6 text-sm md:text-base text-[#C9C9C9] leading-relaxed font-light md:pl-10 md:border-l border-white/10 relative">
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#D4AF37]/30 to-transparent"></div>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-6 font-normal">
                  A Bridal Henna Experience Designed Just for You
                </h3>
                <p>
                  At Henna On Call NYC, bridal henna is not just about creating
                  beautiful designs. It is about creating an experience that
                  feels calm, meaningful, and unforgettable during one of the
                  most special moments of your life.
                </p>
                <p>
                  From the moment you book your bridal henna, every detail is
                  thoughtfully prepared — from the fresh organic henna I
                  hand-mix, to the bridal preparation guidance I provide, to the
                  peaceful and pampering atmosphere I create during your
                  session.
                </p>
                <div className="pt-2">
                  <p className="text-[#D4AF37] text-lg font-normal italic">
                    My goal is to ensure that your henna experience becomes one
                    of the most beautiful memories of your wedding journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="relative py-24 z-10 overflow-hidden border-t border-white/5 bg-[#0A0A0A]/40"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-[#D4AF37] tracking-tight mb-4 font-normal">
              The Story Behind Henna On Call NYC
            </h2>
            <p className="text-white text-lg font-normal tracking-tight">
              A tradition of henna artistry passed down through generations.
            </p>
          </div>

          <div className="space-y-12 text-sm md:text-base text-[#C9C9C9] leading-relaxed font-light">
            <div className="bg-[#111111]/80 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/40">
              <h3 className="font-serif text-3xl text-[#D4AF37] font-normal tracking-tight mb-6">
                My Story
              </h3>
              <p className="mb-6">Henna has always been part of my story.</p>
              <p className="mb-6">
                The art of henna was lovingly passed down through generations in
                my family. My grandmother was known for her traditional henna
                artistry, and my mother later became a respected bridal henna
                artist admired for the elegance and intricate detail of her
                designs.
              </p>
              <p className="mb-6">
                Growing up, I watched my mother create beautiful henna for
                brides and celebrations. I was fascinated by the way each design
                told a story — carefully drawn patterns that symbolize joy,
                love, and new beginnings.
              </p>
              <p>
                Over time, my mother began teaching me the techniques, patterns,
                and traditions behind the art. What started as a childhood
                learning experience gradually grew into a passion that shaped my
                life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#111111]/80 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/40">
                <h3 className="font-serif text-2xl text-[#D4AF37] font-normal tracking-tight mb-6">
                  Continuing the Legacy
                </h3>
                <p className="mb-4">
                  Today I continue that family legacy through Henna On Call NYC,
                  blending generations of traditional artistry with a modern
                  bridal experience designed for today’s brides.
                </p>
                <p>
                  Each design I create carries the inspiration of those
                  generations before me while celebrating the unique story of
                  every bride I work with.
                </p>
              </div>

              <div className="bg-[#D4AF37]/5 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/40">
                <h3 className="font-serif text-2xl text-[#D4AF37] font-normal tracking-tight mb-6">
                  My Mission
                </h3>
                <p className="mb-4">My mission is simple.</p>
                <p className="mb-4 text-white font-normal text-lg leading-snug tracking-tight">
                  To help modern brides feel radiant through personalized luxury
                  henna artistry.
                </p>
                <p>
                  Bridal henna is not just about creating beautiful designs. It
                  is about creating a meaningful experience during one of the
                  most special moments of your life.
                </p>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/5">
              <p className="text-lg italic text-[#D4AF37] font-normal max-w-3xl mx-auto tracking-tight">
                Through Henna On Call NYC, I am honored to create henna designs
                that celebrate love, culture, and new beginnings while becoming
                a cherished part of your wedding memories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyStoryPage;
