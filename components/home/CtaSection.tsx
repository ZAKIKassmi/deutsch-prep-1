import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of people who have successfully integrated into German
          society with our help
        </p>
        <Button size="lg" variant="secondary" className="text-base">
          Get Started Today
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
