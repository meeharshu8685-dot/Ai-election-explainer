'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ────────────────────────────────────────────
interface Message { id: string; role: 'user' | 'assistant'; content: string; }
type View = 'home' | 'chat' | 'compare' | 'scenarios';

// ── Data ─────────────────────────────────────────────
const GUIDED_PATHS = [
  { icon: '🗳️', title: "I'm voting for the first time", desc: "Step-by-step voter registration and election day guide.", query: "How do I register to vote as a first time voter?" },
  { icon: '🏛️', title: "Explain elections simply", desc: "What are elections, why they matter, and how they work.", query: "What is an election and why is it important?" },
  { icon: '⚖️', title: "Compare institutions", desc: "Lok Sabha vs Rajya Sabha, MP vs MLA, and more.", action: 'compare' as View },
  { icon: '🖥️', title: "Understand EVMs", desc: "How voting machines work and why they're secure.", query: "What is an EVM and how does it work?" },
  { icon: '🛡️', title: "Myth vs Reality", desc: "Fact-check common election myths and misinformation.", query: "Can EVMs be hacked? Tell me about election myths." },
  { icon: '📋', title: "My Rights as a Voter", desc: "Know your rights at the polling booth.", query: "What documents are needed to vote and what are my voter rights?" },
];

const SCENARIOS = [
  {
    icon: '🎓', title: 'I moved to another city for college',
    steps: ['Vote in hometown, OR transfer registration using Form 6.', 'Go to voters.eci.gov.in to update your address.', 'You cannot vote in both places — choose one.'],
    answer: `🎓 You moved to another city for college — here's your guide:

Option 1: Vote in your Hometown
• Travel back on election day and vote at your registered constituency
• No changes needed — your current Voter ID works

Option 2: Transfer Your Registration
• Fill Form 6 at voters.eci.gov.in (select 'Shifting of Residence')
• Upload proof of new city address (hostel letter, rent agreement)
• This takes 4-8 weeks

📌 Important: You cannot vote in both places. Choose one option.

💡 Tip: If elections are soon, Option 1 is faster. Apply for Option 2 early for future elections.`,
  },
  {
    icon: '🎂', title: 'I turned 18 recently',
    steps: ['Must be 18 by Jan 1 of the election year.', 'Register at voters.eci.gov.in using Form 6.', 'Upload Aadhaar, address proof, and a photo.', 'Voter ID card arrives in ~30 days.'],
    answer: `🎂 Congratulations on turning 18! Here's how to register to vote:

Step 1: Check Eligibility
• You must be 18 as of January 1 of the qualifying year

Step 2: Fill Form 6 Online
• Go to voters.eci.gov.in → 'New Voter Registration' → Form 6

Step 3: Upload Documents
• Proof of Age: Aadhaar, birth certificate, or passport
• Proof of Address: Aadhaar or utility bill
• 1 passport-size photograph

Step 4: Track & Receive
• Your Voter ID (EPIC card) arrives in ~30 days

🎉 Welcome to India's democracy — your vote is your voice!`,
  },
  {
    icon: '📋', title: 'My name is missing from voter list',
    steps: ['Ask the Presiding Officer to re-check the list.', 'Request a Tender Vote — your legal right.', 'Call Voter Helpline: 1950 for help.', 'After election: register at voters.eci.gov.in.'],
    answer: `📋 Your name is missing from the voter list — here's what to do:

At the Polling Booth:
1. Stay calm. Ask the Presiding Officer to check again
2. Show your Voter ID — they might find you under a different spelling
3. Request a Tender Vote (Provisional Ballot) — this is your LEGAL RIGHT!
   • You CAN cast this even if your name is missing
   • It is counted only if the winning margin is less than total Tender Votes
4. Call Voter Helpline: 1950 for immediate guidance

Fix It Permanently:
• Go to voters.eci.gov.in → check your registration
• If not found: fill Form 6 to register
• If errors: fill Form 8 to correct details

💡 Always check your voter list 2-3 weeks before election day!`,
  },
  {
    icon: '♿', title: 'I have a disability',
    steps: ['You get priority queue access — no long waiting.', 'Wheelchair ramp access at all booths.', 'Bring a companion to assist you inside the booth.', 'Apply for home postal ballot using Form 12D.'],
    answer: `♿ Voting with a Disability — Your Complete Guide:

At the Polling Booth:
• Priority Queue: Skip the long line — you have first access
• Wheelchair Access: All booths must have ramp access
• Braille EVM: Available for visually impaired voters
• Companion: You can bring a trusted adult inside the voting compartment

Home Voting Option:
• Cannot travel? Apply for a Postal Ballot
• Fill Form 12D and submit to your ERO before the deadline
• A polling officer visits your home to collect your vote

How to Request:
• Call Voter Helpline: 1950
• Contact your local ERO office

🇮🇳 Democracy is for everyone — including you!`,
  },
  {
    icon: '👴', title: "I'm a senior citizen (80+)",
    steps: ['Apply for postal ballot (vote from home) using Form 12D.', 'A polling officer will visit your home.', 'OR visit booth — you get priority queue access.'],
    answer: `👴 Senior Citizen Voter Guide (Age 80+):

Option 1: Vote from Home (Postal Ballot) — Recommended
• Voters 80+ are eligible for postal ballot
• Fill Form 12D and submit to your ERO before election dates are announced
• A polling official visits your home and collects your vote securely

Option 2: Visit the Polling Booth
• You get Priority Queue access — no long waits!
• Wheelchair and ramp access available
• You can bring a companion to assist you

How to Apply:
• Call Voter Helpline: 1950
• Fill Form 12D at voters.eci.gov.in
• Apply EARLY — there are deadlines

🙏 Your vote and your wisdom matter!`,
  },
  {
    icon: '✈️', title: "I'm an NRI / live abroad",
    steps: ['Register using Form 6A at voters.eci.gov.in.', 'You MUST physically travel to India to vote.', 'Go to your registered hometown constituency.', 'Remote/proxy voting is NOT yet available.'],
    answer: `✈️ NRI Voter Guide — How to Vote from Abroad:

Yes, NRIs CAN vote in Indian elections!

Step 1: Register as an Overseas Voter
• Go to voters.eci.gov.in → 'Overseas Voter Registration' → Form 6A
• Upload: Indian Passport copy and current overseas address proof
• Your name gets added to your hometown constituency's electoral roll

Step 2: Travel to India to Vote
• You MUST physically travel to India to cast your vote
• Go to your registered constituency's polling booth on election day
• Remote, proxy, or e-voting from abroad is NOT available yet

Plan Ahead:
• Election dates are announced 4-6 weeks in advance
• Check your registration at voters.eci.gov.in before booking tickets

🇮🇳 Your roots matter. Your vote matters. Come home and vote!`,
  },
];

