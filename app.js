const stopWords = new Set([
  "the", "and", "for", "with", "you", "your", "from", "that", "this", "will", "are", "our", "but", "all", "can", "have", "has", "into", "out", "not", "job", "role", "team", "using", "use", "we", "who", "to", "of", "on", "in", "a", "an", "or", "as", "is", "be", "at", "by", "it", "if"
]);

const i18n = {
  en: {
    languageLabel: "Language",
    eyebrow: "2026 Job Market Toolkit",
    subtitle: "Analyze ATS match, detect keyword gaps, and generate a sharper profile in seconds.",
    resumeTitle: "Your Resume",
    resumeHint: "Paste your resume text or bullet points.",
    resumePlaceholder: "Example:\n- Built a customer dashboard with React and TypeScript\n- Improved API latency by 35%\n- Led integration with Stripe",
    jobTitle: "Job Description",
    jobHint: "Paste vacancy text from LinkedIn or company site.",
    jobPlaceholder: "Example:\nWe need a Full-Stack Engineer with Next.js, Node.js, PostgreSQL, AWS, CI/CD, and system design experience.",
    analyzeBtn: "Run Analysis",
    analyzing: "Analyzing...",
    fillDemoBtn: "Load Demo Data",
    clearBtn: "Clear",
    scoreTitle: "ATS Match Score",
    scoreInitial: "Add resume + job text to begin.",
    missingTitle: "Missing Keywords",
    matchedTitle: "Matched Keywords",
    summaryTitle: "Tailored Professional Summary",
    planTitle: "Action Plan (Top 5)",
    alertMissingInput: "Please paste both resume text and job description.",
    noGaps: "no critical gaps found",
    noneYet: "none yet",
    scoreLabelHigh: "High match. Optimize wording and metrics.",
    scoreLabelGood: "Good match. Close a few keyword gaps.",
    scoreLabelMid: "Medium match. Needs targeted tailoring.",
    scoreLabelLow: "Low match. Rewrite around role priorities.",
    summaryStrengthHigh: "strong alignment",
    summaryStrengthGood: "solid baseline fit",
    summaryStrengthLow: "clear growth potential",
    summaryDefaultMatched: "core engineering delivery",
    summaryDefaultMissing: "deeper domain context",
    summaryTemplate: "Results indicate {strength} for this role. Your profile already demonstrates {matched}. To improve interview conversion and ATS ranking, explicitly add evidence for {missing} with measurable outcomes (latency, revenue impact, delivery speed) and stronger ownership statements.",
    actionDefaults: [
      "Add 3 quantified impact bullets (e.g., performance, cost, conversion, retention).",
      "Mirror the vacancy wording in skills and project sections for ATS relevance.",
      "Move the most role-relevant project to the top and shorten weaker bullets.",
      "Include one architecture/system-design example with your decisions and tradeoffs.",
      "Tailor your headline and summary for this exact role before each application."
    ],
    actionWithKeyword: "Add one concrete bullet proving experience with: {word}.",
    actionLowScoreExtra: "Consider a focused portfolio project that closes two missing requirements.",
    demoResume: "Senior Full-Stack Engineer with 6+ years building web products for 2M+ users.\n- Built customer analytics dashboard with React, TypeScript and Node.js\n- Reduced API response time by 37% through SQL tuning and caching\n- Delivered Stripe billing integration and subscription flows\n- Worked with AWS (EC2, S3, RDS), Docker and GitHub Actions CI/CD\n- Mentored 4 engineers and led sprint planning with product/design",
    demoJob: "We are hiring a Senior Software Engineer to build scalable product features end-to-end.\nRequirements: Next.js, TypeScript, Node.js, PostgreSQL, Redis, AWS, CI/CD, system design, microservices, observability, and stakeholder communication.\nNice to have: Kubernetes, GraphQL, experimentation, analytics."
  },
  ru: {
    languageLabel: "Язык",
    eyebrow: "Карьерный набор 2026",
    subtitle: "Оценивайте ATS-совпадение, находите пробелы по ключевым словам и улучшайте профиль за секунды.",
    resumeTitle: "Ваше резюме",
    resumeHint: "Вставьте текст резюме или буллеты.",
    resumePlaceholder: "Пример:\n- Разработал клиентский дашборд на React и TypeScript\n- Ускорил API на 35%\n- Внедрил интеграцию со Stripe",
    jobTitle: "Описание вакансии",
    jobHint: "Вставьте текст вакансии с LinkedIn или сайта компании.",
    jobPlaceholder: "Пример:\nИщем Full-Stack инженера с опытом Next.js, Node.js, PostgreSQL, AWS, CI/CD и system design.",
    analyzeBtn: "Запустить анализ",
    analyzing: "Анализируем...",
    fillDemoBtn: "Загрузить демо",
    clearBtn: "Очистить",
    scoreTitle: "Оценка ATS",
    scoreInitial: "Добавьте резюме и текст вакансии для старта.",
    missingTitle: "Отсутствующие ключевые слова",
    matchedTitle: "Совпавшие ключевые слова",
    summaryTitle: "Адаптированное проф. резюме",
    planTitle: "План действий (Топ 5)",
    alertMissingInput: "Пожалуйста, вставьте и резюме, и описание вакансии.",
    noGaps: "критичных пробелов не найдено",
    noneYet: "пока нет",
    scoreLabelHigh: "Высокое совпадение. Улучшите формулировки и метрики.",
    scoreLabelGood: "Хорошее совпадение. Закройте несколько пробелов.",
    scoreLabelMid: "Среднее совпадение. Нужна точечная адаптация.",
    scoreLabelLow: "Низкое совпадение. Перепишите под приоритеты роли.",
    summaryStrengthHigh: "сильное соответствие",
    summaryStrengthGood: "уверенная базовая релевантность",
    summaryStrengthLow: "заметный потенциал для усиления",
    summaryDefaultMatched: "ключевые инженерные результаты",
    summaryDefaultMissing: "более глубокий доменный контекст",
    summaryTemplate: "Результаты показывают {strength} для этой роли. Ваш профиль уже демонстрирует {matched}. Чтобы повысить шанс интервью и ATS-рейтинг, добавьте подтверждающие факты по {missing} с измеримыми результатами (латентность, выручка, скорость поставки) и более сильными формулировками ответственности.",
    actionDefaults: [
      "Добавьте 3 буллета с измеримым эффектом (производительность, затраты, конверсия, retention).",
      "Используйте формулировки из вакансии в разделе навыков и проектов для ATS.",
      "Поднимите самый релевантный проект наверх и сократите слабые пункты.",
      "Добавьте пример архитектуры/system design с вашими решениями и компромиссами.",
      "Адаптируйте headline и summary под конкретную вакансию перед откликом."
    ],
    actionWithKeyword: "Добавьте конкретный буллет, подтверждающий опыт с: {word}.",
    actionLowScoreExtra: "Рассмотрите фокусный pet-проект, закрывающий 2 отсутствующих требования.",
    demoResume: "Senior Full-Stack Engineer с 6+ годами опыта разработки продуктов для 2M+ пользователей.\n- Разработал аналитический дашборд на React, TypeScript и Node.js\n- Снизил время ответа API на 37% через SQL-оптимизацию и кэширование\n- Реализовал Stripe-биллинг и подписки\n- Работал с AWS (EC2, S3, RDS), Docker и GitHub Actions CI/CD\n- Менторил 4 инженеров и лидировал спринт-планирование",
    demoJob: "Ищем Senior Software Engineer для end-to-end разработки масштабируемых функций продукта.\nТребования: Next.js, TypeScript, Node.js, PostgreSQL, Redis, AWS, CI/CD, system design, microservices, observability, коммуникация со стейкхолдерами.\nПлюсом будет: Kubernetes, GraphQL, experimentation, analytics."
  }
};

