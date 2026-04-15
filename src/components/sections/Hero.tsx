"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featherRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const themeRed = "#B22222"; 

  useEffect(() => {
    const video = videoRef.current;

    const ctx = gsap.context(() => {
      // 1. SMOOTHER VIDEO SCRUB
      if (video) {
        video.onloadedmetadata = () => {
          gsap.to(video, {
            currentTime: video.duration || 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 2.2, 
            },
          });
        };
      }

      // 2. STAGGERED WORD REVEAL
      // This animates child spans for a "wave" effect on the text
      const revealItems = gsap.utils.toArray(".reveal-item");
      
      revealItems.forEach((item: any) => {
        gsap.fromTo(item, 
          { 
            y: 100, 
            opacity: 0,
            rotateX: -20, // Adds a slight 3D tilt as it enters
            transformPerspective: 1000
          },
          {
            y: 0, 
            opacity: 1,
            rotateX: 0,
            ease: "power4.out",
            duration: 2.5,
            scrollTrigger: {
              trigger: item,
              start: "top 98%", 
              end: "top 70%",
              scrub: 1.2,
            }
          }
        );
      });

      // 3. FEATHER DRIFT (HEAVIER LAG)
      gsap.to(featherRef.current, {
        y: "50vh",
        x: "3vw",
        rotation: 15,
        opacity: 0.2,
        scale: 0.7,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 4, // Very heavy lag for premium feel
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#0a0101] text-[#f0ead8] overflow-hidden selection:bg-[#B22222] font-['Syne',sans-serif]">
      
      {/* VIGNETTE & GRID */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[70vh] bg-[#450a0a]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `linear-gradient(${themeRed} 1px, transparent 1px), linear-gradient(90deg, ${themeRed} 1px, transparent 1px)`, backgroundSize: '120px 120px' }} 
      />

      {/* BACKGROUND VIDEO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video ref={videoRef} muted playsInline className="w-full h-full object-cover opacity-10 grayscale brightness-50">
          <source src="/your-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0101] via-transparent to-[#0a0101]" />
      </div>

      {/* HERO CONTENT */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-6 gap-0 px-10 pt-40 pb-64">
        
        <div className="hidden md:block col-span-1" />

        <div className="col-span-full md:col-span-4 flex flex-col items-start">
          
          {/* UPTITLE */}
          <div className="reveal-item mb-20 flex items-center gap-4"> 
            <span style={{ backgroundColor: themeRed }} className="w-2 h-2 rounded-full shadow-[0_0_15px_rgba(178,34,34,0.6)]" />
            <p style={{ color: themeRed }} className="text-xs font-bold tracking-[0.6em] uppercase font-mono opacity-60">
              AI-native financial identity
            </p>
          </div>

          {/* HEADLINE SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-40">
            
            <div className="col-span-full lg:col-span-10">
              {/* FIXED: Increased line-height (leading-[1.4]) for more space between lines */}
              <h1 className="text-[11vw] md:text-[7.5vw] font-black uppercase tracking-tighter leading-[1.4]">
                <span className="reveal-item block">Launch.</span>
                <span className="reveal-item block text-white/10">Manage.</span>
                <span className="reveal-item block">
                    Lead your <span style={{ color: themeRed }}>Wealth.</span>
                </span>
              </h1>
            </div>

            <div ref={featherRef} className="col-span-full lg:col-span-2 pt-12">
              <img 
                src="https://broadwayplatform.com/wp-content/uploads/2025/05/spribe-logo-117x40.webp" 
                alt="Partner" 
                className="w-full h-auto grayscale opacity-40 blur-[1px] hover:blur-0 transition-all duration-1000" 
              />
            </div>
          </div>

          {/* DEMO BUTTON */}
          <div className="reveal-item mt-10 mb-32 group inline-flex items-center cursor-pointer border-b border-white/5 pb-6 hover:border-[#B22222]/40 transition-all duration-1000">
            <span className="text-[10px] font-bold tracking-[0.8em] uppercase mr-12 font-mono">Join the waitlist</span>
            <ArrowRight style={{ color: themeRed }} className="w-5 h-5 group-hover:translate-x-10 transition-transform duration-1000 ease-in-out" />
          </div>

          {/* FOOTER SUBTEXT */}
          <div className="max-w-xl">
            <p className="reveal-item text-lg font-light leading-[2] text-[#a09880]/60 font-mono">
              FinID builds a living AI profile of your financial identity — 
              merging behavioral patterns into a single, high-trust credential.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}