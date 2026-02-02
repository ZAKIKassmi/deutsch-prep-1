import DocumentsHeroSection from "@/components/services/documents/hero-section";
import ProcessSection from "@/components/services/documents/process-section";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <DocumentsHeroSection />
        {/* Process Section */}
      <ProcessSection />
    </div>
  );
}