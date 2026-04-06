"use client";

import partyImg1 from "@/app/assets/gallary/3.jpg";
import partyImg2 from "@/app/assets/gallary/5.jpg";
import partyImg3 from "@/app/assets/gallary/6.jpg";
import partyImg4 from "@/app/assets/gallary/7.jpg";
import { Crown, Maximize } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

type ServiceImages = {
  "petal-feet"?: string;
  "blooming-feet"?: string;
  "regal-steps"?: string;
};

type PartyImages = string[];

type ServiceRecord = {
  key: string;
  name: string;
  price: number;
  duration: string;
  description?: string | null;
  tagline?: string | null;
  coverage?: string | null;
  includes?: string | null;
  guide?: string | null;
  imageUrl?: string | null;
};

const FALLBACK_IMAGES = {
  "petal-feet":
    "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=600&q=80",
  "blooming-feet":
    "https://images.unsplash.com/photo-1595856424584-69b76c8c93de?auto=format&fit=crop&w=600&q=80",
  "regal-steps":
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
};

function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const FALLBACK_PARTY_INCLUDES = [
  "Professional mobile henna artist",
  "100% organic hand-mixed henna paste",
  "Curated design menu for guests",
  "Clean and hygienic application",
  "Smooth guest flow during the event",
];

const FALLBACK_PARTY_PERFECT_FOR = [
  "Mehndi nights",
  "Bridal showers",
  "Birthday celebrations",
  "Cultural gatherings",
  "Private parties",
  "Festivals & corporate events",
];

const FALLBACK_GUEST_FLOW =
  "The number of guests served per hour depends on the design complexity selected.\nSimple designs: approximately 8–10 guests per hour\nMore detailed designs: approximately 5–6 guests per hour\nGuests may choose from a pre-selected menu of elegant henna designs, ranging from delicate minimal motifs to slightly more detailed hand patterns.";

