import ModelClient from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { isUnexpected } from '@azure-rest/ai-inference';

const aiClient = ModelClient(process.env.AI_ENDPOINT, new AzureKeyCredential(process.env.AI_API_KEY));
const modelName = process.env.AI_MODEL || 'openai/gpt-4';

export async function POST(req) {
  const body = await req.json();
  const { proposal } = body;
  if (!proposal || proposal.trim().length < 50) {
    return new Response(JSON.stringify({ error: 'Proposal must be at least 50 characters long' }), { status: 400 });
  }

  const prompt = `Analyze this freelancing proposal and provide a JSON response with:\n1. \"scores\": object with scores (1-10) for Clarity, Professionalism, Relevance, ValueProposition, CallToAction\n2. \"suggestions\": array of objects with category & suggestion\n3. \"rewritten_proposal\": improved version\n\nProposal: \"\"\"${proposal.trim()}\"\"\"`;

  try {
    const aiRes = await aiClient.path("/chat/completions").post({
      body: {
        model: modelName,
        messages: [
          { role: "system", content: "You are a freelancing expert. Respond with exactly valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        top_p: 0.9,
        response_format: { type: "json_object" }
      }
    });

    if (isUnexpected(aiRes)) throw new Error(aiRes.body.error?.message);
    const content = aiRes.body.choices[0]?.message?.content;
    const data = JSON.parse(content);

    const defaultScores = { Clarity: 0, Professionalism: 0, Relevance: 0, ValueProposition: 0, CallToAction: 0 };
    data.scores = { ...defaultScores, ...data.scores };
    data.suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
    data.rewritten_proposal = data.rewritten_proposal || data.rewrittenProposal || "";

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || 'Analysis failed' }), { status: 500 });
  }
}
