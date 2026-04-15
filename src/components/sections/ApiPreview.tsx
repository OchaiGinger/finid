
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Code2, Globe } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ApiPreview() {
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    curl: `curl -X GET "https://api.finid.io/v1/identity/842" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    node: `const finid = require('@finid/sdk');

const client = finid.init('YOUR_API_KEY');
const score = await client.identity.getScore('user_id_123');

console.log(score.trust_rating); // 842`,
    python: `import finid

client = finid.Client(api_key='YOUR_API_KEY')
user_identity = client.get_identity('user_id_123')

print(f"Trust Score: {user_identity.score}")`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#0C0E12]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Built for Developers</h2>
          <p className="text-muted-foreground text-lg">
            Integrate global trust data into your application in minutes. Simple, powerful, and secure by design.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#12151C] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-code">
                <Globe className="w-3 h-3" />
                api.finid.io/v1/identity
              </div>
              <div className="w-12" />
            </div>

            <Tabs defaultValue="curl" className="w-full">
              <div className="bg-[#12151C] px-6 pt-4 border-b border-white/10">
                <TabsList className="bg-white/5 border-none p-1">
                  <TabsTrigger value="curl" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-4 font-code text-xs">cURL</TabsTrigger>
                  <TabsTrigger value="node" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-4 font-code text-xs">Node.js</TabsTrigger>
                  <TabsTrigger value="python" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-4 font-code text-xs">Python</TabsTrigger>
                </TabsList>
              </div>

              {Object.entries(codeExamples).map(([key, code]) => (
                <TabsContent key={key} value={key} className="relative mt-0 group">
                  <pre className="p-8 font-code text-sm leading-relaxed overflow-x-auto text-blue-100 bg-[#07080A]/50">
                    <code>
                      {code.split('\n').map((line, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-white/20 select-none w-4">{i + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                  
                  <button 
                    onClick={() => copyToClipboard(code)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                  >
                    {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </TabsContent>
              ))}
            </Tabs>

            <div className="bg-primary/5 px-6 py-4 flex items-center gap-4 text-xs text-primary font-code border-t border-primary/20">
              <div className="flex gap-2 items-center">
                 <Terminal className="w-3 h-3" />
                 <span>Response: 200 OK</span>
              </div>
              <div className="flex gap-2 items-center">
                 <Code2 className="w-3 h-3" />
                 <span>identity_score: 842</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