export default function PartyFeetSection({
  serviceImages,
  partyImages,
  serviceData,
}: {
  serviceImages?: ServiceImages;
  partyImages?: PartyImages;
  serviceData?: Record<string, ServiceRecord>;
}) {
  const getImage = (key: keyof typeof FALLBACK_IMAGES) =>
    serviceImages?.[key] || FALLBACK_IMAGES[key];

  const svc = (key: string) => serviceData?.[key];

  const feetCollections = [
    {
      key: "petal-feet" as const,
      name: svc("petal-feet")?.name || "Petal Feet",
      price: svc("petal-feet") ? `$${svc("petal-feet")!.price}` : "$120",
      tagline: svc("petal-feet")?.tagline || "Minimal • Delicate • Elegant",
      coverage: svc("petal-feet")?.coverage || "Ankle-length design",
      description:
        svc("petal-feet")?.description ||
        "A soft and graceful design perfect for brides who prefer a refined and minimalist bridal look.",
      duration: svc("petal-feet")?.duration || "Approx. 1 hour+",
      image: getImage("petal-feet"),
      isPremium: false,
    },
    {
      key: "blooming-feet" as const,
      name: svc("blooming-feet")?.name || "Blooming Feet",
      price: svc("blooming-feet") ? `$${svc("blooming-feet")!.price}` : "$199",
      tagline:
        svc("blooming-feet")?.tagline || "Detailed • Romantic • Timeless",
      coverage:
        svc("blooming-feet")?.coverage ||
        "Approximately 2 inches above the ankle",
      description:
        svc("blooming-feet")?.description ||
        "A more decorative bridal feet design that extends slightly above the ankle with intricate floral and traditional elements.",
      duration: svc("blooming-feet")?.duration || "Approx. 2 hours+",
      image: getImage("blooming-feet"),
      isPremium: false,
    },
    {
      key: "regal-steps" as const,
      name: svc("regal-steps")?.name || "Regal Steps",
      price: svc("regal-steps") ? `$${svc("regal-steps")!.price}` : "$299",
      tagline: svc("regal-steps")?.tagline || "Grand • Luxurious • Statement",
      coverage: svc("regal-steps")?.coverage || "Calf-length design",
      description:
        svc("regal-steps")?.description ||
        "Designed for brides who want a rich and elaborate bridal look that beautifully complements full bridal hand henna.",
      duration: svc("regal-steps")?.duration || "Approx. 4 hours",
      image: getImage("regal-steps"),
      isPremium: true,
    },
  ];

  const partyService = svc("party");
  const partyIncludes = parseJsonArray(partyService?.includes);
  const includesList =
    partyIncludes.length > 0 ? partyIncludes : FALLBACK_PARTY_INCLUDES;
  const partyPerfectFor = parseJsonArray(partyService?.guide);
  const perfectForList =
    partyPerfectFor.length > 0 ? partyPerfectFor : FALLBACK_PARTY_PERFECT_FOR;
  const guestFlowText = partyService?.coverage || FALLBACK_GUEST_FLOW;
  const guestFlowLines = guestFlowText.split("\n").filter(Boolean);

  const [lightboxImage, setLightboxImage] = useState<{
    src: string | StaticImageData;
    alt: string;
    isExternal?: boolean;
  } | null>(null);

  return (
    <section
      id="party-feet"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Feet Collections */}
          <div>
            <h2 className="font-playfair text-4xl tracking-tight font-normal text-[#FFFFFF] mb-6">
              Bridal Feet Henna
            </h2>
            <p className="text-base text-[#A0A0A0] font-light mb-4 leading-relaxed">
              Bridal henna is a timeless tradition that symbolizes beauty,
              celebration, and new beginnings. Each bridal feet design is
              carefully crafted to harmonize with your bridal hand henna,
              creating a graceful and balanced look for your wedding
              celebration.
            </p>
            <p className="text-base text-[#A0A0A0] font-light mb-10 leading-relaxed">
              All designs are created using 100% organic hand-mixed henna to
              ensure a rich, long-lasting stain.
            </p>

            <div className="flex flex-col gap-6">
              {feetCollections.map((collection) => (
                <div
                  key={collection.name}
                  className={`bg-[#111111] border ${collection.isPremium ? "border-[#D4AF37]/30 hover:border-[#D4AF37]/60" : "border-white/5 hover:border-white/20"} rounded-2xl overflow-hidden transition-all duration-300 flex flex-col sm:flex-row group`}
                >
                  <div
                    className="h-64 sm:h-auto sm:w-72 shrink-0 relative bg-[#1A1A1A] cursor-pointer group/img"
                    onClick={() =>
                      setLightboxImage({
                        src: collection.image,
                        alt: collection.name,
                        isExternal: true,
                      })
                    }
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t sm:bg-linear-to-r from-[#111111] to-transparent opacity-40"></div>
                    {collection.isPremium && (
                      <div className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                        Premium
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize className="text-[#D4AF37] w-8 h-8" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-playfair text-xl text-[#FFFFFF] tracking-tight">
                        {collection.name}
                      </h4>
                      <span className="text-[#D4AF37] text-sm font-medium whitespace-nowrap ml-3">
                        From {collection.price}
                      </span>
                    </div>
                    <p className="text-sm text-[#A0A0A0] italic mb-3 font-light">
                      {collection.tagline}
                    </p>
                    <p className="text-sm text-[#A0A0A0] font-light leading-relaxed mb-4">
                      {collection.description}
                    </p>
                    <p className="text-sm text-[#A0A0A0] font-light leading-relaxed grow">
                      <span className="text-[#FFFFFF]">Coverage:</span>{" "}
                      {collection.coverage}
                      <br />
                      <span className="text-[#FFFFFF]">Duration:</span>{" "}
                      {collection.duration}
                    </p>
                    <a
                      href="#contact"
                      className={`mt-5 w-full block text-center text-sm font-medium py-2.5 rounded-lg transition-all duration-300 ${collection.isPremium ? "bg-[#D4AF37] border border-[#D4AF37] text-black hover:bg-[#E6C76B]" : "bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]"}`}
                    >
                      Book {collection.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* What's Included */}
            <div className="mt-10 bg-[#111111] border border-white/5 rounded-2xl p-6">
              <h4 className="font-playfair text-lg text-[#FFFFFF] mb-4">
                What&apos;s Included
              </h4>
              <p className="text-sm text-[#A0A0A0] font-light mb-4">
                Every bridal feet henna service includes:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm text-[#A0A0A0] font-light">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  <span>100% organic hand-mixed henna paste</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#A0A0A0] font-light">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  <span>Personalized bridal prep guide</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#A0A0A0] font-light">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  <span>Henna seal spray for enhanced stain development</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#A0A0A0] font-light">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  <span>
                    Detailed aftercare instructions for a darker, longer-lasting
                    stain
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Party Henna */}
          <div className="flex flex-col h-full">
            <h2 className="font-playfair text-4xl tracking-tight font-normal text-[#FFFFFF] mb-6">
              Party Henna Experience
            </h2>
            <p className="text-base text-[#A0A0A0] font-light mb-4 leading-relaxed">
              {partyService?.description ||
                "Add a beautiful cultural touch to your celebration with our mobile party henna service. Whether you\u2019re hosting a mehndi night, birthday, bridal shower, or private gathering, guests can enjoy elegant henna designs applied with 100% organic hand-mixed henna."}
            </p>
            <p className="text-base text-[#A0A0A0] font-light mb-10 leading-relaxed">
              We travel to events across New York, New Jersey, Connecticut, and
              Pennsylvania, bringing a relaxing and memorable henna experience
              directly to your celebration.
            </p>

            <div className="border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl bg-linear-to-b from-[#111111] to-[#0A0A0A] relative overflow-hidden grow flex flex-col shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:border-[#D4AF37]/60 transition-colors duration-500">
              <div className="grid grid-cols-2 gap-0.5">
                {[partyImg1, partyImg2, partyImg3, partyImg4].map(
                  (fallback, i) => {
                    const url = partyImages?.[i];
                    return (
                      <div
                        key={i}
                        className="relative h-48 sm:h-56 overflow-hidden cursor-pointer group/party"
                        onClick={() =>
                          setLightboxImage({
                            src: url || fallback,
                            alt: `Party henna ${i + 1}`,
                            isExternal: !!url,
                          })
                        }
                      >
                        <Image
                          src={url || fallback}
                          alt={`Party henna ${i + 1}`}
                          fill
                          className="size-full"
                          unoptimized={!!url}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover/party:bg-black/50 transition-colors duration-300" />
                        <div className="absolute inset-0 opacity-0 group-hover/party:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize className="text-[#D4AF37] w-7 h-7" />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
              <Crown className="absolute -bottom-10 -right-10 w-64 h-64 text-[#D4AF37] opacity-5" />
              <div className="relative z-10 p-6 sm:p-10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-3xl tracking-tight font-normal text-[#FFFFFF]">
                    {partyService?.name || "Party Henna Package"}
                  </h3>
                  <span className="text-[#D4AF37] text-sm font-medium whitespace-nowrap ml-4">
                    {partyService ? `$${partyService.price}/hr` : "$120/hr"}
                  </span>
                </div>
                <p className="text-sm text-[#A0A0A0] italic mb-6 font-light">
                  {partyService?.tagline || "Elegant • Interactive • Memorable"}
                </p>

                <div className="space-y-6 text-base text-[#A0A0A0] font-light leading-relaxed mb-8">
                  <p>
                    Our party henna service is offered on an hourly basis,
                    allowing guests to enjoy beautiful henna designs throughout
                    your event.
                  </p>

                  {/* Rate & Minimum */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-[#FFFFFF] text-sm font-medium mb-1">
                        Rate
                      </p>
                      <p className="text-[#D4AF37] text-lg font-medium">
                        {partyService
                          ? `$${partyService.price}/hour`
                          : "$120/hour"}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-[#FFFFFF] text-sm font-medium mb-1">
                        Minimum Booking
                      </p>
                      <p className="text-[#D4AF37] text-lg font-medium">
                        {partyService?.duration || "2 hours"}
                      </p>
                    </div>
                  </div>

                  {/* Guest Flow */}
                  <div>
                    <h4 className="text-[#FFFFFF] font-normal mb-3">
                      Guest Flow
                    </h4>
                    {guestFlowLines.map((line, i) => {
                      const isBullet =
                        line.startsWith("•") ||
                        line.startsWith("-") ||
                        line.startsWith("Simple") ||
                        line.startsWith("More detailed");
                      if (isBullet) {
                        const text = line.replace(/^[•\-]\s*/, "");
                        return (
                          <div key={i} className="flex items-start gap-3 mb-2">
                            <span className="text-[#D4AF37] mt-1">•</span>
                            <span>{text}</span>
                          </div>
                        );
                      }
                      return (
                        <p
                          key={i}
                          className={i === 0 ? "mb-3" : "mt-3 text-sm"}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Perfect For */}
                  <div>
                    <h4 className="text-[#FFFFFF] font-normal mb-3">
                      Perfect For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {perfectForList.map((item) => (
                        <span
                          key={item}
                          className="bg-white/5 border border-white/10 text-sm px-3 py-1.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="text-[#FFFFFF] font-normal mb-3">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2">
                      {includesList.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#D4AF37] mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular Bridal Add-On */}
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-5">
                    <h4 className="text-[#D4AF37] font-normal mb-2">
                      Popular Bridal Add-On
                    </h4>
                    <p className="text-sm">
                      Most of our brides choose to add Party Henna hours
                      alongside their bridal henna appointment. This allows
                      family members, cousins, and guests to enjoy beautiful
                      henna designs on the same day while the bride receives her
                      bridal henna.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-2 inline-block bg-[#D4AF37] text-black font-medium px-8 py-3 rounded-xl hover:bg-[#E6C76B] transition-all duration-300"
                >
                  Book Party Henna
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          isExternal={lightboxImage.isExternal}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
}
