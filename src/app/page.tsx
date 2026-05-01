'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { View } from '@/types';
import { useElectionChat } from '@/components/useElectionChat';
import { Navbar } from '@/components/Navbar';
import { HomeView } from '@/components/HomeView';
import { CompareView } from '@/components/CompareView';
import { ScenariosView } from '@/components/ScenariosView';
import { ChatView } from '@/components/ChatView';

export default function App() {
  const [view, setView] = useState<View>('home');
  const chat = useElectionChat();

  const handleQuery = (q: string) => { chat.send(q); };
  const handleSendDirect = (userText: string, answer: string) => { chat.sendDirect(userText, answer); };

  return (
    <>
      <Navbar view={view} setView={setView} />
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          {view === 'home' && <HomeView setView={setView} onQuery={handleQuery} onSendDirect={handleSendDirect} />}
          {view === 'compare' && <CompareView />}
          {view === 'scenarios' && <ScenariosView sendDirect={handleSendDirect} setView={setView} />}
          {view === 'chat' && <ChatView chat={chat} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
