import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-gray-400 py-16 relative overflow-hidden">
      {/* Top Accent: German Flag Colors Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] flex">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl text-white tracking-tighter uppercase">
                Deutsch<span className="text-red-600 italic font-serif lowercase tracking-normal">Prepa</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm font-medium text-gray-500">
              Engineering your transition to the German labor market. <br />
              Authorized dossier preparation and native-level <br /> 
              language coaching for international professionals.
            </p>
          </div>

          {/* Links: Services */}
          <div>
            <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-6">Services</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tighter">
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Language Mastery</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Dossier Engineering</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Ausbildung Search</Link>
              </li>
            </ul>
          </div>

          {/* Links: Corporate */}
          <div>
            <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-6">Bureau</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tighter">
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Our Method</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Berlin Office</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* Links: Legal */}
          <div>
            <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-6">Regulatory</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tighter">
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition-colors">Impressum</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            © 2026 <span className="text-gray-400">DeutschPrepa Bureau</span>. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Systems Active</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Based in Berlin, DE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}