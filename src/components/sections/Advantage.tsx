"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ADVANTAGES = [
  {
    id: 0,
    title: "Autonomous",
    content: "FinID removes the middleman. Your financial reputation is encrypted and owned entirely by you, not the banks. Complexity made simple—so you stay in control of your digital footprint across every network.",
    image: "https://broadwayplatform.com/wp-content/uploads/2026/03/Frame-10-574x661.png"
  },
  {
    id: 1,
    title: "Portable",
    content: "Take your creditworthiness anywhere. Our portable credential allows you to prove your financial standing in seconds, globally. Built for growth—designed for global ambition and modular AI architecture.",
    image: "https://broadwayplatform.com/wp-content/uploads/2026/03/Frame-11-574x661.png"
  },
  {
    id: 2,
    title: "Intelligence",
    content: "Serious performance behind every signal. FinID uses behavioral AI to anticipate opportunities and secure your assets before risks manifest. Enterprise-grade stability and innovation in one unified system.",
    image: "https://broadwayplatform.com/wp-content/uploads/2026/03/Frame-12-574x680.png"
  }
];

export function AdvantagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. BACKGROUND EXPANSION
      gsap.fromTo(".clip-bg", 
        { clipPath: "circle(0% at 50% 50%)", backgroundColor: "#B22222" },
        {
          clipPath: "circle(150% at 50% 50%)",
          backgroundColor: "#ffffff",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              setIsLight(self.progress > 0.4);
            }
          }
        }
      );

      // 2. TAB SWITCHING LOGIC (Reduced runway to 450vh to remove extra black space)
      ADVANTAGES.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: `top+=${i * 150}vh top`, 
          end: `top+=${(i + 1) * 150}vh top`,
          onToggle: (self) => self.isActive && setActiveTab(i),
        });
      });

      // 3. IMAGE PINNING
      gsap.to(".image-container", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0a0101]">
      
      {/* Reduced Height to 450vh to eliminate excessive black scrolling */}
      <div ref={triggerRef} className="relative h-[500vh] w-full">
        
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="clip-bg absolute inset-0 z-0" />

          <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative z-10">
            
            {/* LEFT: IMAGE (Desktop Only) */}
            <div className="hidden md:block col-span-5 lg:col-span-5 image-container">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-black/10 shadow-2xl">
                {ADVANTAGES.map((adv, i) => (
                  <img
                    key={adv.id}
                    src={adv.image}
                    alt={adv.title}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out",
                      activeTab === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: CONTENT & TABS */}
            <div className="col-span-full md:col-span-7 lg:col-span-7 flex flex-col justify-center py-10">
              <span className={cn(
                "text-xs font-mono font-bold uppercase tracking-[0.5em] mb-12 transition-colors duration-500",
                isLight ? "text-[#B22222]" : "text-white/80"
              )}>
                Advantages you can rely on
              </span>

              {/* DESKTOP TABS */}
              <div className="hidden md:flex flex-col gap-12 lg:gap-16">
                {ADVANTAGES.map((adv, i) => (
                  <div key={adv.id} className="relative">
                    <button 
                      className={cn(
                        "text-5xl lg:text-[5.5vw] font-black uppercase tracking-tighter transition-all duration-700 text-left leading-none",
                        activeTab === i 
                          ? (isLight ? "text-black" : "text-white") 
                          : (isLight ? "text-black/5" : "text-white/5")
                      )}
                    >
                      {adv.title}
                    </button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-1000 ease-in-out",
                      activeTab === i ? "max-h-60 opacity-100 mt-8" : "max-h-0 opacity-0"
                    )}>
                      <p className={cn(
                        "text-lg lg:text-xl font-medium max-w-xl leading-[1.8] transition-colors duration-500",
                        isLight ? "text-black/70" : "text-white/90"
                      )}>
                        {adv.content}
                      </p>
                    </div>

                    <div className={cn(
                      "w-full h-[1px] mt-6 relative overflow-hidden transition-colors duration-500",
                      isLight ? "bg-black/10" : "bg-white/10"
                    )}>
                        <div 
                          className={cn(
                            "absolute top-0 left-0 h-full bg-[#B22222] transition-all duration-[1500ms] ease-out",
                            activeTab === i ? "w-full" : "w-0"
                          )} 
                        />
                    </div>
                  </div>
                ))}
              </div>

              {/* MOBILE ACCORDION */}
              <div className="md:hidden flex flex-col gap-6 w-full">
                {ADVANTAGES.map((adv, i) => (
                  <div 
                    key={adv.id} 
                    className={cn(
                      "rounded-3xl border p-8 transition-all duration-700",
                      activeTab === i 
                        ? (isLight ? "bg-white border-black/10 shadow-xl" : "bg-[#B22222] border-white/20") 
                        : "bg-white/5 border-white/10"
                    )}
                  >
                    <button 
                      onClick={() => setActiveTab(i)}
                      className="w-full flex justify-between items-center"
                    >
                      <span className={cn(
                        "text-3xl font-black uppercase tracking-tighter",
                        activeTab === i ? "text-white" : "text-white/40"
                      )}>
                        {adv.title}
                      </span>
                      <ChevronDown className={cn(
                        "w-6 h-6 transition-transform duration-500",
                        activeTab === i ? "rotate-180 text-white" : "text-white/20"
                      )} />
                    </button>
                    
                    <div className={cn(
                      "grid transition-all duration-700 ease-in-out",
                      activeTab === i ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <img src={adv.image} className="rounded-2xl mb-8 w-full aspect-[4/5] object-cover" alt="" />
                        <p className="text-base leading-[1.8] text-white/90 font-medium">
                          {adv.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}