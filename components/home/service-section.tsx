"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  FileText,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceItem {
  id: string;
  route: string;
  step: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  accentColor: string;
  glowColor: string;
}

const services: ServiceItem[] = [
  {
    id: "german",
    route: "learn-german",
    step: "01",
    title: "Language Mastery",
    description:
      "Your journey starts with communication. Reach C1 level with native instructors designed for professionals.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop",
    icon: BookOpen,
    accentColor: "text-amber-500",
    glowColor: "group-hover:shadow-amber-500/20",
    features: ["Intensive A1-C1", "Native Instructors", "TestDaF Prep"],
    cta: "Start Learning",
  },
  {
    id: "docs",
    route: "documents",
    step: "02",
    title: "Dossier Engineering",
    description:
      "We build DIN 5008 compliant professional German applications (Lebenslauf & Motivation Letter).",
    image:
      "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?q=80&w=1300&auto=format&fit=crop",
    icon: FileText,
    accentColor: "text-red-600",
    glowColor: "group-hover:shadow-red-600/20",
    features: ["DIN 5008 CVs", "Motivation Letters", "Certified Prep"],
    cta: "Build My Dossier",
  },
  {
    id: "jobs",
    route: "ausbildung",
    step: "03",
    title: "Secure Placement",
    description:
      "We connect you with top companies across Germany for vocational training and visa finalization.",
    image:
      "https://images.unsplash.com/photo-1618259278412-2819cbdea4dc?q=80&w=1121&auto=format&fit=crop",
    icon: Briefcase,
    accentColor: "text-white",
    glowColor: "group-hover:shadow-white/10",
    features: ["1000+ Vacancies", "Visa Support", "Interview Coaching"],
    cta: "Find My Place",
  },
];

export default function ServiceSection() {
  const containerRef = useRef<HTMLElement>(null);

  // 1. Capture Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Smooth the scroll with Spring physics for a high-end feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  // 3. Transformation Mappings
  const headerY = useTransform(smoothProgress, [0, 0.2], [80, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);

  // Cards lift synchronized in one line
  const cardsY = useTransform(smoothProgress, [0, 1], [120, -120]);
  const cardsOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-32 bg-[#050505] overflow-hidden"
    >
      {/* Visual Accent - Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER AREA */}
        <div className="max-w-4xl mb-32 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">
              The Bureau Process
            </span>
          </motion.div>

          <motion.h2
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]"
          >
            Engineered for <br />
            <motion.span
              initial={{ color: "#fff" }}
              whileInView={{ color: "#dc2626" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="italic font-serif lowercase tracking-normal"
            >
              your
            </motion.span>{" "}
            success.
          </motion.h2>
        </div>

        {/* CARDS GRID - Synchronized Lift */}
        <motion.div
          style={{ y: cardsY, opacity: cardsOpacity }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {services.map((service) => (
            <div key={service.id} className="group relative">
              {/* Background Step Number - Parallax anchored to card */}
              <span className="absolute -top-16 -left-8 text-[12rem] font-black text-white/[0.02] leading-none select-none pointer-events-none z-0">
                {service.step}
              </span>

              <div
                className={`relative z-10 flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 ${service.glowColor} hover:bg-white/[0.05] backdrop-blur-md`}
              >
                {/* IMAGE AREA */}
                <div className="h-60 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.2s] ease-out"
                  />
                  {/* ICON BADGE */}
                  <div
                    className={`absolute bottom-5 left-8 z-20 w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 ${service.accentColor}`}
                  >
                    <service.icon className="w-7 h-7" />
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-10 pt-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-12 flex-grow">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-4">
                        <CheckCircle2
                          className={`w-4 h-4 ${service.accentColor} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/services/${service.route}`}>
                    <Button className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group/btn bg-white/5 border border-white/10 text-white hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                      {service.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FOOTER CALLOUT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-48 pt-12 border-t border-white/5 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-white/[0.02] border border-white/5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
              German Standards • Global Success
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
