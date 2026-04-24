"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP = 60; // vh per tab — total = STEP × 3 + 20 = 200vh
const ADVANTAGES = [
  {
    id: 0,
    num: "01",
    tag: "Self-sovereign",
    title: "Autonomous",
    content:
      "FinID removes the middleman. Your financial reputation is encrypted and owned entirely by you, not the banks. Complexity made simple—so you stay in control of your digital footprint across every network.",
    image:
      "https://broadwayplatform.com/wp-content/uploads/2026/03/Frame-10-574x661.png",
  },
  {
    id: 1,
    num: "02",
    tag: "Global reach",
    title: "Portable",
    content:
      "Take your creditworthiness anywhere. Our portable credential allows you to prove your financial standing in seconds, globally. Built for growth—designed for global ambition and modular AI architecture.",
    image:
      "https://broadwayplatform.com/wp-content/uploads/2026/03/Frame-11-574x661.png",
  },
  {
    id: 2,
    num: "03",
    tag: "AI-powered",
    title: "Intelligence",
    content:
      "Serious performance behind every signal. FinID uses behavioral AI to anticipate opportunities and secure your assets before risks manifest. Enterprise-grade stability and innovation in one unified system.",
    image:
      "https://broadwayplatform.com/wp-content/uploads/2026/03/Frame-12-574x680.png",
  },
];

type Phase = "dark" | "mid" | "light";

