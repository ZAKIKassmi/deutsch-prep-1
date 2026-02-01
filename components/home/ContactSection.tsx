"use client";

import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Info & Presence */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                Let’s talk about your <br />
                <span className="text-blue-600">German journey.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                Have questions about the Ausbildung process or your dossier? 
                Our team in Berlin and abroad is here to help you every step of the way.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Email us</h3>
                <p className="text-sm text-slate-500 mb-3">Response within 24hrs</p>
                <a href="mailto:hello@example.de" className="text-blue-600 font-semibold hover:underline">hello@example.de</a>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">WhatsApp</h3>
                <p className="text-sm text-slate-500 mb-3">Mon-Fri, 9am - 6pm</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">+49 123 456 789</a>
              </div>
            </div>

            {/* Office Info */}
            <div className="space-y-6 border-t border-slate-100 pt-10">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-slate-400 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900">Berlin Headquarters</h4>
                  <p className="text-slate-500">Friedrichstraße 123, 10117 Berlin, Germany</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-slate-400 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900">Working Hours</h4>
                  <p className="text-slate-500">Monday — Friday: 09:00 - 18:00 (CET)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="relative">
            {/* Simple decoration behind the form */}
            <div className="absolute -inset-4 bg-blue-50/50 rounded-[3rem] -z-10 blur-2xl" />
            
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/40">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full h-14 px-6 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full h-14 px-6 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">I'm interested in...</label>
                  <select className="w-full h-14 px-6 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none">
                    <option>German Language Courses</option>
                    <option>Dossier & Document Help</option>
                    <option>Finding an Ausbildung</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your background..." 
                    className="w-full p-6 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                  />
                </div>

                <Button className="w-full h-16 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-all group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
                
                <p className="text-center text-xs text-slate-400 mt-4">
                  By clicking send, you agree to our privacy policy and terms.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}