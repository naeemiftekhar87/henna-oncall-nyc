import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import LayoutShell from "./components/LayoutShell";
import "./globals.css";
import { getSiteConfig } from "./lib/site-config";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Henna On Call NYC | Luxury Bridal Henna",
  description:
    "Luxury bridal henna artistry. Personalized designs for modern brides. Serving NY, NJ, CT, PA.",
  keywords: [
    "bridal henna",
    "henna artist",
    "luxury henna",
    "NYC",
    "New Jersey",
    "Connecticut",
    "Pennsylvania",
  ],
  authors: [{ name: "Jannatul" }],
  openGraph: {
    title: "Henna On Call NYC | Luxury Bridal Henna",
    description:
      "Where Generations of Henna Artistry Meet Modern Bridal Luxury",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  const logoUrl = config.logo || "";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        suppressHydrationWarning
        className={`${playfairDisplay.variable} ${poppins.variable} bg-[#0A0A0A] text-[#FFFFFF] font-poppins antialiased selection:bg-[#D4AF37] selection:text-black`}
      >
        <main>
          <LayoutShell logoUrl={logoUrl}>{children}</LayoutShell>
        </main>
      </body>
    </html>
  );
}
