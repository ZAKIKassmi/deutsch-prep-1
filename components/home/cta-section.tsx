"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* BACKGROUND GRID - Darker and subtler */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="relative bg-white/[0.02] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* CONTENT SIDE */}
            <div className="flex-[1.4] p-10 md:p-16 lg:p-20 flex flex-col justify-center order-2 lg:order-1 relative">
              {/* TOP ACCENT */}
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  Next Intake: Spring 2026
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9] uppercase">
                Your German story <br />
                <span className="text-red-600 italic font-serif lowercase tracking-normal">
                  starts
                </span>{" "}
                here.
              </h2>

              <p className="text-lg text-white/40 mb-10 leading-relaxed max-w-xl font-medium">
                Join 2,500+ professionals who engineered their transition with
                DeutschPrepa. From language mastery to career placement.
              </p>

              {/* SOCIAL PROOF */}
              <div className="flex flex-wrap items-center gap-8 mb-12">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, zIndex: 10 }}
                      className="w-12 h-12 rounded-full border-2 border-[#050505] overflow-hidden bg-white/10"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?u=germany${i}`}
                        alt="User"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-white mt-1">
                    4.9/5 Rating
                  </span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group relative w-full sm:w-auto h-20 px-12 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5)] overflow-hidden"
                >
                  {/* Shimmer */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />

                  <span className="relative z-10 flex items-center gap-3">
                    Get Started Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </Button>
              </div>
            </div>

            {/* IMAGE/MAP SIDE */}
            <div className="flex-1 relative min-h-[350px] lg:min-h-auto order-1 lg:order-2 overflow-hidden border-b lg:border-b-0 lg:border-l border-white/10">
              <img
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2670&auto=format&fit=crop"
                alt="Brandenburg Gate"
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:scale-110 hover:grayscale-0 transition-all duration-1000"
              />

              {/* VIGNETTE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent lg:from-[#050505] lg:via-transparent" />

              {/* FLOATING LOCATION TAG */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    Headquarters
                  </span>
                  <span className="text-xs text-white/60">Berlin, Germany</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM DECOR */}
      <div className="mt-20 flex justify-center items-center gap-12 opacity-20">
        <ShieldCheck className="w-8 h-8 text-white" />
        <Globe className="w-8 h-8 text-white" />
        <Star className="w-8 h-8 text-white" />
      </div>
    </section>
  );
}
