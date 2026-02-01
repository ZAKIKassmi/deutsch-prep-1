import Footer from "@/components/Footer";
import ContactSection from "@/components/home/contact-section";
import CtaSection from "@/components/home/cta-section";
import HeroSection from "@/components/home/hero-section";
import ServiceSection from "@/components/home/service-section";
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
      {/* Testimonials */}
      <TestimonialSection />
      {/* Contact Section */}
      <ContactSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
