"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export function PlatformSolutions() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Refs to track animation state without re-rendering
  const autoTweenRef = useRef<gsap.core.Tween | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const themeRed = "#B22222";

  const realSolutions = [
    {
      title: "Real-time Verification",
      category: "Network",
      img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_backoffice-284x480.webp",
      desc: "Unified verification layer for global banking networks.",
    },
    {
      title: "Encrypted Trust Layer",
      category: "Security",
      img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_risk_management_tool-284x480.webp",
      desc: "End-to-end encryption for sensitive financial metadata.",
    },
    {
      title: "Borderless Identity",
      category: "Global",
      img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_payments_suite-284x480.webp",
      desc: "Travel-ready credentials recognized by 150+ institutions.",
    },
    {
      title: "Predictive Analytics",
      category: "Intelligence",
      img: "https://broadwayplatform.com/wp-content/uploads/2025/06/upd_card_managed_services-284x480.webp",
      desc: "ML models forecasting behavior patterns in real-time.",
    },
    {
      title: "Portable Credential",
      category: "Deployment",
      img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_cms-284x480.webp",
      desc: "Deploy your financial identity across any digital platform.",
    },
  ];

  const allCards = [...realSolutions, ...Array(2).fill({ empty: true })];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");
    const cardWidth = 320;
    const gap = 40;
    const totalWidth = (cardWidth + gap) * (allCards.length - 1);

    gsap.set(cards, { width: cardWidth, x: (i) => i * (cardWidth + gap) });

    const applyCurve = () => {
      const sliderX = gsap.getProperty(slider, "x") as number;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const viewportCenter = window.innerWidth / 2;
        const cardCenter = rect.left + rect.width / 2;
        const distFromCenter =
          (cardCenter - viewportCenter) / (window.innerWidth / 2);
        const absDist = Math.abs(distFromCenter);

        gsap.set(card, {
          rotationY: distFromCenter * -15,
          translateZ: absDist * -150,
          opacity: 1 - absDist * 0.5,
          scale: 1 - absDist * 0.1,
          transformPerspective: 1200,
        });
      });

      const newIdx = Math.round(Math.abs(sliderX / (cardWidth + gap)));
      setActiveIdx(Math.min(newIdx, realSolutions.length - 1));
    };

    // --- ENHANCED AUTO SCROLL ---
    const startAutoScroll = (resumeFromCurrent = true) => {
      const currentX = gsap.getProperty(slider, "x") as number;

      // Calculate remaining distance to avoid "speed jumping"
      const remainingDist = Math.abs(-totalWidth - currentX);
      const totalDist = totalWidth;
      const progressRemaining = remainingDist / totalDist;

      autoTweenRef.current = gsap.to(slider, {
        x: -totalWidth,
        duration: resumeFromCurrent ? 45 * progressRemaining : 45,
        ease: "none",
        onUpdate: applyCurve,
        onComplete: () => {
          gsap.set(slider, { x: 0 });
          startAutoScroll(false); // Loop from start
        },
      });
    };

    const killActiveTweens = () => {
      autoTweenRef.current?.kill();
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleInteractionEnd = () => {
      killActiveTweens();
      // Wait 2 seconds of inactivity before resuming
      timerRef.current = setTimeout(() => startAutoScroll(true), 2000);
    };

    // --- DRAGGABLE ---
    const draggables = Draggable.create(slider, {
      type: "x",
      edgeResistance: 0.9,
      bounds: { minX: -totalWidth, maxX: 0 },
      inertia: true,
      onPress: killActiveTweens,
      onDrag: applyCurve,
      onThrowUpdate: applyCurve,
      onDragEnd: handleInteractionEnd,
      onThrowComplete: handleInteractionEnd,
    });

    startAutoScroll();
    applyCurve();

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      draggables[0].kill();
      killActiveTweens();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [allCards.length, realSolutions.length]);

  return (
    <section className="relative min-h-screen bg-[#050101] text-[#f0ead8] overflow-hidden flex flex-col justify-center py-20 select-none">
      <style>{`.carousel-card { cursor: grab; } .carousel-card:active { cursor: grabbing; }`}</style>

      <div className="relative z-30 container mx-auto px-10 mb-12 text-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
          Platform <span style={{ color: themeRed }}>Solutions</span>
        </h2>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.4em] opacity-30 animate-pulse">
          Drag to pause • Auto-scrolling active
        </p>
      </div>

      <div className="relative h-[500px] w-full [perspective:2000px] z-10">
        <div
          ref={sliderRef}
          className="absolute inset-0 flex items-center px-[40vw] [transform-style:preserve-3d]"
        >
          {allCards.map((item, idx) => (
            <div
              key={idx}
              style={
                {
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(178, 34, 34, 0.35), transparent 40%)`,
                } as any
              }
              className={`carousel-card group absolute h-[460px] rounded-[2.5rem] border overflow-hidden shrink-0 
                ${item.empty ? "bg-transparent border-white/5" : "bg-white/[0.03] border-white/10 hover:border-[#B22222]/50"}
              `}
            >
              {!item.empty && (
                <div className="h-full w-full p-10 flex flex-col justify-end">
                  <span className="text-[#B22222] text-[9px] font-bold tracking-widest uppercase font-mono">
                    {item.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mt-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/40 font-mono mt-4 leading-relaxed max-w-[220px]">
                    {item.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-12 mt-16 relative z-30">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.5em] text-white/20">
          <ChevronLeft className="w-3 h-3" />
          <div className="flex gap-3">
            {realSolutions.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] transition-all duration-500 ${i === activeIdx ? "w-8 bg-[#B22222]" : "w-2 bg-white/10"}`}
              />
            ))}
          </div>
          <div style={{ color: themeRed }} className="font-bold">
            SEC_0{activeIdx + 1}
          </div>
        </div>
      </div>
    </section>
  );
}
