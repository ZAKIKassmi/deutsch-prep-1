"use client";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle Map Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <Globe className="w-[800px] h-[800px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE: IDENTITY */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-[2px] bg-red-600" />
                <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
                  Contact Bureau
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 uppercase leading-[0.9]">
                Let’s talk about <br />
                <span className="text-slate-400">your career.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md font-medium">
                Our team in Berlin and abroad is ready to engineer your
                transition. Reach out for Ausbildung, Dossier, or Language
                inquiries.
              </p>
            </motion.div>

            {/* Quick Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-red-600/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">
                  Direct Email
                </h3>
                <a
                  href="mailto:hello@deutschprepa.de"
                  className="text-sm text-slate-500 font-bold hover:text-red-600 transition-colors"
                >
                  hello@deutschprepa.de
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-[#25D366]/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-all">
                  {/* WhatsApp SVG Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
                    <path d="M17.4 14.6l-1.3-1.3a1.4 1.4 0 0 0-2 0l-.3.3a.7.7 0 0 1-1 0l-1.7-1.7a.7.7 0 0 1 0-1l.3-.3a1.4 1.4 0 0 0 0-2l-1.3-1.3a1.4 1.4 0 0 0-2 0l-.5.5c-.8.8-1 2-.5 3a13.4 13.4 0 0 0 5.6 5.6c1 1 2.2.7 3-.1l.5-.5a1.4 1.4 0 0 0 0-2z" />
                  </svg>
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1 text-[#25D366]">
                  WhatsApp Live
                </h3>
                <a
                  href="https://wa.me/49301234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 font-bold hover:text-[#25D366] transition-colors"
                >
                  +49 30 1234567
                </a>
              </div>
            </div>

            {/* OFFICE DETAILS */}
            <div className="space-y-6 border-t border-slate-100 pt-10">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">
                    Berlin Headquarters
                  </h4>
                  <p className="text-slate-500 text-sm font-medium">
                    Friedrichstraße 123, 10117 Berlin, Germany
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: THE DOSSIER FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Architectural Shadow */}
            <div className="absolute -inset-4 bg-slate-100/50 rounded-[3rem] -z-10 blur-3xl" />

            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-2xl shadow-slate-200/50">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="J. Doe"
                      className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-600 focus:ring-0 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="doe@example.de"
                      className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-600 focus:ring-0 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Service Selection
                  </label>
                  <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-600 focus:ring-0 transition-all outline-none appearance-none font-bold text-slate-900 text-sm">
                    <option>German Language Mastery</option>
                    <option>Dossier Engineering</option>
                    <option>Ausbildung Placement</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    Message Context
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your background..."
                    className="w-full p-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-red-600 focus:ring-0 transition-all outline-none resize-none font-bold text-slate-900 placeholder:text-slate-300 text-sm"
                  />
                </div>

                <Button className="group relative w-full h-16 rounded-2xl bg-red-600 hover:bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Initiate Contact
                    <Send className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Button>

                <p className="text-center text-[9px] font-bold uppercase tracking-widest text-slate-300 mt-4">
                  Response Time: &lt; 24 Hours
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
