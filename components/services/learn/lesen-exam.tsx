"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronRight,
  Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Text { id: number; text: string }
interface Headline { id: string; text: string }
interface HeadlineAnswer { textId: number; headlineId: string }
interface MCQOption { id: string; text: string }
interface MCQuestion { id: number; prompt: string; options: MCQOption[]; answerId: string }
interface Passage { title: string; text: string }
interface Situation { id: number; text: string }
interface Ad { id: string; text: string }
interface T3Answer { situationId: number; adId: string }
interface Segment { type: "text" | "luecke"; value?: string; id?: number; answer?: string }
interface Blank { id: number; options?: string[]; answer?: string }
interface LueckeAnswer { id: number; answer: string }

interface LesenParts {
  "teil-1": { content: { instruction: string; texts: Text[]; headlines: Headline[]; answers: HeadlineAnswer[] } };
  "teil-2": { content: { instruction: string; passage: Passage; questions: MCQuestion[] } };
  "teil-3": { content: { situations: Situation[]; ads: Ad[]; answers: T3Answer[] } };
  "sprachbausteine-1": { content: { title: string; instruction: string; segments: Segment[]; blanks: Blank[]; answers: LueckeAnswer[] } };
  "sprachbausteine-2": { content: { title: string; instruction: string; segments: Segment[]; blanks: Blank[]; answers: LueckeAnswer[] } };
}

interface LesenVersion {
  key: string;
  label: string;
  title: string;
  lesen: { parts: LesenParts };
}

interface LesenTheme {
  id: string;
  title: string;
  defaultVersion: string | number;
  versionOrder: (string | number)[];
  versions: Record<string, LesenVersion>;
  lesen: { parts: LesenParts };
}


const PART_ORDER = ["teil-1", "sprachbausteine-1", "sprachbausteine-2", "teil-2", "teil-3"] as const;
type PartKey = typeof PART_ORDER[number];

const PART_META: Record<PartKey, { short: string; full: string; desc: string }> = {
  "teil-1":           { short: "Teil 1",  full: "Lesen Teil 1",        desc: "Headline Matching" },
  "sprachbausteine-1":{ short: "SB 1",    full: "Sprachbausteine 1",   desc: "Fill in the Blanks" },
  "sprachbausteine-2":{ short: "SB 2",    full: "Sprachbausteine 2",   desc: "Word Completion" },
  "teil-2":           { short: "Teil 2",  full: "Lesen Teil 2",        desc: "Multiple Choice" },
  "teil-3":           { short: "Teil 3",  full: "Lesen Teil 3",        desc: "Ad Matching" },
};

const PART_POINTS: Record<PartKey, number> = {
  "teil-1": 5,
  "sprachbausteine-1": 1.5,
  "sprachbausteine-2": 1.5,
  "teil-2": 5,
  "teil-3": 2.5,
};

// ─── Small helpers ────────────────────────────────────────────────────────────

