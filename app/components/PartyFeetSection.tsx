import partyImg1 from "@/app/assets/gallary/3.jpg";
import partyImg2 from "@/app/assets/gallary/5.jpg";
import partyImg3 from "@/app/assets/gallary/6.jpg";
import partyImg4 from "@/app/assets/gallary/7.jpg";
import { Crown } from "lucide-react";
import Image from "next/image";

type ServiceImages = {
  "petal-feet"?: string;
  "blooming-feet"?: string;
  "regal-steps"?: string;
};

type PartyImages = string[];

const FALLBACK_IMAGES = {
  "petal-feet":
    "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=600&q=80",
  "blooming-feet":
    "https://images.unsplash.com/photo-1595856424584-69b76c8c93de?auto=format&fit=crop&w=600&q=80",
  "regal-steps":
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
};

export default function PartyFeetSection({
  serviceImages,
  partyImages,
}: {
  serviceImages?: ServiceImages;
  partyImages?: PartyImages;
}) {
  const getImage = (key: keyof typeof FALLBACK_IMAGES) =>
    serviceImages?.[key] || FALLBACK_IMAGES[key];

  const feetCollections = [
    {
      name: "Petal Feet",
      price: "$120",
      tagline: "Minimal • Delicate",
      coverage: "Ankle-length",
      duration: "Approx 1 hour",
      image: getImage("petal-feet"),
    },
    {
      name: "Blooming Feet",
      price: "$180",
      tagline: "Detailed • Romantic",
      coverage: '2" above ankle',
      duration: "Approx 1.5 hours",
      image: getImage("blooming-feet"),
    },
  ];

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
            <p className="text-base text-[#A0A0A0] font-light mb-10 leading-relaxed">
              Bridal henna for feet adds elegance and balance to the full bridal
              look. All designs use 100% organic hand-mixed henna for rich stain
              development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {feetCollections.map((collection) => (
                <div
                  key={collection.name}
                  className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-64 w-full relative bg-[#1A1A1A]">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="size-full"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent opacity-40"></div>
                  </div>
                  <div className="p-6 relative z-10 -mt-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-playfair text-xl text-[#FFFFFF] tracking-tight">
                        {collection.name}
                      </h4>
                      <span className="text-[#D4AF37] text-sm font-medium">
                        From {collection.price}
                      </span>
                    </div>
                    <p className="text-sm text-[#A0A0A0] italic mb-4 font-light">
                      {collection.tagline}
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
                      className="mt-5 w-full block bg-white/5 border border-white/10 text-center text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
                    >
                      Book {collection.name.split(" ")[0]}
                    </a>
                  </div>
                </div>
              ))}

              {/* Regal Steps */}
              <div className="bg-[#111111] border border-[#D4AF37]/30 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col group sm:col-span-2">
                <div className="h-72 w-full relative bg-[#1A1A1A]">
                  <Image
                    src={getImage("regal-steps")}
                    alt="Regal Steps Feet Henna"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent opacity-40"></div>
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                    Premium
                  </div>
                </div>
                <div className="p-6 relative z-10 -mt-6 flex flex-col grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-playfair text-xl text-[#FFFFFF] tracking-tight">
                      Regal Steps
                    </h4>
                    <span className="text-[#D4AF37] text-sm font-medium">
                      From $250
                    </span>
                  </div>
                  <p className="text-sm text-[#A0A0A0] italic mb-4 font-light">
                    Full • Majestic • Detailed
                  </p>
                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed mb-4">
                    Our most luxurious feet package. Full coverage from feet to
                    mid-calf with intricate patterns that complement your bridal
                    henna beautifully.
                  </p>
                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed grow">
                    <span className="text-[#FFFFFF]">Coverage:</span> Feet to
                    mid-calf
                    <br />
                    <span className="text-[#FFFFFF]">Duration:</span> 2–3 hours
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 w-full block bg-[#D4AF37] border border-[#D4AF37] text-center text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#E6C76B] transition-all duration-300"
                  >
                    Book Regal Steps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Party Henna */}
          <div className="flex flex-col h-full">
            <h2 className="font-playfair text-4xl tracking-tight font-normal text-[#FFFFFF] mb-6">
              Party Henna Experience
            </h2>
            <p className="text-base text-[#A0A0A0] font-light mb-10 leading-relaxed">
              Add a beautiful cultural touch to your celebration with mobile
              party henna. Perfect for Mehndi nights, Bridal showers, Birthday
              celebrations, Cultural gatherings, Festivals, and Corporate
              events.
            </p>

            <div className="border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl bg-linear-to-b from-[#111111] to-[#0A0A0A] relative overflow-hidden grow flex flex-col shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:border-[#D4AF37]/60 transition-colors duration-500">
              <div className="grid grid-cols-2 gap-0.5">
                {[partyImg1, partyImg2, partyImg3, partyImg4].map(
                  (fallback, i) => {
                    const url = partyImages?.[i];
                    return (
                      <div
                        key={i}
                        className="relative h-48 sm:h-56 overflow-hidden"
                      >
                        <Image
                          src={url || fallback}
                          alt={`Party henna ${i + 1}`}
                          fill
                          className="size-full"
                          unoptimized={!!url}
                        />
                        <div className="absolute inset-0 bg-black/30" />
                      </div>
                    );
                  },
                )}
              </div>
              <Crown className="absolute -bottom-10 -right-10 w-64 h-64 text-[#D4AF37] opacity-5" />
              <div className="relative z-10 p-6 sm:p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-playfair text-3xl tracking-tight font-normal text-[#FFFFFF]">
                    Group Events & Celebrations
                  </h3>
                  <span className="text-[#D4AF37] text-sm font-medium whitespace-nowrap ml-4">
                    From $110/hr
                  </span>
                </div>
                <div className="space-y-6 text-base text-[#A0A0A0] font-light leading-relaxed mb-8">
                  <p>
                    Bring the joy of henna artistry to your celebration. I
                    provide a customized party henna experience designed for
                    groups.
                  </p>
                  <div>
                    <h4 className="text-[#FFFFFF] font-normal mb-4">
                      What&apos;s Included:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-[#D4AF37] mt-1">✓</span>
                        <span>Mobile henna setup for 5–50 guests</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#D4AF37] mt-1">✓</span>
                        <span>Customizable designs for each guest</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#D4AF37] mt-1">✓</span>
                        <span>100% organic hand-mixed henna</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#D4AF37] mt-1">✓</span>
                        <span>Professional artistry and energy</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-[#A0A0A0]/70 font-light italic">
                  Pricing depends on group size, event location, and duration.
                  Contact for custom quote.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-block bg-[#D4AF37] text-black font-medium px-8 py-3 rounded-xl hover:bg-[#E6C76B] transition-all duration-300"
                >
                  Book Party Henna
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
