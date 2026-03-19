import BridalCollectionsSection from "./components/BridalCollectionsSection";
import ContactSection from "./components/ContactSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import PartyFeetSection from "./components/PartyFeetSection";
import ReviewsSection from "./components/ReviewsSectionServer";
import RoadmapSection from "./components/RoadmapSection";
import TopBar from "./components/TopBar";
import { getSiteConfig } from "./lib/site-config";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <>
      <TopBar />
      <HeroSection heroImageUrl={config.hero_image} />
      <RoadmapSection />
      <BridalCollectionsSection
        serviceImages={{
          blush: config.service_blush_image,
          bloom: config.service_bloom_image,
          lush: config.service_lush_image,
          grace: config.service_grace_image,
        }}
      />
      <PartyFeetSection
        serviceImages={{
          "petal-feet": config.service_petal_feet_image,
          "blooming-feet": config.service_blooming_feet_image,
          "regal-steps": config.service_regal_steps_image,
        }}
        partyImages={Array.from(
          { length: 4 },
          (_, i) => config[`party_${i + 1}`] || "",
        )}
      />
      <GallerySection
        galleryUrls={Array.from(
          { length: 12 },
          (_, i) => config[`gallery_${i + 1}`] || "",
        )}
      />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
