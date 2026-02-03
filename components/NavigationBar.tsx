"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, X, Globe, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function NavigationBar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "pt-2" // Adds a little gap from the top when floating
          : "pt-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 ${
            isScrolled 
              ? "h-14 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
              : "h-20 bg-transparent border border-transparent"
          }`}
        >
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative">
              <Shield className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-red-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <span className="text-lg font-black tracking-[0.15em] text-white uppercase flex items-center">
              DEUTSCH<span className="text-amber-500 ml-1">PREPA</span>
            </span>
          </Link>

          {/* CENTRAL NAV LINKS (Desktop) */}
          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1">
            <DesktopNavLink href="#services">Services</DesktopNavLink>
            <DesktopNavLink href="/about">Process</DesktopNavLink>
            <DesktopNavLink href="/contact">Support</DesktopNavLink>
          </div>

          {/* AUTH & ACTIONS (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] px-6 rounded-full h-9 shadow-lg shadow-red-600/20 active:scale-95 transition-all"
                >
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <button className="text-white/40 hover:text-amber-500 transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 border border-amber-500/50 hover:border-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    }
                  }} 
                />
              </div>
            </SignedIn>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white p-2">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-l border-white/10 backdrop-blur-2xl">
                <SheetHeader className="mb-12">
                  <SheetTitle className="text-left text-white font-black uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-6 bg-red-600" /> Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8">
                  <MobileNavLink href="/services">Services</MobileNavLink>
                  <MobileNavLink href="/about">Process</MobileNavLink>
                  <MobileNavLink href="/contact">Support</MobileNavLink>
                  <div className="h-px bg-white/10 w-full my-4" />
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="text-white font-black uppercase tracking-widest text-xs justify-start p-0">Login</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="bg-red-600 w-full font-black uppercase tracking-widest py-6 rounded-xl">Start Journey</Button>
                    </SignUpButton>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// Sub-components for better organization
function DesktopNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 group"
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="nav-hover" 
      />
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-4xl font-black text-white hover:text-red-600 transition-colors uppercase tracking-tighter"
    >
      {children}
    </Link>
  );
}