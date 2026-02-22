"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Headphones,
  Search,
  ArrowRight,
  FileText,
  Layers,
} from "lucide-react";

// ─── Real B1 & B2 theme data ─────────────────────────────────

const LESEN_THEMES: Record<string, { key: string; title: string }[]> = {
  b1: [
    { key: "alex-und-cora", title: "Alex und Cora" },
    { key: "alicia", title: "Alicia" },
    { key: "andreas-1", title: "Andreas 1" },
    { key: "andreas-2", title: "Andreas 2" },
    { key: "annika-1", title: "Annika 1" },
    { key: "annika-2", title: "Annika 2" },
    { key: "caroline", title: "Caroline" },
    { key: "corina", title: "Corina" },
    { key: "eva", title: "Eva" },
    { key: "iris", title: "Iris" },
    { key: "jan", title: "Jan" },
    { key: "jennifer", title: "Jennifer" },
    { key: "karla", title: "Karla" },
    { key: "miroslav", title: "Miroslav" },
    { key: "moritz", title: "Moritz" },
    { key: "nadja-claudia", title: "Nadja / Claudia" },
    { key: "nicole", title: "Nicole" },
    { key: "paul", title: "Paul" },
    { key: "petra", title: "Petra" },
    { key: "rita", title: "Rita" },
    { key: "sonja", title: "Sonja" },
    { key: "sophie", title: "Sophie" },
    { key: "tamara-jakob", title: "Tamara / Jakob" },
    { key: "thomas-anna", title: "Thomas / Anna" },
    { key: "vera", title: "Vera" },
    { key: "viktor", title: "Viktor" },
  ],
  b2: [
    { key: "batata", title: "Batata" },
    { key: "benzin", title: "Benzin" },
    { key: "bienen", title: "Bienen" },
    { key: "bilder", title: "Bilder" },
    { key: "bonbon", title: "Bonbon" },
    { key: "drogen", title: "Drogen" },
    { key: "geld", title: "Geld" },
    { key: "grundschule", title: "Grundschule" },
    { key: "impfung", title: "Impfung" },
    { key: "in-den-alpen", title: "In den Alpen" },
    { key: "insekten", title: "Insekten" },
    { key: "insel", title: "Insel" },
    { key: "jugend-forscht-kellner", title: "Jugend forscht / Kellner" },
    { key: "kaffee", title: "Kaffee" },
    { key: "keine-zeit", title: "Keine Zeit" },
    { key: "kindertelefon", title: "Kindertelefon" },
    { key: "licht", title: "Licht" },
    { key: "limon-n", title: "Limon N" },
    { key: "mobarmijine", title: "Mobarmijine" },
    { key: "namssa", title: "Namssa" },
    { key: "schlafzug", title: "Schlafzug" },
    { key: "spiele", title: "Spiele" },
    { key: "sport-ist-gesund", title: "Sport ist gesund" },
    { key: "tanzkurs", title: "Tanzkurs" },
    { key: "trampolin", title: "Trampolin" },
    { key: "umwelt", title: "Umwelt" },
  ],
};

const HOREN_THEMES: Record<string, { key: string; title: string; parts: string[] }[]> = {
  b1: [
    {
      key: "horen-b1",
      title: "Hören Codes B1",
      parts: [
        "Teil 1 — Kurze Aussagen (richtig/falsch)",
        "Teil 2 — Längere Passage",
        "Teil 3 — Vervollständigung",
      ],
    },
  ],
  b2: [
    {
      key: "horen-b2",
      title: "Hören Codes B2",
      parts: [
        "Teil 1 — Kurze Aussagen (richtig/falsch)",
        "Teil 2 — Längere Passage",
        "Teil 3 — Vervollständigung",
      ],
    },
  ],
};

const MODULES = [
  { key: "lesen", label: "Lesen", icon: BookOpen, description: "Reading Comprehension" },
  { key: "horen", label: "Hören", icon: Headphones, description: "Listening Comprehension" },
];

