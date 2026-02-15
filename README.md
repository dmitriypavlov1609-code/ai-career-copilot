# AI Career Copilot

AI-powered web app to tailor your resume for a specific job description.

## Features

- ATS match score
- matched vs missing keywords
- AI-generated professional summary
- top-5 action plan for resume optimization
- graceful fallback to local analysis if API is unavailable

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Vercel Serverless Function (`api/analyze.js`)
- LLM: OpenAI Responses API

## Local Development (with AI backend)

```bash
cd ai-career-copilot
npm install
cp .env.example .env.local
```

Set your key in `.env.local`:

```bash
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
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, default is `gpt-4.1-mini`)

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
