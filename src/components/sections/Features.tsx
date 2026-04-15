"use client";

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe2, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export function PlatformSolutions() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const themeRed = "#B22222"; 

  const realSolutions = [
    { title: "Real-time Verification", category: "Network", img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_backoffice-284x480.webp", icon: <Zap />, desc: "Unified verification layer for global banking networks." },
    { title: "Encrypted Trust Layer", category: "Security", img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_risk_management_tool-284x480.webp", icon: <Shield />, desc: "End-to-end encryption for sensitive financial metadata." },
    { title: "Borderless Identity", category: "Global", img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_payments_suite-284x480.webp", icon: <Globe2 />, desc: "Travel-ready credentials recognized by 150+ institutions." },
    { title: "Predictive Analytics", category: "Intelligence", img: "https://broadwayplatform.com/wp-content/uploads/2025/06/upd_card_managed_services-284x480.webp", icon: <BarChart3 />, desc: "ML models forecasting behavior patterns in real-time." },
    { title: "Portable Credential", category: "Deployment", img: "https://broadwayplatform.com/wp-content/uploads/2025/05/upd_card_cms-284x480.webp", icon: <Zap />, desc: "Deploy your financial identity across any digital platform." }
  ];

  const allCards = [...realSolutions, ...Array(5).fill({ empty: true })];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");
    const cardWidth = 320; 
    const gap = 40;
    const totalWidth = (cardWidth + gap) * (allCards.length - 1);

    gsap.set(cards, { 
      width: cardWidth,
      x: (i) => i * (cardWidth + gap) 
    });

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const applyCurve = (currentX: number) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const viewportCenter = window.innerWidth / 2;
        const cardCenter = rect.left + rect.width / 2;
        const distFromCenter = (cardCenter - viewportCenter) / (window.innerWidth / 2);
        const absDist = Math.abs(distFromCenter);

        gsap.set(card, {
          rotationY: distFromCenter * -12, 
          translateZ: absDist * -120, 
          opacity: 1 - absDist * 0.4, 
          filter: absDist > 0.4 ? `blur(${absDist * 1.5}px)` : "none", 
          scale: 1 - absDist * 0.05,
          transformPerspective: 1200,
        });
      });
    };

    const draggables = Draggable.create(slider, {
      type: "x",
      edgeResistance: 0.9,
      bounds: { minX: -totalWidth, maxX: 0 },
      inertia: true,
      onDrag: function(this: any) { applyCurve(this.x); },
      onThrowUpdate: function(this: any) {
        applyCurve(this.x);
        setActiveIdx(Math.round(Math.abs(this.x / (cardWidth + gap))));
      },
      onDragEnd: function(this: any) {
        setActiveIdx(Math.round(Math.abs(this.x / (cardWidth + gap))));
      }
    });

    applyCurve(0);
    return () => {
      draggables[0].kill();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [allCards.length]);

  return (
    <section className="relative min-h-screen bg-[#050101] text-[#f0ead8] overflow-hidden flex flex-col justify-center select-none py-20">
      
      {/* REFLECTIVE BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-[#B22222]/5 rounded-full blur-[160px]" />
      </div>

      {/* HEADER */}
      <div className="relative z-20 container mx-auto px-10 mb-16 text-center">
        <p style={{ color: themeRed }} className="font-mono tracking-[0.5em] uppercase text-[10px] mb-4 opacity-80 drop-shadow-[0_0_10px_rgba(178,34,34,0.5)]">
          Future of Global Finance
        </p>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-8">
          Platform <span style={{ color: themeRed, textShadow: '0 0 25px rgba(178,34,34,0.3)' }}>Solutions</span>
        </h2>
      </div>

      {/* 3D STAGE */}
      <div className="relative h-[520px] w-full [perspective:2000px] z-10 overflow-visible">
        <div ref={sliderRef} className="absolute inset-0 flex items-center px-[40vw] [transform-style:preserve-3d]">
          {allCards.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                // HIGH INTENSITY GRADIENT
                background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(178, 34, 34, 0.45), transparent 45%)`
              } as any}
              className={`carousel-card group absolute h-[480px] rounded-[2.5rem] border transition-all duration-300 overflow-hidden [transform-style:preserve-3d] shrink-0
                ${item.empty 
                  ? 'bg-transparent border-white/5' 
                  : 'bg-white/[0.02] border-white/10 hover:border-[#B22222] hover:shadow-[0_0_40px_rgba(178,34,34,0.25)]'
                }
              `}
            >
              {!item.empty && (
                <div className="h-full w-full p-10 flex flex-col justify-end relative">
                  {/* SPOTLIGHT IMAGE REVEAL */}
                  <div 
                    style={{
                      maskImage: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), black 40%, transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), black 40%, transparent 100%)`
                    } as any}
                    className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                  >
                    <img src={item.img} alt="" className="w-full h-full object-cover grayscale brightness-125" />
                  </div>

                  {/* GRADIENT OVERLAY FOR TEXT READABILITY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="px-3 py-1.5 rounded-lg bg-[#450a0a]/60 border border-[#B22222]/30 text-[#B22222] text-[9px] font-bold tracking-widest uppercase font-mono group-hover:bg-[#B22222] group-hover:text-white group-hover:border-[#B22222] transition-all duration-300 shadow-[0_0_15px_rgba(178,34,34,0)] group-hover:shadow-[0_0_15px_rgba(178,34,34,0.4)]">
                        {item.category}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight mb-4 leading-tight text-[#f0ead8] group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#f0ead8]/40 leading-relaxed font-mono group-hover:text-[#f0ead8]/80 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )}

              {item.empty && (
                <div className="h-full w-full flex items-center justify-center opacity-10">
                   <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="container mx-auto px-12 mt-12 relative z-30">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.5em] uppercase text-white/20">
          <div className="flex items-center gap-4 hover:text-[#B22222] transition-all cursor-pointer group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Navigation</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
          
          <div className="flex gap-4">
            {allCards.map((_, i) => (
              <div 
                key={i} 
                className={`h-[1px] transition-all duration-700 ${i === activeIdx ? 'w-10 bg-[#B22222] shadow-[0_0_10px_rgba(178,34,34,0.8)]' : 'w-2 bg-white/10'}`} 
              />
            ))}
          </div>
          
          <div style={{ color: themeRed }} className="font-bold opacity-80 drop-shadow-[0_0_5px_rgba(178,34,34,0.5)]">
            SEC_0{activeIdx + 1}
          </div>
        </div>
      </div>
    </section>
  );
}