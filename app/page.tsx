import Footer from "@/components/Footer";
import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import ServiceSection from "@/components/home/ServiceSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Services Section */}
      <ServiceSection />
      {/* CTA Section */}
      <CtaSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
