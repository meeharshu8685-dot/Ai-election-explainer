import { motion } from 'framer-motion';
import { View } from '@/types';
import { SCENARIOS } from '@/lib/ui-data';
export function ScenariosView({ sendDirect, setView }: { sendDirect: (u: string, a: string) => void; setView: (v: View) => void }) {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <p className="section-eyebrow">Scenario Guidance</p>
      <h2 style={{ fontSize: 28, marginBottom: 8 }}>Your situation, step-by-step.</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>Real civic guidance for real-life situations.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {SCENARIOS.map((s, i) => (
          <motion.div key={i} className="card" style={{ padding: 28 }} whileHover={{ y: -2 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">{s.icon}</div>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{s.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.steps.map((step, si) => (
                <div key={si} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)', fontWeight: 700, fontSize: 11, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{si + 1}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { sendDirect(s.title, s.answer); setView('chat'); }}
              className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              style={{ marginTop: 20, fontSize: 12, color: 'var(--accent-dark)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
              aria-label={`Get full guidance on: ${s.title}`}>
              Get full guidance →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

