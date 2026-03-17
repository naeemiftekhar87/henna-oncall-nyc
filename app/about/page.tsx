import { History, MapPin, Sparkles } from "lucide-react";
const AboutPage = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Welcome Card */}
        <div className="bg-[#111111] border border-white/5 p-10 sm:p-14 rounded-3xl hover:border-white/10 hover:bg-[#141414] transition-all duration-500 shadow-2xl shadow-black/50 group">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="text-[#D4AF37] w-7 h-7" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl tracking-tight font-normal mb-8 text-[#FFFFFF]">
            Greetings to Henna on Call NYC.
          </h2>
          <div className="space-y-6 text-base text-[#A0A0A0] font-light leading-relaxed">
            <p>
              For me, bridal henna is more than a design. It is a meaningful
              tradition, a moment of beauty, and a special part of a
              bride&apos;s wedding journey.
            </p>
            <p>
              My name is Jannatul, and I founded Henna On Call NYC to offer
              luxury bridal henna for modern brides who want their experience to
              feel personal, elegant, and unforgettable.
            </p>
            <p>
              I proudly travel throughout New York, New Jersey, Connecticut, and
              Pennsylvania, bringing a personalized luxury henna experience
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
        <div className="bg-[#111111] border border-white/5 p-10 sm:p-14 rounded-3xl hover:border-white/10 hover:bg-[#141414] transition-all duration-500 shadow-2xl shadow-black/50 group">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <History className="text-[#D4AF37] w-7 h-7" />
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl tracking-tight font-normal mb-8 text-[#FFFFFF]">
            My Story
          </h2>
          <div className="space-y-6 text-base text-[#A0A0A0] font-light leading-relaxed">
            <p>
              Henna has always been part of my story. The art of henna was
              lovingly passed down through generations in my family. My
              grandmother was known for her traditional henna artistry, and my
              mother later became a well-known bridal henna artist admired for
              the elegance and intricate detail of her designs.
            </p>
            <p>
              Growing up, I watched my mother create beautiful henna for brides
              and celebrations. I was fascinated by the way each design told a
              story, carefully drawn patterns that symbolized joy, love, and new
              beginnings.
            </p>
            <p>
              Over time, my mother began teaching me the techniques, patterns,
              and traditions behind the art. What started as a childhood
              learning experience gradually grew into a passion that shaped my
              life.
            </p>
            <p>
              Today, I continue that family legacy through Henna On Call NYC,
              blending generations of traditional artistry with a modern bridal
              experience designed for today&apos;s brides.
            </p>
            <p>
              Each design I create carries the inspiration of those generations
              before me while celebrating the unique story of every bride I work
              with.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto mt-32 text-center">
        <h3 className="font-playfair text-4xl tracking-tight font-normal mb-6 text-[#FFFFFF]">
          Your Bridal Henna, Reimagined
        </h3>
        <p className="text-base text-[#A0A0A0] max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          At Henna On Call NYC, my mission is simple: To help modern brides feel
          radiant with personalized luxury henna artistry. Rooted in generations
          of henna tradition, my work blends cultural heritage with modern
          bridal elegance, creating designs that feel timeless, meaningful, and
          uniquely yours.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 bg-[#111111] rounded-3xl border border-white/5">
          {["New York", "New Jersey", "Connecticut", "Pennsylvania"].map(
            (location) => (
              <div key={location} className="flex flex-col items-center gap-3">
                <MapPin className="text-[#D4AF37] w-6 h-6" />
                <span className="text-sm text-[#A0A0A0] font-light">
                  {location}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
