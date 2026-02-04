"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  User, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Radar
} from "lucide-react";

const livePlacements = [
  { 
    id: 1, 
    name: "Amara K.", 
    role: "Nursing Specialist", 
    company: "Charité Berlin", 
    status: "CONTRACT SIGNED",
    img: "https://images.unsplash.com/photo-1590615365480-6a50389f4b7a?q=80&w=200&h=200&fit=crop" 
  },
  { 
    id: 2, 
    name: "Rahul P.", 
    role: "Mechatronics Tech", 
    company: "Siemens Munich", 
    status: "INTERVIEW SET",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop" 
  },
  { 
    id: 3, 
    name: "YOU?", 
    role: "Pending Match...", 
    company: "Searching Database...", 
    status: "INITIALIZING",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&fit=crop" 
  },
];

export default function MatchingEngineSection() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % livePlacements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Number */}
      <div className="absolute right-0 bottom-0 text-[25rem] font-black text-white/[0.02] select-none leading-none -mb-20">
        04
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
            >
              We don't hope. <br />
              <span className="text-red-600">We Hunt.</span>
            </motion.h2>

            <p className="text-zinc-500 text-lg max-w-md font-medium leading-relaxed">
              Our placement engine doesn't wait for luck. We actively match your profile with verified German vacancies in real-time.
            </p>

            <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
              <div>
                <p className="text-4xl font-black text-white tracking-tighter">48H</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-bold">Avg. Response Time</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white tracking-tighter">9/10</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-bold">Placement Rate</p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE MATCHING ENGINE UI */}
          <div className="relative">
            {/* The Engine Container */}
            <div className="relative bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-4 backdrop-blur-xl shadow-2xl">
              
              {/* UI Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Matching Engine v4.0</span>
                </div>
                <div className="px-3 py-1 bg-red-600/10 rounded-full border border-red-600/20">
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest animate-pulse">Live Feed</span>
                </div>
              </div>

              {/* Card Slider Area */}
              <div className="h-[400px] flex items-center justify-center relative overflow-hidden">
                {/* The Scanning Laser Line */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-20 pointer-events-none"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    className="w-full max-w-sm bg-black border border-white/10 rounded-3xl p-6 shadow-2xl relative"
                  >
                    <div className="flex gap-4 items-center mb-8">
                      <div className="relative">
                        <img 
                          src={livePlacements[activeCard].img} 
                          alt="Candidate" 
                          className="w-20 h-20 rounded-2xl object-cover border border-white/20"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-red-600 p-1.5 rounded-lg border-2 border-black">
                          <Radar size={12} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tight">{livePlacements[activeCard].name}</h4>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Primary Candidate</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <DetailRow label="Target Role" value={livePlacements[activeCard].role} />
                      <DetailRow label="Location / Partner" value={livePlacements[activeCard].company} />
                    </div>

                    <div className={`py-3 px-4 rounded-xl flex items-center justify-between border ${
                        livePlacements[activeCard].id === 3 ? "bg-zinc-900 border-zinc-800" : "bg-green-500/5 border-green-500/20"
                    }`}>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                            livePlacements[activeCard].id === 3 ? "text-zinc-500" : "text-green-500"
                        }`}>
                          {livePlacements[activeCard].status}
                        </span>
                        {livePlacements[activeCard].id !== 3 && <CheckCircle2 size={16} className="text-green-500" />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* UI Footer Action */}
              <div className="p-4 pt-0">
                <button className="w-full h-16 bg-white hover:bg-red-600 hover:text-white text-black transition-all duration-300 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 group">
                  Add your profile to queue
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-2">
      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="text-xs font-bold text-zinc-300 uppercase tracking-tight">{value}</span>
    </div>
  );
}