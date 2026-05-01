<div align="center">
  <h1>🗳️ Election Copilot</h1>
  <p><strong>Demystifying democracy, one prompt at a time.</strong></p>
  <p>Built for the <strong>Google Antigravity Challenge</strong> 🚀</p>
</div>

<br />

## 🌟 The Vision

Elections are complex. Between voter registration laws, polling locations, candidate platforms, and a flood of misinformation, participating in democracy can feel overwhelming. **Election Copilot** is a next-generation, AI-powered election companion designed to make the democratic process accessible, engaging, and transparent for everyone—from first-time voters to political experts.

Powered by **Google Gemini 1.5 Pro**, this is not just a chatbot. It's an interactive simulator, a fact-checker, and a personalized guide to the elections.

---

## 🔥 Key Features

- **🎮 Interactive Election Simulator:** Step into the shoes of different electoral personas. Want to know what a Polling Officer does on election day? Or what challenges a first-time candidate faces? Run the simulation.
- **🛡️ Misinformation Defender:** In the era of deepfakes and fake news, Election Copilot leverages Gemini's reasoning capabilities to analyze claims, cross-reference historical context, and help you separate fact from fiction.
- **🧩 Context-Aware Guidance:** The app adapts its tone and complexity based on your profile. Whether you're a "Beginner" needing simple explanations or an "Expert" diving into constitutional nuances, the UI and AI adjust seamlessly.
- **👶 "Explain Like I'm 12" Mode:** Toggle this on to break down complex political jargon (like "gerrymandering" or "filibuster") into simple, easy-to-understand analogies.
- **✨ Premium UI/UX:** Built with a stunning glassmorphism design, vibrant gradients, and fluid Framer Motion animations for an app that feels alive.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | Next.js 15 (App Router), React 19 |
| **AI & LLM** | Google Gemini 1.5 Pro |
| **AI Integration** | Vercel AI SDK (`@ai-sdk/google`, `@ai-sdk/react`) |
| **Styling & Animation** | Tailwind CSS v4, Framer Motion, Lucide Icons |
| **Deployment** | Google Cloud Run / Docker |

---

## 🧠 The AI Magic (Under the Hood)

Election Copilot isn't just sending raw prompts. It utilizes a **Dynamic Context Engine**:
1. **Master System Prompt:** A sophisticated base prompt enforces strict neutrality, preventing political bias while remaining highly engaging.
2. **Context Injection:** Every request dynamically injects the user's active `mode`, `persona`, and `explainLevel` into the prompt stream.
3. **Edge Streaming:** Responses are streamed in real-time using Edge functions for zero-latency feedback.
4. **Security Filters:** Built-in safeguards restrict payload sizes and prevent prompt injection attacks.

---

## 🚀 Getting Started

Want to run Election Copilot locally? It's easy.

### Prerequisites
- Node.js 18+ or 20+
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/meeharshu8685-dot/Ai-election-explainer.git
   cd Ai-election-explainer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🐳 Docker & Cloud Run Deployment

This project is fully containerized and ready for Google Cloud Run deployment.

```bash
# Build the image
docker build -t election-copilot .

# Run the container locally
docker run -p 3000:3000 --env GEMINI_API_KEY=your_api_key election-copilot
```

---

## 🔮 What's Next?
- **Real-time News Integration:** Connecting to live news APIs to provide up-to-the-minute election updates.
- **Multi-Language Support:** Expanding beyond English to support regional languages for wider accessibility.
- **Voice Interface:** "Hey Gemini, where is my polling booth?"

---
<div align="center">
  <p><i>Made with ❤️, ☕, and 🤖 for the Google Antigravity Challenge.</i></p>
</div>
