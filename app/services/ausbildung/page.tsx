import Footer from "@/components/Footer";
import AusbildungHero from "@/components/services/ausbildung/hero-section";
import DocumentsHeroSection from "@/components/services/documents/hero-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
     <AusbildungHero />
      {/* Footer */}
      <Footer />
    </div>
  );
}
