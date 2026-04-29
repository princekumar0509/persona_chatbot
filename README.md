# persona_chatbot

A fully functional AI chatbot featuring three Scaler Academy personalities — **Anshuman Singh**, **Kshitij Mishra**, and **Abhimanyu Saxena**. Built with Next.js 14, TypeScript, TailwindCSS, and the Google Gemini API.

> **[LIVE DEMO](https://persona-chatbot-mu.vercel.app/)**

## Features

- Three distinct personas, each with a deeply researched system prompt
- Real-time chat powered by Google Gemini (`gemini-1.5-flash`)
- Persona switching that resets the conversation
- Persona-specific suggestion chips for quick-start questions
- Animated typing indicator (`Anshuman is thinking...`)
- Responsive design (mobile, tablet, desktop)
- Graceful error handling — no API keys or stack traces leak to the UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **LLM**: Google Gemini API (`@google/generative-ai`, model `gemini-1.5-flash`)
- **Deployment**: Vercel

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/<your-username>/persona-chatbot.git
cd persona-chatbot
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local and set your key:
# GEMINI_API_KEY=AIza...
```

Get your API key at <https://aistudio.google.com/app/apikey>.

### 3. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

In the Vercel dashboard, add `GEMINI_API_KEY` under **Project Settings → Environment Variables**, then redeploy.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/chat/route.ts      # POST /api/chat — calls Gemini
├── components/                # PersonaSwitcher, MessageList, etc.
├── hooks/useChat.ts
└── lib/
    ├── personas.ts            # All three system prompts
    ├── gemini.ts
    ├── types.ts
    └── constants.ts
```

## How It Works

1. The user picks one of three persona tabs at the top.
2. Each persona has a unique system prompt (see [`prompts.md`](./prompts.md)).
3. User messages are sent to `/api/chat` along with the active persona ID.
4. The route loads the matching system prompt and calls Gemini (`gemini-1.5-flash`).
5. The response is streamed back into the UI; switching persona clears the conversation.

## Documentation

- [`prompts.md`](./prompts.md) — full system prompts with annotations
- [`reflection.md`](./reflection.md) — reflection on the GIGO principle and what worked

## Submission Checklist

- ✅ All three personas functional
- ✅ Persona switching resets conversation
- ✅ Suggestion chips per persona
- ✅ Typing indicator
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Friendly error handling
- ✅ No API keys committed (`.env.local` git-ignored)

## License

MIT
# persona_chatbot
