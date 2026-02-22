import { Suspense } from "react";
import ThemesBrowser from "@/components/services/learn/themes-browser";

export default function ThemesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-700 animate-pulse">
            Loading themes...
          </div>
        </div>
      }
    >
      <ThemesBrowser />
    </Suspense>
  );
}