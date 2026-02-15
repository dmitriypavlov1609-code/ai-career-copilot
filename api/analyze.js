import OpenAI from "openai";

function parseJsonResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { resumeText, jobText } = req.body || {};
  if (!resumeText || !jobText) {
    res.status(400).json({ error: "resumeText and jobText are required" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({ error: "OPENAI_API_KEY is missing" });
    return;
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Analyze resume text against job description. Return strict JSON only with fields: score(number 0-100), matchedKeywords(array of strings), missingKeywords(array of strings), summary(string), actionPlan(array of 5 strings).

Resume:\n${resumeText}\n\nJob Description:\n${jobText}`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "You are an expert technical recruiter and ATS optimization coach. Return only valid JSON with the exact keys requested."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_output_tokens: 900
    });

    const text = response.output_text || "";
    const parsed = parseJsonResponse(text);

    if (!parsed) {
      res.status(502).json({ error: "Model response was not valid JSON" });
      return;
    }

    const payload = {
      score: Number.isFinite(parsed.score) ? Math.max(0, Math.min(100, Math.round(parsed.score))) : 0,
      matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords.slice(0, 24) : [],
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords.slice(0, 24) : [],
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      actionPlan: Array.isArray(parsed.actionPlan) ? parsed.actionPlan.slice(0, 5) : []
    };

    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({
      error: "Failed to analyze text",
      details: error?.message || "Unknown error"
    });
  }
}
