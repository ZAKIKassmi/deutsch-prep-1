"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Play,
  Crown,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Timer,
  BrainCircuit,
  MousePointer2,
  History,
  Zap,
} from "lucide-react";

// ─── AI Correction Preview Component ──────────────────────────────────────────

function AICorrectionPreview() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden max-w-sm">
      <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI Writing Lab</span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="text-[11px] leading-relaxed text-zinc-600 italic">
          "Ich möchte mich für die <span className="bg-red-100 border-b-2 border-red-400 text-red-700 px-0.5">Verspetung</span> entschuldigen..."
        </div>
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-blue-50 border border-blue-100 rounded-lg p-3 relative"
        >
          <div className="absolute -top-2 -left-2 bg-blue-500 text-white p-1 rounded-md">
            <Sparkles className="w-3 h-3" />
          </div>
          <p className="text-[10px] font-bold text-blue-700 mb-1">AI Correction:</p>
          <p className="text-[10px] text-blue-900">Spelling error: Use <span className="font-bold underline">Verspätung</span>. (B2 Level vocabulary detected)</p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Refined Video Mockup ─────────────────────────────────────────────────────

function VideoMockup() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative group">
      {/* Dynamic Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
      
      <div className="relative bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Exam Header */}
        <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">TELC B2 Simulator</span>
          </div>
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            <Timer className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 tabular-nums">89:59</span>
          </div>
        </div>

        {/* Mock Content */}
        <div className="aspect-[16/10] relative bg-[#fcfcfc] p-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-8 space-y-4">
               <div className="h-4 w-1/3 bg-zinc-200 rounded animate-pulse" />
               <div className="space-y-2">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className="h-2 bg-zinc-100 rounded-full" style={{ width: `${100 - (i * 5)}%` }} />
                 ))}
               </div>
               <div className="p-4 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center bg-zinc-50/50">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Drag Headline Here</span>
               </div>
            </div>
            <div className="col-span-4 bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 border border-zinc-100 rounded-lg bg-zinc-50 flex items-center px-3">
                      <div className="w-2 h-2 rounded-full bg-zinc-200 mr-2" />
                      <div className="h-1.5 w-full bg-zinc-200 rounded-full" />
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* Floating AI Feedback Tooltip */}
          <motion.div 
            animate={{ y: [0, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-10 right-10"
          >
            <AICorrectionPreview />
          </motion.div>

          <AnimatePresence>
            {!playing && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-zinc-900/40 transition-all cursor-pointer"
                onClick={() => setPlaying(true)}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-black ml-1 fill-black" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Pricing Plan Component ───────────────────────────────────────────────────

function PricingCard({ plan }: { plan: any }) {
  return (
    <div className={`relative p-8 rounded-[2rem] border transition-all duration-300 ${
      plan.highlight 
      ? "bg-zinc-900 border-zinc-800 text-white shadow-2xl scale-105 z-10" 
      : "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300"
    }`}>
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1 rounded-full flex items-center gap-2">
          <Zap className="w-3 h-3 text-white fill-white" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Most Popular</span>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className={`text-sm font-black uppercase tracking-widest mb-2 ${plan.highlight ? "text-amber-400" : "text-zinc-400"}`}>
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black">${plan.price}</span>
          <span className={`text-sm font-medium ${plan.highlight ? "text-zinc-500" : "text-zinc-400"}`}>{plan.period}</span>
        </div>
        <p className={`mt-4 text-sm leading-relaxed ${plan.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
          {plan.desc}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((f: string) => (
          <div key={f} className="flex items-start gap-3">
            <div className={`mt-1 p-0.5 rounded-full ${plan.highlight ? "bg-amber-500/20 text-amber-500" : "bg-emerald-100 text-emerald-600"}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium">{f}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
        plan.highlight 
        ? "bg-white text-black hover:bg-zinc-200" 
        : "bg-zinc-900 text-white hover:bg-black shadow-lg shadow-zinc-200"
      }`}>
        {plan.cta}
      </button>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PremiumSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const PLANS = [
    {
      name: "Free Pass",
      price: "0",
      period: "/forever",
      desc: "Perfect for a quick test of our exam platform.",
      highlight: false,
      cta: "Create Free Account",
      features: [
        "1 Demo Exam (Full Parts)",
        "Instant Scoring",
        "Limited Vocabulary Lists",
        "Basic Mobile Access",
      ],
    },
    {
      name: "TELC Mastery",
      price: "29",
      period: "/3 months",
      desc: "The complete arsenal for B1 or B2 TELC success.",
      highlight: true,
      cta: "Unlock Premium Now",
      features: [
        "52 Full Exam Sets (Updated 2024)",
        "Unlimited AI Schreiben Correction",
        "Audio Lab with 150+ Listening Tasks",
        "Speaking Coach Simulator",
        "Personalized Error Analytics",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white selection:bg-amber-100">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Header Part */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-6"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">The Modern Way to TELC</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-6xl font-black tracking-tight leading-[0.95] text-zinc-900 mb-8"
            >
              Real Exam Simulation. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">
                AI-Powered Feedback.
              </span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                <MousePointer2 className="w-5 h-5 text-blue-600 mb-3" />
                <h4 className="font-bold text-zinc-900 mb-1">Pixel-Perfect UI</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Our interface mimics the real TELC digital/paper structure exactly so you're never surprised.</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                <BrainCircuit className="w-5 h-5 text-amber-600 mb-3" />
                <h4 className="font-bold text-zinc-900 mb-1">AI Writing Coach</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Submit your "Schreiben" and get instant B1/B2 level feedback on grammar and vocabulary.</p>
              </div>
            </div>

            <button className="h-14 px-8 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3">
              Start Free Simulation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <VideoMockup />
          </motion.div>
        </div>

        {/* Pricing Part */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-zinc-900 mb-4">Ready to pass?</h3>
            <p className="text-zinc-500">Simple pricing for student success. No hidden fees.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}