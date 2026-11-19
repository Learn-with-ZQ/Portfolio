// Server-only: uses GEMINI_API_KEY.
import { GoogleGenAI } from "@google/genai";

/**
 * Drafts the email a visitor gets when Zaid presses "Send email" in a
 * conversation: a short summary of his replies since their last email, in
 * his voice. Zaid reads and can edit it before it's sent, so this only
 * drafts; it never sends.
 */
const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODEL = "gemini-3.1-flash-lite";

const INSTRUCTIONS = `You draft a short email from Zaid Qasim, a software developer, to someone he is chatting with through his portfolio website.
You are given only Zaid's own recent replies in that conversation. Summarise what he said, in the first person, as Zaid.
Rules:
- Use only what is in his replies. Never add facts, offers, promises, dates, prices, links or opinions he did not write.
- Keep his meaning and tone. Friendly, clear and brief: 2 to 6 sentences, or a few short bullet points if he covered several separate things.
- Start with "Hi <first name>," on its own line. Do not add a sign-off; one is added after your text.
- Plain text only. No markdown, no subject line.
- If his replies are only a greeting or very short, keep the summary just as short.`;

export class SummaryError extends Error {}

export async function draftSummaryEmail(
  visitorName: string,
  replies: { body: string; createdAt: string }[],
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new SummaryError("GEMINI_API_KEY isn't set, so no summary can be drafted.");
  if (!replies.length) throw new SummaryError("There are no new replies to summarise.");

  const firstName = visitorName.trim().split(/\s+/)[0] || "there";
  const transcript = replies.map((r, i) => `Reply ${i + 1}:\n${r.body}`).join("\n\n");
  const ai = new GoogleGenAI({ apiKey });
  const primary = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  for (const model of [primary, FALLBACK_MODEL]) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: "user", parts: [{ text: `First name: ${firstName}\n\n${transcript}` }] }],
        config: {
          systemInstruction: INSTRUCTIONS,
          maxOutputTokens: 600,
          temperature: 0.3,
          httpOptions: { timeout: 15_000 },
        },
      });
      const text = response.text?.trim();
      if (text) return `${text}\n\nZaid`;
    } catch (error) {
      console.warn(`Summary draft failed on ${model}:`, error);
    }
  }
  throw new SummaryError("Gemini couldn't draft a summary right now. Try again, or write it yourself.");
}
