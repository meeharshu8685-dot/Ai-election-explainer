import { View } from '@/types';
export function Navbar({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <button className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => setView('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px' }} aria-label="Go to Home">
          <span style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} aria-hidden="true">🗳️</span>
          <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>Election Copilot</span>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['compare', 'scenarios', 'chat'] as View[]).map(v => (
            <button key={v} className="focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none" onClick={() => setView(v)} style={{
              padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)',
              background: view === v ? 'var(--text-primary)' : 'transparent',
              color: view === v ? '#fff' : 'var(--text-secondary)',
              fontWeight: 500, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
              fontFamily: 'Inter, sans-serif',
            }} aria-label={`Navigate to ${v} view`} aria-current={view === v ? 'page' : undefined}>
              {v === 'compare' ? 'Compare' : v === 'scenarios' ? 'Scenarios' : 'Ask Copilot'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