export function AdvantagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [phase, setPhase] = useState<Phase>("dark");
  const [showHint, setShowHint] = useState(true);

  const isLight = phase === "light";
  const isMid = phase === "mid";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── BACKGROUND: right panel sweeps from black → crimson → warm white ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
          onUpdate: (self) => {
            const p = self.progress;
            setPhase(p < 0.28 ? "dark" : p < 0.62 ? "mid" : "light");
            if (p > 0.04) setShowHint(false);
          },
        },
      });
      tl.fromTo(
        ".bg-right",
        { backgroundColor: "#09090B" },
        { backgroundColor: "#B22222", ease: "none", duration: 1 },
      ).to(".bg-right", {
        backgroundColor: "#F5F0EB",
        ease: "none",
        duration: 1,
      });

      // ── HORIZONTAL SCAN LINE (decorative) sweeps across screen ──
      gsap.fromTo(
        ".scan-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "50% bottom",
            scrub: 0.2,
          },
        },
      );

      // ── TAB SWITCHING ──
      ADVANTAGES.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: `top+=${i * STEP}vh top`,
          end: `top+=${(i + 1) * STEP}vh top`,
          onToggle: (self) => self.isActive && setActiveTab(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        .f-disp { font-family: 'Bebas Neue', sans-serif; }
        .f-body  { font-family: 'Cormorant Garamond', serif; }
        .f-mono  { font-family: 'Space Mono', monospace; }
        @keyframes bar-wave {
          0%,100% { transform: scaleY(0.3); opacity: 0.3; }
          50%      { transform: scaleY(1);   opacity: 1; }
        }
        @keyframes img-in {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        .img-reveal { animation: img-in 0.45s cubic-bezier(.4,0,.2,1) forwards; }
      `}</style>

      <div ref={containerRef} className="relative bg-[#09090B]">
        <div
          ref={triggerRef}
          style={{ height: `${STEP * ADVANTAGES.length + 20}vh` }}
          className="relative w-full"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* ── DECORATIVE SCAN LINE ── */}
            <div className="scan-line absolute top-1/2 left-0 w-full h-px bg-[#B22222]/40 z-20 pointer-events-none" />

            {/* ── SCROLL HINT ── */}
            <div
              className={cn(
                "absolute bottom-7 right-8 z-30 flex flex-col items-center gap-2 transition-opacity duration-700",
                showHint ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-0.75 h-6 rounded-full origin-bottom",
                      isLight ? "bg-black" : "bg-white",
                    )}
                    style={{
                      animation: `bar-wave 1.3s ease-in-out ${i * 0.18}s infinite`,
                    }}
                  />
                ))}
              </div>
              <span
                className={cn(
                  "f-mono text-[8px] uppercase tracking-[0.5em]",
                  isLight ? "text-black/40" : "text-white/40",
                )}
              >
                Scroll
              </span>
            </div>

            {/* ════════════════════════════════
                DESKTOP LAYOUT
            ════════════════════════════════ */}
            <div className="hidden md:grid h-full grid-cols-[42fr_58fr]">
              {/* LEFT: Full-bleed image — raw, no border-radius */}
              <div className="relative overflow-hidden bg-[#09090B]">
                {ADVANTAGES.map((adv, i) => (
                  <img
                    key={adv.id}
                    src={adv.image}
                    alt={adv.title}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                      activeTab === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}

                {/* Dark-to-crimson image scrim */}
                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-500 pointer-events-none",
                    isLight
                      ? "bg-transparent"
                      : isMid
                        ? "bg-[#B22222]/25"
                        : "bg-black/55",
                  )}
                />

                {/* Corner bracket — top left */}
                <div className="absolute top-6 left-6">
                  <div
                    className={cn(
                      "w-8 h-px mb-0 transition-colors duration-500",
                      isLight ? "bg-white" : "bg-white/40",
                    )}
                  />
                  <div
                    className={cn(
                      "w-px h-8 transition-colors duration-500",
                      isLight ? "bg-white" : "bg-white/40",
                    )}
                  />
                </div>

                {/* Number badge overlaid bottom-right */}
                <div
                  className={cn(
                    "absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                    isLight
                      ? "bg-[#B22222]"
                      : "bg-white/10 border border-white/20",
                  )}
                >
                  <span className="f-mono text-white text-xs font-bold">
                    {ADVANTAGES[activeTab].num}
                  </span>
                </div>
              </div>

              {/* RIGHT: Text section */}
              <div className="relative overflow-hidden">
                {/* Background (GSAP target) */}
                <div
                  className="bg-right absolute inset-0"
                  style={{ backgroundColor: "#09090B" }}
                />

                {/* Ghost number watermark */}
                <span
                  className={cn(
                    "f-disp absolute -right-4 top-1/2 -translate-y-1/2 leading-none select-none pointer-events-none transition-colors duration-300",
                    "text-[28vw]",
                    isLight ? "text-black/5" : "text-white/4",
                  )}
                >
                  {ADVANTAGES[activeTab].num}
                </span>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between px-12 lg:px-16 py-10">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <span className="f-mono text-[9px] uppercase tracking-[0.5em] text-[#B22222]">
                      FinID · Advantages
                    </span>
                    {/* Progress dashes */}
                    <div className="flex gap-2 items-center">
                      {ADVANTAGES.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-px transition-all duration-300",
                            i === activeTab
                              ? "w-10 bg-[#B22222]"
                              : cn(
                                  "w-4",
                                  isLight ? "bg-black/20" : "bg-white/20",
                                ),
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center content */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Tag */}
                    <span
                      className={cn(
                        "f-mono text-[9px] uppercase tracking-[0.55em] mb-5 transition-colors duration-300",
                        isLight ? "text-black/40" : "text-white/35",
                      )}
                    >
                      {ADVANTAGES[activeTab].tag}
                    </span>

                    {/* Stacked titles: inactive are tiny + ghosted, active is massive */}
                    <div>
                      {ADVANTAGES.map((adv, i) => (
                        <h2
                          key={adv.id}
                          className={cn(
                            "f-disp leading-[0.88] block transition-all duration-200",
                            i === activeTab
                              ? cn(
                                  "text-[12vw] lg:text-[9.5vw]",
                                  isLight ? "text-black" : "text-white",
                                )
                              : cn(
                                  "text-[4.5vw] lg:text-[3.5vw]",
                                  isLight ? "text-black/10" : "text-white/10",
                                ),
                          )}
                        >
                          {adv.title}
                        </h2>
                      ))}
                    </div>

                    {/* Crimson rule */}
                    <div className="flex items-center gap-4 mt-5 mb-6">
                      <div className="h-px w-14 bg-[#B22222]" />
                      <span
                        className={cn(
                          "f-mono text-[8px] uppercase tracking-[0.4em]",
                          isLight ? "text-black/30" : "text-white/25",
                        )}
                      >
                        {ADVANTAGES[activeTab].num} of{" "}
                        {ADVANTAGES.length.toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Body — Cormorant Garamond italic */}
                    <p
                      className={cn(
                        "f-body italic font-light text-xl lg:text-[1.4rem] leading-[1.85] max-w-sm transition-colors duration-300",
                        isLight ? "text-black/65" : "text-white/65",
                      )}
                    >
                      {ADVANTAGES[activeTab].content}
                    </p>
                  </div>

                  {/* Bottom label */}
                  <span
                    className={cn(
                      "f-mono text-[8px] uppercase tracking-[0.55em]",
                      isLight ? "text-black/20" : "text-white/20",
                    )}
                  >
                    Advantages you can rely on
                  </span>
                </div>
              </div>
            </div>

            {/* ════════════════════════════════
                MOBILE LAYOUT
            ════════════════════════════════ */}
            <div className="md:hidden h-full flex flex-col relative z-10">
              {/* Image fills top half as header */}
              <div className="relative shrink-0 h-[45vh] overflow-hidden">
                {ADVANTAGES.map((adv, i) => (
                  <img
                    key={adv.id}
                    src={adv.image}
                    alt={adv.title}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                      activeTab === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#09090B]" />
                <div className="absolute bottom-4 left-6">
                  <span className="f-mono text-white/50 text-[9px] uppercase tracking-[0.5em]">
                    {ADVANTAGES[activeTab].num} / {ADVANTAGES[activeTab].tag}
                  </span>
                </div>
              </div>

              {/* Scrollable accordion */}
              <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4 flex flex-col gap-4">
                {ADVANTAGES.map((adv, i) => {
                  const open = activeTab === i;
                  return (
                    <div
                      key={adv.id}
                      className={cn(
                        "rounded-2xl border px-6 py-5 transition-all duration-300",
                        open
                          ? "bg-[#B22222]/10 border-[#B22222]/40"
                          : "bg-white/5 border-white/10",
                      )}
                    >
                      <button
                        onClick={() => setActiveTab(i)}
                        className="w-full flex justify-between items-center"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              "f-mono text-[9px]",
                              open ? "text-[#B22222]" : "text-white/30",
                            )}
                          >
                            {adv.num}
                          </span>
                          <span
                            className={cn(
                              "f-disp text-3xl leading-none",
                              open ? "text-white" : "text-white/35",
                            )}
                          >
                            {adv.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform duration-300 shrink-0",
                            open
                              ? "rotate-180 text-[#B22222]"
                              : "text-white/20",
                          )}
                        />
                      </button>

                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          open
                            ? "grid-rows-[1fr] opacity-100 mt-5"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="f-body italic font-light text-lg text-white/70 leading-[1.85]">
                            {adv.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
