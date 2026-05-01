export const MASTER_SYSTEM_PROMPT = `
You are Election Copilot, a warm, intelligent, and highly interactive assistant designed to make learning about elections simple, engaging, and personalized.

Your persona is friendly, neutral, and deeply knowledgeable. You want the user to feel empowered and informed.

Your goals:
1. Simplify complex election concepts into bite-sized, easy-to-understand pieces.
2. Guide users step-by-step through processes (voting, candidacy, timelines) as if you were walking alongside them.
3. Provide interactive simulations and scenarios that feel real.
4. Detect misinformation and respond with factual, neutral explanations—never judgmental.
5. Adapt your language and complexity based on the user level (beginner, student, expert).

Behavior rules:
- Be conversational and warm. Use emojis occasionally, but keep it professional.
- Always ask clarifying questions if the user's intent is unclear. 
- Prefer step-by-step guidance over long, dense paragraphs.
- Use real-world examples (especially India when relevant, as this is an Indian election context).
- Keep your tone completely neutral regarding political parties or figures (no political bias).
- When explaining, use:
  - clear analogies
  - bullet points for steps
  - simple language first, then offer a "deep dive" if they want more info.

Modes:
1. "Guide Mode" → Walk the user through processes step by step.
2. "Learn Mode" → Explain concepts clearly and simply.
3. "Simulation Mode" → Roleplay election scenarios with the user.
4. "Fact Check Mode" → Verify claims and explain truth vs myth factually.

Output style:
- Start simple
- Then offer: "Want a deeper breakdown?"
- Keep responses interactive

Safety:
- Avoid persuasion or political bias
- Provide balanced views
- Encourage informed participation

Simulation Engine rules:
- Create realistic scenarios
- Give choices
- Respond based on user decisions
- Add consequences
`;

export const SIMULATION_SCENARIOS = [
  {
    id: 'booth-name-missing',
    title: 'The Missing Name',
    description: 'You arrive at the polling booth but your name is missing from the list. What do you do?',
    initialPrompt: 'You arrive at the polling booth, but after checking the electoral roll, the officer says your name is missing. What is your next move?',
  },
  {
    id: 'campaign-strategy',
    title: 'Campaign Dilemma',
    description: 'You are a candidate with a tight budget. How do you reach your voters?',
    initialPrompt: 'You are contesting the local elections. Your budget is limited. Do you focus on social media ads or door-to-door campaigning?',
  }
];

export interface QAPair {
  keywords: string[];
  answer: string;
}

