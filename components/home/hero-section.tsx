"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  FileCheck,
  Briefcase,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Language Mastery",
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    icon: <GraduationCap className="w-6 h-6" />,
    desc: "Intensive A1-C1 German training designed for professionals.",
  },
  {
    title: "Dossier Engineering",
    accent: "text-red-600",
    bg: "bg-red-600/10",
    icon: <FileCheck className="w-6 h-6" />,
    desc: "DIN 5008 compliant documents that stand out to German HR.",
  },
  {
    title: "Career Placement",
    accent: "text-white",
    bg: "bg-white/10",
    icon: <Briefcase className="w-6 h-6" />,
    desc: "Direct access to top-tier Ausbildung & job opportunities.",
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Cycle through services every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] flex items-start justify-center bg-[#050505] overflow-hidden pt-32"
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-10 grayscale"
          alt="Berlin"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]" />
      </div>

      <div className="sticky top-32 w-full z-20 px-6">
        <motion.div
          style={{ opacity, scale, y }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* SERVICE ICON ANIMATION */}
          <div className="flex justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotate: 20 }}
                className={`p-4 rounded-2xl border border-white/10 backdrop-blur-md ${services[index].bg} ${services[index].accent}`}
              >
                {services[index].icon}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-8">
            Germany <br />
            <div className="h-[1.1em] overflow-hidden flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className={`block ${services[index].accent}`}
                >
                  {services[index].title.split(" ")[0]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          {/* DYNAMIC DESCRIPTION */}
          <div className="min-h-[60px] mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/40 text-lg md:text-xl max-w-xl mx-auto font-medium"
              >
                {services[index].desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="h-16 px-12 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full transition-all hover:scale-105 shadow-xl shadow-red-900/20"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              className="h-16 px-8 text-white/60 hover:text-white font-black uppercase tracking-widest text-xs"
            >
              View Our Methods
            </Button>
          </div>

          {/* CITY TICKER */}
          <div className="mt-16 flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            <span>Berlin</span>
            <div className="w-1 h-1 bg-red-600 rounded-full" />
            <span>Munich</span>
            <div className="w-1 h-1 bg-amber-500 rounded-full" />
            <span>Hamburg</span>
          </div>
        </motion.div>
      </div>

      {/* PARALLAX BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.h2
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          className="text-[25vw] font-black text-white/[0.02] leading-none uppercase select-none"
        >
          DEUTSCH
        </motion.h2>
      </div>

      {/* DYNAMIC AMBIENT GLOW */}
      <motion.div
        animate={{
          backgroundColor:
            index === 0
              ? "rgba(245, 158, 11, 0.1)"
              : index === 1
                ? "rgba(220, 38, 38, 0.1)"
                : "rgba(255, 255, 255, 0.05)",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full z-0 transition-colors duration-1000"
      />
    </section>
  );
}
