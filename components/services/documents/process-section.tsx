"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Document Audit",
    description:
      "Our experts analyze your current papers to meet German 'Anerkennung' standards.",
    image:
      "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=1470&auto=format&fit=crop",
    features: [
      "Verification of Degrees",
      "Transcript Analysis",
      "Equivalency Check",
    ],
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "02",
    title: "The Lebenslauf Factory",
    description:
      "We craft a high-impact, DIN 5008 compliant resume and tailored Motivation Letter.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1470&auto=format&fit=crop",
    features: ["DIN 5008 Standard", "ATS Optimization", "Anschreiben Design"],
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: "03",
    title: "Certification Pack",
    description:
      "We organize your telc/Goethe certs and internship proofs into a clean digital dossier.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop",
    features: [
      "telc/Goethe Validation",
      "Internship Proofs",
      "Translation Support",
    ],
    color: "from-violet-600 to-purple-600",
  },
  {
    id: "04",
    title: "Final Placement",
    description:
      "Your dossier is ready. We connect you with top German companies for your Ausbildung.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1469&auto=format&fit=crop",
    features: ["100% Ready-to-Send", "Interview Ready", "Direct Referrals"],
    color: "from-emerald-500 to-teal-600",
  },
];

export default function SlidingProcess() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire tall container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal movement (-75% because we have 4 items)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0a0a0a]">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Background Text Decor */}
        <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[20vw] font-black text-white leading-none uppercase">
            Workflow
          </h2>
        </div>

        {/* The Sliding Track */}
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {/* Header Card (The Intro) */}
          <div className="flex h-[70vh] w-[300px] md:w-[500px] flex-col justify-center shrink-0">
            <span className="text-rose-500 font-black tracking-[0.3em] uppercase text-xs mb-4">
              Inside the factory
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
              Building <br /> Your{" "}
              <span className="text-rose-600 italic font-serif">Future.</span>
            </h2>
            <div className="flex items-center gap-4 text-white/40">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-sm uppercase tracking-widest">
                Scroll to explore
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Step Cards */}
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative h-[70vh] w-[350px] md:w-[600px] shrink-0 overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10"
            >
              {/* Image Background with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90`}
                />
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-auto">
                  <div className={`text-4xl font-black text-white opacity-20`}>
                    {step.id}
                  </div>
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                  >
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/10">
                    {step.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-wide"
                      >
                        <CheckCircle2 className="w-4 h-4 text-rose-500" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Final Call-to-Action Card */}
          <div className="flex h-[70vh] w-[350px] md:w-[500px] shrink-0 flex-col items-center justify-center text-center p-12 rounded-[2.5rem] bg-rose-600">
            <Zap className="w-16 h-16 text-white mb-8 animate-pulse" />
            <h3 className="text-4xl font-black text-white uppercase mb-4 leading-none">
              Your Dossier is Ready.
            </h3>
            <p className="text-white/80 mb-8">
              Stop worrying about paperwork. Start packing your bags for
              Germany.
            </p>
            <button className="h-16 px-10 bg-white text-rose-600 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
              Launch Application
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
