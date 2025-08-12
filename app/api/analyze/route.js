// app/api/analyze/route.js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.GITHUB_MODELS_ENDPOINT || "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN, // GitHub Personal Access Token with models:read
});

const modelName = process.env.GITHUB_MODEL || "openai/gpt-4o";

export async function POST(req) {
  try {
    const body = await req.json();
    const { proposal } = body;

    if (!proposal || proposal.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "Proposal must be at least 50 characters long" }),
        { status: 400 }
      );
    }

    const prompt = `
Analyze this freelancing proposal and provide a JSON response with:
1. "scores": object with scores (1-10) for Clarity, Professionalism, Relevance, ValueProposition, CallToAction
2. "suggestions": array of objects with category & suggestion
3. "rewritten_proposal": improved version

Proposal: """${proposal.trim()}"""
`;

    const aiRes = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: "You are a freelancing expert. Respond with exactly valid JSON and nothing else." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      top_p: 0.9,
      response_format: { type: "json_object" }, // Ensures valid JSON
    });

    const content = aiRes.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI model");
    }

    const data = JSON.parse(content);

    // Ensure structure integrity
    const defaultScores = {
      Clarity: 0,
      Professionalism: 0,
      Relevance: 0,
      ValueProposition: 0,
      CallToAction: 0,
    };

    data.scores = { ...defaultScores, ...data.scores };
    data.suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
    data.rewritten_proposal = data.rewritten_proposal || data.rewrittenProposal || "";

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Proposal analysis error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Analysis failed" }),
      { status: 500 }
    );
  }
}
