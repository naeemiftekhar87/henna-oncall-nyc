import img1 from "@/app/assets/gallary/1.jpg";
import img10 from "@/app/assets/gallary/10.jpeg";
import img11 from "@/app/assets/gallary/11.jpeg";
import img12 from "@/app/assets/gallary/12.jpeg";
import img2 from "@/app/assets/gallary/2.jpg";
import img3 from "@/app/assets/gallary/3.jpg";
import img4 from "@/app/assets/gallary/4.jpg";
import img5 from "@/app/assets/gallary/5.jpg";
import img6 from "@/app/assets/gallary/6.jpg";
import img7 from "@/app/assets/gallary/7.jpg";
import img8 from "@/app/assets/gallary/8.jpg";
import img9 from "@/app/assets/gallary/9.jpeg";
import { Maximize } from "lucide-react";
import Image, { StaticImageData } from "next/image";

const FALLBACK_IMAGES: StaticImageData[] = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

export default function GallerySection({
  galleryUrls,
}: {
  galleryUrls?: string[];
}) {
  const galleryImages = FALLBACK_IMAGES.map((fallback, i) => {
    const url = galleryUrls?.[i];
    return url
      ? { src: url, isExternal: true }
      : { src: fallback, isExternal: false };
  });

  return (
    <section
      id="gallery-reviews"
      className="py-32 px-6 bg-[#050505] border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-normal text-[#FFFFFF] mb-4">
              Bridal Gallery
            </h2>
            <p className="text-base text-[#A0A0A0] font-light leading-relaxed">
              A glimpse into the intricate details of our luxury bridal henna.
            </p>
          </div>
          <a
            href="https://www.instagram.com/hennaoncallny/related_profiles/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm font-normal px-6 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
          >
            📷 View More on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className="aspect-square relative group overflow-hidden bg-[#111111] rounded-2xl"
            >
              <Image
                src={image.src}
                alt="Henna Design"
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                unoptimized={image.isExternal}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize className="text-[#D4AF37] w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
