import bridalBloom from "@/app/assets/service/Bridal BLOOM.jpeg";
import bridalBlush from "@/app/assets/service/Bridal BLUSH.jpg";
import bridalGrace from "@/app/assets/service/Bridal GRACE.jpeg";
import bridalLush from "@/app/assets/service/Bridal LUSH.png";
import Image, { StaticImageData } from "next/image";

type ServiceImages = {
  blush?: string;
  bloom?: string;
  lush?: string;
  grace?: string;
};

export default function BridalCollectionsSection({
  serviceImages,
}: {
  serviceImages?: ServiceImages;
}) {
  const getImage = (key: keyof ServiceImages, fallback: StaticImageData) => {
    const url = serviceImages?.[key];
    return url || fallback;
  };

  const collections = [
    {
      name: "Blush",
      price: "$195",
      tagline: "Minimal • Serene • Elegant",
      description:
        "Blush symbolizes wisdom and serenity. This minimal wrist-length design captures peaceful energy. Perfect for brides who embrace subtle elegance and graceful simplicity.",
      recommendedFor: [
        "Full-sleeve outfits",
        "Modest gowns",
        "Abayas & Traditional attire",
      ],
      includes: [
        "Wrist-length design",
        "100% organic hand-mixed henna",
        "Personalized bridal prep guide",
        "Aftercare reminder card",
      ],
      duration: "2–3 hours",
      image: getImage("blush", bridalBlush),
      isExternal: !!serviceImages?.blush,
      isPrimary: false,
    },
    {
      name: "Bloom",
      price: "$295",
      tagline: "Modest • Delicate • Refined",
      description:
        "Bloom embodies calm and refined beauty. This delicate design flows just above the wrist or up to ¼ arm length. Perfect balance between subtle charm and graceful elegance.",
      recommendedFor: ["¾ sleeve outfits", "Mid-length sleeves"],
      includes: [
        "¼-arm length design",
        "100% organic hand-mixed henna",
        "Personalized bridal prep guide",
        "Aftercare reminder card",
      ],
      duration: "3–4 hours",
      image: getImage("bloom", bridalBloom),
      isExternal: !!serviceImages?.bloom,
      isPrimary: false,
    },
    {
      name: "Lush",
      price: "$395",
      tagline: "Elegant • Intricate • Timeless",
      description:
        "Lush radiates elegance symbolizing heritage and unity. This mid-arm design delivers rich intricate detail for brides seeking a timeless and sophisticated statement.",
      recommendedFor: [
        "Sleeveless gowns",
        "Short sleeves",
        "Strapless designs",
      ],
      includes: [
        "Mid-arm length design",
        "100% organic hand-mixed henna",
        "Personalized bridal prep guide",
        "Aftercare reminder card",
        "Custom element allowed",
      ],
      duration: "4–5 hours",
      image: getImage("lush", bridalLush),
      isExternal: !!serviceImages?.lush,
      isPrimary: true,
      badge: "Popular",
    },
    {
      name: "Grace",
      price: "$495",
      tagline: "Majestic • Detailed • Sophisticated",
      description:
        "Grace embodies timeless sophistication. This full-arm design showcases the most intricate and detailed patterns. Perfect for brides who desire a majestic, statement-making bridal look.",
      recommendedFor: [
        "Sleeveless gowns",
        "Statement pieces",
        "Custom designs",
      ],
      includes: [
        "Full-arm length design",
        "100% organic hand-mixed henna",
        "Personalized bridal prep guide",
        "Aftercare reminder card",
        "2 custom elements included",
      ],
      duration: "5–7 hours",
      image: getImage("grace", bridalGrace),
      isExternal: !!serviceImages?.grace,
      isPrimary: false,
    },
  ];

  return (
    <section
      id="bridal"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <span className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4 block font-light">
            Curated Offerings
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-6">
            Bridal Collections
          </h2>
          <p className="text-base text-[#A0A0A0] font-light max-w-2xl mx-auto leading-relaxed">
            Every bride receives a carefully curated experience designed to
            ensure beautiful results while allowing you to relax and fully enjoy
            this meaningful moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className={`bg-[#111111] border rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col group shadow-lg ${
                collection.isPrimary
                  ? "border-[#D4AF37]/30 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.1)]"
                  : "border-white/5 shadow-black/40"
              }`}
            >
              <div className="aspect-4/3 w-full relative overflow-hidden bg-[#1A1A1A]">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className=" group-hover:scale-105 transition-transform duration-700"
                  unoptimized={collection.isExternal}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent opacity-80"></div>
                {collection.badge && (
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                    {collection.badge}
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col grow relative z-10 -mt-8">
                <div className="mb-6">
                  <h3 className="font-playfair text-3xl tracking-tight text-[#FFFFFF] mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-[#D4AF37] uppercase tracking-widest mb-3 font-medium">
                    Starting at {collection.price}
                  </p>
                  <p className="text-sm text-[#A0A0A0] italic font-light">
                    {collection.tagline}
                  </p>
                </div>
                <div className="grow space-y-6">
                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="space-y-3">
                    <span className="text-sm text-[#FFFFFF] font-normal block">
                      Recommended For:
                    </span>
                    <ul className="text-sm text-[#A0A0A0] font-light space-y-2 list-none pl-0">
                      {collection.recommendedFor.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <span className="text-sm text-[#FFFFFF] font-normal block">
                      What&apos;s Included:
                    </span>
                    <ul className="text-sm text-[#A0A0A0] font-light space-y-2 list-none pl-0">
                      {collection.includes.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm text-[#A0A0A0] font-light mb-4">
                    <span>Duration: {collection.duration}</span>
                  </div>
                  <a
                    href="#contact"
                    className={`w-full block text-center text-sm font-medium py-3 rounded-xl transition-all duration-300 ${
                      collection.isPrimary
                        ? "bg-[#D4AF37] border border-[#D4AF37] text-black hover:bg-[#E6C76B] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        : "bg-white/5 border border-white/10 text-[#FFFFFF] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]"
                    }`}
                  >
                    Book {collection.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Note */}
        <div className="mt-16 bg-[#111111] border border-white/5 p-8 text-center max-w-3xl mx-auto rounded-3xl shadow-lg shadow-black/30">
          <span className="text-sm text-[#D4AF37] uppercase tracking-widest block mb-4 font-normal">
            Custom Design Note
          </span>
          <p className="text-sm text-[#A0A0A0] font-light mb-3 leading-relaxed">
            Additional $40 fee per custom element such as: City skylines, Human
            figures, Animals (peacocks, elephants etc.), Personalized motifs,
            Pet portraits.
          </p>
          <p className="text-xs text-[#A0A0A0]/60 font-light">
            If a bridal design falls between two package levels, the price may
            be adjusted 50% between package rates.
          </p>
        </div>
      </div>
    </section>
  );
}
