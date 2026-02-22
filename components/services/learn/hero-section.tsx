"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  BookOpen,
  PenLine,
  Mic2,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Timer,
  FileDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Real data from ZDeutsch config ──────────────────────────────────────────

const SKILLS = [
  {
    key: "horen",
    de: "Hören",
    en: "Listening",
    icon: Headphones,
    telcPart: "Teil 1 – 3",
    desc: "Train your ear with authentic TELC audio tracks. True/false and gap-fill tasks — just like the real exam.",
    count: "3 Parts",
    cta: "Start Listening",
  },
  {
    key: "lesen",
    de: "Lesen",
    en: "Reading",
    icon: BookOpen,
    telcPart: "Teil 1 – 3 + Sprachbausteine",
    desc: "Real-world texts — ads, articles, emails — with comprehension questions under timed exam conditions.",
    count: "26 Themes / Level",
    cta: "Open a Text",
  },
  {
    key: "schreiben",
    de: "Schreiben",
    en: "Writing",
    icon: PenLine,
    telcPart: "Formal Letter",
    desc: "Draft formal letters and structured responses following DIN 5008 and official TELC scoring criteria.",
    count: "Coming Soon",
    cta: "Pick a Prompt",
  },
  {
    key: "sprechen",
    de: "Sprechen",
    en: "Speaking",
    icon: Mic2,
    telcPart: "Oral Exam",
    desc: "Simulate your oral exam with role-play scenarios, picture descriptions, and discussion tasks.",
    count: "Coming Soon",
    cta: "Begin Scenario",
  },
];

// Real TELC exam timing
const EXAM_PARTS = [
  { de: "Leseverstehen", en: "Reading Comprehension", time: "90 min" },
  { de: "Hörverstehen", en: "Listening Comprehension", time: "45 min" },
  { de: "Schriftlicher Ausdruck", en: "Written Expression", time: "30 min" },
  { de: "Mündlicher Ausdruck", en: "Oral Expression", time: "15 min" },
];

