"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function LayoutShell({
  logoUrl,
  children,
}: {
  logoUrl: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation logoUrl={logoUrl} />
      {children}
      <Footer logoUrl={logoUrl} />
    </>
  );
}
