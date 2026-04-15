"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, Sparkles, Users } from 'lucide-react';

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const themeRed = "#B22222";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Request failed');

      toast({
        title: "ACCESS GRANTED",
        description: "Your digital signature has been recorded for priority deployment.",
      });
      setEmail('');
    } catch (error) {
      console.error("Waitlist error:", error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Unable to establish secure link. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 relative bg-[#050101] overflow-hidden">

      {/* RADIANT AMBIENCE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#B22222]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">

          {/* TOP PILL */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#450a0a]/40 border border-[#B22222]/30 text-[#B22222] font-mono text-[10px] uppercase tracking-[0.3em] mb-12 shadow-[0_0_20px_rgba(178,34,34,0.15)]">
            <Users className="w-3 h-3" />
            <span>Limited Nodes Available</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none mb-8 text-[#f0ead8]">
            Secure your <span style={{ color: themeRed, textShadow: '0 0 30px rgba(178,34,34,0.4)' }}>FinID</span>
          </h2>

          <p className="text-[#f0ead8]/50 text-lg md:text-xl max-w-xl mx-auto mb-16 leading-relaxed font-light">
            Be the first to claim your portable financial credential. No middlemen. No borders. Total autonomy.
          </p>

          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[#B22222]/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />

            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col sm:flex-row gap-3 p-2 bg-[#0a0101] border border-white/10 rounded-[2rem] sm:rounded-full"
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B22222]/60" />
                <Input
                  type="email"
                  placeholder="name@institution.com"
                  className="h-14 pl-14 bg-transparent border-none text-[#f0ead8] placeholder:text-white/10 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-14 px-10 rounded-full bg-[#B22222] hover:bg-[#8B0000] text-white font-bold text-md uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_rgba(178,34,34,0.2)] hover:shadow-[0_0_30px_rgba(178,34,34,0.5)] active:scale-95"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    Claim Slot <Sparkles className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
              Encrypted end-to-end · Zero-knowledge proofs active
            </p>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#B22222]/30" />
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}