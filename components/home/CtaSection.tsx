import { ArrowRight, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    // Reduced vertical padding from py-32 to py-12/16
    <section className="relative py-12 md:py-16 bg-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px]" />
      </div>

      {/* Main Wide Container */}
      <div className="container mx-auto px-4 relative z-10 max-w-7xl 2xl:max-w-[1440px]">
        <div className="relative bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Content Side - Reduced internal padding from p-24 to p-12 */}
            <div className="flex-[1.4] p-8 md:p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight text-balance">
                Start your German story <span className="text-blue-600">today.</span>
              </h2>

              <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                We have helped over 2,500+ professionals find their path in Germany. You are one click away.
              </p>

              {/* Social Proof - Scaled down */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm">
                      <img 
                        src={`https://i.pravatar.cc/150?u=germany${i}`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-slate-900">2,500+ Trusted Applicants</span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white h-12 md:h-14 px-10 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10 active:scale-95"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Image Side - Min-height reduced from 400px to 250px/auto */}
            <div className="flex-1 relative min-h-[250px] lg:min-h-auto order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2670&auto=format&fit=crop" 
                alt="Berlin"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2 shadow-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">Berlin, DE</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}