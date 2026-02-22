"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, Shield, X, ArrowUpRight } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

export default function NavigationBar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // We trigger the "floating" state after 100px of scrolling
    setIsScrolled(latest > 100);
  });

  if (!mounted) return null;

  return (
    <header 
      className={`w-full transition-all duration-500 ${
        isScrolled 
          ? "fixed top-0 left-0 right-0 z-[100] bg-black border-b border-zinc-800 shadow-2xl" 
          : "relative z-10 bg-black border-b border-white/5" // Part of the page, not blocking
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-16" : "h-24"}`}>
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white flex items-center justify-center">
               <Shield className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-[0.3em] text-white uppercase leading-none">
                Deutsch<span className="text-zinc-500">Prep</span>
              </span>
              <span className="text-[7px] font-bold tracking-[0.4em] text-zinc-600 uppercase mt-1">
                Official TELC Center
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-12">
            <DesktopNavLink href="/services">Curriculum</DesktopNavLink>
            <DesktopNavLink href="/about">Methodology</DesktopNavLink>
            <DesktopNavLink href="/contact">Support</DesktopNavLink>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-11 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white border border-transparent hover:border-zinc-800 transition-all">
                    Member Log In
                  </button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <button className="group h-11 px-8 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2">
                    Start Now
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </SignUpButton>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center gap-4 pl-4 border-l border-zinc-800">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Dashboard</span>
                  <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 border border-zinc-700" } }} />
                </div>
              </SignedIn>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="text-white w-10 h-10 flex items-center justify-center border border-zinc-800">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-black border-none p-0 flex flex-col z-[150]">
                  <div className="flex items-center justify-between p-8 border-b border-zinc-900">
                    <span className="text-[10px] font-black tracking-[.3em] uppercase text-zinc-500">Navigation</span>
                    <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center bg-zinc-900 text-white"><X className="w-5 h-5"/></button>
                  </div>
                  
                  <div className="flex flex-col p-8 gap-4">
                    <MobileNavLink href="/services" label="The Curriculum" onClick={() => setIsOpen(false)} />
                    <MobileNavLink href="/about" label="Our Methodology" onClick={() => setIsOpen(false)} />
                    <MobileNavLink href="/contact" label="Technical Support" onClick={() => setIsOpen(false)} />
                  </div>

                  <div className="mt-auto p-8 border-t border-zinc-900">
                    <SignedOut>
                      <SignUpButton mode="modal">
                        <button className="w-full bg-white text-black h-16 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                          Join Academy <ArrowUpRight className="w-4 h-4"/>
                        </button>
                      </SignUpButton>
                    </SignedOut>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DesktopNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-all relative group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex flex-col py-6 border-b border-zinc-900 group"
    >
      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2 group-hover:text-white transition-colors">Select Module</span>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold uppercase tracking-tight text-white">{label}</span>
        <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-all" />
      </div>
    </Link>
  );
}