"use client";

import { motion } from "framer-motion";
import { Check, Zap, FileText, FolderPlus, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Profile Duo",
    price: "99",
    description: "The essential German first impression. Perfect if you already have your other papers ready.",
    icon: FileText,
    features: [
      "Professional DIN 5008 Lebenslauf",
      "Tailored Motivation Letter",
      "ATS-Ready Keyword Optimization",
      "Modern German Design Layout",
      "2 Revision Rounds",
    ],
    cta: "Build My Profile",
    highlight: false,
  },
  {
    name: "Dossier Complet",
    price: "249",
    description: "The Total Factory Solution. We handle every single document needed for your German journey.",
    icon: FolderPlus,
    features: [
      "Everything in Profile Duo",
      "Certified Translation Support",
      "telc / Goethe Certificate Prep",
      "Internship & BAC Proofing",
      "Digital Folder Organization",
      "Visa-Ready Document Stack",
      "Unlimited Revisions",
    ],
    cta: "Start My Full Dossier",
    highlight: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6"
          >
            <Star className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Fixed Pricing</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase"
          >
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Package.</span>
          </motion.h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From a professional CV to a complete ready-to-move folder, we engineer your success in Germany.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-10 rounded-[2.5rem] transition-all duration-500 ${
                tier.highlight 
                ? "bg-white/10 border-2 border-rose-500 shadow-[0_0_50px_-12px_rgba(244,63,94,0.4)] z-20 scale-105" 
                : "bg-white/5 border border-white/10 z-10"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 right-10 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.highlight ? 'bg-rose-500 text-white' : 'bg-white/10 text-white/40'}`}>
                  <tier.icon className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{tier.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">€{tier.price}</span>
                <span className="text-white/30 text-sm font-bold uppercase tracking-widest">Final Price</span>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Included Services</div>
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 group">
                    <div className={`mt-1 transition-colors ${tier.highlight ? 'text-rose-500' : 'text-white/20'}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 ${
                  tier.highlight
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/20"
                  : "bg-white/10 hover:bg-white text-black"
                }`}
              >
                {tier.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center justify-center space-y-6"
        >
          <div className="flex items-center gap-8 opacity-40 grayscale contrast-150">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">DIN 5008 Certified</span>
             </div>
             <div className="h-4 w-px bg-white/20" />
             <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Fast-Track Delivery</span>
             </div>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium">
            Secured Payment via Stripe & PayPal
          </p>
        </motion.div>
      </div>
    </section>
  );
}