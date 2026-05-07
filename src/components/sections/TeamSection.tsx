"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEAM = [
  {
    name: "Agnes Ekpor",
    role: "Founder & CEO",
    bio: "Visionary leader bridging the gap between traditional finance and decentralized identity systems.",
    image: "./images/agnes_ekpor.png",
    speed: "0.1",
  },
  {
    name: "Ajibola Daniel",
    role: "Chief Operating Officer",
    bio: "Expert in behavioral AI and user experience, ensuring Agnexi remains intuitive yet powerful.",
    image: "./images/ajibola_daniel.png",
    speed: "0.2",
  },
  {
    name: "Festus Okon",
    role: "Head of Design & Engineering",
    bio: "The architect behind our encrypted reputation engine and global network scalability.",
    image: "./images/festus_okon.png",
    speed: "0.15",
  },
  {
    name: "Priscillia Alex",
    role: "Director of Strategy",
    bio: "Specializes in cross-border wealth regulations and institutional partnerships worldwide.",
    image: "./images/priscillia_alex.png",
    speed: "0.25",
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for individual cards
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card) => {
        const speed = parseFloat(card.getAttribute("data-speed") || "0");
        gsap.to(card, {
          y: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-40 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-20">
        {/* SECTION HEADER */}
        <div className="mb-20 md:mb-32 max-w-4xl">
          <span className="text-[#B22222] text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
            The Minds Behind Agnexi
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black">
            Driven by <br /> <span className="opacity-20">Innovation.</span>
          </h2>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {TEAM.map((member, i) => (
            <div
              key={i}
              data-speed={member.speed}
              className={cn(
                "team-card flex flex-col group",
                // Staggering the vertical start position on desktop
                i % 2 !== 0 ? "md:mt-20" : "md:mt-0",
              )}
            >
              {/* IMAGE WRAPPER */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-black/5 mb-8">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />

                {/* SOCIAL HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-[#B22222] hover:text-white transition-colors">
                    <FaLinkedin size={20} />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-[#B22222] hover:text-white transition-colors">
                    <FaTwitter size={20} />
                  </div>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-3">
                <h4 className="text-2xl font-black uppercase tracking-tighter text-black">
                  {member.name}
                </h4>
                <p className="text-[#B22222] text-xs font-bold uppercase tracking-widest">
                  {member.role}
                </p>
                <p className="text-black/50 text-sm leading-relaxed font-medium pt-2 border-t border-black/5">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA / PARTNERSHIP RECAP */}
        <div className="mt-40 pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <p className="text-2xl font-bold tracking-tight text-black">
              In partnership with <span className="text-[#B22222]">SPRIBE</span>
              , we are redefining the global standard for digital identity.
            </p>
          </div>
          <div className="bg-[#0a0101] p-8 md:p-12 rounded-[2.5rem] text-white md:max-w-md">
            <p className="text-white/60 text-sm font-mono leading-relaxed italic">
              "Our collective responsibility is to provide a secure, autonomous,
              and memorable digital experience for millions of daily users."
            </p>
            <div className="mt-6">
              <p className="text-sm font-black uppercase tracking-widest">
                Official Executive Statement
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Closing container */}
    </section>
  );
}
