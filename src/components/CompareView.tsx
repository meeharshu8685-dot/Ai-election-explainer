import { useState } from 'react';
import { motion } from 'framer-motion';
import { View } from '@/types';
import { COMPARISONS } from '@/lib/ui-data';
export function CompareView() {
  const [active, setActive] = useState(0);
  const c = COMPARISONS[active];
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <p className="section-eyebrow">Comparison Engine</p>
      <h2 style={{ fontSize: 28, marginBottom: 24 }}>Side-by-side comparisons</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {COMPARISONS.map((c, i) => (
          <button key={i} className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => setActive(i)} style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            background: active === i ? 'var(--text-primary)' : 'var(--bg-card)',
            color: active === i ? '#fff' : 'var(--text-secondary)',
            border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif',
          }} aria-pressed={active === i} aria-controls="comparison-details">{c.title}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} id="comparison-details" role="region" aria-live="polite" aria-label={`Comparison of ${c.left.name} and ${c.right.name}`}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[c.left, c.right].map((side, si) => (
              <div key={si} className="card" style={{ padding: 28 }}>
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 17, color: side.color, marginBottom: 20 }}>{side.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {side.points.map((pt, pi) => (
                    <div key={pi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: side.color, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

