import { z } from "zod";
import { upstream, UpstreamTimeout } from "@/server/upstream";
import { UNTRUSTED_RULE } from "@/lib/untrusted-text";

export type GeminiTextAnswer =
  | { kind: "text"; status: number; text: string }
  | { kind: "status"; status: number }
  | { kind: "timeout" }
  | { kind: "network" }
  | { kind: "noKey" };

const envelope = z.object({
  candidates: z
    .array(
      z.object({
        content: z.object({ parts: z.array(z.object({ text: z.string().optional() })) }).optional(),
      }),
    )
    .optional(),
});

/** DEC-248: relocated own-key Gemini integration, not the Lovable AI Gateway SDK. */
export async function geminiText(input: {
  model: string;
  system: string;
  user: string;
  responseSchema?: Record<string, unknown>;
  temperature?: number;
  timeoutMs: number;
  label: string;
}): Promise<GeminiTextAnswer> {
  const key = process.env["GEMINI_API_KEY"] ?? "";
  if (key.trim() === "") return { kind: "noKey" };
  if (!input.system.endsWith(UNTRUSTED_RULE)) return { kind: "network" };
  try {
    const response = await upstream(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(input.model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: input.system }] },
          contents: [{ role: "user", parts: [{ text: input.user }] }],
          generationConfig: {
            responseMimeType: "application/json",
            ...(input.temperature === undefined ? {} : { temperature: input.temperature }),
            ...(input.responseSchema === undefined ? {} : { responseSchema: input.responseSchema }),
          },
        }),
      },
      { timeoutMs: input.timeoutMs, label: input.label },
    );
    if (!response.ok) return { kind: "status", status: response.status };
    try {
      const parsed = envelope.safeParse(await response.json());
      return {
        kind: "text",
        status: response.status,
        text: parsed.success ? (parsed.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "") : "",
      };
    } catch {
      return { kind: "text", status: response.status, text: "" };
    }
  } catch (error) {
    return error instanceof UpstreamTimeout ? { kind: "timeout" } : { kind: "network" };
  }
}
