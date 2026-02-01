import Footer from "@/components/Footer";
import ContactSection from "@/components/home/ContactSection";
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
      {/* Contact Section */}
      <ContactSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
