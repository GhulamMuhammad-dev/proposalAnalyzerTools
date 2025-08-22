import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.GITHUB_MODELS_ENDPOINT || "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});

const modelName = process.env.GITHUB_MODEL || "openai/gpt-4.1";

function safeParseJSON(maybe) {
  try {
    return typeof maybe === "string" ? JSON.parse(maybe) : maybe;
  } catch (e) {
    return null;
  }
}

// --- Dummy fallback data ---
function getDummyData(proposal) {
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

I understand you're looking for support and I can help you achieve strong results. I’ve worked on similar projects and know what it takes to deliver high-quality outcomes.

Here’s how I’d approach your project:
- Analyze requirements and highlight key goals  
- Build a clear, efficient solution  
- Ensure fast delivery with ongoing communication  

I’d be happy to bring this expertise to your project and ensure your expectations are exceeded.`,
    high_impact_changes: [
      "Improve opening hook",
      "Add a clear CTA",
      "Reference client’s job description more directly",
    ],
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { proposal, clientName, jobDescription } = body;

    if (!proposal || proposal.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Proposal must be at least 50 characters long" }), { status: 400 });
    }

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

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Proposal analysis error:", err);
    // Return dummy fallback
    return new Response(JSON.stringify(getDummyData("Fallback Proposal")), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
