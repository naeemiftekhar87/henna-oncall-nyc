import { Sparkles } from "lucide-react";
const AboutPage = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Welcome Card */}
        <div className="bg-[#111111] border border-white/5 p-10 sm:p-14 rounded-3xl hover:border-white/10 hover:bg-[#141414] transition-all duration-500 shadow-2xl shadow-black/50 group">
          <div className="lg:flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="text-[#D4AF37] w-7 h-7" />
            </div>
            <h2 className="font-serif text-3xl text-[#D4AF37] font-normal tracking-tight mb-6">
              Greetings from Henna on Call NYC.
            </h2>
          </div>

          <div className="space-y-6 text-base text-white font-light leading-relaxed">
            <p>
              For us, bridal henna is more than a design. It is a meaningful
              tradition, a moment of beauty, and a special part of a
              bride&apos;s wedding journey.
            </p>
            <p>
              Our founder&apos;s name is Jannatul, and she founded Henna On Call
              NYC to offer luxury bridal henna for modern brides who want their
              experience to feel personal, elegant, and unforgettable.
            </p>
            <p>
              We proudly travel throughout New York, New Jersey, Connecticut,
              and Pennsylvania, bringing a personalized luxury henna experience
              directly to my brides. Using hand-mixed, all-natural henna, every
              design is carefully created to ensure rich, beautiful stains and a
              relaxing, memorable experience.
            </p>
            <p>
              For many brides, their henna session becomes one of the most
              cherished moments before the wedding day. A peaceful pause filled
              with excitement, laughter, and celebration.
            </p>
            <p className="text-[#D4AF37] pt-4 font-normal">
              With Henna On Call NYC, your bridal henna becomes more than
              adornment. It becomes a timeless piece of your love story.
            </p>
          </div>
        </div>

        {/* My Story Card */}
        <div className="space-y-12 text-sm md:text-base text-white leading-relaxed font-light">
          <div className="bg-[#111111]/80 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/40">
            <div className="lg:flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="text-[#D4AF37] w-7 h-7" />
              </div>
              <h3 className="font-serif text-3xl text-[#D4AF37] font-normal tracking-tight mb-6">
                Founder&apos;s Message
              </h3>
            </div>

            <p className="mb-6">Henna has always been a part of who I am.</p>
            <p className="mb-6">
              In my family, this beautiful art has been passed down through
              generations. My grandmother was known for her traditional henna
              artistry, and my mother carried that legacy forward, becoming a
              respected bridal henna artist admired for her elegance and
              intricate designs.
            </p>
            <p className="mb-6">
              As a child, I would sit beside my mother and watch her work her
              magic, transforming hands into stories of joy, love, and new
              beginnings. Every design she created held meaning, and I found
              myself deeply inspired by the connection between art and emotion.
            </p>
            <p className="mb-6">
              Over time, my mother began teaching me the techniques, patterns,
              and traditions behind henna. What started as a simple childhood
              curiosity slowly grew into a passion that shaped my path.
              <br /> Today, that same passion lives on through my work, honoring
              tradition while creating designs that celebrate each individual
              story.
            </p>
            <p>
              With love and gratitude,
              <br /> <span className="text-[#D4AF37]">Jannatul</span>
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
                Bridal henna is not just about creating beautiful designs. It is
                about creating a meaningful experience during one of the most
                special moments of your life.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-lg italic text-[#D4AF37] font-normal max-w-3xl mx-auto tracking-tight">
              Through Henna On Call NYC, I am honored to create henna designs
              that celebrate love, culture, and new beginnings while becoming a
              cherished part of your wedding memories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
