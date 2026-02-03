"use client";

import { motion } from "framer-motion";

const institutions = [
  { name: "Goethe-Institut", type: "Zertifikat" },
  { name: "Telc", type: "Language Tests" },
  { name: "TestDaF", type: "Hochschulreife" },
  { name: "ÖSD", type: "Diplom" },
  { name: "ECL", type: "Exam Center" },
  { name: "DSD", type: "Sprachdiplom" },
];

const scrollingInstitutions = [...institutions, ...institutions, ...institutions];

export default function ExamCentersSlider() {
  return (
    // Reduced py-24 to py-12 for a slimmer profile
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-[1.5px] bg-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[9px]">
              Certified Standards
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex items-center overflow-hidden">
        {/* Cinematic Fade Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* The Infinite Scroll */}
        <motion.div
          className="flex whitespace-nowrap gap-16 items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 20, // Slightly faster to match the smaller scale
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {scrollingInstitutions.map((inst, index) => (
            <div
              key={index}
              className="flex flex-col items-start group cursor-default"
            >
              <div className="flex items-baseline gap-2">
                {/* Reduced text-4xl to text-2xl for smaller height */}
                <span className="text-2xl font-black text-slate-200 group-hover:text-slate-950 transition-colors duration-500 uppercase tracking-tighter">
                  {inst.name}
                </span>
                <span className="text-[8px] font-bold text-red-600/40 group-hover:text-red-600 transition-colors uppercase tracking-[0.1em]">
                  {inst.type}
                </span>
              </div>
              <div className="w-0 group-hover:w-full h-[1px] bg-red-600 transition-all duration-700 mt-0.5" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Simplified footer detail */}
      <div className="mt-8 flex justify-center px-6">
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Aligned with <span className="text-slate-600">CEFR (GeR)</span> Levels A1—C1
        </p>
      </div>
    </section>
  );
}