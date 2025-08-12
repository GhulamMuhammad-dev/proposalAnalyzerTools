import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.GITHUB_MODELS_ENDPOINT || "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});

const modelName = process.env.GITHUB_MODEL || "openai/gpt-4o";

function safeParseJSON(maybe) {
  try {
    return typeof maybe === "string" ? JSON.parse(maybe) : maybe;
  } catch (e) {
    return null;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { proposal, clientName, jobDescription } = body;

    if (!proposal || proposal.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Proposal must be at least 50 characters long" }), { status: 400 });
    }

    // Build context-aware prompt
    const prompt = `You are an expert Upwork proposal coach and full-stack developer. Analyze the given freelancing proposal using the 13-point Winning Upwork Proposal Framework (Personalization, Hook, Social Proof, Solution Clarity, Portfolio Fit, CTA, Brevity, NoPrematureQuestions, Professional Tone, Profile Optimization, Strategic Targeting, TOS Compliance, Connects-Worthiness).

Given input:
- Client name (if provided): ${clientName || "(not provided)"}
- Job description (if provided): ${jobDescription ? `"""${jobDescription.trim()}"""` : "(not provided)"}
- Proposal: """${proposal.trim()}"""

Produce EXACTLY valid JSON (no additional text) with the following shape:
{
  "scores": {
    "Personalization": number (1-10),
    "Hook": number (1-10),
    "SocialProof": number (1-10),
    "SolutionClarity": number (1-10),
    "PortfolioFit": number (1-10),
    "CTA": number (1-10),
    "Brevity": number (1-10),
    "NoPrematureQuestions": number (1-10),
    "ProfessionalTone": number (1-10),
    "ProfileOptimization": number (1-10),
    "Targeting": number (1-10),
    "TOSCompliance": number (1-10),
    "ConnectsWorthiness": number (1-10)
  },
  "overall_score": number, // average of the 13 scores rounded to 1 decimal
  "suggestions": [ { "category": string, "suggestion": string } ... ],
  "rewritten_proposal": string (120-180 words, 3-5 paragraphs),
  "high_impact_changes": [string ...] // short bullets of the top 3 things to change immediately
}

Rules:
- Use client's name in rewrite if provided, otherwise use 'Hi there' or 'Hello'.
- First 2 lines of rewritten_proposal must hook the reader by restating the problem and promising an outcome.
- Rewritten proposal must include 2-3 short bullet points that clearly outline the approach.
- Do NOT include contact info or any Upwork TOS violations. Keep language professional and concise.
- If job description was provided, make the rewritten proposal reference specifics from it.

Respond now with only JSON matching the schema above.`;

    const aiRes = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: "You are a helpful Upwork proposal coach. Strictly return JSON as requested." },
        { role: "user", content: prompt },
      ],
      temperature: 0.15,
      top_p: 0.95,
      response_format: { type: "json_object" },
    });

    const content = aiRes.choices?.[0]?.message?.content;
    if (!content) throw new Error("No response from AI model");

    const parsed = safeParseJSON(content);
    if (!parsed) throw new Error("AI returned invalid JSON");

    // Validate and normalize structure
    const expectedKeys = [
      "Personalization",
      "Hook",
      "SocialProof",
      "SolutionClarity",
      "PortfolioFit",
      "CTA",
      "Brevity",
      "NoPrematureQuestions",
      "ProfessionalTone",
      "ProfileOptimization",
      "Targeting",
      "TOSCompliance",
      "ConnectsWorthiness",
    ];

    const scores = parsed.scores || {};
    const normalizedScores = {};
    for (const k of expectedKeys) {
      const v = Number(scores[k] ?? scores[k.replace(/([A-Z])/g, "_$1")] ?? 0);
      normalizedScores[k] = Math.max(0, Math.min(10, isNaN(v) ? 0 : Math.round(v * 10) / 10));
    }

    const sum = Object.values(normalizedScores).reduce((a, b) => a + b, 0);
    const overall = Math.round((sum / expectedKeys.length) * 10) / 10;

    const result = {
      scores: normalizedScores,
      overall_score: overall,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      rewritten_proposal: parsed.rewritten_proposal || parsed.rewrittenProposal || "",
      high_impact_changes: Array.isArray(parsed.high_impact_changes) ? parsed.high_impact_changes : parsed.highImpactChanges || [],
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Proposal analysis error:", err);
    return new Response(JSON.stringify({ error: err.message || "Analysis failed" }), { status: 500 });
  }
}