function LesenCard({
  theme,
  index,
  level,
}: {
  theme: { key: string; title: string };
  index: number;
  level: string;
}) {
  const router = useRouter();
  const PARTS = ["Lesen Teil 1", "Sprachbausteine 1 & 2", "Lesen Teil 2", "Lesen Teil 3"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      onClick={() => router.push(`/services/learn-german/lesen?level=${level}&theme=${theme.key}`)}
      className="group relative bg-white border border-zinc-200 p-0 overflow-hidden hover:border-black transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl"
    >
      {/* Visual Accent */}
      <div className="h-1.5 w-full bg-zinc-100 group-hover:bg-black transition-colors duration-500" />
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Module 0{index + 1}
            </span>
            <span className="text-[9px] font-bold text-zinc-300 uppercase mt-0.5 tracking-widest">
              Prep Level: {level.toUpperCase()}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
            <ArrowRight className="w-4 h-4 transition-transform group-hover:rotate-[-45deg]" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-black tracking-tighter mb-8 group-hover:translate-x-1 transition-transform duration-300">
          {theme.title}
        </h3>

        <div className="space-y-4">
          {PARTS.map((part, i) => (
            <div key={part} className="flex items-center gap-3">
              <span className="text-[10px] font-black text-zinc-200">{i + 1}</span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 group-hover:text-zinc-900 transition-colors">
                {part}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between text-[10px] font-black uppercase tracking-widest border-t border-zinc-100 pt-6">
          <div className="flex items-center gap-2 text-zinc-400 group-hover:text-black transition-colors">
            <FileText className="w-3.5 h-3.5" />
            <span>Standard Exam</span>
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Start Session →</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ThemesBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const levelParam = (searchParams.get("level") ?? "b1").toLowerCase();
  const moduleParam = (searchParams.get("module") ?? "lesen");

  const [activeLevel, setActiveLevel] = useState(levelParam);
  const [activeModule, setActiveModule] = useState(moduleParam);
  const [search, setSearch] = useState("");

  const filteredLesen = useMemo(() => {
    const themes = (LESEN_THEMES as any)[activeLevel] ?? [];
    return search.trim() 
      ? themes.filter((t: any) => t.title.toLowerCase().includes(search.toLowerCase()))
      : themes;
  }, [activeLevel, search]);

  return (
    <section className="min-h-screen bg-white text-black">
      
      {/* ── Level & Module Controller ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
        <div className="container mx-auto max-w-7xl px-6 h-24 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="hover:scale-110 transition-transform p-2 bg-zinc-50 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* LEVEL SWITCHER - HIGH CLARITY */}
            <div className="flex bg-zinc-100 p-1.5 rounded-full border border-zinc-200">
              {["b1", "b2"].map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLevel(l)}
                  className={`relative px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeLevel === l 
                    ? "bg-black text-white shadow-lg scale-105" 
                    : "text-zinc-400 hover:text-black"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH BAR - NOW CLEAR & DEFINED */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-12 relative group">
            <Search className="absolute left-4 w-4 h-4 text-zinc-400 group-focus-within:text-black transition-colors" />
            <input
              type="text"
              placeholder="Search by theme name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold placeholder:text-zinc-400 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all"
            />
          </div>

          {/* MODULE SWITCHER */}
          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-full border border-zinc-200">
            {MODULES.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`p-2.5 rounded-full transition-all ${
                  activeModule === m.key 
                  ? "bg-white text-black shadow-sm" 
                  : "text-zinc-400 hover:text-black"
                }`}
              >
                <m.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <header className="container mx-auto max-w-7xl px-6 pt-24 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest">
                Academy Set
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Curriculum v2026
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] relative z-10">
              {activeModule}
              {/* B1/B2 TEXT - NOW VISIBLE with Outline style */}
              <span className="block mt-2 text-zinc-100" style={{ 
                WebkitTextStroke: '2px #e4e4e7', // zinc-200 color for the border
                color: 'transparent' 
              }}>
                {activeLevel}
              </span>
            </h1>
          </div>

          <div className="max-w-xs text-right">
             <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Exam Info</p>
             <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
                <div className="p-4 bg-white">
                   <p className="text-2xl font-black">{activeModule === "lesen" ? filteredLesen.length : 1}</p>
                   <p className="text-[9px] font-bold text-zinc-400 uppercase">Themes</p>
                </div>
                <div className="p-4 bg-white">
                   <p className="text-2xl font-black">90m</p>
                   <p className="text-[9px] font-bold text-zinc-400 uppercase">Duration</p>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* ── Content Grid ── */}
      <main className="container mx-auto max-w-7xl px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel + activeModule}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {activeModule === "lesen" && filteredLesen.map((theme: any, i: number) => (
              <LesenCard key={theme.key} theme={theme} index={i} level={activeLevel} />
            ))}

            {activeModule === "horen" && (
              <div className="col-span-full border-2 border-black p-16">
                <div className="max-w-2xl">
                   <Layers className="w-12 h-12 mb-8 text-black" />
                   <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none">
                     Hören Track <br/> {activeLevel.toUpperCase()} Complete
                   </h2>
                   <p className="text-zinc-500 mb-12 text-lg">
                     The listening module contains three specialized sections including short daily 
                     dialogues and long-form academic lectures.
                   </p>
                   <button className="h-20 px-12 bg-black text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all flex items-center gap-6">
                      Launch Audio Interface <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </section>
  );
}