const LEVELS = ["B1", "B2"] as const;
type Level = typeof LEVELS[number];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LevelBadge({
  level,
  active,
  onClick,
}: {
  level: Level;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative h-12 w-16 text-[11px] font-bold transition-all duration-200
        ${active
          ? "bg-white text-black"
          : "bg-transparent text-zinc-500 border border-zinc-800 hover:border-zinc-500 hover:text-zinc-200"
        }`}
    >
      {level}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LearnGermanHero() {
  const [activeLevel, setActiveLevel] = useState<Level>("B1");
  const router = useRouter();

  const handleBeginCourse = () => {
    router.push(`/services/learn-german/themes?level=${activeLevel.toLowerCase()}`);
  };

  return (
    <section className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden">

      {/* ── Grid Overlay ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

      <div className="relative z-10 pt-32 pb-20 px-6 container mx-auto max-w-7xl">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[70vh]">

          {/* Left: Copy */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-zinc-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
                TELC Deutsch — Official Exam Preparation
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
              Your Exam. <br />
              <span className="text-zinc-500">Your Score.</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-md leading-relaxed mb-4">
              Four skills. One certificate. Practice Hören and Lesen with 26 real
              TELC exam themes per level — then walk into the exam room ready.
            </p>

            {/* Quick stats strip */}
            <div className="flex items-center gap-6 mb-12 py-4 border-y border-zinc-900">
              <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                <Timer className="w-3 h-3" />
                135 min total
              </div>
              <div className="w-px h-4 bg-zinc-800" />
              <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                <FileDown className="w-3 h-3" />
                PDF Export
              </div>
              <div className="w-px h-4 bg-zinc-800" />
              <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                26 Themes / Level
              </div>
            </div>

            {/* Level toggle + CTA */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">
                  Choose Your Target Level
                </p>
                <div className="bg-[#0A0A0A] p-1 border border-zinc-900 inline-flex">
                  {LEVELS.map((l) => (
                    <LevelBadge
                      key={l}
                      level={l}
                      active={activeLevel === l}
                      onClick={() => setActiveLevel(l)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* PRIMARY — navigates to themes page with selected level */}
                <button
                  onClick={handleBeginCourse}
                  className="h-14 px-10 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-3 group"
                >
                  Begin {activeLevel} Course
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="h-14 px-10 bg-transparent border border-zinc-800 text-white font-bold uppercase text-[10px] tracking-widest hover:border-zinc-500 transition-colors">
                  View Full Syllabus
                </button>
              </div>
            </div>
          </div>

          {/* Right: TELC Certificate Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-zinc-50 p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 group">

              {/* Seal */}
              <div className="absolute top-12 right-12 w-16 h-16 rounded-full border-4 border-zinc-200 flex items-center justify-center opacity-20 group-hover:opacity-50 transition-opacity duration-500">
                <Globe2 className="w-8 h-8 text-zinc-400" />
              </div>

              {/* Header — updates live with level */}
              <div className="border-b-2 border-black pb-8 mb-10">
                <h2 className="text-4xl font-black text-black tracking-tighter mb-1">telc</h2>
                <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em]">
                  Language Tests · Deutsch {activeLevel}
                </p>
              </div>

              {/* Real TELC exam parts */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  Exam Structure
                </p>
                {EXAM_PARTS.map((part) => (
                  <div
                    key={part.de}
                    className="flex items-center justify-between border-b border-zinc-200 py-3"
                  >
                    <div>
                      <p className="text-xs font-bold text-black">{part.de}</p>
                      <p className="text-[9px] text-zinc-400 uppercase tracking-wider">
                        {part.en}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-zinc-400">{part.time}</span>
                      <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Signature */}
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                <div>
                  <div className="w-24 h-px bg-zinc-300 mb-2" />
                  <p className="text-[8px] text-zinc-400 uppercase font-bold tracking-widest">Date of Issue</p>
                </div>
                <div className="text-right">
                  <p className="font-serif italic text-black text-lg opacity-60">F. Müller</p>
                  <p className="text-[8px] text-zinc-400 uppercase font-bold tracking-widest">Examiner Signature</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Your Target</p>
              <p className="text-2xl font-bold">telc Deutsch {activeLevel}</p>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════
            4 SKILL CARDS
        ══════════════════════════════════ */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-0">
            <div className="w-8 h-px bg-zinc-800" />
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-600">
              The Four Exam Skills — Pick Where to Begin
            </span>
            <div className="flex-1 h-px bg-zinc-900" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            {SKILLS.map((skill) => {
              // Hören and Lesen link to themes, others are coming soon
              const isAvailable = skill.key === "lesen" || skill.key === "horen";
              const href = isAvailable
                ? `/services/learn-german/themes?level=${activeLevel.toLowerCase()}&module=${skill.key}`
                : "#";

              return (
                <Link
                  key={skill.key}
                  href={href}
                  className={`group ${!isAvailable ? "pointer-events-none opacity-50" : ""}`}
                >
                  <div className="bg-black p-10 h-full transition-colors duration-200 hover:bg-[#080808] flex flex-col">

                    <div className="flex items-start justify-between mb-8">
                      <skill.icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-200" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-800 group-hover:text-zinc-600 transition-colors">
                        {skill.telcPart}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold uppercase tracking-tight mb-0.5">{skill.de}</h4>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-5">{skill.en}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1">{skill.desc}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-zinc-700 group-hover:text-zinc-400 transition-colors uppercase tracking-[0.2em]">
                        {skill.count}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 group-hover:text-white transition-colors uppercase tracking-widest">
                        {skill.cta}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom meta */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-900 pt-10 opacity-30">
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Global Standard</span>
            <div className="w-1 h-1 bg-white rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">CEFR Aligned</span>
            <div className="w-1 h-1 bg-white rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">PDF Export</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Levels B1 · B2</span>
        </div>
      </div>
    </section>
  );
}