import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "[gemini] GEMINI_API_KEY is not set. The /api/chat endpoint will fail until you add it to .env.local."
  );
}

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

// Models tried in order. We fall through to the next on:
//   - 429 quota / rate-limit
//   - 404 / "not found" — model has been retired
//   - "deprecated" / "unsupported" / "no longer" / "unavailable" messages
//
// Strategy: lead with the *-latest aliases so we auto-track whatever Google
// currently points free-tier traffic at (today: 3.1 flash-lite, 3 flash).
// Then fall back to explicit older versions whose daily quota resets, so a
// burst on the latest models doesn't kill the app.
const MODEL_FALLBACK_CHAIN = [
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
];

function isRecoverableModelError(err: unknown): boolean {
  const e = err as { status?: number; message?: string };
  const status = e?.status;
  const msg = e?.message ?? "";
  if (status === 429 || status === 404) return true;
  return /quota|rate.?limit|not found|unsupported|deprecat|no longer|unavailable/i.test(
    msg
  );
}

export async function callGemini(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  let lastError: unknown = null;

  for (const modelName of MODEL_FALLBACK_CHAIN) {
    try {
      const model = client.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 280,
        },
      });

      const result = await model.generateContent(userMessage);
      const text = result.response.text();
      if (!text) throw new Error("Empty response from Gemini");

      console.log(`[gemini] used model: ${modelName}`);
      return text;
    } catch (err) {
      lastError = err;
      if (isRecoverableModelError(err)) {
        console.warn(
          `[gemini] ${modelName} unavailable (quota/retired/unsupported) — falling back...`
        );
        continue;
      }
      throw err;
    }
  }

  throw lastError ?? new Error("All Gemini models failed");
}
