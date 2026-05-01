import { useRef, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ChatHookReturn } from './useElectionChat';
export function ChatView({ chat }: { chat: ChatHookReturn }) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat.messages]);

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); chat.send(chat.input); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
      {/* Toolbar */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span id="response-mode-label" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Response mode:</span>
        <div role="group" aria-labelledby="response-mode-label" style={{ display: 'flex', gap: 8 }}>
          {(['normal', 'child'] as const).map(l => (
            <button key={l} className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => chat.setExplainLevel(l)} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: chat.explainLevel === l ? 'var(--text-primary)' : 'transparent',
              color: chat.explainLevel === l ? '#fff' : 'var(--text-secondary)',
              border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif',
            }} aria-pressed={chat.explainLevel === l} aria-label={`Set response mode to ${l === 'normal' ? 'Detailed' : 'Explain Simply'}`}>
              {l === 'normal' ? 'Detailed' : 'Explain Simply'}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div role="log" aria-live="polite" aria-atomic="false" style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        {chat.messages.map(m => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && (
              <span style={{ width: 28, height: 28, background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, alignSelf: 'flex-end', marginRight: 8, marginBottom: 2 }} aria-hidden="true">🗳️</span>
            )}
            <div className={m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              {m.content || (chat.loading && m.role === 'assistant' ? (
                <span style={{ display: 'inline-flex', gap: 4 }}>
                  {[0,1,2].map(i => <span key={i} className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block', animationDelay: `${i * 0.2}s` }} />)}
                </span>
              ) : '')}
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
          <input value={chat.input} onChange={e => chat.setInput(e.target.value)}
            placeholder="Ask anything about elections..."
            aria-label="Ask anything about elections"
            className="focus-visible:ring-2 focus-visible:ring-accent"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'var(--bg)', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', color: 'var(--text-primary)' }} />
          <button type="submit" disabled={!chat.input.trim() || chat.loading} className="btn-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent" style={{ padding: '12px 20px' }} aria-label="Send message">Send</button>
        </form>
      </div>
    </div>
  );
}

