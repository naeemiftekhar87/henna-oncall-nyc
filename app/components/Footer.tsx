import logo from "@/app/assets/logo.jpg";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer({ logoUrl }: { logoUrl?: string }) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-12 sm:pt-16 md:pt-20 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div>
          <a href="#" className="block mb-6">
            <Image
              src={logoUrl || logo}
              alt="Henna On Call NYC Logo"
              width={logoUrl ? 120 : undefined}
              height={logoUrl ? 64 : undefined}
              className="h-16 w-auto object-contain"
              unoptimized={!!logoUrl}
            />
          </a>
          <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
            Luxury bridal henna artistry for modern brides.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm text-[#FFFFFF] font-normal mb-6 uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-[#A0A0A0] font-light">
            <li>
              <a
                href="#home"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#bridal"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Bridal Collections
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="text-sm text-[#FFFFFF] font-normal mb-6 uppercase tracking-wide">
            Service Areas
          </h4>
          <ul className="space-y-3 text-sm text-[#A0A0A0] font-light">
            <li>New York</li>
            <li>New Jersey</li>
            <li>Connecticut</li>
            <li>Pennsylvania</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-sm text-[#FFFFFF] font-normal mb-6 uppercase tracking-wide">
            Connect
          </h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/hennaoncallny/related_profiles/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#D4AF37] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/hennaoncallnyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#D4AF37] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#A0A0A0] font-light">
          © 2024 Henna On Call NYC. All rights reserved.
        </p>
        <p className="text-xs text-[#A0A0A0] font-light">
          Luxury Bridal Henna Artistry
        </p>
      </div>
    </footer>
  );
}
