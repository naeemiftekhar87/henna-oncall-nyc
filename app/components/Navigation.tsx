import logo from "@/app/assets/logo.jpg";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navigation({ logoUrl }: { logoUrl?: string }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoUrl || logo}
            alt="Henna On Call NYC Logo"
            width={logoUrl ? 120 : undefined}
            height={logoUrl ? 60 : undefined}
            className="h-14 sm:h-15 w-auto object-contain"
            priority
            unoptimized={!!logoUrl}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-base text-[#A0A0A0] font-light">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#D4AF37] transition-colors"
          >
            About
          </Link>
          <Link
            href="#roadmap"
            className="hover:text-[#D4AF37] transition-colors"
          >
            Bridal journey
          </Link>
          <Link
            href="#bridal"
            className="hover:text-[#D4AF37] transition-colors"
          >
            Bridal Henna
          </Link>
          <Link
            href="#party-feet"
            className="hover:text-[#D4AF37] transition-colors"
          >
            Party & Feet Henna
          </Link>
          <Link
            href="/guide"
            className="hover:text-[#D4AF37] transition-colors"
          >
            Guide
          </Link>
          <Link
            href="#gallery-reviews"
            className="hover:text-[#D4AF37] transition-colors"
          >
            Gallery & Reviews
          </Link>
          <Link
            href="#contact"
            className="bg-[#D4AF37] text-black font-medium px-6 py-2.5 rounded-full hover:bg-[#E6C76B] hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            Book Now
          </Link>
        </div>
        <button className="lg:hidden text-[#D4AF37]">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
