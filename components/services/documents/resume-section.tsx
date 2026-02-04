"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Stethoscope, 
  BookOpen, 
  HeartPulse,
  ArrowRight, 
  Plus,
  ClipboardCheck,
  ChevronRight
} from "lucide-react";

export default function PflegeIntakePortal() {
  const [step, setStep] = useState(1);
  
  // Track the highest step reached to allow navigation only to seen steps
  // Or remove the logic to allow free navigation from the start
  const [maxStepReached, setMaxStepReached] = useState(1);

  const handleStepChange = (newStep: number) => {
    if (newStep > step && newStep > maxStepReached) {
      setMaxStepReached(newStep);
    }
    setStep(newStep);
  };

  const stepsConfig = [
    { s: 1, label: "Personal Profile", icon: User },
    { s: 2, label: "Clinical Experience", icon: HeartPulse },
    { s: 3, label: "Motivation Context", icon: Stethoscope },
    { s: 4, label: "Language & Certs", icon: BookOpen },
  ];

  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">Pflege Ausbildung Dossier</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Nursing <br /> <span className="text-zinc-700 italic font-serif lowercase tracking-normal">Specialization.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* INTERACTIVE NAVIGATION SIDEBAR */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] mb-6 ml-2">Navigation Terminal</p>
            {stepsConfig.map((item) => (
              <button
                key={item.s}
                onClick={() => handleStepChange(item.s)}
                className={`w-full p-5 rounded-2xl flex items-center gap-4 transition-all border text-left group
                  ${step === item.s 
                    ? "bg-zinc-900 border-white/10 shadow-xl shadow-red-600/5" 
                    : "opacity-40 border-transparent hover:opacity-100 hover:bg-white/5"
                  }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors
                  ${step === item.s ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-500 group-hover:text-white"}`}>
                  <item.icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${step === item.s ? "text-red-600" : "text-zinc-600"}`}>
                    Phase 0{item.s}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest leading-none mt-1">
                    {item.label}
                  </span>
                </div>
                {step === item.s && (
                  <motion.div layoutId="pointer" className="ml-auto">
                    <ChevronRight size={14} className="text-red-600" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Form Engine */}
          <div className="lg:col-span-9 bg-zinc-900/40 border border-white/5 rounded-[3rem] p-8 md:p-14 backdrop-blur-xl relative">
            
            {/* Background Step Counter */}
            <div className="absolute top-10 right-14 text-9xl font-black text-white/[0.02] pointer-events-none select-none">
              0{step}
            </div>

            <AnimatePresence mode="wait">
              
              {/* STEP 1: IDENTITY & HEALTH */}
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <DarkInput label="Full Name" placeholder="E.g. Maria Santos" />
                    <DarkInput label="Date of Birth" placeholder="DD.MM.YYYY" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <DarkInput label="Current Location" placeholder="City, Country" />
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Vaccination Status</label>
                        <select className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-sm font-bold focus:border-red-600 outline-none transition-all">
                            <option>Fully Vaccinated (Measles/Hepa)</option>
                            <option>In Progress</option>
                            <option>Not Vaccinated</option>
                        </select>
                    </div>
                  </div>
                  <PrimaryBtn text="Proceed to Clinical History" onClick={() => handleStepChange(2)} />
                </motion.div>
              )}

              {/* STEP 2: CLINICAL EXPERIENCE */}
              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8 relative z-10">
                  <div className="p-8 bg-black/40 rounded-3xl border border-zinc-800 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <DarkInput label="Hospital/Clinic Name" placeholder="St. Mary's Hospital" />
                        <DarkInput label="Total Hours" placeholder="E.g. 400 Hours" />
                    </div>
                    <DarkInput label="Department" placeholder="E.g. Geriatrics, ICU" />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500">Clinical Tasks Performed</label>
                      <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm font-medium focus:border-red-600 outline-none h-32 resize-none" placeholder="Daily duties..." />
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"><Plus size={14}/> Add Another Internship</button>
                  <div className="flex gap-4">
                    <SecondaryBtn text="Back" onClick={() => handleStepChange(1)} />
                    <PrimaryBtn text="Next: Motivation Data" onClick={() => handleStepChange(3)} />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: MOTIVATION */}
              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8 relative z-10">
                   <div className="space-y-6">
                      <div className="p-6 bg-red-600/5 rounded-2xl border border-red-600/20">
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Anschreiben Content Extraction</p>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">Our writers need your personal "Why" to avoid generic AI-sounding letters.</p>
                      </div>
                      <DarkInput label="Motivation for Germany" placeholder="Why nursing in Germany specifically?" />
                      <DarkInput label="Character Strengths" placeholder="E.g. Resilience, high-speed learning..." />
                   </div>
                  <div className="flex gap-4">
                    <SecondaryBtn text="Back" onClick={() => handleStepChange(2)} />
                    <PrimaryBtn text="Next: Final Requirements" onClick={() => handleStepChange(4)} />
                  </div>
                </motion.div>
              )}

              {/* STEP 4: FINALIZATION */}
              {step === 4 && (
                <motion.div key="4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-10 text-center relative z-10">
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500">Language Level</label>
                        <select className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-sm font-bold focus:border-red-600 outline-none transition-all appearance-none">
                            <option>B1 Certified</option>
                            <option>B2 Certified</option>
                            <option>Studying for B1</option>
                            <option>Studying for B2</option>
                        </select>
                     </div>
                     <DarkInput label="Certificate / Exam Center" placeholder="E.g. Goethe, Telc, ÖSD" />
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-600 to-red-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                        <ClipboardCheck size={120} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Dossier Finalized.</h3>
                        <p className="text-xs text-red-100 opacity-70 mb-8 max-w-sm mx-auto font-medium">Clicking the button below locks your data and initiates the Dossier Engineering process for your Ausbildung.</p>
                        <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl hover:bg-black hover:text-white transition-all duration-500 shadow-xl">
                          Authorize & Submit Data
                        </button>
                    </div>
                  </div>
                  <button onClick={() => handleStepChange(1)} className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em] hover:text-red-600 transition-colors">Restart Acquisition</button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reuseable Internal Components
function DarkInput({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-sm font-bold placeholder:text-zinc-900 focus:border-red-600 focus:bg-black transition-all outline-none" 
      />
    </div>
  );
}

function PrimaryBtn({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-600/10"
    >
      {text} <ArrowRight size={14} />
    </button>
  );
}

function SecondaryBtn({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="px-10 h-16 bg-transparent border border-zinc-800 text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-zinc-800 hover:text-white transition-all"
    >
      {text}
    </button>
  );
}