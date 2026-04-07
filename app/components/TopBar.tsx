import facebookLogo from "@/app/assets/Facebook_logo.png";
import instagramLogo from "@/app/assets/Instagram-logo.png";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-[#111111] border-b border-white/5 py-2 px-4 sm:px-6 flex justify-between sm:justify-end items-center gap-4 text-sm text-[#A0A0A0]">
      <span className="hidden sm:inline-block font-light">
        New York • New Jersey • Connecticut • Pennsylvania
      </span>
      <div className="flex items-center gap-4 ml-auto">
        <Link
          href="https://www.instagram.com/hennaoncallny/related_profiles/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={instagramLogo} alt="Instagram Logo" className="size-5" />
        </Link>
        <Link
          href="https://www.facebook.com/hennaoncallnyc/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={facebookLogo} alt="Facebook Logo" className="size-5" />
        </Link>
        <Link
          href="https://g.page/r/CZGmufb8mJLiEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors"
        >
          <Star className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
