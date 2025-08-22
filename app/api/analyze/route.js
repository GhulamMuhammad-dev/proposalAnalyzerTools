import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API, // set in .env
});

const modelName = process.env.OPENROUTER_MODEL || "deepseek/deepseek-r1-0528:free";

function safeParseJSON(maybe) {
  try {
    if (typeof maybe !== "string") return maybe;
    const stripped = maybe.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    return JSON.parse(stripped);
  } catch {
    return null;
  }
}

const clamp01 = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(10, num));
};

function normalizeSuggestions(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((it) => {
      if (typeof it === "string") return { category: "General", suggestion: it };
      return {
        category: String(it?.category ?? "General"),
        suggestion: String(it?.suggestion ?? it?.text ?? ""),
      };
    })
    .filter((x) => x.suggestion);
}

function normalizeScores(raw) {
  if (!raw) return {};
  if (Array.isArray(raw)) {
    const out = {};
    for (const it of raw) {
      const k = String(it?.name ?? it?.metric ?? "").trim();
      if (!k) continue;
      const v = clamp01(it?.score ?? it?.value);
      out[k] = v;
    }
    return out;
  }
  if (typeof raw === "object") {
    const out = {};
    for (const [k, v] of Object.entries(raw)) {
      out[k] = clamp01(v);
    }
    return out;
  }
  return {};
}

function normalizePayload(p) {
  const overall = p?.overall_score ?? p?.overallScore ?? p?.score ?? 0;
  const rewritten = p?.rewritten_proposal ?? p?.rewrittenProposal ?? p?.proposal ?? "";
  const highImpact = p?.high_impact_changes ?? p?.highImpactChanges ?? p?.highImpact ?? [];

  const out = {
    overall_score: clamp01(overall),
    scores: normalizeScores(p?.scores ?? p?.metrics),
    suggestions: normalizeSuggestions(p?.suggestions),
    rewritten_proposal: String(rewritten),
    high_impact_changes: Array.isArray(highImpact) ? highImpact.map((x) => String(x)) : [],
  };

  if ((!Number.isFinite(out.overall_score) || out.overall_score === 0) && Object.keys(out.scores).length > 0) {
    const vals = Object.values(out.scores);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    out.overall_score = clamp01(Number(avg.toFixed(1)));
  }

  return out;
}

function getDummyData() {
  return {
    scores: {
      Personalization: 7,
      Hook: 6,
      SocialProof: 5,
      SolutionClarity: 7,
      PortfolioFit: 6,
      CTA: 5,
      Brevity: 8,
      NoPrematureQuestions: 9,
      ProfessionalTone: 7,
      ProfileOptimization: 6,
      Targeting: 6,
      TOSCompliance: 10,
      ConnectsWorthiness: 7,
    },
    overall_score: 6.9,
    suggestions: [
      { category: "Hook", suggestion: "Start with a stronger attention-grabbing line." },
      { category: "CTA", suggestion: "Add a clear call to action at the end." },
    ],
    rewritten_proposal: `Hi there,

You're looking for a reliable partner to deliver clear outcomes fast—I can help.

**How I’ll approach it**
- Clarify success metrics and timeline  
- Build a lean, testable solution  
- Keep communication crisp with short milestones  

If this sounds good, I can share 1–2 relevant examples and a brief plan for Day 1–3.

Best regards,  
[Your Name]`,
    high_impact_changes: [
      "Strengthen the opening hook",
      "Add a specific, single-step CTA",
      "Reference the client’s job description directly",
    ],
    _fallback: true,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { proposal, clientName, jobDescription } = body || {};

    if (!proposal || String(proposal).trim().length < 50) {
      return new Response(JSON.stringify({ error: "Proposal must be at least 50 characters long" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `You are an expert Upwork proposal coach. Analyze the given freelancing proposal using a 13-point proposal framework and RETURN ONLY JSON (no prose, no markdown fences).

Input:
- Client name: ${clientName || "(not provided)"}
- Job description: ${jobDescription ? `"""${String(jobDescription).trim()}"""` : "(not provided)"}
- Proposal: """${String(proposal).trim()}"""

Output EXACTLY valid JSON with this shape:
{
  "scores": { "MetricName": number (0-10), ... },
  "overall_score": number (0-10),
  "suggestions": [ { "category": string, "suggestion": string }, ... ],
  "rewritten_proposal": string (120-180 words, formatted in Markdown with paragraphs and bullets),
  "high_impact_changes": [string, ...]
}

Rules for rewritten_proposal:
- Address client by name in the first line if provided, otherwise use 'Hi there'.
- Use Markdown for formatting (paragraphs, bullets).
- First 2 lines must restate the problem and promise an outcome.
- Include 2-3 short bullet points that outline the approach.
- End with 'Best regards, [Your Name]'.
`;

    const aiRes = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: "You are a helpful Upwork proposal coach. Return ONLY JSON as requested." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      top_p: 0.95,
    });

    const content = aiRes?.choices?.[0]?.message?.content;
    if (!content) throw new Error("No response from model");

    const parsed = safeParseJSON(content);
    if (!parsed || typeof parsed !== "object") throw new Error("Model returned non-JSON or invalid JSON");

    const normalized = normalizePayload(parsed);

    return new Response(JSON.stringify(normalized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Proposal analysis error:", err);
    return new Response(JSON.stringify(getDummyData()), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
