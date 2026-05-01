import { motion } from 'framer-motion';
import { View } from '@/types';
import { GUIDED_PATHS, TOPICS, COMPARISONS } from '@/lib/ui-data';
export function HomeView({ setView, onQuery, onSendDirect }: { setView: (v: View) => void; onQuery: (q: string) => void; onSendDirect: (u: string, a: string) => void }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 24px 64px', textAlign: 'center' }}>
        <div className="container">
          <div className="fade-up">
            <span className="badge badge-accent" style={{ marginBottom: 20, display: 'inline-block' }}>India's Civic Guide Platform</span>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.03em' }}>
              Understand Elections<br />
              <span style={{ color: 'var(--accent)' }}>Without the Noise.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
              Interactive civic guidance for first-time and informed voters. Simple. Structured. Trustworthy.
            </p>
          </div>
          <div className="fade-up-2" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => setView('chat')} aria-label="Start interacting with Election Copilot">Start Journey →</button>
            <button className="btn-secondary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => setView('compare')} aria-label="Go to Compare Institutions view">Compare Institutions</button>
          </div>
        </div>
      </section>

      {/* Guided Paths */}
      <section style={{ padding: '0 24px 64px' }}>
        <div className="container">
          <p className="section-eyebrow fade-up">Guided Paths</p>
          <h2 className="fade-up" style={{ fontSize: 28, marginBottom: 32 }}>Where would you like to start?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {GUIDED_PATHS.map((p, i) => (
              <motion.button key={i} whileHover={{ y: -3 }} transition={{ duration: 0.15 }}
                onClick={() => { if (p.action) { setView(p.action); } else if (p.answer) { onSendDirect(p.title, p.answer); setView('chat'); } else { onQuery(p.query!); setView('chat'); } }}
                className="card focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" style={{ padding: 24, textAlign: 'left', cursor: 'pointer', background: 'none', border: '1px solid var(--border)', display: 'block', width: '100%' }}
                aria-label={`Guide for: ${p.title}`}>
                <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">{p.icon}</div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p.desc}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Explorer */}
      <section style={{ padding: '48px 24px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="section-eyebrow">Topic Explorer</p>
          <h2 style={{ fontSize: 24, marginBottom: 24 }}>Browse by topic</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TOPICS.map((t, i) => (
              <button key={i} onClick={() => { onQuery(t.query); setView('chat'); }}
                className="btn-secondary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" style={{ padding: '8px 16px', fontSize: 13 }}
                aria-label={`Ask about ${t.label}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Teaser */}
      <section style={{ padding: '64px 24px' }}>
        <div className="container">
          <p className="section-eyebrow">Comparison Engine</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 28 }}>Side-by-side comparisons</h2>
            <button className="btn-secondary focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => setView('compare')} aria-label="See all comparisons">See all →</button>
          </div>
          <div className="compare-grid">
            <div className="compare-cell" style={{ background: '#eff6ff', fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, color: '#2563eb' }}>Lok Sabha</div>
            <div className="compare-cell" style={{ background: '#f5f3ff', fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, color: '#7c3aed' }}>Rajya Sabha</div>
            {[['543 elected seats', '245 seats'], ['Directly elected by citizens', 'Elected by state MLAs'], ['5-year term, can dissolve', 'Permanent, 6-year terms'], ['Supreme on Money Bills', 'Reviews and revises bills']].map(([l, r], i) => (
              <>
                <div key={`l${i}`} className="compare-cell" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>✓ {l}</div>
                <div key={`r${i}`} className="compare-cell" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>✓ {r}</div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Built for the Google Antigravity Challenge · Election Copilot © 2025</p>
      </footer>
    </div>
  );
}