const COMPARISONS = [
  {
    title: "Lok Sabha vs Rajya Sabha",
    left: { name: "Lok Sabha", color: "#2563eb", points: ["543 directly elected seats", "Elected by citizens every 5 years", "Can be dissolved by President", "Supreme on Money Bills", "More powerful — forms government"] },
    right: { name: "Rajya Sabha", color: "#7c3aed", points: ["245 seats (elected by MLAs)", "6-year terms, 1/3 retire every 2 yrs", "Permanent — cannot be dissolved", "Reviews and revises bills", "Represents states in Parliament"] },
  },
  {
    title: "MP vs MLA",
    left: { name: "MP (Member of Parliament)", color: "#0891b2", points: ["Works at the national level", "Sits in Lok Sabha / Rajya Sabha", "Deals with national laws & budget", "Elected from a Lok Sabha constituency", "Salary: ~₹1 lakh/month + allowances"] },
    right: { name: "MLA (Member of Legislative Assembly)", color: "#059669", points: ["Works at the state level", "Sits in Vidhan Sabha", "Deals with state laws & budget", "Elected from a state constituency", "Salary varies by state"] },
  },
  {
    title: "EVM vs Ballot Paper",
    left: { name: "EVM", color: "#d97706", points: ["Electronic device, press a button", "Instant, tamper-proof recording", "No invalid votes possible", "Results in hours on counting day", "Used in India since 2001"] },
    right: { name: "Ballot Paper", color: "#6b7280", points: ["Paper sheet, mark with stamp/pen", "Manual counting — slow & error-prone", "Risk of invalid/spoilt votes", "Counting takes days", "Still used in some countries & local elections"] },
  },
];

const TOPICS = [
  { label: "Elections", query: "What is an election?" },
  { label: "Parliament", query: "What is Lok Sabha?" },
  { label: "Voting", query: "How do I vote?" },
  { label: "EVM", query: "What is an EVM?" },
  { label: "Registration", query: "How do I register to vote?" },
  { label: "Parties", query: "What is a political party?" },
  { label: "NOTA", query: "What is NOTA?" },
  { label: "MCC", query: "What is the Model Code of Conduct?" },
  { label: "Results", query: "How are election results declared?" },
  { label: "Coalition", query: "What is a coalition government?" },
  { label: "NRI Vote", query: "Can NRIs vote in India?" },
  { label: "Fake News", query: "What is fake news during elections?" },
];