let currentLanguage = localStorage.getItem("appLang") || "en";
if (!i18n[currentLanguage]) {
  currentLanguage = "en";
}

const languageSelect = document.getElementById("languageSelect");
const languageLabel = document.querySelector(".lang-picker span");
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

function t() {
  return i18n[currentLanguage];
}

function setUiLanguage(language) {
  currentLanguage = i18n[language] ? language : "en";
  localStorage.setItem("appLang", currentLanguage);
  document.documentElement.lang = currentLanguage;
  languageSelect.value = currentLanguage;

  const tr = t();
  languageLabel.textContent = tr.languageLabel;
  document.getElementById("eyebrowText").textContent = tr.eyebrow;
  document.getElementById("subtitleText").textContent = tr.subtitle;
  document.getElementById("resumeTitle").textContent = tr.resumeTitle;
  document.getElementById("resumeHint").textContent = tr.resumeHint;
  document.getElementById("jobTitle").textContent = tr.jobTitle;
  document.getElementById("jobHint").textContent = tr.jobHint;
  document.getElementById("scoreTitle").textContent = tr.scoreTitle;
  document.getElementById("missingTitle").textContent = tr.missingTitle;
  document.getElementById("matchedTitle").textContent = tr.matchedTitle;
  document.getElementById("summaryTitle").textContent = tr.summaryTitle;
  document.getElementById("planTitle").textContent = tr.planTitle;

  resumeInput.placeholder = tr.resumePlaceholder;
  jobInput.placeholder = tr.jobPlaceholder;
  analyzeBtn.textContent = tr.analyzeBtn;
  fillDemoBtn.textContent = tr.fillDemoBtn;
  clearBtn.textContent = tr.clearBtn;

  if (resultPanel.classList.contains("hidden")) {
    scoreLabel.textContent = tr.scoreInitial;
  }
}

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9+#.]{3,}/g) || []).filter((word) => !stopWords.has(word));
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
  const tr = t();
  const strength = score >= 80
    ? tr.summaryStrengthHigh
    : score >= 60
      ? tr.summaryStrengthGood
      : tr.summaryStrengthLow;

  const matchedText = matched.slice(0, 5).join(", ") || tr.summaryDefaultMatched;
  const missingText = missing.slice(0, 4).join(", ") || tr.summaryDefaultMissing;

  return tr.summaryTemplate
    .replace("{strength}", strength)
    .replace("{matched}", matchedText)
    .replace("{missing}", missingText);
}

