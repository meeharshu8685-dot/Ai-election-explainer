import { useState, useCallback } from 'react';
import { Message } from '@/types';

export function useElectionChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'w', role: 'assistant', content: 'Hello! 👋 Ask me anything about Indian elections — voter registration, EVMs, Parliament, results, and more. You can also use the Scenarios or Compare tabs above!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [explainLevel, setExplainLevel] = useState<'normal' | 'child'>('normal');

  // Inject a pre-written answer directly (no API call)
  const sendDirect = useCallback((userText: string, answer: string) => {
    const userId = Date.now().toString();
    const aiId = (Date.now() + 1).toString();
    setMessages(p => [
      ...p,
      { id: userId, role: 'user', content: userText },
      { id: aiId, role: 'assistant', content: answer },
    ]);
  }, []);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userId = Date.now().toString();
    const aiId = (Date.now() + 1).toString();
    setMessages(p => [...p, { id: userId, role: 'user', content: text }, { id: aiId, role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: text }], explainLevel }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        setMessages(p => p.map(m => m.id === aiId ? { ...m, content: m.content + chunk } : m));
      }
    } catch {
      setMessages(p => p.map(m => m.id === aiId ? { ...m, content: 'Sorry, something went wrong. Please try again.' } : m));
    } finally {
      setLoading(false);
    }
  }, [loading, explainLevel]);

  return { messages, input, setInput, loading, send, sendDirect, explainLevel, setExplainLevel };
}

export type ChatHookReturn = ReturnType<typeof useElectionChat>;
