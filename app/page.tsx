import Footer from "@/components/Footer";
import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/hero-section";
import ServiceSection from "@/components/home/ServiceSection";
import TestimonialSection from "@/components/home/testimonial-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Services Section */}
      <ServiceSection />
      {/* CTA Section */}
      <CtaSection />
      <TestimonialSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
