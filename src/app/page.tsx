'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Map, 
  ShieldCheck, 
  Gamepad2, 
  Info, 
  Send, 
  User, 
  ChevronRight,
  Timeline as TimelineIcon,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MODES = [
  { id: 'Learn Mode', icon: Info, label: 'Learn', color: 'text-blue-400' },
  { id: 'Guide Mode', icon: Map, label: 'Guide', color: 'text-emerald-400' },
  { id: 'Simulation Mode', icon: Gamepad2, label: 'Simulate', color: 'text-amber-400' },
  { id: 'Fact Check Mode', icon: ShieldCheck, label: 'Fact Check', color: 'text-red-400' },
];

const PERSONAS = ['Beginner', 'Student', 'Expert'];

export default function ElectionCopilot() {
  const [mode, setMode] = useState('Learn Mode');
  const [persona, setPersona] = useState('Beginner');
  const [explainLevel, setExplainLevel] = useState<'normal' | 'child'>('normal');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { mode, persona, explainLevel },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your Election Copilot. Ready to explore democracy? Choose a mode above to get started!",
      },
    ],
  });

  return (
    <main className="flex h-screen max-h-screen p-4 gap-4 overflow-hidden">
      {/* Sidebar / Navigation */}
      <nav className="w-20 lg:w-64 glass-panel flex flex-col p-4 gap-6">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <h1 className="hidden lg:block font-bold text-xl tracking-tight">Copilot</h1>
        </div>

        <div className="flex flex-col gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                mode === m.id ? "bg-white/10 text-white shadow-lg" : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <m.icon size={20} className={m.color} />
              <span className="hidden lg:block font-medium">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <div className="hidden lg:block space-y-2 px-2">
            <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Persona</label>
            <div className="flex bg-white/5 rounded-lg p-1">
              {PERSONAS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={cn(
                    "flex-1 text-xs py-1.5 rounded-md transition-all",
                    persona === p ? "bg-white/10 text-white shadow" : "text-white/40 hover:text-white/60"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setExplainLevel(prev => prev === 'normal' ? 'child' : 'normal')}
            className={cn(
              "flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl border border-white/10 transition-all",
              explainLevel === 'child' ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-white/5 text-white/50"
            )}
          >
            <HelpCircle size={20} />
            <span className="hidden lg:block text-sm font-medium">Explain like I'm 12</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col gap-4">
        {/* Top Stats / Timeline Bar */}
        <div className="h-20 glass-panel flex items-center px-6 gap-8">
          <div className="flex items-center gap-4 flex-1">
            <TimelineIcon className="text-white/40" size={20} />
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 w-[45%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
            <span className="text-xs font-bold text-white/40 uppercase tracking-tighter">Campaign Stage</span>
          </div>
          <div className="hidden md:flex gap-6">
             <div className="text-right">
                <p className="text-[10px] text-white/30 uppercase font-bold">Next Milestone</p>
                <p className="text-sm font-medium">Voting Day (May 12)</p>
             </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 glass-panel flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex w-full gap-4",
                    m.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg",
                    m.role === 'user' 
                      ? "bg-blue-600 text-white shadow-blue-900/40 rounded-tr-none" 
                      : "bg-slate-800/50 border border-white/10 text-white/90 rounded-tl-none backdrop-blur-sm"
                  )}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="relative">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder={mode === 'Simulation Mode' ? "Choose your move..." : "Ask me anything about elections..."}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
              />
              <button
                type="submit"
                disabled={!input || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} className="text-white" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Right Panels (Dynamic Context) */}
      <aside className="hidden xl:flex w-80 flex-col gap-4">
        <div className="glass-panel p-6 space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <AlertTriangle className="text-amber-400" size={18} />
            Misinformation Alert
          </h3>
          <div className="glass-card p-4 text-xs space-y-3">
            <p className="text-white/70">"EVMs can be hacked easily by connecting them to Bluetooth."</p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-red-400 font-bold uppercase tracking-widest text-[9px]">Fact: False</span>
              <button className="text-blue-400 font-medium hover:underline">Read source</button>
            </div>
          </div>
        </div>

        <div className="glass-panel flex-1 p-6 space-y-6 overflow-y-auto">
          <h3 className="font-bold flex items-center gap-2">
            <TimelineIcon className="text-blue-400" size={18} />
            Election Timeline
          </h3>
          <div className="space-y-6 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10" />
            {[
              { label: 'Schedule Announcement', date: 'March 16', status: 'completed' },
              { label: 'Notification Phase 1', date: 'March 20', status: 'completed' },
              { label: 'Campaign Period', date: 'April - May', status: 'active' },
              { label: 'Voting Day', date: 'May 12', status: 'upcoming' },
              { label: 'Counting Day', date: 'June 4', status: 'upcoming' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center z-10",
                  step.status === 'completed' ? "bg-green-500/20 text-emerald-400" : 
                  step.status === 'active' ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : 
                  "bg-white/10"
                )}>
                  {step.status === 'completed' ? <ShieldCheck size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                <div>
                  <p className={cn("text-sm font-medium", step.status === 'upcoming' ? "text-white/40" : "text-white")}>{step.label}</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
