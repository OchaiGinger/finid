"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, Globe, Zap } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  const themeRed = "#B22222";
  const currentYear = new Date().getFullYear();

  // Fix for Hydration Mismatch: Ensure time-dependent content only renders on client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerLinks = {
    Platform: [
      { name: "Solutions", href: "#" },
      { name: "Security", href: "#" },
      { name: "Intelligence", href: "#" },
      { name: "Global Network", href: "#" },
    ],
    Company: [
      { name: "About Agnexi", href: "#" },
      { name: "Governance", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Status", href: "#" },
      { name: "Support", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#050101] border-t border-white/5 pt-24 pb-12 relative overflow-hidden font-['Syne',sans-serif]">
      {/* GLOW EFFECT */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[#B22222]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-24">
          {/* BRAND COLUMN */}
          <div className="col-span-full md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img
                src="/logo.png"
                alt="Agnexi Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="text-2xl font-black tracking-tighter text-[#f0ead8]">
                AGN<span style={{ color: themeRed }}>EXI</span>
              </span>
            </Link>
            <p className="text-[#f0ead8]/40 text-sm leading-relaxed max-w-[280px] font-light font-mono">
              The autonomous financial identity protocol. Decentralized,
              portable, and secure by design.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-8">
              {[FaTwitter, FaGithub, FaLinkedin].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-[#B22222] hover:border-[#B22222]/30 hover:bg-[#B22222]/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1 md:col-span-2">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#B22222] mb-8">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#f0ead8]/40 hover:text-white text-sm transition-colors duration-300 font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* SYSTEM STATUS COLUMN */}
          <div className="col-span-full md:col-span-2">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#B22222] mb-8">
              Connectivity
            </h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider">
                  Nodes Online
                </span>
              </div>
              <p className="text-[10px] font-mono text-white/20">
                L-API: 12ms <br />
                Global: Operational
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-white/10 tracking-widest uppercase">
            © {currentYear} BROADWAY PLATFORM · Agnexi PROTOCOL v2.4.0
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              <span>
                Standard Time:{" "}
                {mounted
                  ? new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : "--:--"}{" "}
                UTC
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
              <Zap className="w-3 h-3 text-[#B22222]" />
              <span>Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* MASSIVE DECORATIVE LOGO BACKGROUND */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.02]">
          <h1 className="text-[20vw] font-black tracking-tighter leading-none text-white uppercase">
            Agnexi
          </h1>
        </div>
      </div>
    </footer>
  );
}
