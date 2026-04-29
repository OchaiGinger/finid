"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Loader2 } from "lucide-react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Secure Node...");

  const themeRed = "#B22222";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    const statusUpdates = [
      "Establishing Encrypted Link...",
      "Syncing Protocol v2.4.0...",
      "Verifying Identity Hashes...",
      "Access Granted.",
    ];

    let statusIdx = 0;
    const statusTimer = setInterval(() => {
      if (statusIdx < statusUpdates.length) {
        setStatus(statusUpdates[statusIdx]);
        statusIdx++;
      } else {
        clearInterval(statusTimer);
      }
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050101] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B22222]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#B22222] flex items-center justify-center shadow-[0_0_40px_rgba(178,34,34,0.4)] relative">
                <Shield className="w-10 h-10 text-white" />
                {/* Spinning Ring */}
                <div
                  className="absolute inset-[-10px] rounded-full border-t-2 border-r-2 border-[#B22222]/40 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </motion.div>

            {/* Branding */}
            <h1 className="text-3xl font-black tracking-tighter text-[#f0ead8] mb-8">
              AGN<span style={{ color: themeRed }}>EXI</span>
            </h1>

            {/* Progress Bar Container */}
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-[#B22222]"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>

            {/* Status Text */}
            <div className="flex justify-between w-full mb-1">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                {status}
              </span>
              <span className="text-[9px] font-mono text-[#B22222] font-bold">
                {Math.min(progress, 100)}%
              </span>
            </div>

            {/* System Details */}
            <div className="mt-12 text-center">
              <p className="text-[8px] font-mono text-white/10 uppercase tracking-[0.5em]">
                Broadway Platform · Protocol Node v2.4.0
              </p>
            </div>
          </div>

          {/* Grainy Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
