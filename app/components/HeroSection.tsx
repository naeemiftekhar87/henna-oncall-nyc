import heroBanner from "@/app/assets/Hero Banner.jpeg";
import Image from "next/image";

export default function HeroSection({
  heroImageUrl,
}: {
  heroImageUrl?: string;
}) {
  return (
    <section
      id="home"
      className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center text-center px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl || heroBanner}
          alt="Hero Banner"
          fill
          className="w-full h-full object-cover opacity-100"
          priority
          unoptimized={!!heroImageUrl}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]"></div>
      </div>
      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
        <span className="text-[#D4AF37] text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8 border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full font-light">
          Henna On Call NYC
        </span>
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-normal mb-6 sm:mb-8 leading-tight text-white drop-shadow-lg">
          Where Generations of Henna Artistry Meet Modern Bridal Luxury
        </h1>
        <p className="text-[#D1D1D1] text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-12 font-light leading-relaxed">
          Helping modern brides feel radiant through personalized luxury henna,
          thoughtfully crafted for your love story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#bridal"
            className="bg-[#D4AF37] text-black text-base font-normal px-8 py-4 rounded-xl hover:bg-[#E6C76B] transition-all duration-300 text-center shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            View Bridal Portfolio
          </a>
          <a
            href="#contact"
            className="bg-white/5 backdrop-blur-md border border-white/10 text-white text-base font-normal px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center"
          >
            Book Your Bridal Henna
          </a>
        </div>
      </div>
    </section>
  );
}
