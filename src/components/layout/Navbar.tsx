"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themeRed = "#B22222";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-100 transition-all duration-500 px-6",
        scrolled
          ? "py-4 bg-[#050101]/60 backdrop-blur-xl border-b border-[#B22222]/10"
          : "py-8 bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group relative z-110">
          <div className="w-9 h-9 rounded-lg bg-[#B22222] flex items-center justify-center shadow-[0_0_20px_rgba(178,34,34,0.3)] group-hover:shadow-[0_0_30px_rgba(178,34,34,0.6)] transition-all duration-500">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-[#f0ead8]">
            Fin<span style={{ color: themeRed }}>ID</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-[#f0ead8]/40">
            <Link
              href="#product"
              className="hover:text-[#B22222] transition-colors"
            >
              Product
            </Link>
            <Link
              href="#solutions"
              className="hover:text-[#B22222] transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#api"
              className="hover:text-[#B22222] transition-colors"
            >
              API
            </Link>
            <Link
              href="#docs"
              className="hover:text-[#B22222] transition-colors"
            >
              Docs
            </Link>
            <Link
              href="#team"
              className="hover:text-[#B22222] transition-colors"
            >
              Team
            </Link>
          </div>

          <div className="h-4 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-[#f0ead8]/60 hover:text-white hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest"
            >
              Log In
            </Button>
            <Button className="rounded-full bg-[#B22222] hover:bg-[#8B0000] text-white px-6 font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(178,34,34,0.2)] hover:shadow-[0_0_30px_rgba(178,34,34,0.4)] transition-all">
              Initialize Access
            </Button>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden relative z-110 p-2 text-[#f0ead8]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={cn(
          "fixed inset-0 bg-[#050101] z-105 flex flex-col items-center justify-center transition-all duration-700 ease-in-out px-8 md:hidden",
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      >
        {/* Subtle background glow for mobile menu */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-75 bg-[#B22222]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col gap-8 w-full max-w-sm relative z-10">
          {[
            { name: "Product", href: "#product" },
            { name: "Solutions", href: "#solutions" },
            { name: "API Reference", href: "#api" },
            { name: "Documentation", href: "#docs" },
            { name: "Tea,", href: "#team" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/5 pb-4"
            >
              <span className="text-4xl font-black uppercase tracking-tighter text-[#f0ead8] group-hover:text-[#B22222] transition-colors">
                {item.name}
              </span>
              <ChevronRight className="w-6 h-6 text-[#B22222] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}

          <div className="mt-8 flex flex-col gap-4">
            <Button className="w-full h-16 rounded-2xl bg-[#B22222] text-white text-lg font-black uppercase tracking-widest">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="w-full h-16 rounded-2xl border-white/10 bg-transparent text-[#f0ead8] text-lg font-black uppercase tracking-widest hover:bg-white/5"
            >
              Login
            </Button>
          </div>
        </div>

        {/* System footer in mobile menu */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
            FinID Protocol Secure Node
          </p>
        </div>
      </div>
    </nav>
  );
}
