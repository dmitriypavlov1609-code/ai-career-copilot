import OpenAI from "openai";

function parseJsonResponse(text) {
  if (!text || typeof text !== "string") {
    return null;
  }

  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (!fencedMatch) {
      return null;
    }
    try {
      return JSON.parse(fencedMatch[1]);
    } catch {
      return null;
    }
  }
}

function normalizePayload(parsed) {
  return {
    score: Number.isFinite(parsed.score) ? Math.max(0, Math.min(100, Math.round(parsed.score))) : 0,
    matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords.slice(0, 24) : [],
    missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords.slice(0, 24) : [],
    summary: typeof parsed.summary === "string" ? parsed.summary : "",
    actionPlan: Array.isArray(parsed.actionPlan) ? parsed.actionPlan.slice(0, 5) : []
  };
}

async function analyzeWithOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

  return response.output_text || "";
}

async function analyzeWithGroq(prompt) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: "You are an expert technical recruiter and ATS optimization coach. Return only valid JSON with the exact keys requested."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error ${response.status}: ${text}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { resumeText, jobText, language } = req.body || {};
  if (!resumeText || !jobText) {
    res.status(400).json({ error: "resumeText and jobText are required" });
    return;
  }

  try {
    const targetLanguage = language === "ru" ? "Russian" : "English";
    const prompt = `Analyze resume text against job description. Return strict JSON only with fields: score(number 0-100), matchedKeywords(array of strings), missingKeywords(array of strings), summary(string), actionPlan(array of 5 strings). Write summary and actionPlan in ${targetLanguage}.

Resume:\n${resumeText}\n\nJob Description:\n${jobText}`;
    const provider = (process.env.AI_PROVIDER || "").toLowerCase();
    const resolvedProvider = provider || (process.env.GROQ_API_KEY ? "groq" : "openai");
    const text = resolvedProvider === "groq"
      ? await analyzeWithGroq(prompt)
      : await analyzeWithOpenAI(prompt);
    const parsed = parseJsonResponse(text);

    if (!parsed) {
      res.status(502).json({ error: "Model response was not valid JSON" });
      return;
    }

    const payload = normalizePayload(parsed);

    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({
      error: "Failed to analyze text",
      details: error?.message || "Unknown error"
    });
  }
}
