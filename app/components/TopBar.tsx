import { Facebook, Instagram, Star } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#111111] border-b border-white/5 py-2 px-6 flex justify-end items-center gap-4 text-sm text-[#A0A0A0]">
      <span className="hidden sm:inline-block font-light">
        New York • New Jersey • Connecticut • Pennsylvania
      </span>
      <div className="flex items-center gap-4 ml-auto">
        <a
          href="https://www.instagram.com/hennaoncallny/related_profiles/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://www.facebook.com/hennaoncallnyc/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href="https://share.google/XQsmX86pCv0Vl93Hm"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors"
        >
          <Star className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
