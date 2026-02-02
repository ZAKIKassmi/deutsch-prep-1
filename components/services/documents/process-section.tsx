"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { UserCircle, FileText, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { 
    id: "01", 
    title: "Information Gathering", 
    description: "Submit your academic history and career goals through our secure portal.",
    icon: UserCircle, 
    accent: "from-pink-400 to-pink-600" 
  },
  { 
    id: "02", 
    title: "Expert Preparation", 
    description: "We craft your DIN 5008 compliant Lebenslauf and targeted Motivation Letter.",
    icon: FileText, 
    accent: "from-rose-500 to-rose-700" 
  },
  { 
    id: "03", 
    title: "Final Dossier", 
    description: "Receive your complete, ATS-optimized application package ready for Germany.",
    icon: ClipboardCheck, 
    accent: "from-pink-600 to-rose-600" 
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create smooth spring physics for the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header with reveal animation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-24 space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-rose-50 border border-rose-100">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600">The Workflow</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">
            Process <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">We Follow</span>
          </h2>
        </motion.div>

        <div className="relative grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          
          {/* Animated Progress Line that fills as you scroll */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-[2px] bg-slate-100 -z-10">
            <motion.div 
              style={{ scaleX: smoothProgress }}
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 origin-left"
            />
          </div>

          {steps.map((step, idx) => {
            // Individual scroll effects for each card
            // Cards will slightly lift and fade in as they enter the viewport
            const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
            const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

            return (
              <motion.div 
                key={step.id}
                style={{ y: yOffset, opacity }}
                className="group relative text-center space-y-8"
              >
                {/* Step Visual */}
                <div className="relative mx-auto w-48 h-48">
                  {/* Rotating glow ring on scroll */}
                  <motion.div 
                    style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
                    className={`absolute inset-[-8px] rounded-full border-2 border-dashed border-rose-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                  
                  <div className="relative w-full h-full rounded-full bg-white shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center justify-center space-y-2 group-hover:border-rose-200 transition-all duration-700 overflow-hidden">
                    <span className="text-[10px] font-black text-rose-500 tracking-widest uppercase">Step {step.id}</span>
                    <step.icon className="w-10 h-10 text-slate-900 group-hover:text-rose-600 transition-colors duration-500" />
                    
                    {/* Background Number that grows on scroll */}
                    <motion.span 
                      style={{ scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]) }}
                      className="absolute -bottom-4 -right-2 text-9xl font-black text-slate-50 -z-10 pointer-events-none"
                    >
                      {step.id}
                    </motion.span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 px-4">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-rose-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic CTA at the bottom */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto text-center p-12 rounded-[3rem] bg-slate-900 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent" />
          <h4 className="relative z-10 text-3xl font-black text-white uppercase tracking-tighter mb-8">
            Ready to build your <span className="italic font-serif text-rose-400">German Future?</span>
          </h4>
          <Button className="relative z-10 h-16 px-12 bg-white text-slate-900 hover:bg-rose-500 hover:text-white font-black uppercase tracking-widest rounded-full transition-all duration-500">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}