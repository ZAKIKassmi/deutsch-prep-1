import Footer from "@/components/Footer";
import DocumentsHeroSection from "@/components/services/documents/hero-section";
import PricingSection from "@/components/services/documents/pricing-section";
import ProcessSection from "@/components/services/documents/process-section";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <DocumentsHeroSection />
        {/* Process Section */}
      <ProcessSection />
        {/* Pricing Section */}
        <PricingSection />
        {/* Footer */ }
        <Footer />
    </div>
  );
}