// ── Chat Hook ────────────────────────────────────────
function useElectionChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'w', role: 'assistant', content: 'Hello! Ask me anything about Indian elections — voter registration, EVMs, results, Parliament, or more.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [explainLevel, setExplainLevel] = useState<'normal' | 'child'>('normal');

  // Inject a pre-written answer directly (no API call)
  const sendDirect = (userText: string, answer: string) => {
    const userId = Date.now().toString();
    const aiId = (Date.now() + 1).toString();
    setMessages(p => [
      ...p,
      { id: userId, role: 'user', content: userText },
      { id: aiId, role: 'assistant', content: answer },
    ]);
  };

  const send = async (text: string) => {
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
  };

  return { messages, input, setInput, loading, send, sendDirect, explainLevel, setExplainLevel };
}

// ── Components ───────────────────────────────────────
function Navbar({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <nav className="nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <button onClick={() => setView('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🗳️</span>
          <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>Election Copilot</span>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['compare', 'scenarios', 'chat'] as View[]).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)',
              background: view === v ? 'var(--text-primary)' : 'transparent',
              color: view === v ? '#fff' : 'var(--text-secondary)',
              fontWeight: 500, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
              fontFamily: 'Inter, sans-serif',
            }}>
              {v === 'compare' ? 'Compare' : v === 'scenarios' ? 'Scenarios' : 'Ask Copilot'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HomeView({ setView, onQuery, onSendDirect }: { setView: (v: View) => void; onQuery: (q: string) => void; onSendDirect: (u: string, a: string) => void }) {
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
            <button className="btn-primary" onClick={() => setView('chat')}>Start Journey →</button>
            <button className="btn-secondary" onClick={() => setView('compare')}>Compare Institutions</button>
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
                className="card" style={{ padding: 24, textAlign: 'left', cursor: 'pointer', background: 'none', border: '1px solid var(--border)', display: 'block', width: '100%' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
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
                className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>
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
            <button className="btn-secondary" onClick={() => setView('compare')}>See all →</button>
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

function CompareView() {
  const [active, setActive] = useState(0);
  const c = COMPARISONS[active];
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <p className="section-eyebrow">Comparison Engine</p>
      <h2 style={{ fontSize: 28, marginBottom: 24 }}>Side-by-side comparisons</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {COMPARISONS.map((c, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            background: active === i ? 'var(--text-primary)' : 'var(--bg-card)',
            color: active === i ? '#fff' : 'var(--text-secondary)',
            border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif',
          }}>{c.title}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[c.left, c.right].map((side, si) => (
              <div key={si} className="card" style={{ padding: 28 }}>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 17, color: side.color, marginBottom: 20 }}>{side.name}</div>
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

function ScenariosView({ sendDirect, setView }: { sendDirect: (u: string, a: string) => void; setView: (v: View) => void }) {
  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <p className="section-eyebrow">Scenario Guidance</p>
      <h2 style={{ fontSize: 28, marginBottom: 8 }}>Your situation, step-by-step.</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>Real civic guidance for real-life situations.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {SCENARIOS.map((s, i) => (
          <motion.div key={i} className="card" style={{ padding: 28 }} whileHover={{ y: -2 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{s.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.steps.map((step, si) => (
                <div key={si} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)', fontWeight: 700, fontSize: 11, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{si + 1}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { sendDirect(s.title, s.answer); setView('chat'); }}
              style={{ marginTop: 20, fontSize: 12, color: 'var(--accent-dark)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Get full guidance →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChatView({ chat }: { chat: ReturnType<typeof useElectionChat> }) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat.messages]);

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); chat.send(chat.input); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
      {/* Toolbar */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Response mode:</span>
        {(['normal', 'child'] as const).map(l => (
          <button key={l} onClick={() => chat.setExplainLevel(l)} style={{
            padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: chat.explainLevel === l ? 'var(--text-primary)' : 'transparent',
            color: chat.explainLevel === l ? '#fff' : 'var(--text-secondary)',
            border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif',
          }}>{l === 'normal' ? 'Detailed' : 'Explain Simply'}</button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        {chat.messages.map(m => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'assistant' && (
              <span style={{ width: 28, height: 28, background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, alignSelf: 'flex-end', marginRight: 8, marginBottom: 2 }}>🗳️</span>
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
            style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'var(--bg)', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', color: 'var(--text-primary)' }} />
          <button type="submit" disabled={!chat.input.trim() || chat.loading} className="btn-primary" style={{ padding: '12px 20px' }}>Send</button>
        </form>
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────
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
