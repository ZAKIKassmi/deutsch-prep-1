import Footer from "@/components/Footer";
import PricingSection from "@/components/services/documents/pricing-section";
import LearnGermanHero from "@/components/services/learn/hero-section";
import PremiumSection from "@/components/services/learn/Premium-section";


export default function LearnGermanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LearnGermanHero />
      <PremiumSection/>
      <Footer />
    </div>
  );
}