function ScorePill({ correct, total }: { correct: number; total: number }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const pass = pct >= 60;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full
      ${pass ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-red-50 text-red-600 ring-1 ring-red-200"}`}>
      {pass ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {correct}/{total}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-3">{children}</p>
  );
}

function InstructionBox({ text }: { text: string }) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 mb-6">
      <p className="text-sm text-zinc-600 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Teil 1: Headline Matching ────────────────────────────────────────────────

function Teil1({
  content, userAnswers, setUserAnswers, revealed,
}: {
  content: LesenTheme["lesen"]["parts"]["teil-1"]["content"];
  userAnswers: Record<number, string>;
  setUserAnswers: (a: Record<number, string>) => void;
  revealed: boolean;
}) {
  const correctCount = content.answers.filter(a => userAnswers[a.textId] === a.headlineId).length;

  // Which text card is currently focused (for the sticky right panel)
  const [activeTextId, setActiveTextId] = useState<number>(content.texts[0]?.id ?? 1);

  // Drag state
  const [draggingHeadline, setDraggingHeadline] = useState<string | null>(null);
  const [dragOver, setDragOver]                 = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, headlineId: string) => {
    setDraggingHeadline(headlineId);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent, textId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(textId);
  };
  const handleDrop = (e: React.DragEvent, textId: number) => {
    e.preventDefault();
    if (draggingHeadline && !revealed) {
      setUserAnswers({ ...userAnswers, [textId]: draggingHeadline });
    }
    setDraggingHeadline(null);
    setDragOver(null);
  };

  // Headlines already assigned to another text (for visual "used" state)
  const assignedHeadlines = new Set(Object.values(userAnswers));

  return (
    <div>
      <InstructionBox text={content.instruction} />

      {revealed && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-white border border-zinc-200 rounded-xl px-5 py-3 mb-6 shadow-sm">
          <span className="text-sm font-semibold text-zinc-700">Teil 1 Result</span>
          <ScorePill correct={correctCount} total={content.texts.length} />
        </motion.div>
      )}

      {/* ── Two-panel layout ── */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* LEFT — Scrolling texts */}
        <div className="space-y-4">
          <SectionLabel>Texts — click to focus, then pick a headline on the right</SectionLabel>

          {content.texts.map((text, idx) => {
            const correctAnswer = content.answers.find(a => a.textId === text.id)?.headlineId;
            const userAnswer    = userAnswers[text.id];
            const isActive      = activeTextId === text.id;
            const isCorrect     = revealed && userAnswer === correctAnswer;
            const isWrong       = revealed && !!userAnswer && userAnswer !== correctAnswer;
            const isDragTarget  = dragOver === text.id;

            // Selected headline display
            const selectedHeadline = content.headlines.find(h => h.id === userAnswer);

            return (
              <motion.div
                key={text.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !revealed && setActiveTextId(text.id)}
                onDragOver={e => handleDragOver(e, text.id)}
                onDragLeave={() => setDragOver(null)}
                onDrop={e => handleDrop(e, text.id)}
                className={`rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                  ${isCorrect    ? "border-emerald-400 bg-emerald-50 shadow-emerald-100 shadow-lg" :
                    isWrong      ? "border-red-400 bg-red-50 shadow-red-100 shadow-lg" :
                    isDragTarget ? "border-amber-400 bg-amber-50 shadow-amber-100 shadow-lg" :
                    isActive     ? "border-zinc-900 bg-white shadow-xl shadow-zinc-100" :
                                   "border-zinc-200 bg-white shadow-sm hover:border-zinc-400 hover:shadow-md"}`}
              >
                {/* Card header */}
                <div className={`flex items-center justify-between px-5 py-3 border-b
                  ${isCorrect ? "border-emerald-200 bg-emerald-100/60" :
                    isWrong   ? "border-red-200 bg-red-100/60" :
                    isActive  ? "border-zinc-100 bg-zinc-50" :
                                "border-zinc-100 bg-zinc-50/60"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black
                      ${isCorrect ? "bg-emerald-500 text-white" :
                        isWrong   ? "bg-red-500 text-white" :
                        isActive  ? "bg-black text-white" :
                                    "bg-zinc-200 text-zinc-600"}`}>
                      {text.id}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em]
                      ${isActive ? "text-zinc-800" : "text-zinc-400"}`}>
                      Text {text.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Selected headline badge */}
                    {userAnswer && !revealed && (
                      <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 rounded-full pl-1.5 pr-3 py-1"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-[10px] font-black flex items-center justify-center">
                          {userAnswer}
                        </span>
                        <span className="text-[10px] font-bold text-amber-800 max-w-[140px] truncate">
                          {selectedHeadline?.text}
                        </span>
                        <button
                          onClick={e => { e.stopPropagation(); setUserAnswers({ ...userAnswers, [text.id]: "" }); }}
                          className="ml-1 text-amber-500 hover:text-amber-800 text-xs font-black leading-none"
                        >×</button>
                      </motion.div>
                    )}
                    {/* Reveal result */}
                    {revealed && (
                      isCorrect
                        ? <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />Richtig
                          </span>
                        : <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                            <XCircle className="w-3.5 h-3.5" />
                            Falsch · correct: <strong className="ml-0.5">{correctAnswer}</strong>
                          </span>
                    )}
                    {/* Drop zone hint when dragging */}
                    {isDragTarget && !revealed && (
                      <span className="text-[10px] font-bold text-amber-600 animate-pulse">Drop here</span>
                    )}
                  </div>
                </div>

                {/* Text body */}
                <p className={`px-5 py-4 text-sm leading-relaxed
                  ${isCorrect ? "text-emerald-800" : isWrong ? "text-red-800" : "text-zinc-700"}`}>
                  {text.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT — Sticky headlines panel */}
        <div className="lg:sticky lg:top-[88px]">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-lg overflow-hidden">
            {/* Panel header */}
            <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">Überschriften</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTextId}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs font-bold text-zinc-700 uppercase tracking-widest"
                >
                  {revealed ? "All answers" : `Für Text ${activeTextId}`}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Headlines list */}
            <div className="p-3 space-y-1.5 max-h-[70vh] overflow-y-auto">
              {content.headlines.map(h => {
                const isSelectedForActive = !revealed && userAnswers[activeTextId] === h.id;
                const isUsedElsewhere     = !revealed && assignedHeadlines.has(h.id) && userAnswers[activeTextId] !== h.id;

                // For reveal: find which text it was assigned to and if correct
                const correctTextId  = content.answers.find(a => a.headlineId === h.id)?.textId;
                const userAssignedTo = Object.entries(userAnswers).find(([, v]) => v === h.id)?.[0];
                const isRevealCorrect = revealed && userAssignedTo && parseInt(userAssignedTo) === correctTextId;
                const isRevealWrong   = revealed && userAssignedTo && parseInt(userAssignedTo) !== correctTextId;

                return (
                  <motion.button
                    key={h.id}
                    disabled={revealed}
                    layout
                    whileTap={{ scale: 0.97 }}
                    onClick={() => !revealed && setUserAnswers({
                      ...userAnswers,
                      [activeTextId]: userAnswers[activeTextId] === h.id ? "" : h.id,
                    })}
                    draggable={!revealed}
                    onDragStart={(e: React.DragEvent<HTMLButtonElement>) => handleDragStart(e, h.id)}
                    onDragEnd={() => { setDraggingHeadline(null); setDragOver(null); }}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-150
                      ${isRevealCorrect   ? "border-emerald-300 bg-emerald-50 cursor-default" :
                        isRevealWrong     ? "border-red-300 bg-red-50 cursor-default" :
                        revealed && !userAssignedTo ? "border-zinc-100 bg-zinc-50 cursor-default opacity-60" :
                        isSelectedForActive ? "border-amber-400 bg-amber-50 shadow-amber-100 shadow-md" :
                        isUsedElsewhere   ? "border-zinc-100 bg-zinc-50 opacity-50 cursor-not-allowed" :
                        draggingHeadline === h.id ? "border-zinc-400 bg-zinc-100 scale-95 opacity-75" :
                                             "border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50 cursor-grab active:cursor-grabbing"}`}
                  >
                    {/* Letter badge */}
                    <span className={`w-7 h-7 shrink-0 rounded-lg text-xs font-black flex items-center justify-center transition-colors
                      ${isRevealCorrect     ? "bg-emerald-500 text-white" :
                        isRevealWrong       ? "bg-red-400 text-white" :
                        isSelectedForActive ? "bg-amber-400 text-white" :
                        isUsedElsewhere     ? "bg-zinc-200 text-zinc-400" :
                                              "bg-zinc-100 text-zinc-600"}`}>
                      {h.id}
                    </span>

                    <span className={`text-xs leading-snug flex-1
                      ${isRevealCorrect     ? "text-emerald-800 font-semibold" :
                        isRevealWrong       ? "text-red-700" :
                        isSelectedForActive ? "text-amber-900 font-semibold" :
                        isUsedElsewhere     ? "text-zinc-400" :
                                              "text-zinc-700"}`}>
                      {h.text}
                    </span>

                    {/* Status icons */}
                    {isSelectedForActive && !revealed && (
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    {isRevealCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    {isRevealWrong   && <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                    {isUsedElsewhere && !revealed && (
                      <span className="text-[9px] font-bold text-zinc-400 shrink-0">
                        → {Object.entries(userAnswers).find(([, v]) => v === h.id)?.[0]}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Drag hint */}
            {!revealed && (
              <div className="px-4 py-3 border-t border-zinc-100 bg-zinc-50">
                <p className="text-[10px] text-zinc-400 text-center">
                  💡 Click a headline to assign · or <strong>drag it onto a text</strong>
                </p>
              </div>
            )}
          </div>

          {/* Progress summary */}
          <div className="mt-3 grid grid-cols-5 gap-1">
            {content.texts.map(t => {
              const has = !!userAnswers[t.id];
              const correctAnswer = content.answers.find(a => a.textId === t.id)?.headlineId;
              const ok  = revealed && userAnswers[t.id] === correctAnswer;
              const bad = revealed && !!userAnswers[t.id] && !ok;
              return (
                <div key={t.id}
                  className={`h-1.5 rounded-full transition-all duration-300
                    ${ok ? "bg-emerald-400" : bad ? "bg-red-400" : has ? "bg-amber-400" : "bg-zinc-200"}`}
                />
              );
            })}
          </div>
          <p className="text-[9px] text-zinc-400 text-center mt-1.5 font-bold uppercase tracking-widest">
            {Object.values(userAnswers).filter(Boolean).length} / {content.texts.length} assigned
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Teil 2: Multiple Choice ──────────────────────────────────────────────────

function Teil2({
  content, userAnswers, setUserAnswers, revealed,
}: {
  content: LesenTheme["lesen"]["parts"]["teil-2"]["content"];
  userAnswers: Record<number, string>;
  setUserAnswers: (a: Record<number, string>) => void;
  revealed: boolean;
}) {
  const correctCount = content.questions.filter(q => userAnswers[q.id] === q.answerId).length;

  return (
    <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0">
      {/* Left: Passage */}
      <div className="lg:pr-8">
        <SectionLabel>Reading Passage</SectionLabel>
        <div className="sticky top-[88px] bg-zinc-50 border border-zinc-200 rounded-xl p-6">
          <h3 className="text-base font-bold text-zinc-900 mb-4 leading-tight">{content.passage.title}</h3>
          <p className="text-sm text-zinc-600 leading-[1.85] whitespace-pre-line">{content.passage.text}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block bg-zinc-100 mx-6" />

      {/* Right: Questions */}
      <div className="lg:pl-2 mt-8 lg:mt-0">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Questions</SectionLabel>
          {revealed && <ScorePill correct={correctCount} total={content.questions.length} />}
        </div>
        <InstructionBox text={content.instruction} />

        <div className="space-y-5">
          {content.questions.map((q, idx) => {
            const isCorrect = revealed && userAnswers[q.id] === q.answerId;
            const isWrong   = revealed && !!userAnswers[q.id] && userAnswers[q.id] !== q.answerId;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={`rounded-xl border transition-all duration-300
                  ${isCorrect ? "border-emerald-300 shadow-emerald-100 shadow-md" :
                    isWrong   ? "border-red-300 shadow-red-100 shadow-md" :
                                "border-zinc-200 shadow-sm"} bg-white`}
              >
                <div className="px-5 py-4 border-b border-zinc-100">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">
                    Question {q.id}
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 leading-snug">{q.prompt}</p>
                </div>
                <div className="p-3 space-y-2">
                  {q.options.map(opt => {
                    const isSelected   = userAnswers[q.id] === opt.id;
                    const isCorrectOpt = revealed && opt.id === q.answerId;
                    const isWrongOpt   = revealed && isSelected && opt.id !== q.answerId;

                    return (
                      <button
                        key={opt.id}
                        disabled={revealed}
                        onClick={() => setUserAnswers({ ...userAnswers, [q.id]: opt.id })}
                        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all duration-150
                          ${isWrongOpt   ? "bg-red-50 border-red-200 text-red-700" :
                            isCorrectOpt ? "bg-emerald-50 border-emerald-300 text-emerald-800" :
                            isSelected   ? "bg-black border-black text-white shadow" :
                                           "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"}`}
                      >
                        <span className={`w-5 h-5 shrink-0 rounded-full border text-[10px] font-black flex items-center justify-center
                          ${isWrongOpt   ? "border-red-300 text-red-500" :
                            isCorrectOpt ? "border-emerald-400 text-emerald-600" :
                            isSelected   ? "border-white/40 text-white" :
                                           "border-zinc-300 text-zinc-400"}`}>
                          {opt.id.toUpperCase()}
                        </span>
                        {opt.text}
                        {isCorrectOpt && <CheckCircle2 className="w-4 h-4 ml-auto shrink-0 text-emerald-500" />}
                        {isWrongOpt   && <XCircle className="w-4 h-4 ml-auto shrink-0 text-red-400" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Teil 3: Situation → Ad Matching ─────────────────────────────────────────

function Teil3({
  content, userAnswers, setUserAnswers, revealed,
}: {
  content: LesenTheme["lesen"]["parts"]["teil-3"]["content"];
  userAnswers: Record<number, string>;
  setUserAnswers: (a: Record<number, string>) => void;
  revealed: boolean;
}) {
  const correctCount = content.answers.filter(a => userAnswers[a.situationId] === a.adId).length;
  const allAdIds = [...content.ads.map(a => a.id), "X"];

  return (
    <div>
      <InstructionBox text="Für jede Situation gibt es nur eine passende Anzeige. Wählen Sie den passenden Buchstaben. Sie können jeden Buchstaben nur einmal verwenden. Eine Anzeige bleibt übrig." />

      {revealed && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-white border border-zinc-200 rounded-xl px-5 py-3 mb-6 shadow-sm">
          <span className="text-sm font-semibold text-zinc-700">Teil 3 Result</span>
          <ScorePill correct={correctCount} total={content.situations.length} />
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Situations */}
        <div>
          <SectionLabel>Situations — select matching ad</SectionLabel>
          <div className="space-y-4">
            {content.situations.map((sit, idx) => {
              const correctAd = content.answers.find(a => a.situationId === sit.id)?.adId;
              const userAd    = userAnswers[sit.id];
              const isCorrect = revealed && userAd === correctAd;
              const isWrong   = revealed && !!userAd && userAd !== correctAd;

              return (
                <motion.div
                  key={sit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`rounded-xl border transition-all duration-300
                    ${isCorrect ? "border-emerald-300 bg-emerald-50/60 shadow-emerald-100 shadow-md" :
                      isWrong   ? "border-red-300 bg-red-50/60 shadow-red-100 shadow-md" :
                                  "border-zinc-200 bg-white shadow-sm"}`}
                >
                  <div className="px-5 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Situation {sit.id}
                      </span>
                      {revealed && (
                        <span className="text-[10px] font-bold">
                          {isCorrect
                            ? <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Richtig</span>
                            : <span className="text-red-600 flex items-center gap-1"><XCircle className="w-3 h-3" />Falsch — Correct: <strong>{correctAd}</strong></span>
                          }
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed">{sit.text}</p>
                  </div>

                  {/* Ad picker */}
                  <div className="px-4 pb-4 flex flex-wrap gap-1.5">
                    {allAdIds.map(adId => {
                      const isSelected   = userAd === adId;
                      const isCorrectOpt = revealed && adId === correctAd;
                      const isWrongOpt   = revealed && isSelected && adId !== correctAd;

                      return (
                        <button
                          key={adId}
                          disabled={revealed}
                          onClick={() => setUserAnswers({ ...userAnswers, [sit.id]: adId })}
                          className={`h-8 min-w-[2rem] px-2 text-xs font-black rounded-lg border transition-all duration-150
                            ${isWrongOpt   ? "bg-red-100 border-red-300 text-red-600" :
                              isCorrectOpt ? "bg-emerald-100 border-emerald-300 text-emerald-700" :
                              isSelected   ? "bg-black border-black text-white shadow-md" :
                                             "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800"}`}
                        >
                          {adId}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ads reference */}
        <div>
          <SectionLabel>Advertisements</SectionLabel>
          <div className="space-y-3 lg:sticky lg:top-[88px] max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
            {content.ads.map(ad => (
              <div key={ad.id} className="bg-white border border-zinc-200 rounded-xl px-4 py-3 shadow-sm">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-zinc-900 text-white text-[10px] font-black mb-2">
                  {ad.id}
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">{ad.text}</p>
              </div>
            ))}
            <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-xl px-4 py-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-zinc-400 text-zinc-500 text-[10px] font-black mb-2">X</span>
              <p className="text-xs text-zinc-500 italic">Keine passende Anzeige</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sprachbausteine ─────────────────────────────────────────────────────────

function Sprachbausteine({
  content, userAnswers, setUserAnswers, revealed,
}: {
  content: LesenTheme["lesen"]["parts"]["sprachbausteine-1"]["content"];
  userAnswers: Record<number, string>;
  setUserAnswers: (a: Record<number, string>) => void;
  revealed: boolean;
  partKey: "sprachbausteine-1" | "sprachbausteine-2";
}) {
  const correctCount = content.answers.filter(
    a => (userAnswers[a.id] || "").toLowerCase().trim() === a.answer.toLowerCase().trim()
  ).length;
  const hasDropdowns = content.blanks.some(b => b.options && b.options.length > 0);

  return (
    <div>
      {/* Header card */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{content.title}</p>
          <p className="text-sm text-zinc-600 leading-relaxed">{content.instruction}</p>
        </div>
        {revealed && <ScorePill correct={correctCount} total={content.answers.length} />}
      </div>

      {/* The text with inline blanks */}
      <div className="bg-white border border-zinc-200 rounded-xl px-7 py-8 shadow-sm">
        <p className="text-[15px] text-zinc-800 leading-[2.4] whitespace-pre-wrap font-serif">
          {content.segments.map((seg, i) => {
            if (seg.type === "text") return <span key={i}>{seg.value}</span>;
            if (seg.type === "luecke" && seg.id !== undefined) {
              const blank  = content.blanks.find(b => b.id === seg.id);
              const answer = content.answers.find(a => a.id === seg.id);
              const userVal = userAnswers[seg.id] ?? "";
              const isCorrect = revealed && userVal.toLowerCase().trim() === (answer?.answer ?? "").toLowerCase().trim();
              const isWrong   = revealed && !!userVal && !isCorrect;

              if (hasDropdowns && blank?.options?.length) {
                return (
                  <span key={i} className="inline-flex flex-col items-center mx-1 relative" style={{ verticalAlign: "middle" }}>
                    <select
                      disabled={revealed}
                      value={userVal}
                      onChange={e => setUserAnswers({ ...userAnswers, [seg.id!]: e.target.value })}
                      className={`px-2 py-0.5 rounded-lg border text-sm font-bold font-sans bg-white cursor-pointer transition-all focus:outline-none focus:ring-2
                        ${isCorrect ? "border-emerald-400 text-emerald-700 bg-emerald-50 ring-emerald-200" :
                          isWrong   ? "border-red-400 text-red-600 bg-red-50 ring-red-200" :
                                      "border-zinc-300 text-zinc-800 hover:border-zinc-500 focus:ring-zinc-200"}`}
                    >
                      <option value="">— wählen —</option>
                      {blank.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {revealed && isWrong && (
                      <span className="text-[9px] font-black text-emerald-600 mt-0.5 whitespace-nowrap">
                        ✓ {answer?.answer}
                      </span>
                    )}
                  </span>
                );
              }

              // Free-text (SB2)
              return (
                <span key={i} className="inline-flex flex-col items-center mx-1 relative" style={{ verticalAlign: "middle" }}>
                  <input
                    type="text"
                    disabled={revealed}
                    value={userVal}
                    onChange={e => setUserAnswers({ ...userAnswers, [seg.id!]: e.target.value })}
                    placeholder={`[${seg.id}]`}
                    className={`w-28 px-2 py-0.5 rounded-lg border text-sm font-bold font-sans text-center transition-all focus:outline-none focus:ring-2
                      ${isCorrect ? "border-emerald-400 text-emerald-700 bg-emerald-50 ring-emerald-200" :
                        isWrong   ? "border-red-400 text-red-600 bg-red-50 ring-red-200" :
                                    "border-zinc-300 text-zinc-800 focus:border-zinc-500 focus:ring-zinc-200"}`}
                  />
                  {revealed && isWrong && (
                    <span className="text-[9px] font-black text-emerald-600 mt-0.5 whitespace-nowrap">
                      ✓ {answer?.answer}
                    </span>
                  )}
                </span>
              );
            }
            return null;
          })}
        </p>
      </div>

      {/* Answer key (SB2 free-text reference) */}
      {!hasDropdowns && revealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Answer Key</p>
          <div className="flex flex-wrap gap-2">
            {content.answers.map(a => {
              const userVal = userAnswers[a.id] ?? "";
              const isOk = userVal.toLowerCase().trim() === a.answer.toLowerCase().trim();
              return (
                <span key={a.id} className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border
                  ${isOk ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-600"}`}>
                  <span className="text-zinc-400 font-normal">[{a.id}]</span>
                  {a.answer}
                  {isOk ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────

function ResultsScreen({
  theme, partScores, onRetry, onBack,
}: {
  theme: LesenTheme;
  partScores: Record<PartKey, { correct: number; total: number; points: number }>;
  onRetry: () => void;
  onBack: () => void;
}) {
  const totalEarned = PART_ORDER.reduce((sum, p) => {
    const s = partScores[p];
    return sum + (s.total > 0 ? (s.correct / s.total) * (s.total * PART_POINTS[p]) : 0);
  }, 0);
  const totalMax = PART_ORDER.reduce((sum, p) => {
    const s = partScores[p];
    return sum + s.total * PART_POINTS[p];
  }, 0);
  const pct    = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  const passed = pct >= 60;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-zinc-50 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-xl">
        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden mb-4"
        >
          {/* Top band */}
          <div className={`h-2 w-full ${passed ? "bg-emerald-400" : "bg-red-400"}`} />

          <div className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1.5">Exam Results</p>
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{theme.title}</h2>
              </div>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center
                ${passed ? "bg-amber-50 border-2 border-amber-200" : "bg-zinc-100 border-2 border-zinc-200"}`}>
                <Trophy className={`w-6 h-6 ${passed ? "text-amber-500" : "text-zinc-400"}`} />
              </div>
            </div>

            {/* Big score */}
            <div className={`text-8xl font-black tracking-tighter mb-1 ${passed ? "text-emerald-500" : "text-red-500"}`}>
              {pct}%
            </div>
            <p className={`text-sm font-bold mb-1 ${passed ? "text-emerald-600" : "text-red-500"}`}>
              {passed ? "Bestanden ✓" : "Nicht bestanden ✗"}
            </p>
            <p className="text-xs text-zinc-400 mb-8">
              {Math.round(totalEarned)} / {Math.round(totalMax)} points · Pass threshold: 60%
            </p>

            {/* Part breakdown */}
            <div className="space-y-3 border-t border-zinc-100 pt-6">
              {PART_ORDER.map(partKey => {
                const s      = partScores[partKey];
                const partPct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
                const ok     = partPct >= 60;

                return (
                  <div key={partKey} className="flex items-center gap-4">
                    <div className="w-28 shrink-0">
                      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        {PART_META[partKey].short}
                      </p>
                      <p className="text-[9px] text-zinc-400">{PART_META[partKey].desc}</p>
                    </div>
                    <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${partPct}%` }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className={`h-full rounded-full ${ok ? "bg-emerald-400" : "bg-red-400"}`}
                      />
                    </div>
                    <span className={`text-xs font-bold w-10 text-right shrink-0 ${ok ? "text-emerald-600" : "text-red-500"}`}>
                      {s.correct}/{s.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-3"
        >
          <button
            onClick={onRetry}
            className="flex items-center gap-2 h-12 px-6 rounded-xl border border-zinc-300 text-sm font-bold text-zinc-600 hover:bg-zinc-100 hover:border-zinc-400 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Exam
          </button>
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-colors shadow-lg"
          >
            Back to Themes
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

// ─── Version Picker Modal ────────────────────────────────────────────────────

function VersionPicker({
  theme,
  onSelect,
}: {
  theme: LesenTheme;
  onSelect: (versionKey: string) => void;
}) {
  const hasMultipleVersions =
    theme.versionOrder &&
    theme.versionOrder.filter(v => String(v) !== "default").length > 1;

  if (!hasMultipleVersions) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-100">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-1">
            Select Version
          </p>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{theme.title}</h2>
        </div>

        {/* Version options */}
        <div className="p-4 space-y-2">
          {theme.versionOrder
            .filter(v => String(v) !== "default")
            .map(vKey => {
              const version = theme.versions[String(vKey)];
              if (!version) return null;
              return (
                <motion.button
                  key={String(vKey)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelect(String(vKey))}
                  className="w-full text-left px-5 py-4 rounded-xl border-2 border-zinc-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-150 group"
                >
                  <p className="text-sm font-bold text-zinc-800 group-hover:text-amber-900">
                    {version.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5 group-hover:text-amber-700">
                    {version.title}
                  </p>
                </motion.button>
              );
            })}
        </div>

        <div className="px-4 pb-4">
          <p className="text-[10px] text-center text-zinc-400 font-medium">
            Each version contains different exam texts
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}


function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300
            ${i < current ? "bg-black w-4" :
              i === current ? "bg-black w-6" :
                              "bg-zinc-200 w-4"}`}
        />
      ))}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function LesenExam() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const level    = (searchParams.get("level") ?? "b1").toLowerCase();
  const themeKey = searchParams.get("theme") ?? "";

  const [themeData,      setThemeData]      = useState<LesenTheme | null>(null);
  const [loading,        setLoading]        = useState(true);
  const [currentPart,    setCurrentPart]    = useState<PartKey>("teil-1");
  const [revealed,       setRevealed]       = useState(false);
  const [showResults,    setShowResults]    = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showVersionPicker, setShowVersionPicker] = useState(false);

  const [t1Answers,  setT1Answers]  = useState<Record<number, string>>({});
  const [t2Answers,  setT2Answers]  = useState<Record<number, string>>({});
  const [t3Answers,  setT3Answers]  = useState<Record<number, string>>({});
  const [sb1Answers, setSb1Answers] = useState<Record<number, string>>({});
  const [sb2Answers, setSb2Answers] = useState<Record<number, string>>({});

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch("/data/lesen.json");
        const data = await res.json();
        const theme = data?.levels?.[level]?.themes?.[themeKey];
        if (theme) {
          setThemeData(theme);
          // Auto-show version picker if multiple real versions exist
          const realVersions = (theme.versionOrder || []).filter((v: string|number) => String(v) !== "default");
          if (realVersions.length > 1) {
            setShowVersionPicker(true);
            setSelectedVersion(String(theme.defaultVersion ?? realVersions[0]));
          } else {
            setSelectedVersion(String(theme.defaultVersion ?? "default"));
          }
        }
      } catch { console.error("Failed to load theme"); }
      finally   { setLoading(false); }
    }
    load();
  }, [level, themeKey]);

  const currentPartIndex = PART_ORDER.indexOf(currentPart);
  const isLastPart       = currentPartIndex === PART_ORDER.length - 1;
  const isFirstPart      = currentPartIndex === 0;

  const goNext = () => {
    if (isLastPart) { setShowResults(true); }
    else { setCurrentPart(PART_ORDER[currentPartIndex + 1]); setRevealed(false); window.scrollTo({ top: 0 }); }
  };
  const goPrev = () => {
    if (!isFirstPart) { setCurrentPart(PART_ORDER[currentPartIndex - 1]); setRevealed(false); window.scrollTo({ top: 0 }); }
  };

  const handleRetry = () => {
    setT1Answers({}); setT2Answers({}); setT3Answers({});
    setSb1Answers({}); setSb2Answers({});
    setCurrentPart("teil-1"); setRevealed(false); setShowResults(false);
    // Re-show picker if multi-version
    if (themeData) {
      const realVersions = (themeData.versionOrder || []).filter((v) => String(v) !== "default");
      if (realVersions.length > 1) setShowVersionPicker(true);
    }
  };

  // Resolve active lesen parts from selected version
  const activeLesen = themeData
    ? (selectedVersion && themeData.versions?.[selectedVersion]?.lesen) || themeData.lesen
    : null;

  const getPartScores = useCallback(() => {
    if (!themeData || !activeLesen) return {} as Record<PartKey, { correct: number; total: number; points: number }>;
    const parts = activeLesen.parts;
    return {
      "teil-1": {
        correct: parts["teil-1"].content.answers.filter(a => t1Answers[a.textId] === a.headlineId).length,
        total:   parts["teil-1"].content.texts.length, points: PART_POINTS["teil-1"],
      },
      "teil-2": {
        correct: parts["teil-2"].content.questions.filter(q => t2Answers[q.id] === q.answerId).length,
        total:   parts["teil-2"].content.questions.length, points: PART_POINTS["teil-2"],
      },
      "teil-3": {
        correct: parts["teil-3"].content.answers.filter(a => t3Answers[a.situationId] === a.adId).length,
        total:   parts["teil-3"].content.situations.length, points: PART_POINTS["teil-3"],
      },
      "sprachbausteine-1": {
        correct: parts["sprachbausteine-1"].content.answers.filter(
          a => (sb1Answers[a.id] || "").toLowerCase().trim() === a.answer.toLowerCase().trim()).length,
        total:   parts["sprachbausteine-1"].content.answers.length, points: PART_POINTS["sprachbausteine-1"],
      },
      "sprachbausteine-2": {
        correct: parts["sprachbausteine-2"].content.answers.filter(
          a => (sb2Answers[a.id] || "").toLowerCase().trim() === a.answer.toLowerCase().trim()).length,
        total:   parts["sprachbausteine-2"].content.answers.length, points: PART_POINTS["sprachbausteine-2"],
      },
    };
  }, [themeData, activeLesen, t1Answers, t2Answers, t3Answers, sb1Answers, sb2Answers]);

  // Version picker overlay (shown before exam starts)
  if (themeData && showVersionPicker) return (
    <VersionPicker
      theme={themeData}
      onSelect={(vKey) => {
        setSelectedVersion(vKey);
        setShowVersionPicker(false);
        setCurrentPart("teil-1");
        setT1Answers({}); setT2Answers({}); setT3Answers({});
        setSb1Answers({}); setSb2Answers({});
      }}
    />
  );

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loading exam…</p>
      </div>
    </div>
  );

  if (!themeData) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <p className="text-sm font-bold text-zinc-500">Theme not found</p>
      <button onClick={() => router.back()} className="text-sm font-bold text-zinc-400 hover:text-black transition-colors">
        ← Go back
      </button>
    </div>
  );

  if (showResults) return (
    <ResultsScreen
      theme={themeData}
      partScores={getPartScores()}
      onRetry={handleRetry}
      onBack={() => router.push(`/services/learn-german/themes?level=${level}&module=lesen`)}
    />
  );

  const parts = (activeLesen ?? themeData.lesen).parts;
  const meta  = PART_META[currentPart];

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-sm">
        <div className="container mx-auto max-w-6xl px-6">

          {/* Top row */}
          <div className="h-14 flex items-center gap-4">
            <button
              onClick={() => router.push(`/services/learn-german/themes?level=${level}&module=lesen`)}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors text-xs font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Themes
            </button>

            <div className="h-4 w-px bg-zinc-200" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="font-bold uppercase tracking-widest">{level.toUpperCase()}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-zinc-700">{themeData.title}</span>
              {/* Version badge */}
              {selectedVersion && selectedVersion !== "default" && themeData.versions?.[selectedVersion] && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <button
                    onClick={() => setShowVersionPicker(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-bold hover:bg-amber-200 transition-colors"
                  >
                    {themeData.versions[selectedVersion].label}
                    <span className="text-amber-500">↕</span>
                  </button>
                </>
              )}
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-zinc-900">{meta.full}</span>
            </div>

            <div className="ml-auto">
              <ProgressDots current={currentPartIndex} total={PART_ORDER.length} />
            </div>
          </div>

          {/* Part tabs */}
          <div className="flex gap-1 pb-3 overflow-x-auto">
            {PART_ORDER.map((partKey, i) => {
              const m       = PART_META[partKey];
              const isActive = currentPart === partKey;
              const isPast   = i < currentPartIndex;
              return (
                <button
                  key={partKey}
                  onClick={() => { setCurrentPart(partKey); setRevealed(false); window.scrollTo({ top: 0 }); }}
                  className={`shrink-0 flex items-center gap-2 h-8 px-4 rounded-full text-xs font-bold transition-all duration-150
                    ${isActive ? "bg-black text-white shadow" :
                      isPast   ? "bg-zinc-100 text-zinc-500 hover:bg-zinc-200" :
                                 "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"}`}
                >
                  {isPast && !isActive && <Check className="w-3 h-3 text-emerald-500" />}
                  <span>{m.short}</span>
                  <span className={`hidden sm:inline text-[10px] ${isActive ? "text-white/60" : "text-zinc-400"}`}>
                    — {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto max-w-6xl px-6 py-8 pb-36">

        {/* Part header */}
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-1">
            Part {currentPartIndex + 1} of {PART_ORDER.length}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{meta.full}</h1>
          <p className="text-sm text-zinc-500 mt-1">{meta.desc}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPart}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {currentPart === "teil-1" && (
              <Teil1 content={parts["teil-1"].content} userAnswers={t1Answers} setUserAnswers={setT1Answers} revealed={revealed} />
            )}
            {currentPart === "teil-2" && (
              <Teil2 content={parts["teil-2"].content} userAnswers={t2Answers} setUserAnswers={setT2Answers} revealed={revealed} />
            )}
            {currentPart === "teil-3" && (
              <Teil3 content={parts["teil-3"].content} userAnswers={t3Answers} setUserAnswers={setT3Answers} revealed={revealed} />
            )}
            {currentPart === "sprachbausteine-1" && (
              <Sprachbausteine content={parts["sprachbausteine-1"].content} userAnswers={sb1Answers} setUserAnswers={setSb1Answers} revealed={revealed} partKey="sprachbausteine-1" />
            )}
            {currentPart === "sprachbausteine-2" && (
              <Sprachbausteine content={parts["sprachbausteine-2"].content} userAnswers={sb2Answers} setUserAnswers={setSb2Answers} revealed={revealed} partKey="sprachbausteine-2" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Fixed Footer ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-zinc-200 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center gap-3">

          <button
            onClick={goPrev}
            disabled={isFirstPart}
            className="flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Center: part name + progress */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-zinc-500">{meta.full}</span>
            <div className="flex items-center gap-1">
              {PART_ORDER.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300
                  ${i <= currentPartIndex ? "bg-black w-5" : "bg-zinc-200 w-3"}`} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRevealed(!revealed)}
              className={`h-11 px-5 rounded-xl border text-sm font-bold transition-all duration-150
                ${revealed
                  ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300"}`}
            >
              {revealed ? "Hide Answers" : "Check Answers"}
            </button>

            <button
              onClick={goNext}
              className="flex items-center gap-2 h-11 px-6 rounded-xl bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-colors shadow-lg"
            >
              {isLastPart ? "See Results" : "Next Part"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}