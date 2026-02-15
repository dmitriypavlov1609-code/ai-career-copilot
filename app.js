const stopWords = new Set([
  "the", "and", "for", "with", "you", "your", "from", "that", "this", "will", "are", "our", "but", "all", "can", "have", "has", "into", "out", "not", "job", "role", "team", "using", "use", "we", "who", "to", "of", "on", "in", "a", "an", "or", "as", "is", "be", "at", "by", "it", "if"
]);

const resumeInput = document.getElementById("resumeInput");
const jobInput = document.getElementById("jobInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const fillDemoBtn = document.getElementById("fillDemoBtn");
const clearBtn = document.getElementById("clearBtn");
const resultPanel = document.getElementById("resultPanel");

const scoreValue = document.getElementById("scoreValue");
const scoreLabel = document.getElementById("scoreLabel");
const scoreRing = document.querySelector(".score-ring");
const missingKeywords = document.getElementById("missingKeywords");
const matchedKeywords = document.getElementById("matchedKeywords");
const generatedSummary = document.getElementById("generatedSummary");
const actionPlan = document.getElementById("actionPlan");

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9+#.]{3,}/g) || [])
    .filter((word) => !stopWords.has(word));
}

function topKeywords(text, limit = 22) {
  const freq = new Map();
  for (const token of tokenize(text)) {
    freq.set(token, (freq.get(token) || 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function chip(word, kind) {
  const item = document.createElement("span");
  item.className = `chip ${kind}`;
  item.textContent = word;
  return item;
}

function buildSummary(score, matched, missing) {
  const strength = score >= 80
    ? "strong alignment"
    : score >= 60
      ? "solid baseline fit"
      : "clear growth potential";

  const matchedText = matched.slice(0, 5).join(", ") || "core engineering delivery";
  const missingText = missing.slice(0, 4).join(", ") || "deeper domain context";

  return `Results indicate ${strength} for this role. Your profile already demonstrates ${matchedText}. To improve interview conversion and ATS ranking, explicitly add evidence for ${missingText} with measurable outcomes (latency, revenue impact, delivery speed) and stronger ownership statements.`;
}

function buildActions(missing, score) {
  const defaults = [
    "Add 3 quantified impact bullets (e.g., performance, cost, conversion, retention).",
    "Mirror the vacancy wording in skills and project sections for ATS relevance.",
    "Move the most role-relevant project to the top and shorten weaker bullets.",
    "Include one architecture/system-design example with your decisions and tradeoffs.",
    "Tailor your headline and summary for this exact role before each application."
  ];

  const dynamic = missing.slice(0, 5).map((word) => `Add one concrete bullet proving experience with: ${word}.`);
  const list = (dynamic.length ? dynamic : defaults).slice(0, 5);

  if (score < 50 && list.length < 5) {
    list.push("Consider a focused portfolio project that closes two missing requirements.");
  }

  return list.slice(0, 5);
}

function setScore(score) {
  scoreValue.textContent = `${score}%`;
  scoreRing.style.setProperty("--score", `${score}%`);

  if (score >= 80) {
    scoreLabel.textContent = "High match. Optimize wording and metrics.";
  } else if (score >= 60) {
    scoreLabel.textContent = "Good match. Close a few keyword gaps.";
  } else if (score >= 40) {
    scoreLabel.textContent = "Medium match. Needs targeted tailoring.";
  } else {
    scoreLabel.textContent = "Low match. Rewrite around role priorities.";
  }
}

function analyze() {
  const resumeText = resumeInput.value.trim();
  const jobText = jobInput.value.trim();

  if (!resumeText || !jobText) {
    alert("Please paste both resume text and job description.");
    return;
  }

  const resumeSet = new Set(tokenize(resumeText));
  const jobKeywords = topKeywords(jobText, 24);

  const matched = [];
  const missing = [];

  for (const word of jobKeywords) {
    if (resumeSet.has(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  }

  const rawScore = jobKeywords.length ? (matched.length / jobKeywords.length) * 100 : 0;
  const score = clamp(Math.round(rawScore), 8, 98);

  setScore(score);

  missingKeywords.innerHTML = "";
  matchedKeywords.innerHTML = "";

  (missing.length ? missing : ["no critical gaps found"]).forEach((word) => {
    missingKeywords.appendChild(chip(word, "miss"));
  });

  (matched.length ? matched : ["none yet"]).forEach((word) => {
    matchedKeywords.appendChild(chip(word, "match"));
  });

  generatedSummary.textContent = buildSummary(score, matched, missing);

  actionPlan.innerHTML = "";
  for (const action of buildActions(missing, score)) {
    const li = document.createElement("li");
    li.textContent = action;
    actionPlan.appendChild(li);
  }

  resultPanel.classList.remove("hidden");
}

function fillDemo() {
  resumeInput.value = `Senior Full-Stack Engineer with 6+ years building web products for 2M+ users.\n- Built customer analytics dashboard with React, TypeScript and Node.js\n- Reduced API response time by 37% through SQL tuning and caching\n- Delivered Stripe billing integration and subscription flows\n- Worked with AWS (EC2, S3, RDS), Docker and GitHub Actions CI/CD\n- Mentored 4 engineers and led sprint planning with product/design`;

  jobInput.value = `We are hiring a Senior Software Engineer to build scalable product features end-to-end.\nRequirements: Next.js, TypeScript, Node.js, PostgreSQL, Redis, AWS, CI/CD, system design, microservices, observability, and stakeholder communication.\nNice to have: Kubernetes, GraphQL, experimentation, analytics.`;
}

function clearAll() {
  resumeInput.value = "";
  jobInput.value = "";
  resultPanel.classList.add("hidden");
}

analyzeBtn.addEventListener("click", analyze);
fillDemoBtn.addEventListener("click", fillDemo);
clearBtn.addEventListener("click", clearAll);