function buildActions(missing, score) {
  const tr = t();
  const defaults = tr.actionDefaults;

  const dynamic = missing.slice(0, 5).map((word) => tr.actionWithKeyword.replace("{word}", word));
  const list = (dynamic.length ? dynamic : defaults).slice(0, 5);

  if (score < 50 && list.length < 5) {
    list.push(tr.actionLowScoreExtra);
  }

  return list.slice(0, 5);
}

function setScore(score) {
  const tr = t();
  scoreValue.textContent = `${score}%`;
  scoreRing.style.setProperty("--score", `${score}%`);

  if (score >= 80) {
    scoreLabel.textContent = tr.scoreLabelHigh;
  } else if (score >= 60) {
    scoreLabel.textContent = tr.scoreLabelGood;
  } else if (score >= 40) {
    scoreLabel.textContent = tr.scoreLabelMid;
  } else {
    scoreLabel.textContent = tr.scoreLabelLow;
  }
}

function renderAnalysis(result) {
  const tr = t();
  const score = clamp(Math.round(result.score || 0), 0, 100);
  const missing = Array.isArray(result.missingKeywords) ? result.missingKeywords : [];
  const matched = Array.isArray(result.matchedKeywords) ? result.matchedKeywords : [];

  setScore(score);

  missingKeywords.innerHTML = "";
  matchedKeywords.innerHTML = "";

  (missing.length ? missing : [tr.noGaps]).forEach((word) => {
    missingKeywords.appendChild(chip(word, "miss"));
  });

  (matched.length ? matched : [tr.noneYet]).forEach((word) => {
    matchedKeywords.appendChild(chip(word, "match"));
  });

  generatedSummary.textContent = result.summary || buildSummary(score, matched, missing);

  actionPlan.innerHTML = "";
  const plan = Array.isArray(result.actionPlan) && result.actionPlan.length
    ? result.actionPlan
    : buildActions(missing, score);

  for (const action of plan.slice(0, 5)) {
    const li = document.createElement("li");
    li.textContent = action;
    actionPlan.appendChild(li);
  }

  resultPanel.classList.remove("hidden");
}

function localAnalyze(resumeText, jobText) {
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

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    summary: buildSummary(score, matched, missing),
    actionPlan: buildActions(missing, score)
  };
}

async function analyze() {
  const tr = t();
  const resumeText = resumeInput.value.trim();
  const jobText = jobInput.value.trim();

  if (!resumeText || !jobText) {
    alert(tr.alertMissingInput);
    return;
  }

  const initialText = tr.analyzeBtn;
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = tr.analyzing;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ resumeText, jobText, language: currentLanguage })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    renderAnalysis(data);
  } catch {
    const fallback = localAnalyze(resumeText, jobText);
    renderAnalysis(fallback);
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = initialText;
  }
}

function fillDemo() {
  const tr = t();
  resumeInput.value = tr.demoResume;
  jobInput.value = tr.demoJob;
}

function clearAll() {
  resumeInput.value = "";
  jobInput.value = "";
  resultPanel.classList.add("hidden");
  scoreLabel.textContent = t().scoreInitial;
}

languageSelect.addEventListener("change", (event) => {
  setUiLanguage(event.target.value);
});

analyzeBtn.addEventListener("click", analyze);
fillDemoBtn.addEventListener("click", fillDemo);
clearBtn.addEventListener("click", clearAll);

setUiLanguage(currentLanguage);
