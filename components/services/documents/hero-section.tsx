"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileCheck, 
  Sparkles, 
  UserCircle, 
  Layers, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsHeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* 1. Background Image */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 lg:px-12 py-8 flex items-center justify-between border-b border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">
              Services de Dossier Complet
            </span>
          </div>
        </motion.div>

        {/* 3. Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-12"
            >
              {/* NEW TITLE: Emphasizing the "Complete Dossier" we do for them */}
              <motion.h1 variants={fadeInUp} className="text-[clamp(3.5rem,8vw,7rem)] font-black text-white leading-[0.9] tracking-[-0.05em]">
                <span className="block opacity-90">YOUR FULL</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-rose-600">
                  GERMAN DOSSIER
                </span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-8">
                <p className="text-xl text-white/60 max-w-xl leading-relaxed">
                  Ne vous souciez de rien. We handle your entire application—from the 
                  <span className="text-white font-bold italic"> Lebenslauf</span> to certified translations. 
                  A <span className="text-white font-bold">complete dossier</span>, built by experts, ready to land you the job.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Primary Button: Shimmer + Glow */}
                  <motion.div whileHover="hover" initial="initial" className="relative">
                    <Button
                      size="lg"
                      className="relative h-16 px-10 text-sm font-black uppercase tracking-widest bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white rounded-none border-none overflow-hidden transition-transform duration-300 active:scale-95"
                    >
                      <motion.div 
                        variants={{ hover: { x: ["-100%", "100%"] } }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      />
                      <span className="relative z-10 flex items-center">
                        Get My Complete Dossier
                        <motion.span variants={{ initial: { x: 0 }, hover: { x: 5 } }}>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </span>
                    </Button>
                    <motion.div 
                      variants={{ initial: { opacity: 0.2, scale: 0.9 }, hover: { opacity: 0.5, scale: 1.1 } }}
                      className="absolute inset-0 bg-rose-500/40 blur-2xl -z-10"
                    />
                  </motion.div>

                  {/* Secondary Button: Slide-up effect */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative h-16 px-10 text-sm font-black uppercase tracking-widest border-white/20 text-white bg-transparent rounded-none transition-all duration-500 overflow-hidden hover:border-white active:scale-95"
                  >
                    <span className="absolute inset-0 translate-y-[101%] bg-white transition-transform duration-300 group-hover:translate-y-0" />
                    <span className="relative z-10 flex items-center group-hover:text-black transition-colors duration-300">
                      View Our Quality
                    </span>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Document Stack */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md aspect-[4/5] group cursor-pointer">
                {/* Visual "Complete Folder" stacking effect */}
                <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-white/5 border border-white/10 rounded-sm rotate-6 transition-all duration-700 group-hover:rotate-12 group-hover:translate-x-4" />
                <div className="absolute top-4 right-4 w-[90%] h-[90%] bg-white/10 border border-white/20 rounded-sm rotate-3 transition-all duration-700 group-hover:rotate-6 group-hover:translate-x-2" />
                
                <div className="relative w-[95%] h-[95%] bg-white p-8 shadow-2xl rounded-sm transition-all duration-500 group-hover:-translate-y-6 group-hover:-translate-x-2 overflow-hidden">
                  <div className="flex justify-between items-start mb-12">
                     <div className="w-12 h-12 bg-rose-500 rounded-sm" />
                     <div className="text-[10px] font-black text-slate-900 uppercase">Dossier Complet</div>
                  </div>
                  <div className="space-y-6">
                    <div className="h-4 w-3/4 bg-slate-900" />
                    <div className="h-2 w-full bg-slate-100" />
                    <div className="h-2 w-full bg-slate-100" />
                    <div className="pt-8 space-y-3">
                       <div className="h-2 w-full bg-slate-200" />
                       <div className="h-2 w-2/3 bg-slate-200" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-rose-600 p-4 shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <FileCheck className="w-8 h-8 text-white" />
                   <div className="mt-2 text-[8px] font-black text-white uppercase tracking-tighter tracking-[0.2em]">100% READY</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 5. The 3-Step Process Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-3xl border-t border-white/10"
        >
          <div className="px-6 lg:px-12 py-10 grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: UserCircle, title: "Your Profile", desc: "Share your history" },
              { icon: Layers, title: "We Prepare", desc: "We craft every document" },
              { icon: ShieldCheck, title: "Dossier Complet", desc: "Your final ready-to-use folder" }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-5 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:bg-rose-600 transition-all duration-500">
                  <step.icon className="w-5 h-5 text-rose-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-rose-500 uppercase mb-1">Step 0{i+1}</div>
                  <div className="text-sm font-bold text-white uppercase">{step.title}</div>
                  <div className="text-xs text-white/40">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}