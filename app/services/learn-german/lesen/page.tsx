import { Suspense } from "react";
import LesenExam from "@/components/services/learn/lesen-exam";

export default function LesenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-700 animate-pulse">
            Loading exam…
          </div>
        </div>
      }
    >
      <LesenExam />
    </Suspense>
  );
}