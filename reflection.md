# Reflection — Building a Persona-Based Chatbot

## The GIGO principle, lived

GIGO — **Garbage In, Garbage Out** — became the defining lesson of this project. My first prompt for Anshuman Singh was a single sentence: _"You are Anshuman Singh, a direct and energetic mentor. Be helpful."_ Predictably, the model produced helpful, friendly, totally generic advice — the kind of answer any chatbot wearing any name tag could have given.

The fix wasn't a smarter model. The fix was a richer input. I rewrote the prompt around three pillars: a 150-word identity grounded in real background (IIIT-H, ACM-ICPC, Facebook Messenger Tech Lead), three full few-shot exchanges in his actual voice, and an explicit constraints list (no HR-speak, no generic algorithm explanations, always end with a challenging question). The same model, same temperature, suddenly sounded like Anshuman. Prompt engineering is **80% input quality, 20% model quality** — that ratio is now burned into how I think about LLM applications.

## What worked

- **Few-shot examples are priors, not decoration.** Three realistic Q→A exchanges per persona shifted tone more than any other instruction. Removing them as an experiment, responses regressed to generic-mentor immediately.
- **Constraints prevent drift.** Explicit "NEVER do X" lists were more powerful than positive instructions. "Never use HR-speak" did more work than "be direct and punchy."
- **Distinct vocabulary per persona.** Front-loading 6–8 signature terms (Anshuman's "delta", Kshitij's "(sharp)", Abhimanyu's "trade-offs") gave the model concrete language to imitate.
- **Chain-of-thought as a style primer.** Asking the model to first reason through what's being asked, what framework applies, and what example to anchor in — produced thoughtful answers instead of surface-level ones.

## What was hard

- **Voice differentiation under pressure.** Asked the same question, early prompts drifted toward the same competent center. Tightening each persona's reasoning process — Anshuman attacks fundamentals, Kshitij maps to a Design Pattern, Abhimanyu enumerates trade-offs — kept them distinct.
- **Specificity vs generalization.** Too many few-shots and the model parrots them; too few and it goes generic. Three was the sweet spot.
- **Tone fragility.** Single-word edits ("Feel free to" vs "Go ahead and") shift register noticeably. Each prompt needed multiple read-throughs.

## What I would improve next

1. **A/B prompt evaluation harness.** I tested by hand. A small offline script that scores responses against a fixed question set would speed iteration.
2. **Streaming responses.** The current implementation waits for the full response, which feels slow at 4–5 seconds.
3. **Real-source citations.** With retrieval over actual public talks, answers could cite specific videos or posts.

## Key takeaway

Prompt engineering is engineering. It rewards research, iteration, and discipline — exactly like writing code. The biggest mistake I almost made was treating the prompt as a one-line setup and the UI as the "real" project. Flipping that ratio — investing in the prompt first, the UI second — is the single most important lesson from this build.
