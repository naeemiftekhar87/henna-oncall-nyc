import BridalCollectionsSection from "./components/BridalCollectionsSection";
import ContactSection from "./components/ContactSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import PartyFeetSection from "./components/PartyFeetSection";
import ReviewsSection from "./components/ReviewsSection";
import RoadmapSection from "./components/RoadmapSection";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <HeroSection />
      <RoadmapSection />
      <BridalCollectionsSection />
      <PartyFeetSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
