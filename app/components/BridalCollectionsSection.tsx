"use client";

import bridalBloom from "@/app/assets/service/Bridal BLOOM.jpeg";
import bridalBlush from "@/app/assets/service/Bridal BLUSH.jpg";
import bridalGrace from "@/app/assets/service/Bridal GRACE.jpeg";
import bridalLush from "@/app/assets/service/Bridal LUSH.png";
import { CheckCircle, Maximize, Shirt } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

type ServiceImages = {
  blush?: string;
  bloom?: string;
  lush?: string;
  grace?: string;
};

type ServiceRecord = {
  key: string;
  name: string;
  price: number;
  duration: string;
  description?: string | null;
  tagline?: string | null;
  includes?: string | null;
  guide?: string | null;
  imageUrl?: string | null;
  bottomLine?: string | null;
};

export default function BridalCollectionsSection({
  serviceImages,
  serviceData,
}: {
  serviceImages?: ServiceImages;
  serviceData?: Record<string, ServiceRecord>;
}) {
  const getImage = (key: keyof ServiceImages, fallback: StaticImageData) => {
    const url = serviceImages?.[key];
    return url || fallback;
  };

  const svc = (key: string) => serviceData?.[key];
  const parseJson = (val: string | null | undefined): string[] => {
    if (!val) return [];
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  };

  const collections = [
    {
      key: "blush",
      name: svc("blush")?.name || "Blush",
      price: svc("blush") ? `$${svc("blush")!.price}` : "$195",
      tagline: svc("blush")?.tagline || "Minimal • Serene • Elegant",
      description:
        svc("blush")?.description ||
        "Blush symbolizes wisdom and serenity. This minimal wrist-length design captures peaceful energy. Perfect for brides who embrace subtle elegance and graceful simplicity.",
      recommendedFor:
        parseJson(svc("blush")?.guide).length > 0
          ? parseJson(svc("blush")!.guide)
          : [
              "Full-sleeve outfits",
              "Modest gowns",
              "Abayas & Traditional attire",
            ],
      includes:
        parseJson(svc("blush")?.includes).length > 0
          ? parseJson(svc("blush")!.includes)
          : [
              "Wrist-length design",
              "100% organic hand-mixed henna",
              "Personalized bridal prep guide",
              "Aftercare reminder card",
            ],
      duration: svc("blush")?.duration || "2–3 hours",
      image: getImage("blush", bridalBlush),
      isExternal: !!serviceImages?.blush,
      isPrimary: false,
      bottomLine:
        "These sleeves frame the wrist beautifully, allowing the henna to remain visible while maintaining a modest aesthetic. Ideal For Intimate weddings, nikah ceremonies, or brides seeking quiet luxury and graceful simplicity.",
    },
    {
      key: "bloom",
      name: svc("bloom")?.name || "Bloom",
      price: svc("bloom") ? `$${svc("bloom")!.price}` : "$295",
      tagline: svc("bloom")?.tagline || "Modest • Delicate • Refined",
      description:
        svc("bloom")?.description ||
        "Bloom embodies calm and refined beauty. This delicate design flows just above the wrist or up to ¼ arm length. Perfect balance between subtle charm and graceful elegance.",
      recommendedFor:
        parseJson(svc("bloom")?.guide).length > 0
          ? parseJson(svc("bloom")!.guide)
          : ["¾ sleeve outfits", "Mid-length sleeves"],
      includes:
        parseJson(svc("bloom")?.includes).length > 0
          ? parseJson(svc("bloom")!.includes)
          : [
              "¼-arm length design",
              "100% organic hand-mixed henna",
              "Personalized bridal prep guide",
              "Aftercare reminder card",
            ],
      duration: svc("bloom")?.duration || "3–4 hours",
      image: getImage("bloom", bridalBloom),
      isExternal: !!serviceImages?.bloom,
      isPrimary: false,
      bottomLine:
        "The design extends just enough to remain visible beyond the sleeve.",
    },
    {
      key: "lush",
      name: svc("lush")?.name || "Lush",
      price: svc("lush") ? `$${svc("lush")!.price}` : "$395",
      tagline: svc("lush")?.tagline || "Elegant • Intricate • Timeless",
      description:
        svc("lush")?.description ||
        "Lush radiates elegance symbolizing heritage and unity. This mid-arm design delivers rich intricate detail for brides seeking a timeless and sophisticated statement.",
      recommendedFor:
        parseJson(svc("lush")?.guide).length > 0
          ? parseJson(svc("lush")!.guide)
          : ["Sleeveless gowns", "Short sleeves", "Strapless designs"],
      includes:
        parseJson(svc("lush")?.includes).length > 0
          ? parseJson(svc("lush")!.includes)
          : [
              "Mid-arm length design",
              "100% organic hand-mixed henna",
              "Personalized bridal prep guide",
              "Aftercare reminder card",
              "Custom element allowed",
            ],
      duration: svc("lush")?.duration || "4–5 hours",
      image: getImage("lush", bridalLush),
      isExternal: !!serviceImages?.lush,
      isPrimary: true,
      bottomLine:
        "This length allows the intricate patterns to be beautifully displayed while creating a rich bridal look.",
      badge: "Popular",
    },
    {
      key: "grace",
      name: svc("grace")?.name || "Grace",
      price: svc("grace") ? `$${svc("grace")!.price}` : "$495",
      tagline: svc("grace")?.tagline || "Majestic • Detailed • Sophisticated",
      description:
        svc("grace")?.description ||
        "Grace embodies timeless sophistication. This full-arm design showcases the most intricate and detailed patterns. Perfect for brides who desire a majestic, statement-making bridal look.",
      recommendedFor:
        parseJson(svc("grace")?.guide).length > 0
          ? parseJson(svc("grace")!.guide)
          : ["Sleeveless gowns", "Statement pieces", "Custom designs"],
      includes:
        parseJson(svc("grace")?.includes).length > 0
          ? parseJson(svc("grace")!.includes)
          : [
              "Full-arm length design",
              "100% organic hand-mixed henna",
              "Personalized bridal prep guide",
              "Aftercare reminder card",
              "2 custom elements included",
            ],
      duration: svc("grace")?.duration || "5–7 hours",
      image: getImage("grace", bridalGrace),
      isExternal: !!serviceImages?.grace,
      isPrimary: false,
      bottomLine:
        "This extended design allows the full artwork to be beautifully visible.",
    },
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="bridal"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <span className="text-white text-sm uppercase tracking-[0.2em] mb-4 block font-light">
            Curated Offerings
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-normal text-[#D4AF37] mb-6">
            Bridal Collections
          </h2>
          <p className="text-base text-[#A0A0A0] font-light max-w-2xl mx-auto leading-relaxed">
            Every bride carries a unique story, and your henna should reflect
            the beauty of that moment. At Henna On Call NYC, We offer four
            signature bridal collections thoughtfully designed to suit different
            wedding styles, sleeve lengths, and levels of detail. Each design is
            created using fresh, hand-mixed organic henna, ensuring rich stains
            and an elevated bridal experience. From subtle elegance to intricate
            heirloom artistry, each collection is crafted with care to
            complement your wedding vision.
          </p>
        </div>

        <div className="space-y-10">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className={`bg-[#111111]/80 backdrop-blur-md border rounded-3xl overflow-hidden hover:border-[#D4AF37]/20 transition-colors flex flex-col lg:flex-row group shadow-2xl shadow-black/40 ${
                collection.isPrimary ? "border-[#D4AF37]/30" : "border-white/5"
              }`}
            >
              <div
                className="w-full lg:w-2/5 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-auto shrink-0 bg-[#111] relative overflow-hidden cursor-pointer group/img"
                onClick={() =>
                  setLightboxIndex(
                    collections.findIndex((c) => c.name === collection.name),
                  )
                }
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90"
                  unoptimized={collection.isExternal}
                />
                {collection.badge && (
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                    {collection.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Maximize className="text-[#D4AF37] w-8 h-8" />
                </div>
              </div>
              <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative z-10 text-sm font-light text-[#C9C9C9] leading-relaxed">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                  <div>
                    <h3 className="font-playfair text-4xl text-[#D4AF37] mb-2 tracking-tight font-normal uppercase">
                      {collection.name}
                    </h3>
                    <p className="text-xl text-[#FFFFFF] mb-3 font-normal tracking-tight">
                      Starting at {collection.price}
                    </p>
                    <p className="text-xs text-[#D4AF37] uppercase tracking-wider">
                      {collection.tagline}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex px-6 py-2.5 text-xs font-normal text-black bg-[#D4AF37] hover:bg-[#E6C76B] rounded-full transition-all md:w-auto w-fit tracking-tight"
                  >
                    Select {collection.name}
                  </a>
                </div>

                <p className="mb-8">{collection.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-white font-normal mb-4 tracking-tight uppercase text-xs">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-3 text-xs">
                      {collection.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="text-[#D4AF37] mt-0.5 shrink-0 w-4 h-4" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-normal mb-4 tracking-tight uppercase text-xs">
                      Guide: Perfect For Brides Wearing
                    </h4>
                    <ul className="space-y-3 text-xs mb-4">
                      {collection.recommendedFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Shirt className="text-[#D4AF37] mt-0.5 shrink-0 w-4 h-4" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <p className="text-white">{collection.bottomLine}</p>
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

      {lightboxIndex !== null && (
        <ImageLightbox
          src={collections[lightboxIndex].image}
          alt={collections[lightboxIndex].name}
          isExternal={collections[lightboxIndex].isExternal}
          onClose={() => setLightboxIndex(null)}
          onPrev={
            lightboxIndex > 0
              ? () => setLightboxIndex(lightboxIndex - 1)
              : undefined
          }
          onNext={
            lightboxIndex < collections.length - 1
              ? () => setLightboxIndex(lightboxIndex + 1)
              : undefined
          }
        />
      )}
    </section>
  );
}
