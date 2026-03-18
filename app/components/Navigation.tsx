"use client";

import logo from "@/app/assets/logo.jpg";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation({ logoUrl }: { logoUrl?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#roadmap", label: "Bridal Journey" },
    { href: "#bridal", label: "Bridal Henna" },
    { href: "#party-feet", label: "Party & Feet Henna" },
    { href: "/guide", label: "Guide" },
    { href: "#gallery-reviews", label: "Gallery & Reviews" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoUrl || logo}
            alt="Henna On Call NYC Logo"
            width={logoUrl ? 120 : undefined}
            height={logoUrl ? 60 : undefined}
            className="h-12 sm:h-14 lg:h-15 w-auto object-contain"
            priority
            unoptimized={!!logoUrl}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-base text-[#A0A0A0] font-light">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="bg-[#D4AF37] text-black font-medium px-6 py-2.5 rounded-full hover:bg-[#E6C76B] hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            Book Now
          </Link>
        </div>
        <button
          className="lg:hidden text-[#D4AF37] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-16.25 bg-[#0A0A0A]/98 backdrop-blur-xl z-40 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-6 pt-12 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-xl text-[#A0A0A0] hover:text-[#D4AF37] transition-colors font-light"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-[#D4AF37] text-black font-medium px-10 py-3.5 rounded-full hover:bg-[#E6C76B] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] text-lg"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
