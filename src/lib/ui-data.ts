import { View } from '@/types';

// ── Data ─────────────────────────────────────────────
export const GUIDED_PATHS = [
  { icon: '🗳️', title: "I'm voting for the first time", desc: "Step-by-step voter registration and election day guide.", query: "How do I register to vote as a first time voter?" },
  { icon: '🏛️', title: "Explain elections simply", desc: "What are elections, why they matter, and how they work.", query: "What is an election and why is it important?" },
  { icon: '⚖️', title: "Compare institutions", desc: "Lok Sabha vs Rajya Sabha, MP vs MLA, and more.", action: 'compare' as View },
  { icon: '🖥️', title: "Understand EVMs", desc: "How voting machines work and why they're secure.", query: "What is an EVM and how does it work?" },
  { icon: '🛡️', title: "Myth vs Reality", desc: "Fact-check common election myths and misinformation.", query: "Can EVMs be hacked? Tell me about election myths." },
  { icon: '📋', title: "My Rights as a Voter", desc: "Know your rights at the polling booth.", query: "What documents are needed to vote and what are my voter rights?" },
];

export const SCENARIOS = [
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

export const COMPARISONS = [
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

export const TOPICS = [
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