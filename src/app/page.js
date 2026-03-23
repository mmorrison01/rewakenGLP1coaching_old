"use client";

import { useState, useEffect } from "react";
import { modules } from "@/data/modules";
import Link from "next/link";

export default function Home() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("rewaken-coaching-progress") || "[]");
      setCompleted(saved);
    } catch {}
  }, []);

  const progress = modules.length > 0 ? Math.round((completed.length / modules.length) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--rewaken-cream)" }}>
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: "var(--rewaken-teal)" }}>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grain)" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase">Course</span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-light leading-tight mb-2">
              <span className="italic font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>re</span>
              <span className="font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>waken</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mt-4 max-w-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              GLP-1 Coaching
            </p>
            <p className="text-white/60 text-base mt-4 max-w-lg">
              Your guided program for navigating GLP-1 medications with confidence — empowered, informed, and supported every step of the way.
            </p>

            {/* Overview Video Placeholder */}
            <div className="mt-8 max-w-lg">
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #2c6070, #457B8Ddd, #457B8D99)" }}
              >
                <div className="absolute inset-0 opacity-[0.07]">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="herogrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#herogrid)" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transition-transform group-hover:scale-105">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white/90 text-sm font-medium">0. GLP-1 Coaching.mp4</p>
                    <p className="text-white/50 text-xs mt-1">Video coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            {completed.length > 0 && (
              <div className="mt-8 max-w-xs">
                <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Module Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium" style={{ color: "var(--rewaken-text)" }}>
            Modules
          </h2>
          <span className="text-sm text-gray-400">
            {completed.length} of {modules.length} complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => {
            const isComplete = completed.includes(mod.id);
            return (
              <Link
                key={mod.id}
                href={`/module/${mod.id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/[0.04] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                  {/* Module header stripe */}
                  <div className="h-2" style={{ background: mod.color, opacity: isComplete ? 0.4 : 1 }} />

                  <div className="p-6">
                    {/* Icon + status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mod.icon}</span>
                        <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">
                          Module {mod.id}
                        </span>
                      </div>
                      {isComplete && (
                        <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--rewaken-sage)" }}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.3 5.3l-4 4a.5.5 0 01-.7 0l-2-2a.5.5 0 11.7-.7L7 9.3l3.6-3.6a.5.5 0 11.7.7z" />
                          </svg>
                          Done
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-medium mb-2 transition-colors group-hover:opacity-80"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--rewaken-text)" }}
                    >
                      {mod.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {mod.subtitle}
                    </p>

                    {/* Meta */}
                    <div className="pt-4 border-t border-black/[0.04] flex items-center gap-4 text-xs text-gray-400">
                      <span>{mod.sections.length} sections</span>
                      <span>•</span>
                      <span>1 slide</span>
                      {mod.sections.some((s) => s.type === "video") && (
                        <>
                          <span>•</span>
                          <span>📹 Video</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] py-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span className="italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>re</span>
            <span className="font-medium">waken</span>
            <span className="ml-2">life</span>
          </div>
          <div className="text-xs text-gray-400">
            For educational purposes only — always follow your provider&apos;s instructions
          </div>
        </div>
      </footer>
    </div>
  );
}
