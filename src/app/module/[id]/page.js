"use client";

import { useState, useEffect, use } from "react";
import { modules } from "@/data/modules";
import Link from "next/link";

/* ─── Video Placeholder / Embed ─── */
function VideoPlaceholder({ title, moduleColor, embedUrl }) {
  if (embedUrl) {
    // Convert to nocookie domain and add params for inline playback
    const fixedUrl = embedUrl
      .replace('www.youtube.com', 'www.youtube-nocookie.com')
      + (embedUrl.includes('?') ? '&' : '?')
      + 'rel=0&modestbranding=1&origin=' + (typeof window !== 'undefined' ? window.location.origin : '');
    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={fixedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden shadow-lg group cursor-pointer"
      style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}dd, ${moduleColor}99)` }}
    >
      <div className="absolute inset-0 opacity-[0.07]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vidgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vidgrid)" />
        </svg>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transition-transform group-hover:scale-105">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="text-center px-8">
          <p className="text-white/90 text-sm font-medium tracking-wide">{title}</p>
          <p className="text-white/50 text-xs mt-1">Video coming soon</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" />
    </div>
  );
}

/* ─── Slide Display ─── */
function SlideDisplay({ slides, color }) {
  const [current, setCurrent] = useState(0);
  if (!slides || slides.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="relative rounded-xl overflow-hidden shadow-md" style={{ aspectRatio: "16/9" }}>
        <img
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover"
        />
        {slides.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setCurrent((p) => Math.min(slides.length - 1, p + 1))}
              disabled={current === slides.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Render Content ─── */
function renderContent(text) {
  if (!text) return null;
  const lines = text.split("\n").filter((l) => l.trim());
  return lines.map((line, i) => {
    const trimmed = line.trim();
    // Checkbox items
    if (trimmed.startsWith("☑")) {
      const content = trimmed.replace(/^☑\s*/, "");
      return (
        <li key={i} className="checkbox-item" style={{ paddingLeft: 0 }}>
          <span className="checkbox-box" />
          <span dangerouslySetInnerHTML={{ __html: parseBold(content) }} />
        </li>
      );
    }
    // Regular text
    return <p key={i} dangerouslySetInnerHTML={{ __html: parseBold(trimmed) }} />;
  });
}

function parseBold(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/🔍/g, '<span style="margin-right:4px">🔍</span>')
    .replace(/💡/g, '<span style="margin-right:4px">💡</span>');
}

/* ─── Main Module Page ─── */
export default function ModulePage({ params }) {
  const { id } = use(params);
  const moduleId = parseInt(id);
  const mod = modules.find((m) => m.id === moduleId);
  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [sectionsVisited, setSectionsVisited] = useState(new Set([0]));

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("rewaken-coaching-progress") || "[]");
      setCompleted(saved);
    } catch {}
  }, []);

  useEffect(() => {
    setSectionsVisited((prev) => new Set([...prev, activeSection]));
  }, [activeSection]);

  const markComplete = () => {
    if (!mod) return;
    const updated = [...new Set([...completed, mod.id])];
    setCompleted(updated);
    try {
      sessionStorage.setItem("rewaken-coaching-progress", JSON.stringify(updated));
    } catch {}
  };

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--rewaken-cream)" }}>
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Module not found</h1>
          <Link href="/" className="text-sm underline" style={{ color: "var(--rewaken-teal)" }}>Back to course</Link>
        </div>
      </div>
    );
  }

  const isComplete = completed.includes(mod.id);
  const allVisited = mod.sections.every((_, i) => sectionsVisited.has(i));
  const prevMod = modules.find((m) => m.id === moduleId - 1);
  const nextMod = modules.find((m) => m.id === moduleId + 1);
  const section = mod.sections[activeSection];

  return (
    <div className="min-h-screen" style={{ background: "var(--rewaken-cream)" }}>
      {/* Top nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--rewaken-text)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Modules
          </Link>
          <div className="text-xs text-gray-400 hidden md:block">
            <span className="italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>re</span>
            <span className="font-medium">waken</span>
            <span className="ml-1">— GLP-1 Coaching</span>
          </div>
          <div className="flex items-center gap-2">
            {prevMod && (
              <Link href={`/module/${prevMod.id}`} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/[0.04] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            {nextMod && (
              <Link href={`/module/${nextMod.id}`} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/[0.04] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Module header */}
      <header className="relative overflow-hidden" style={{ background: mod.color }}>
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hdgrain" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hdgrain)" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
          <span className="text-white/50 text-xs font-medium tracking-[0.15em] uppercase mb-3 block">
            Module {mod.id} of {modules.length}
          </span>
          <h1
            className="text-white text-3xl md:text-4xl font-medium leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {mod.title}
          </h1>
          <p className="text-white/60 text-sm mt-2">{mod.subtitle}</p>
        </div>
      </header>

      {/* Content area: sidebar + main */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8 relative">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Sections</h3>
              <div className="space-y-1">
                {mod.sections.map((sec, i) => {
                  const visited = sectionsVisited.has(i);
                  const active = i === activeSection;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveSection(i)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 ${
                        active
                          ? "bg-white shadow-sm font-medium"
                          : "hover:bg-white/60"
                      }`}
                      style={{ color: active ? mod.color : "var(--rewaken-text)" }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold transition-colors ${
                          visited
                            ? "text-white"
                            : "border-2 border-gray-200 text-gray-400"
                        }`}
                        style={visited ? { background: mod.color } : undefined}
                      >
                        {visited ? (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M13.3 4.3l-6 6a.5.5 0 01-.7 0l-3-3a.5.5 0 11.7-.7L7 9.3l5.6-5.6a.5.5 0 11.7.7z" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mark Complete */}
              <div className="mt-6 pt-6 border-t border-black/[0.06]">
                {isComplete ? (
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--rewaken-sage)" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.3 5.3l-4 4a.5.5 0 01-.7 0l-2-2a.5.5 0 11.7-.7L7 9.3l3.6-3.6a.5.5 0 11.7.7z" />
                    </svg>
                    Module complete
                  </div>
                ) : (
                  <button
                    onClick={markComplete}
                    disabled={!allVisited}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      allVisited
                        ? "text-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        : "text-gray-400 bg-gray-100 cursor-not-allowed"
                    }`}
                    style={allVisited ? { background: mod.color } : undefined}
                  >
                    {allVisited ? "Mark Complete ✓" : `Visit all sections (${sectionsVisited.size}/${mod.sections.length})`}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            {/* Section content */}
            <div key={activeSection} className="animate-fade-in-up" style={{ opacity: 1 }}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ background: mod.color }} />
                <h2
                  className="text-2xl md:text-3xl font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--rewaken-text)" }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Video placeholder */}
              {section.type === "video" && section.videoPlaceholder && (
                <div className="mb-8">
                  <VideoPlaceholder title={section.videoPlaceholder} moduleColor={mod.color} embedUrl={section.videoEmbed} />
                </div>
              )}

              {/* Content card */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-black/[0.04] prose-rewaken">
                {section.type === "checklist" ? (
                  <ul className="space-y-1" style={{ listStyle: "none", padding: 0 }}>
                    {renderContent(section.content)}
                  </ul>
                ) : (
                  <div>{renderContent(section.content)}</div>
                )}
              </div>

              {/* Prev / Next section nav */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/[0.06]">
                <button
                  onClick={() => setActiveSection((p) => Math.max(0, p - 1))}
                  disabled={activeSection === 0}
                  className="flex items-center gap-2 text-sm font-medium disabled:opacity-30 hover:opacity-70 transition-opacity"
                  style={{ color: mod.color }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Previous
                </button>
                <span className="text-xs text-gray-400">
                  {activeSection + 1} / {mod.sections.length}
                </span>
                {activeSection < mod.sections.length - 1 ? (
                  <button
                    onClick={() => setActiveSection((p) => Math.min(mod.sections.length - 1, p + 1))}
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                    style={{ color: mod.color }}
                  >
                    Next
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : nextMod ? (
                  <Link
                    href={`/module/${nextMod.id}`}
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                    style={{ color: mod.color }}
                  >
                    Next Module
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                    style={{ color: mod.color }}
                  >
                    Back to Course
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile section selector */}
            <div className="lg:hidden mt-10 pt-6 border-t border-black/[0.06]">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">All Sections</h3>
              <div className="flex flex-wrap gap-2">
                {mod.sections.map((sec, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveSection(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      i === activeSection ? "text-white" : "bg-white text-gray-600 border border-black/[0.06]"
                    }`}
                    style={i === activeSection ? { background: mod.color } : undefined}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
