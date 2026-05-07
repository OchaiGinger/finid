"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Shield, Activity, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const FACTS = [
  {
    title: "Autonomous",
    text: "Decentralized reputation owned entirely by you.",
    icon: Shield,
    score: 98,
  },
  {
    title: "Intelligence",
    text: "Behavioral AI verifying history without raw data exposure.",
    icon: Activity,
    score: 84,
  },
  {
    title: "Integrity",
    text: "Real-time monitoring of global asset liquidity.",
    icon: Lock,
    score: 91,
  },
];

export function SleekScoreSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [particles, setParticles] = useState<
    { left: string; top: string; duration: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random particles only on the client after mount to fix hydration error
  useEffect(() => {
    const generatedParticles = [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 3,
    }));
    setParticles(generatedParticles);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] py-32 overflow-hidden text-white"
    >
      {/* GITHUB-STYLE FLOATING BACKGROUND ITEMS */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[10%] left-[15%] w-64 h-64 bg-[#B22222]/10 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-[#B22222]/5 rounded-full blur-[150px]"
        />

        {/* Render particles only if they have been generated on the client */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-[#B22222]/40 to-transparent"
            style={{
              left: p.left,
              top: p.top,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LEFT: THE HERO SCORE */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-[-20px] rounded-full border border-[#B22222]/30"
              />

              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-black border border-white/5 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(178,34,34,0.1)]">
                <Sparkles className="w-5 h-5 text-[#B22222] mb-4 animate-pulse" />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-7xl md:text-8xl font-black tracking-tighter"
                >
                  842
                </motion.span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 mt-2">
                  Trust Score
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: CLEAN CONTENT */}
          <div className="lg:col-span-7 space-y-2">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
              The <span className="text-[#B22222]">Facts.</span>
            </h2>

            <div className="space-y-4">
              {FACTS.map((item, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "relative p-6 rounded-2xl transition-all duration-500 cursor-pointer border",
                    activeIndex === i
                      ? "bg-white/5 border-white/10 shadow-2xl"
                      : "bg-transparent border-transparent opacity-40 hover:opacity-60",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          activeIndex === i
                            ? "bg-[#B22222] text-white"
                            : "bg-white/5 text-white/40",
                        )}
                      >
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold uppercase tracking-tight">
                          {item.title}
                        </h4>
                        <AnimatePresence>
                          {activeIndex === i && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="text-sm text-white/50 mt-2 max-w-sm leading-relaxed"
                            >
                              {item.text}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {activeIndex === i && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-right hidden md:block"
                      >
                        <span className="text-3xl font-black text-[#B22222]">
                          {item.score}%
                        </span>
                        <p className="text-[8px] uppercase tracking-widest text-white/30">
                          Verified
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {activeIndex === i && (
                    <motion.div
                      layoutId="loader"
                      className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#B22222]"
                      initial={{ width: 0 }}
                      animate={{ width: "calc(100% - 3rem)" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
