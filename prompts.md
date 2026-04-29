# System Prompts — Detailed Breakdown

This document contains the three persona system prompts shipped in `src/lib/personas.ts`, along with annotations explaining each design choice.

---

## Persona 1 — Anshuman Singh

**Title:** Co-founder, Scaler Academy | IIIT-H Alum | Built Facebook Messenger
**Archetype:** The Pedagogical Architect & Elite Pragmatist

**Source of truth:** `src/lib/personas.ts` → `personas.anshuman.systemPrompt`

### Design decisions

- **Persona description (Pedagogical Architect framing):** Frames Anshuman as a structural critic of traditional education, not just a code mentor. Mentions IIIT-H, two-time ACM-ICPC World Finalist, Facebook Messenger Tech Lead, the ₹1,500 Cr net worth and traditional-industry portfolio — concrete details that anchor the model in his actual public profile.
- **"Mentor who takes WhatsApp calls" framing:** This single line does heavy lifting. It blocks corporate-AI register more reliably than any "be direct" instruction, because it gives the model a vivid behavioral analogue.
- **Vocabulary list ("First Principles," "Product Thinking," "Zero-to-One," "Ownership," "Ecosystem," "Delta"):** These are recurring terms from Anshuman's public talks. Front-loading them seeds the model's lexicon so responses sound like him by default.
- **Few-shot examples (3) — chosen for *spread*:** AI-agents-vs-backend (career framing), Scaler-vs-YouTube (product/value framing), startup-VC (mission framing). Each one demonstrates a different beat the model needs to hit; together they cover the full surface area of questions a learner is likely to ask.
- **Chain-of-thought (Analyze → Filter → Framework → Draft):** Forces a "Product Thinking" filter before drafting. Without this, the model collapses to surface-level technical answers; with it, every response gets re-framed through scalability or product logic.
- **Output instruction (4–5 sentences + challenging question ending):** Caps verbosity — Anshuman is punchy, not professorial. The mandatory closing question is the single most distinctive Anshuman move and the cheapest enforceable signature.
- **Constraints (NEVER list):** Explicitly bans HR-speak, theoretical filler, and "Prompt → Review → Own" violations. Also bans pretending to experiences he hasn't had — important for fairness given he's a real person.

---

## Persona 2 — Kshitij Mishra

**Title:** Chief Strategy Officer, InterviewBit | LLD & Design Patterns Expert

**Source of truth:** `src/lib/personas.ts` → `personas.kshitij.systemPrompt`

### Design decisions

- **Persona description ("guardian of technical discipline"):** Sets a clinical, deadline-driven tone that's distinct from the other two personas — without this opening line, the model defaults to friendly-mentor mode.
- **Linguistic DNA notes:** Calling out specific tics (parenthetical "(sharp)", deadline references, dry-humor holiday assignments) gives the model concrete patterns to imitate.
- **Few-shot examples (3):** The Flyweight explanation models technical depth + deadline reminder. The "can I submit tomorrow?" example models how he handles negotiation. The "Happy Friday" example models his ironic humor — this one is critical for capturing tone.
- **Reasoning process — pattern mapping:** Forces the model to first map the problem to a SOLID principle / Design Pattern before answering, which is the core Kshitij move.
- **Formatting guidance (bold, bullet points):** Without this, responses look conversational. With it, they look like notes from a strict instructor.
- **Constraints:** Forbids accepting "hacky" solutions and skipping class-diagram thinking — this protects the discipline-first philosophy from being eroded by user pressure.

---

## Persona 3 — Abhimanyu Saxena

**Title:** Co-founder, Scaler Academy & InterviewBit | The Architect-Reformer
**Archetype:** The Architect-Reformer

**Source of truth:** `src/lib/personas.ts` → `personas.abhimanyu.systemPrompt`

### Design decisions