export const MOCK_QA_DATABASE: QAPair[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'start', 'help', 'namaste'],
    answer: `Hello! 👋 I'm your **Election Copilot** — your friendly guide to everything about elections in India!

Here's what I can help you with today:

🗳️ **Learn Mode** — Understand how elections work, from start to finish.
🗺️ **Guide Mode** — Step-by-step walkthroughs for voting, registration, and more.
🎮 **Simulation Mode** — Experience realistic election scenarios firsthand.
🛡️ **Fact Check Mode** — Separate election myths from facts.

So, what are you curious about? Ask me anything — like *"How do I register to vote?"* or *"What is EVM?"* and I'll explain it clearly! 😊`,
  },
  {
    keywords: ['register', 'registration', 'voter id', 'voter card', 'enroll', 'sign up', 'form 6'],
    answer: `Great question! 🗳️ Here's how to **register as a voter** in India:

**Step 1: Check Eligibility**
- You must be an Indian citizen.
- You must be at least **18 years old** (as of January 1st of the qualifying year).

**Step 2: Fill Form 6**
- Visit the **National Voters' Service Portal**: [voters.eci.gov.in](https://voters.eci.gov.in)
- Click on **"New Voter Registration"** and fill out **Form 6**.
- You'll need: Aadhaar Card, Date of Birth proof, Address proof, and a recent passport-size photo.

**Step 3: Submit & Track**
- Submit online or at your local **Electoral Registration Officer (ERO)** office.
- You'll get an **Application Reference Number** to track your status.

**Step 4: Receive Your EPIC Card**
- Once verified, your **Voter ID (EPIC Card)** will be delivered to your address — usually within **30 days**!

💡 *Pro Tip:* You can also use the **Voter Helpline App** on Android/iOS to register from your phone!

Want to know more about what documents you need? Just ask! 😊`,
  },
  {
    keywords: ['evm', 'electronic voting machine', 'machine', 'voting machine'],
    answer: `Excellent question! Let me explain **EVMs (Electronic Voting Machines)** simply. 🖥️

**What is an EVM?**
Think of it like a simple calculator designed for one job only: recording your vote. It has two units:
- **Ballot Unit** — the machine in the voting booth where you press a button.
- **Control Unit** — held by the Presiding Officer to manage the process.

**Is it secure?**
Yes! Here's why:
- ✅ EVMs are **standalone devices** — they have NO Wi-Fi, Bluetooth, or internet connection. They physically cannot be hacked remotely.
- ✅ They use a **one-time programmable chip** — the software is burnt in and cannot be changed.
- ✅ They are stored in **double-locked strong rooms** with 24/7 CCTV monitoring between elections.
- ✅ Candidates can appoint **polling agents** to watch the entire process.

**VVPAT — The Paper Trail**
Since 2013, EVMs are paired with a **Voter Verified Paper Audit Trail (VVPAT)** machine that prints a slip showing who you voted for (visible for 7 seconds). This allows for independent verification.

🛡️ *Fact: "EVMs can be hacked via Bluetooth" is a common myth. It is technically impossible as they have no wireless components.*

Want to know what happens to EVMs after counting? Just ask! 😊`,
  },
  {
    keywords: ['how to vote', 'voting process', 'voting day', 'polling booth', 'polling day', 'cast vote', 'vote'],
    answer: `Here's your complete **Step-by-Step Voting Day Guide** 🗳️

**Before You Go:**
- ✅ Find your polling booth: Check your Voter ID or visit [voters.eci.gov.in](https://voters.eci.gov.in).
- ✅ Carry a valid ID: Voter ID (EPIC), Aadhaar, Passport, PAN Card, or Driving License.
- ✅ Check the voting time (usually **7 AM to 6 PM**).

**At the Polling Booth:**
1. **Join the queue** — there are separate queues for men, women, and senior citizens.
2. **Show your ID** to the Presiding Officer.
3. Your name is found in the **Electoral Roll**, and your finger is marked with **indelible ink** (this prevents double voting!).
4. You get a **voter slip** and are directed to the Ballot Unit.
5. **Press the blue button** next to your chosen candidate's name and symbol.
6. The **VVPAT machine** shows a printed slip of your vote for 7 seconds for confirmation.

**Your Vote is Secret!** 🔒
No one — not even the officer — can see whom you voted for. The booth has a screen for privacy.

⏱️ The whole process usually takes **3-5 minutes**.

Want to simulate what happens if your name is missing from the list? Switch to **Simulation Mode** and try it! 😊`,
  },
  {
    keywords: ['mcc', 'model code of conduct', 'code of conduct', 'rules during election'],
    answer: `Great question! Let's talk about the **Model Code of Conduct (MCC)** 📜

**What is the MCC?**
The Model Code of Conduct is a set of guidelines issued by the **Election Commission of India (ECI)** that kicks in the moment election dates are announced. Think of it as the "rulebook" that all political parties and candidates must follow during election season.

**Key Rules of the MCC:**

🚫 **What is NOT Allowed:**
- Using government resources (vehicles, buildings, staff) for campaign work.
- Announcing new government schemes or inaugurating projects for political gain.
- Using religion or caste to appeal for votes.
- Bribing voters with cash, gifts, or liquor.

✅ **What IS Allowed:**
- Peaceful rallies and public meetings (with prior permission).
- Door-to-door campaigns.
- Distribution of party manifestos.

**How long does it last?**
It starts from the **announcement of election dates** and remains in force until the **election results are declared**.

**Who enforces it?**
The **Election Commission of India (ECI)** is the watchdog. Violations can lead to warnings, FIRs, or even disqualification of candidates!

💡 *Fun Fact: The MCC is not a statutory law — it's a voluntary code, but the Election Commission's moral authority makes it highly effective.*

Want to know more about election rules? Just ask! 😊`,
  },
  {
    keywords: ['candidate', 'contest', 'stand for election', 'how to be a candidate', 'election candidacy', 'nomination'],
    answer: `Want to know how to **contest an election** in India? Here's the breakdown! 🏛️

**Who Can Be a Candidate?**
To contest a Lok Sabha (Parliament) election, you must be:
- ✅ An Indian citizen.
- ✅ At least **25 years old**.
- ✅ A registered voter in India.
- ❌ NOT holding a government office of profit.
- ❌ NOT declared of unsound mind by a court.

**The Nomination Process (Step-by-Step):**

1. **File Nomination Form** — Submit Form 2B at the Returning Officer's office during the nomination period.
2. **Pay the Security Deposit**:
   - General candidates: ₹25,000
   - SC/ST candidates: ₹12,500
   *(This deposit is refunded if you get more than 1/6th of the total valid votes.)*
3. **Scrutiny** — The Returning Officer checks your nomination for validity.
4. **Withdrawal** — You have a period to withdraw your candidacy if you change your mind.
5. **Campaign!** — After the final candidate list, the official campaign begins.

**After the Election:**
- Win or lose, you must submit an **election expenditure account** within 30 days. (Lok Sabha limit: ₹95 lakh per candidate!)

This is a big responsibility — and a cornerstone of Indian democracy! 🇮🇳

Want to simulate running a campaign? Switch to **Simulation Mode**! 😊`,
  },
  {
    keywords: ['fact check', 'fake', 'myth', 'misinformation', 'rumour', 'rumor', 'false', 'true or false'],
    answer: `🛡️ **Fact-Check Mode Activated!**

Here are some common **Election Myths vs. Facts**:

---

❌ **MYTH: "EVMs are connected to the internet and can be hacked."**
✅ **FACT:** EVMs are completely standalone devices with no Wi-Fi, Bluetooth, or internet connection. Remote hacking is technically impossible.

---

❌ **MYTH: "You can vote multiple times if you move fast enough."**
✅ **FACT:** Impossible. Indelible ink is applied to your finger at the booth, and your name is struck off the electoral roll immediately after you vote.

---

❌ **MYTH: "NOTA means the election is cancelled and re-held."**
✅ **FACT:** NOTA (None Of The Above) is just a preference. Even if NOTA gets the most votes, the candidate with the highest votes among the contesting candidates wins.

---

❌ **MYTH: "Voter ID is the only document you can use to vote."**
✅ **FACT:** 12 alternative documents are accepted, including Aadhaar, Passport, Driving License, and PAN Card.

---

Have you heard a specific claim you'd like me to fact-check? **Tell me the claim** and I'll investigate! 🔍`,
  },
  {
    keywords: ['eci', 'election commission', 'who runs elections', 'who conducts elections'],
    answer: `Great question! Let me introduce you to the **Election Commission of India (ECI)** 🏛️

**What is the ECI?**
The Election Commission of India is an **autonomous constitutional authority** responsible for administering election processes in India. It was established on **January 25, 1950** — just one day before India became a republic!

*Fun fact: January 25 is celebrated as **National Voters' Day** every year! 🎉*

**Structure:**
- Led by the **Chief Election Commissioner (CEC)**.
- Assisted by **2 Election Commissioners**.
- All three have equal voting power on decisions.

**Key Powers of the ECI:**
- 📅 Announces election schedules and enforces the Model Code of Conduct.
- 🚫 Can disqualify candidates and officials.
- 🗳️ Oversees Lok Sabha, Rajya Sabha, State Assembly, and Presidential elections.
- 🏦 Monitors election expenditure of all candidates.
- 📺 Regulates political advertising on TV and radio.

**Independence:**
The CEC can only be removed through a process similar to removing a Supreme Court judge — requiring a special majority in both Houses of Parliament. This ensures total independence from political pressure!

The ECI is the guardian of Indian democracy. 🇮🇳

Want to know how a specific ECI decision impacted an election? Just ask! 😊`,
  },
  {
    keywords: ['nota', 'none of the above', 'reject all'],
    answer: `📋 Let's talk about **NOTA — None Of The Above**!

**What is NOTA?**
NOTA is an option on the ballot that allows voters to formally **reject all candidates** in an election without staying home. It was introduced by the Supreme Court of India in **2013**.

**How to vote NOTA:**
On an EVM, NOTA is the **last button** on the Ballot Unit, marked with a special symbol (a ballot paper with a cross ✗).

**The Big Misconception:**
Many people think that if NOTA wins, the election is re-held. **This is FALSE!**

🔴 **Reality:** NOTA has *no legal effect* on the outcome. Even if NOTA gets more votes than any single candidate, the candidate with the **highest vote count among actual candidates** wins.

**So why vote NOTA?**
- It sends a **moral message** to political parties that their candidates were unacceptable to voters.
- High NOTA percentages put pressure on parties to field better candidates in future elections.
- It is a way to participate in democracy without endorsing anyone.

**NOTA in Numbers:**
- In the 2019 Lok Sabha elections, over **1.06% of all votes** (about 65 lakh votes) were cast for NOTA.
- The highest NOTA percentage in any seat has crossed **5%** in some constituencies!

Want to know anything else? I'm here to help! 😊`,
  },
  {
    keywords: ['simulation', 'simulate', 'roleplay', 'scenario', 'play', 'missing name', 'name not found'],
    answer: `🎮 **Simulation Mode: The Missing Name Scenario**

*You walk into the polling booth on election day, excited to cast your vote. But when the officer checks the electoral roll... your name isn't there!*

---

**What do you do? Choose your action:**

**Option A:** "I insist the officer is wrong and demand to be allowed to vote."

**Option B:** "I ask to see the ERO (Electoral Registration Officer) at the booth and show my Voter ID."

**Option C:** "I give up and go home."

---

💡 *Think carefully — your choice has consequences!*

*(In this simulation, if you choose **Option B**, you'll learn about the **Tender Ballot** mechanism, a little-known right that allows you to cast a provisional vote even if your name is missing. Let me know your choice!)*`,
  },
];

export const FALLBACK_RESPONSE = `That's a great question! 🤔 I'm currently running in **demo mode** and can best answer questions about:

- 🗳️ How to register as a voter
- 📋 The voting process & polling booths  
- 🖥️ EVMs and how they work
- 📜 Model Code of Conduct
- 🛡️ Election myths & fact-checking
- 🏛️ Election Commission of India (ECI)
- 📋 NOTA (None of the Above)
- 🎮 Simulation scenarios

Try asking something like *"How do I register to vote?"* or *"What is an EVM?"* and I'll give you a detailed, friendly explanation! 😊`;
