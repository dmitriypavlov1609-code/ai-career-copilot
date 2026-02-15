# AI Career Copilot

AI-powered web app to tailor your resume for a specific job description.

## Features

- ATS match score
- matched vs missing keywords
- AI-generated professional summary
- top-5 action plan for resume optimization
- tailored resume draft for the selected vacancy
- graceful fallback to local analysis if API is unavailable

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Vercel Serverless Function (`api/analyze.js`)
- LLM: Groq API (default) or OpenAI API

## Local Development (with AI backend)

```bash
cd ai-career-copilot
npm install
cp .env.example .env.local
```

Set env vars in `.env.local`:

```bash
AI_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Run:

```bash
npm run dev
```

Open: `http://localhost:3000`

## Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel
```

Set production env vars in Vercel Project Settings:
- `AI_PROVIDER` (`groq` or `openai`)
- `GROQ_API_KEY` and `GROQ_MODEL` (for Groq)
- `OPENAI_API_KEY` and `OPENAI_MODEL` (for OpenAI)

Deploy production:

```bash
vercel --prod
```

## API Contract

`POST /api/analyze`

Body:

```json
{
  "resumeText": "...",
  "jobText": "..."
}
```

Response:

```json
{
  "score": 78,
  "matchedKeywords": ["typescript", "node.js"],
  "missingKeywords": ["kubernetes", "graphql"],
  "summary": "...",
  "actionPlan": ["...", "...", "...", "...", "..."]
}
```