- **"Approaches education as a software engineer approaches a legacy system":** This metaphor is the cornerstone of Abhimanyu's voice. It explains why his answers feel architectural rather than pedagogical and why he keeps reaching for systemic, not tactical, framing.
- **KCS as a first-class concept:** Knowledge / Capability / Skills is Abhimanyu's signature acronym. Naming it explicitly — and making it the criterion for "what is competitive in the market" — ensures the model defaults to it when degrees, titles, or credentials come up.
- **"Compass and Map" framework:** This is the single most powerful framing device in the prompt. It gives the model a specific lens for any career or strategy question — is the user's tactical *map* aligned with their long-term *compass*? Without this lens the model produces generic "balance speed and quality" answers.
- **Few-shot examples (3) — chosen for *layered scope*:** Master's-degree (KCS framing), senior-engineer-prep (AI-native + ownership framing), and motivation-for-Scaler (mission/Super-30 framing). Together they cover credential questions, career-progression questions, and existential-purpose questions — the three registers Abhimanyu routinely operates in.
- **Chain-of-thought (Analyze → Outcome Filter → Architectural Lens → Ownership Filter):** The Ownership Filter is the most under-appreciated step — it explicitly blocks micromanaging answers and pushes the model toward "set goals, grant autonomy" responses, which is a known Abhimanyu trait.
- **Output instruction — flexible ending:** Unlike Anshuman, Abhimanyu's responses don't *always* end with a question. The prompt allows reflective endings because that better matches his actual register; over-prescribing a question would make him sound like a copy of Anshuman.
- **Constraints (NEVER list):** Explicitly bans degree-worship, micromanagement, and casual register. These are the three failure modes a "senior founder-engineer" persona tends to drift into when prompted with junior-flavored questions.

---

## Overall Prompt Engineering Strategy

### Why these three personas

Each founder occupies a different *register* of mentorship — not just a different topic:

- **Anshuman → The Pedagogical Architect.** Outcome-oriented, intense, mentor-via-WhatsApp. Re-frames every question through Product Thinking and ownership.
- **Kshitij → The Tactical Disciplinarian.** Treats every problem as a system with constraints. Reframes vague questions into structured ones before answering.
- **Abhimanyu → The Architect-Reformer.** Founder-level, philosophical, KCS-first. Aligns the user's tactical *map* with their long-term *compass*.

A user asking "should I learn AI agents?" should get three meaningfully different answers — Anshuman challenges their grit, Kshitij demands a defined deliverable, Abhimanyu reframes it via long-term life outcomes. That divergence is the actual test of whether the prompts are doing their job.

### GIGO principle in practice

The first iteration of the Anshuman prompt was a single paragraph: _"You are Anshuman Singh. Be a direct, energetic mentor who values fundamentals."_ Responses came back generic — they read like a polite chatbot wearing his name tag. The breakthrough was the **few-shot examples**: pasting in three full Q→A exchanges in his actual voice immediately shifted the tone. Adding the explicit **constraints list** ("never use HR-speak") killed the remaining corporate residue.

### What each section earns

| Section | What it produces |
|---|---|
| Persona description | Identity & background grounding |
| Philosophy bullets | Vocabulary and recurring themes |
| Communication style | Tone, sentence length, punctuation tics |
| Few-shot examples | The single biggest lever — sets style priors |
| Reasoning process (CoT) | Better answers, less surface-level fluff |
| Response guidelines | Length, structure, ending style |
| Constraints (NEVER) | Removes the most common failure modes |

### Validation

Each prompt was tested by:

1. Asking a question the real person has answered publicly, comparing voice.
2. Asking the same question to all three personas to verify distinctiveness.
3. Trying adversarial prompts ("be casual", "skip the design pattern stuff") to confirm constraints hold.

---

## Research Sources

- Public YouTube talks by each founder
- LinkedIn posts and public articles
- Scaler Academy and InterviewBit course content (publicly available previews)
- Podcast appearances and panel interviews

(Note: this chatbot is an educational persona simulation. It does not officially represent Scaler Academy or any of the named individuals.)
