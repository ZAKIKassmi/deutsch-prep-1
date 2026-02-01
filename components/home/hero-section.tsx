import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-16 sm:py-20 lg:py-28 xl:py-40">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 inline-flex items-center gap-2 border border-blue-200 bg-blue-50/80 px-4 py-2 text-blue-700 hover:bg-blue-100/80 backdrop-blur-sm transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-sm font-semibold">
              Join 10,000+ Successful Learners
            </span>
          </Badge>

          {/* Main heading */}
          <h1 className="max-w-5xl text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Start Your Journey in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Germany
            </span>{" "}
            with Confidence
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-2xl text-center text-base text-slate-600 sm:text-lg md:text-xl lg:mt-8">
            Learn German, manage your documents, and find the perfect Ausbildung
            — all in one comprehensive platform designed for your success.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:mt-10">
            <Button
              size="lg"
              className="group h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-base font-semibold shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full border-slate-300 bg-white/50 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:bg-white hover:border-slate-400 sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 sm:gap-8 lg:mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">Expert support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
