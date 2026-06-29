const APP_NAME = "Language Mock Test";
const APP_VERSION = "1.0";
const STORAGE_KEYS = {
  latestResult: "languageMockTest_latestResult_v1",
  history: "languageMockTest_history_v1",
  wrongAnswers: "languageMockTest_wrongAnswers_v1",
  recentQuestions: "languageMockTest_recentQuestions_v1",
  settings: "languageMockTest_settings_v1"
};
const LEGACY_STORAGE_KEYS = {
  latestResult: "jlptN5LatestResult",
  history: "jlptN5ResultHistory",
  wrongAnswers: "jlptN5WrongAnswers",
  recentQuestions: "jlptN5RecentQuestionIds"
};
const HISTORY_LIMIT = 50;
const RECENT_QUESTION_LIMIT = 100;
const TRANSLATION_HELP_LIMIT = 3;
const TRANSLATION_UNAVAILABLE_MESSAGE = "Translation is not available for this question yet.";
const OPTION_LETTERS = ["A", "B", "C", "D"];
const DEFAULT_EXAM_ID = "jlpt-n5";
const ALLOWED_EXAMS = ["JLPT", "HSK"];
const ALLOWED_LANGUAGES = ["ja", "zh"];
const ALLOWED_JLPT_LEVELS = ["N5", "N4"];
const ALLOWED_HSK_LEVELS = ["HSK4"];
const ALLOWED_QUESTION_SECTIONS = ["vocabulary", "grammar", "reading", "listening", "writing"];
const ALLOWED_DIFFICULTIES = ["easy", "normal", "hard"];
const EXAM_CONFIGS = [
  {
    id: "jlpt-n5",
    exam: "JLPT",
    language: "ja",
    level: "N5",
    title: "JLPT N5 Mock Test",
    shortTitle: "JLPT N5",
    description: "Practice Japanese vocabulary, grammar, reading, and listening-style questions.",
    note: "This is a practice test, not an official JLPT test.",
    defaultModeId: "full",
    sections: [
      { id: "vocabulary", title: "Vocabulary" },
      { id: "grammar", title: "Grammar" },
      { id: "reading", title: "Reading" },
      { id: "listening", title: "Listening-style Practice" }
    ]
  },
  {
    id: "jlpt-n4",
    exam: "JLPT",
    language: "ja",
    level: "N4",
    title: "JLPT N4 Mock Test",
    shortTitle: "JLPT N4",
    description: "Practice Japanese N4 vocabulary, grammar, reading, and listening-style questions.",
    note: "This is a practice score, not an official JLPT scaled score.",
    emptyBankMessage: "The JLPT N4 question bank has not been fully added yet.",
    defaultModeId: "n4-mini",
    sections: [
      { id: "vocabulary", title: "Vocabulary" },
      { id: "grammar", title: "Grammar" },
      { id: "reading", title: "Reading" },
      { id: "listening", title: "Listening-style Practice" }
    ]
  },
  {
    id: "hsk4",
    exam: "HSK",
    language: "zh",
    level: "HSK4",
    title: "HSK 4 Mock Test",
    shortTitle: "HSK 4",
    description: "Practice HSK 4 listening-style scripts, reading, sentence order, vocabulary, and grammar.",
    note: "This will use practice scores, not official HSK scaled scores.",
    defaultModeId: "hsk4-mini",
    sections: [
      { id: "listening", title: "Listening-style" },
      { id: "reading", title: "Reading" },
      { id: "writing", title: "Writing" },
      { id: "vocabulary", title: "Vocabulary" },
      { id: "grammar", title: "Grammar" }
    ]
  }
];
const TEST_MODES_BY_EXAM = {
  "jlpt-n5": [
    {
      id: "full",
      title: "Full Mock Test",
      description: "Vocabulary, grammar, reading, and listening-style practice.",
      timeLimitMinutes: 60,
      sections: { vocabulary: 10, grammar: 10, reading: 10, listening: 10 }
    },
    {
      id: "mini",
      title: "Mini Test",
      description: "A shorter mixed test for quick review.",
      timeLimitMinutes: 25,
      sections: { vocabulary: 5, grammar: 5, reading: 5, listening: 5 }
    },
    {
      id: "vocabulary",
      title: "Vocabulary Practice",
      description: "Meanings, readings, basic words, and common N5 terms.",
      timeLimitMinutes: 20,
      sections: { vocabulary: 20 }
    },
    {
      id: "grammar",
      title: "Grammar Practice",
      description: "Particles, sentence patterns, and basic grammar forms.",
      timeLimitMinutes: 20,
      sections: { grammar: 20 }
    },
    {
      id: "reading",
      title: "Reading Practice",
      description: "Short N5-style passages with comprehension questions.",
      timeLimitMinutes: 25,
      sections: { reading: 10 }
    },
    {
      id: "listening",
      title: "Listening-style Practice",
      description: "Conversation scripts that prepare you for listening questions.",
      timeLimitMinutes: 20,
      sections: { listening: 10 }
    },
    {
      id: "wrong-review",
      title: "Wrong Answer Review",
      description: "Retake questions you missed before.",
      timeLimitMinutes: 20,
      sections: {},
      isWrongReview: true
    }
  ],
  "jlpt-n4": [
    {
      id: "n4-full",
      title: "Full JLPT N4 Mock Test",
      description: "Mixed N4 vocabulary, grammar, reading, and listening-style practice.",
      timeLimitMinutes: 70,
      sections: { vocabulary: 10, grammar: 10, reading: 10, listening: 10 },
      smallBankWarning: "The JLPT N4 question bank has not been fully added yet."
    },
    {
      id: "n4-mini",
      title: "Mini JLPT N4 Test",
      description: "A shorter mixed N4 test for quick practice.",
      timeLimitMinutes: 30,
      sections: { vocabulary: 5, grammar: 5, reading: 5, listening: 5 },
      smallBankWarning: "The JLPT N4 question bank has not been fully added yet."
    },
    {
      id: "n4-vocabulary",
      title: "N4 Vocabulary Practice",
      description: "N4 word meanings, readings, kanji readings, and word usage.",
      timeLimitMinutes: 20,
      sections: { vocabulary: 20 },
      smallBankWarning: "The JLPT N4 question bank has not been fully added yet."
    },
    {
      id: "n4-grammar",
      title: "N4 Grammar Practice",
      description: "N4 particles, sentence patterns, verb forms, and sentence order.",
      timeLimitMinutes: 25,
      sections: { grammar: 20 },
      smallBankWarning: "The JLPT N4 question bank has not been fully added yet."
    },
    {
      id: "n4-reading",
      title: "N4 Reading Practice",
      description: "Short N4-level passages with comprehension questions.",
      timeLimitMinutes: 30,
      sections: { reading: 10 },
      smallBankWarning: "The JLPT N4 question bank has not been fully added yet."
    },
    {
      id: "n4-listening",
      title: "N4 Listening-style Practice",
      description: "Script-based N4 conversation practice. No real audio is included.",
      timeLimitMinutes: 25,
      sections: { listening: 10 },
      smallBankWarning: "The JLPT N4 question bank has not been fully added yet."
    },
    {
      id: "n4-wrong-review",
      title: "N4 Wrong Answer Review",
      description: "Retake JLPT N4 questions you missed before.",
      timeLimitMinutes: 20,
      sections: {},
      isWrongReview: true
    }
  ],
  hsk4: [
    {
      id: "hsk4-full",
      title: "Full HSK 4 Mock Test",
      description: "Listening-style, reading, and writing practice based on the HSK 4 structure.",
      timeLimitMinutes: 105,
      sections: { listening: 45, reading: 40, writing: 15 },
      smallBankWarning: "The HSK 4 question bank is still small, so this test uses all available questions for now."
    },
    {
      id: "hsk4-mini",
      title: "Mini HSK 4 Test",
      description: "A shorter HSK 4 mixed test for quick practice.",
      timeLimitMinutes: 35,
      sections: { listening: 10, reading: 10, writing: 5 }
    },
    {
      id: "hsk4-listening",
      title: "HSK 4 Listening-style Practice",
      description: "Script-based conversation practice. No real audio is included yet.",
      timeLimitMinutes: 25,
      sections: { listening: 20 }
    },
    {
      id: "hsk4-reading",
      title: "HSK 4 Reading Practice",
      description: "Short HSK 4-level passages with comprehension questions.",
      timeLimitMinutes: 30,
      sections: { reading: 20 }
    },
    {
      id: "hsk4-writing",
      title: "HSK 4 Writing Practice",
      description: "Auto-graded sentence order practice.",
      timeLimitMinutes: 25,
      sections: { writing: 15 }
    },
    {
      id: "hsk4-vocab-grammar",
      title: "HSK 4 Vocabulary / Grammar Practice",
      description: "HSK 4 vocabulary meanings, word usage, and grammar patterns.",
      timeLimitMinutes: 25,
      sections: { vocabulary: 10, grammar: 10 }
    },
    {
      id: "hsk4-wrong-review",
      title: "HSK 4 Wrong Answer Review",
      description: "Retake HSK 4 questions you missed before.",
      timeLimitMinutes: 25,
      sections: {},
      isWrongReview: true
    }
  ]
};

const state = {
  selectedExamId: null,
  selectedTest: null,
  selectedMode: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  reviewFilter: "all",
  remainingSeconds: 0,
  timerId: null,
  activeResult: null,
  translationHelpRemaining: TRANSLATION_HELP_LIMIT,
  activeTranslation: null,
  questionBankValidation: null
};

const screens = {
  home: document.getElementById("home-screen"),
  instruction: document.getElementById("instruction-screen"),
  test: document.getElementById("test-screen"),
  result: document.getElementById("result-screen"),
  review: document.getElementById("review-screen"),
  history: document.getElementById("history-screen")
};

const elements = {
  homeEyebrow: document.getElementById("home-eyebrow"),
  homeTitle: document.getElementById("home-title"),
  homeLead: document.getElementById("home-lead"),
  homeNote: document.getElementById("home-note"),
  examGrid: document.getElementById("exam-grid"),
  examPracticeArea: document.getElementById("exam-practice-area"),
  selectedExamTitle: document.getElementById("selected-exam-title"),
  changeExamBtn: document.getElementById("change-exam-btn"),
  previousSummary: document.getElementById("previous-summary"),
  modeGrid: document.getElementById("mode-grid"),
  modeMessage: document.getElementById("mode-message"),
  viewPreviousBtn: document.getElementById("view-previous-btn"),
  viewHistoryBtn: document.getElementById("view-history-btn"),
  instructionHomeBtn: document.getElementById("instruction-home-btn"),
  instructionTitle: document.getElementById("instruction-title"),
  instructionCount: document.getElementById("instruction-count"),
  instructionTime: document.getElementById("instruction-time"),
  instructionWarning: document.getElementById("instruction-warning"),
  sectionList: document.getElementById("section-list"),
  beginTestBtn: document.getElementById("begin-test-btn"),
  questionCounter: document.getElementById("question-counter"),
  sectionBadge: document.getElementById("section-badge"),
  timer: document.getElementById("timer"),
  progressBar: document.getElementById("progress-bar"),
  questionType: document.getElementById("question-type"),
  passageBox: document.getElementById("passage-box"),
  questionText: document.getElementById("question-text"),
  translationHelpCounter: document.getElementById("translation-help-counter"),
  translateQuestionBtn: document.getElementById("translate-question-btn"),
  translateAnswerBtn: document.getElementById("translate-answer-btn"),
  translationLimitMessage: document.getElementById("translation-limit-message"),
  translationBox: document.getElementById("translation-box"),
  translationBoxTitle: document.getElementById("translation-box-title"),
  translationBoxContent: document.getElementById("translation-box-content"),
  closeTranslationBtn: document.getElementById("close-translation-btn"),
  optionsList: document.getElementById("options-list"),
  previousQuestionBtn: document.getElementById("previous-question-btn"),
  nextQuestionBtn: document.getElementById("next-question-btn"),
  submitTestBtn: document.getElementById("submit-test-btn"),
  questionJumpList: document.getElementById("question-jump-list"),
  resultTitle: document.getElementById("result-title"),
  resultDate: document.getElementById("result-date"),
  scoreText: document.getElementById("score-text"),
  percentageText: document.getElementById("percentage-text"),
  resultMessage: document.getElementById("result-message"),
  resultScoreNote: document.getElementById("result-score-note"),
  sectionBreakdown: document.getElementById("section-breakdown"),
  weakPointAnalysis: document.getElementById("weak-point-analysis"),
  reviewAnswersBtn: document.getElementById("review-answers-btn"),
  retakeTestBtn: document.getElementById("retake-test-btn"),
  resultHomeBtn: document.getElementById("result-home-btn"),
  reviewResultBtn: document.getElementById("review-result-btn"),
  reviewFilters: document.getElementById("review-filters"),
  reviewList: document.getElementById("review-list"),
  historyList: document.getElementById("history-list"),
  clearHistoryBtn: document.getElementById("clear-history-btn"),
  historyHomeBtn: document.getElementById("history-home-btn"),
  exportProgressBtn: document.getElementById("export-progress-btn"),
  importProgressBtn: document.getElementById("import-progress-btn"),
  importProgressInput: document.getElementById("import-progress-input"),
  clearSavedProgressBtn: document.getElementById("clear-saved-progress-btn"),
  savedProgressMessage: document.getElementById("saved-progress-message"),
  checkQuestionBankBtn: document.getElementById("check-question-bank-btn"),
  questionBankReport: document.getElementById("question-bank-report")
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  migrateLegacyStorage();
  normalizeQuestionBank(questionBank);
  state.questionBankValidation = validateQuestionBank();
  logQuestionBankValidation(state.questionBankValidation);
  renderExamCards();
  elements.changeExamBtn.addEventListener("click", showExamSelector);
  elements.viewPreviousBtn.addEventListener("click", showPreviousResult);
  elements.viewHistoryBtn.addEventListener("click", showHistory);
  elements.instructionHomeBtn.addEventListener("click", showHome);
  elements.beginTestBtn.addEventListener("click", beginTest);
  elements.previousQuestionBtn.addEventListener("click", goToPreviousQuestion);
  elements.nextQuestionBtn.addEventListener("click", goToNextQuestion);
  elements.translateQuestionBtn.addEventListener("click", showQuestionTranslation);
  elements.translateAnswerBtn.addEventListener("click", showAnswerTranslations);
  elements.closeTranslationBtn.addEventListener("click", closeTranslationBox);
  elements.submitTestBtn.addEventListener("click", submitWithConfirmation);
  elements.reviewAnswersBtn.addEventListener("click", showReview);
  elements.retakeTestBtn.addEventListener("click", () => showInstructions(state.selectedMode?.id || getCurrentExamConfig().defaultModeId));
  elements.resultHomeBtn.addEventListener("click", showHome);
  elements.reviewResultBtn.addEventListener("click", () => showScreen("result"));
  elements.clearHistoryBtn.addEventListener("click", clearHistory);
  elements.historyHomeBtn.addEventListener("click", showHome);
  elements.exportProgressBtn.addEventListener("click", exportProgress);
  elements.importProgressBtn.addEventListener("click", () => elements.importProgressInput.click());
  elements.importProgressInput.addEventListener("change", handleProgressImport);
  elements.clearSavedProgressBtn.addEventListener("click", clearSavedProgress);
  elements.checkQuestionBankBtn.addEventListener("click", showQuestionBankReport);

  showHome();
}

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
}

function normalizeQuestionBank(bank = questionBank) {
  bank.forEach((question) => {
    if (question && typeof question === "object") {
      normalizeQuestionDefaults(question);
    }
  });
}

function normalizeQuestionDefaults(question) {
  if (!question || typeof question !== "object") {
    return question;
  }

  if (!question.exam) {
    question.exam = "JLPT";
  }

  if (!question.language) {
    question.language = question.exam === "HSK" ? "zh" : "ja";
  }

  if (!question.level) {
    question.level = question.exam === "HSK" ? "HSK4" : "N5";
  }

  if (!question.difficulty) {
    question.difficulty = "normal";
  }

  if (!Object.prototype.hasOwnProperty.call(question, "tags")) {
    question.tags = [];
  }

  if (!Object.prototype.hasOwnProperty.call(question, "pinyin")) {
    question.pinyin = "";
  }

  return question;
}

function validateQuestionBank(bank = questionBank) {
  const requiredFields = ["id", "exam", "language", "level", "section", "type", "question", "options", "correctIndex", "explanation", "tags"];
  const counts = ALLOWED_QUESTION_SECTIONS.reduce((sectionCounts, section) => {
    sectionCounts[section] = 0;
    return sectionCounts;
  }, {});
  const countsByExam = {};
  const countsByLevel = {};
  const countsByType = {};
  const seenIds = new Set();
  const errors = [];
  const warnings = [];

  bank.forEach((question, index) => {
    const label = question?.id || `Question at index ${index}`;

    if (!question || typeof question !== "object") {
      errors.push(`${label}: question must be an object.`);
      return;
    }

    normalizeQuestionDefaults(question);

    requiredFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(question, field)) {
        errors.push(`${label}: missing required field "${field}".`);
      }
    });

    if (typeof question.id === "string" && question.id.trim()) {
      if (seenIds.has(question.id)) {
        errors.push(`${question.id}: duplicate question id.`);
      }
      seenIds.add(question.id);
    } else {
      errors.push(`${label}: id must be a non-empty string.`);
    }

    if (ALLOWED_EXAMS.includes(question.exam)) {
      countsByExam[question.exam] = (countsByExam[question.exam] || 0) + 1;
    } else {
      errors.push(`${label}: exam must be JLPT or HSK.`);
    }

    if (ALLOWED_LANGUAGES.includes(question.language)) {
      countsByLevel[question.level] = (countsByLevel[question.level] || 0) + 1;
    } else {
      errors.push(`${label}: language must be ja or zh.`);
    }

    if (question.exam === "JLPT" && (question.language !== "ja" || !ALLOWED_JLPT_LEVELS.includes(question.level))) {
      errors.push(`${label}: JLPT questions must use language ja and level N5 or N4.`);
    }

    if (question.exam === "HSK" && (question.language !== "zh" || !ALLOWED_HSK_LEVELS.includes(question.level))) {
      errors.push(`${label}: HSK questions must use language zh and level HSK4.`);
    }

    if (ALLOWED_QUESTION_SECTIONS.includes(question.section)) {
      counts[question.section] += 1;
    } else {
      errors.push(`${label}: section must be vocabulary, grammar, reading, listening, or writing.`);
    }

    if (typeof question.type !== "string" || !question.type.trim()) {
      errors.push(`${label}: type must be a non-empty string.`);
    } else {
      countsByType[question.type] = (countsByType[question.type] || 0) + 1;
    }

    if (typeof question.question !== "string" || !question.question.trim()) {
      errors.push(`${label}: question must be a non-empty string.`);
    }

    if (typeof question.explanation !== "string" || !question.explanation.trim()) {
      errors.push(`${label}: explanation must be a non-empty string.`);
    }

    if (!Array.isArray(question.tags)) {
      errors.push(`${label}: tags must be an array.`);
    }

    if (question.language === "zh" && typeof question.pinyin !== "string") {
      warnings.push(`${label}: pinyin should be a string for Chinese questions.`);
    }

    validateQuestionOptions(question, label, errors);
    validateQuestionTranslations(question, label, warnings);
    validateQuestionPassage(question, label, warnings);
    validateQuestionDifficulty(question, label, errors);
  });

  return {
    total: bank.length,
    counts,
    countsByExam,
    countsByLevel,
    countsByType,
    jlptN5Total: bank.filter((question) => question?.exam === "JLPT" && question?.level === "N5").length,
    jlptN4Total: bank.filter((question) => question?.exam === "JLPT" && question?.level === "N4").length,
    hsk4Total: bank.filter((question) => question?.exam === "HSK" && question?.level === "HSK4").length,
    errors,
    warnings
  };
}

function validateQuestionOptions(question, label, errors) {
  if (!Array.isArray(question.options)) {
    errors.push(`${label}: options must be an array.`);
    return;
  }

  if (question.options.length !== 4) {
    errors.push(`${label}: options must contain exactly 4 choices.`);
  }

  question.options.forEach((option, optionIndex) => {
    if (typeof option !== "string" || !option.trim()) {
      errors.push(`${label}: option ${optionIndex + 1} must be a non-empty string.`);
    }
  });

  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
    errors.push(`${label}: correctIndex must be 0, 1, 2, or 3.`);
  }
}

function validateQuestionTranslations(question, label, warnings) {
  if (question.questionTranslation !== undefined && typeof question.questionTranslation !== "string") {
    warnings.push(`${label}: questionTranslation should be a string if provided.`);
  }

  if (question.passageTranslation !== undefined && typeof question.passageTranslation !== "string") {
    warnings.push(`${label}: passageTranslation should be a string if provided.`);
  }

  if (question.optionTranslations === undefined) {
    return;
  }

  if (!Array.isArray(question.optionTranslations)) {
    warnings.push(`${label}: optionTranslations should be an array if provided.`);
    return;
  }

  if (question.optionTranslations.length !== 4) {
    warnings.push(`${label}: optionTranslations should contain exactly 4 strings when provided.`);
  }

  question.optionTranslations.forEach((translation, optionIndex) => {
    if (typeof translation !== "string") {
      warnings.push(`${label}: option translation ${optionIndex + 1} should be a string.`);
    }
  });
}

function validateQuestionPassage(question, label, warnings) {
  if (question.passage !== undefined && typeof question.passage !== "string") {
    warnings.push(`${label}: passage should be a string if provided.`);
  }

  if ((question.section === "reading" || question.section === "listening") && !String(question.passage || "").trim()) {
    warnings.push(`${label}: reading and listening questions usually need passage or script text.`);
  }
}

function validateQuestionDifficulty(question, label, errors) {
  if (!question.difficulty) {
    question.difficulty = "normal";
    return;
  }

  if (!ALLOWED_DIFFICULTIES.includes(question.difficulty)) {
    errors.push(`${label}: difficulty must be easy, normal, or hard.`);
  }
}

function logQuestionBankValidation(report) {
  console.group("Question Bank Validation:");
  console.log(`Total questions: ${report.total}`);
  console.log(`JLPT N5 questions: ${report.jlptN5Total}`);
  console.log(`JLPT N4 questions: ${report.jlptN4Total}`);
  console.log(`HSK 4 questions: ${report.hsk4Total}`);
  console.log("Counts by exam:", report.countsByExam);
  console.log("Counts by level:", report.countsByLevel);
  console.log("Counts by section:", report.counts);
  console.log("Counts by type:", report.countsByType);
  console.log(`Vocabulary: ${report.counts.vocabulary}`);
  console.log(`Grammar: ${report.counts.grammar}`);
  console.log(`Reading: ${report.counts.reading}`);
  console.log(`Listening: ${report.counts.listening}`);
  console.log(`Writing: ${report.counts.writing}`);
  console.log(`Errors: ${report.errors.length}`);
  console.log(`Warnings: ${report.warnings.length}`);

  if (report.errors.length > 0) {
    console.error("Question bank errors:", report.errors);
  }

  if (report.warnings.length > 0) {
    console.warn("Question bank warnings:", report.warnings);
  }

  console.groupEnd();
}

function showQuestionBankReport() {
  state.questionBankValidation = validateQuestionBank();
  logQuestionBankValidation(state.questionBankValidation);
  elements.questionBankReport.innerHTML = formatQuestionBankReport(state.questionBankValidation);
}

function formatQuestionBankReport(report) {
  const examCounts = formatCountMap(report.countsByExam);
  const levelCounts = formatCountMap(report.countsByLevel);
  const typeCounts = formatCountMap(report.countsByType);
  const summary = `
    <div class="debug-summary">
      <strong>Total questions: ${report.total}</strong>
      <span>JLPT N5: ${report.jlptN5Total}</span>
      <span>JLPT N4: ${report.jlptN4Total}</span>
      <span>HSK 4: ${report.hsk4Total}</span>
      <span>By exam: ${escapeHtml(examCounts)}</span>
      <span>By level: ${escapeHtml(levelCounts)}</span>
      <span>By type: ${escapeHtml(typeCounts)}</span>
      <span>Vocabulary: ${report.counts.vocabulary}</span>
      <span>Grammar: ${report.counts.grammar}</span>
      <span>Reading: ${report.counts.reading}</span>
      <span>Listening: ${report.counts.listening}</span>
      <span>Writing: ${report.counts.writing}</span>
      <span>Errors: ${report.errors.length}</span>
      <span>Warnings: ${report.warnings.length}</span>
    </div>
  `;
  const errors = formatValidationMessages("Errors", report.errors);
  const warnings = formatValidationMessages("Warnings", report.warnings);

  return `${summary}${errors}${warnings}`;
}

function formatCountMap(countMap) {
  const entries = Object.entries(countMap || {});
  return entries.length > 0
    ? entries.map(([label, count]) => `${label}: ${count}`).join(", ")
    : "none";
}

function formatValidationMessages(title, messages) {
  if (messages.length === 0) {
    return `<p class="small-note">${title}: none</p>`;
  }

  return `
    <div class="debug-messages">
      <strong>${title}</strong>
      <ul>
        ${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderExamCards() {
  elements.examGrid.innerHTML = "";

  const examGroups = EXAM_CONFIGS.reduce((groups, examConfig) => {
    let group = groups.find((item) => item.exam === examConfig.exam);

    if (!group) {
      group = {
        exam: examConfig.exam,
        exams: []
      };
      groups.push(group);
    }

    group.exams.push(examConfig);
    return groups;
  }, []);

  examGroups.forEach((group) => {
    const groupElement = document.createElement("section");
    groupElement.className = "exam-group";
    groupElement.innerHTML = `<h2 class="exam-group-title">${escapeHtml(group.exam)}</h2>`;

    const groupGrid = document.createElement("div");
    groupGrid.className = "exam-group-grid";

    group.exams.forEach((examConfig) => {
      const button = document.createElement("button");
      button.className = "exam-card";
      button.type = "button";
      button.innerHTML = `
        <span class="mode-title">${escapeHtml(examConfig.shortTitle)}</span>
        <span class="mode-description">${escapeHtml(examConfig.description)}</span>
        <span class="mode-meta">${escapeHtml(examConfig.exam)} ${escapeHtml(examConfig.level)}</span>
      `;
      button.addEventListener("click", () => handleExamSelection(examConfig.id));
      groupGrid.appendChild(button);
    });

    groupElement.appendChild(groupGrid);
    elements.examGrid.appendChild(groupElement);
  });
}

function handleExamSelection(examId) {
  state.selectedExamId = getExamConfigById(examId).id;
  clearModeMessage();
  showHome();
}

function showExamSelector() {
  stopTimer();
  state.selectedExamId = null;
  state.selectedMode = null;
  state.selectedTest = null;
  state.questions = [];
  state.answers = [];
  state.activeResult = null;
  clearModeMessage();
  renderExamCards();
  showHome();
}

function renderModeCards() {
  elements.modeGrid.innerHTML = "";
  const examConfig = getCurrentExamConfig();
  const modes = getModesForExam(examConfig.id);

  if (modes.length === 0) {
    showModeMessage(`${examConfig.title} modes and sample questions will be added in the next step.`);
    return;
  }

  modes.forEach((mode) => {
    const button = document.createElement("button");
    button.className = "mode-card";
    button.type = "button";
    button.innerHTML = `
      <span class="mode-title">${mode.title}</span>
      <span class="mode-description">${mode.description}</span>
      <span class="mode-meta">${getModeMetaText(mode)}</span>
    `;
    button.addEventListener("click", () => handleModeSelection(mode.id));
    elements.modeGrid.appendChild(button);
  });
}

function handleModeSelection(modeId) {
  const mode = getModeById(modeId);
  const examConfig = getCurrentExamConfig();

  if (mode.isWrongReview && loadWrongAnswersForExam(examConfig).length === 0) {
    showModeMessage(`No ${examConfig.shortTitle} wrong answers saved yet. Take a test first.`);
    return;
  }

  clearModeMessage();
  showInstructions(modeId);
}

function showModeMessage(message) {
  elements.modeMessage.textContent = message;
  elements.modeMessage.classList.remove("hidden");
}

function clearModeMessage() {
  elements.modeMessage.textContent = "";
  elements.modeMessage.classList.add("hidden");
}

function showHome() {
  stopTimer();
  clearModeMessage();
  renderExamCards();

  if (!state.selectedExamId) {
    elements.homeEyebrow.textContent = "Practice Tests";
    elements.homeTitle.textContent = "Choose Exam";
    elements.homeLead.textContent = "Choose an exam to start practicing.";
    elements.examGrid.classList.remove("hidden");
    elements.examPracticeArea.classList.add("hidden");
    showScreen("home");
    return;
  }

  const examConfig = getCurrentExamConfig();
  elements.homeEyebrow.textContent = `${examConfig.exam} ${examConfig.level}`;
  elements.homeTitle.textContent = examConfig.title;
  elements.homeLead.textContent = examConfig.description;
  elements.homeNote.textContent = examConfig.note;
  elements.selectedExamTitle.textContent = examConfig.title;
  elements.examGrid.classList.add("hidden");
  elements.examPracticeArea.classList.remove("hidden");
  renderModeCards();
  const latestResult = loadLatestResult();

  if (latestResult && doesResultMatchExam(latestResult, examConfig)) {
    elements.viewPreviousBtn.classList.remove("hidden");
    elements.previousSummary.classList.remove("hidden");
    elements.previousSummary.innerHTML = `
      <div>
        <span class="info-label">Latest Result</span>
        <strong>${latestResult.score} / ${latestResult.totalQuestions} (${latestResult.percentage}%)</strong>
        <p class="small-note">${escapeHtml(latestResult.modeTitle || latestResult.title || examConfig.title)}</p>
        <p class="small-note">${formatDate(latestResult.date)}</p>
      </div>
    `;
  } else {
    elements.viewPreviousBtn.classList.add("hidden");
    elements.previousSummary.classList.add("hidden");
    elements.previousSummary.innerHTML = "";
  }

  showScreen("home");
}

function showInstructions(modeId = getCurrentExamConfig().defaultModeId) {
  stopTimer();
  const generatedTest = getModeById(modeId).isWrongReview
    ? createWrongAnswerTest()
    : createTestFromMode(modeId);

  if (generatedTest.blockedMessage) {
    showHome();
    showModeMessage(generatedTest.blockedMessage);
    return;
  }

  state.selectedMode = generatedTest.mode;
  state.selectedTest = generatedTest.test;
  state.questions = shuffleArray(flattenTest(state.selectedTest));
  state.answers = new Array(state.questions.length).fill(null);
  state.currentIndex = 0;
  state.activeResult = null;

  elements.instructionTitle.textContent = state.selectedTest.title;
  elements.instructionCount.textContent = state.questions.length;
  elements.instructionTime.textContent = `${state.selectedTest.timeLimitMinutes} minutes`;
  elements.sectionList.innerHTML = state.selectedTest.sections
    .map((section) => `<li>${escapeHtml(section.title)} - ${section.questions.length} questions</li>`)
    .join("");

  if (generatedTest.warnings.length > 0) {
    elements.instructionWarning.innerHTML = generatedTest.warnings
      .map((warning) => `<p>${escapeHtml(warning)}</p>`)
      .join("");
    elements.instructionWarning.classList.remove("hidden");
  } else {
    elements.instructionWarning.innerHTML = "";
    elements.instructionWarning.classList.add("hidden");
  }

  showScreen("instruction");
}

function createTestFromMode(modeId) {
  const examConfig = getCurrentExamConfig();
  const mode = getModeById(modeId);
  const warnings = [];
  let usedRecentlySeenQuestions = false;
  let usedSmallBankFallback = false;
  const sections = getSectionMetaForExam(examConfig.id)
    .filter((section) => mode.sections[section.id])
    .map((section) => {
      const requestedCount = mode.sections[section.id];
      const availableQuestions = questionBank.filter((question) =>
        questionMatchesExam(question, examConfig) && question.section === section.id
      );
      const selection = selectQuestionsForTest(availableQuestions, requestedCount);
      const selectedQuestions = selection.questions;

      if (selection.totalAvailable < requestedCount) {
        usedSmallBankFallback = true;
        warnings.push(
          `${section.title} requested ${requestedCount} questions, but only ${selection.totalAvailable} are available right now.`
        );
      } else if (selection.freshAvailable < requestedCount) {
        usedRecentlySeenQuestions = true;
      }

      return {
        id: section.id,
        title: section.title,
        questions: selectedQuestions.map(toTestQuestion)
      };
    })
    .filter((section) => section.questions.length > 0);

  const selectedQuestionCount = sections.reduce((total, section) => total + section.questions.length, 0);

  if (getRequestedQuestionCount(mode) > 0 && selectedQuestionCount === 0) {
    return {
      mode,
      blockedMessage: mode.emptyBankMessage || examConfig.emptyBankMessage || `${examConfig.shortTitle} question bank does not have questions available yet.`
    };
  }

  if (usedRecentlySeenQuestions) {
    warnings.push("Not enough fresh questions are available, so some older questions may appear again.");
  }

  if (usedSmallBankFallback && mode.smallBankWarning) {
    warnings.unshift(mode.smallBankWarning);
  }

  return {
    mode,
    warnings,
    test: {
      id: `mode-${mode.id}`,
      modeId: mode.id,
      examId: examConfig.id,
      exam: examConfig.exam,
      language: examConfig.language,
      title: mode.title,
      level: examConfig.level,
      timeLimitMinutes: mode.timeLimitMinutes,
      sections
    }
  };
}

function createWrongAnswerTest() {
  const examConfig = getCurrentExamConfig();
  const mode = getModesForExam(examConfig.id).find((testMode) => testMode.isWrongReview)
    || getModeById(examConfig.defaultModeId);
  const wrongAnswers = loadWrongAnswersForExam(examConfig);

  if (wrongAnswers.length === 0) {
    return {
      mode,
      blockedMessage: `No ${examConfig.shortTitle} wrong answers saved yet. Take a test first.`
    };
  }

  const storedQuestions = wrongAnswers
    .map((entry) => entry.question)
    .filter(Boolean);
  const sections = getSectionMetaForExam(examConfig.id)
    .map((section) => ({
      id: section.id,
      title: section.title,
      questions: storedQuestions
        .filter((question) => question.section === section.id)
        .map(toTestQuestion)
    }))
    .filter((section) => section.questions.length > 0);

  return {
    mode,
    warnings: [],
    test: {
      id: "mode-wrong-review",
      modeId: mode.id,
      examId: examConfig.id,
      exam: examConfig.exam,
      language: examConfig.language,
      title: mode.title,
      level: examConfig.level,
      timeLimitMinutes: mode.timeLimitMinutes,
      sections
    }
  };
}

function toTestQuestion(question) {
  return makeSessionQuestion(question, { shuffleOptions: true });
}

function makeSessionQuestion(question, options = {}) {
  const { shuffleOptions = true } = options;
  normalizeQuestionDefaults(question);
  const sessionQuestion = {
    id: question.id,
    exam: question.exam,
    language: question.language,
    level: question.level,
    type: question.type,
    question: question.question,
    questionTranslation: question.questionTranslation || "",
    passage: question.passage,
    passageTranslation: question.passageTranslation || "",
    pinyin: question.pinyin || "",
    options: [...question.options],
    optionTranslations: getOptionTranslations(question),
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    difficulty: question.difficulty || "normal",
    tags: [...(question.tags || [])]
  };

  return shuffleOptions ? shuffleQuestionOptions(sessionQuestion) : sessionQuestion;
}

function selectQuestionsForTest(questions, count) {
  const uniqueQuestions = Array.from(
    new Map(questions.map((question) => [question.id, question])).values()
  );
  const recentQuestionIds = loadRecentQuestionIds();
  const recentRankById = new Map(
    recentQuestionIds.map((questionId, index) => [questionId, index])
  );
  const freshQuestions = uniqueQuestions.filter((question) => !recentRankById.has(question.id));
  const recentlySeenQuestions = uniqueQuestions
    .filter((question) => recentRankById.has(question.id))
    .sort((first, second) => recentRankById.get(second.id) - recentRankById.get(first.id));
  const selectedQuestions = [
    ...shuffleArray(freshQuestions),
    ...recentlySeenQuestions
  ].slice(0, count);

  return {
    questions: selectedQuestions,
    totalAvailable: uniqueQuestions.length,
    freshAvailable: freshQuestions.length
  };
}

function shuffleQuestionOptions(question) {
  const shuffledOptions = shuffleArray(
    question.options.map((option, index) => ({
      option,
      optionTranslation: question.optionTranslations?.[index] || "",
      isCorrect: index === question.correctIndex
    }))
  );

  return {
    ...question,
    options: shuffledOptions.map((item) => item.option),
    optionTranslations: shuffledOptions.map((item) => item.optionTranslation),
    correctIndex: shuffledOptions.findIndex((item) => item.isCorrect)
  };
}

function getOptionTranslations(question) {
  return question.options.map((option, index) =>
    Array.isArray(question.optionTranslations) && typeof question.optionTranslations[index] === "string"
      ? question.optionTranslations[index]
      : ""
  );
}

function shuffleArray(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
  }

  return shuffledItems;
}

function beginTest() {
  state.answers = new Array(state.questions.length).fill(null);
  state.currentIndex = 0;
  state.remainingSeconds = state.selectedTest.timeLimitMinutes * 60;
  state.translationHelpRemaining = TRANSLATION_HELP_LIMIT;
  state.activeTranslation = null;

  rememberRecentlyUsedQuestions(state.questions.map((question) => question.id));
  renderQuestion();
  startTimer();
  showScreen("test");
}

function flattenTest(test) {
  return test.sections.flatMap((section) =>
    section.questions.map((question) => ({
      ...question,
      examId: test.examId,
      exam: question.exam || test.exam,
      language: question.language || test.language,
      level: question.level || test.level,
      sectionId: section.id,
      sectionTitle: section.title
    }))
  );
}

function startTimer() {
  stopTimer();
  updateTimerDisplay();

  state.timerId = window.setInterval(() => {
    state.remainingSeconds -= 1;
    updateTimerDisplay();

    if (state.remainingSeconds <= 0) {
      finishTest({ timeExpired: true });
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.max(0, Math.floor(state.remainingSeconds / 60));
  const seconds = Math.max(0, state.remainingSeconds % 60);
  elements.timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  elements.timer.classList.toggle("warning", state.remainingSeconds <= 300);
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  const selectedAnswer = state.answers[state.currentIndex];
  const isFinalQuestion = state.currentIndex === state.questions.length - 1;
  const progressPercent = ((state.currentIndex + 1) / state.questions.length) * 100;

  elements.questionCounter.textContent = `Question ${state.currentIndex + 1} / ${state.questions.length}`;
  elements.sectionBadge.textContent = question.sectionTitle;
  elements.questionType.textContent = formatQuestionType(question.type);
  elements.questionText.textContent = question.question;
  elements.progressBar.style.width = `${progressPercent}%`;

  if (question.passage) {
    elements.passageBox.textContent = question.passage;
    elements.passageBox.classList.remove("hidden");
  } else {
    elements.passageBox.textContent = "";
    elements.passageBox.classList.add("hidden");
  }

  renderTranslationHelp();

  elements.optionsList.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.setAttribute("aria-pressed", String(selectedAnswer === index));

    if (selectedAnswer === index) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="option-letter">${OPTION_LETTERS[index]}</span>
      <span>${escapeHtml(option)}</span>
    `;
    button.addEventListener("click", () => selectAnswer(index));
    elements.optionsList.appendChild(button);
  });

  elements.previousQuestionBtn.disabled = state.currentIndex === 0;
  elements.nextQuestionBtn.classList.toggle("hidden", isFinalQuestion);
  elements.submitTestBtn.classList.toggle("hidden", !isFinalQuestion);
  renderQuestionJumpList();
}

function renderTranslationHelp() {
  const remaining = Math.max(0, state.translationHelpRemaining);
  const isDepleted = remaining <= 0;
  const activeTranslation = state.activeTranslation;

  elements.translationHelpCounter.textContent = `Translation Help: ${remaining} left`;
  elements.translateQuestionBtn.disabled = isDepleted;
  elements.translateAnswerBtn.disabled = isDepleted;
  elements.translationLimitMessage.classList.toggle("hidden", !isDepleted);

  if (activeTranslation && activeTranslation.questionIndex === state.currentIndex) {
    elements.translationBoxTitle.textContent = activeTranslation.title;
    elements.translationBoxContent.innerHTML = activeTranslation.contentHtml;
    elements.translationBox.classList.remove("hidden");
  } else {
    elements.translationBoxTitle.textContent = "Translation";
    elements.translationBoxContent.innerHTML = "";
    elements.translationBox.classList.add("hidden");
  }
}

function showQuestionTranslation() {
  const question = state.questions[state.currentIndex];
  const contentHtml = buildQuestionTranslationHtml(question);

  if (!contentHtml) {
    showTranslationFallback();
    return;
  }

  showTranslationContent("Question Translation", contentHtml);
}

function showAnswerTranslations() {
  const question = state.questions[state.currentIndex];
  const contentHtml = buildAnswerTranslationsHtml(question);

  if (!contentHtml) {
    showTranslationFallback();
    return;
  }

  showTranslationContent("Answer Translations", contentHtml);
}

function showTranslationContent(title, contentHtml) {
  if (!spendTranslationHelp()) {
    renderTranslationHelp();
    return;
  }

  state.activeTranslation = {
    questionIndex: state.currentIndex,
    title,
    contentHtml
  };
  renderTranslationHelp();
}

function spendTranslationHelp() {
  if (state.translationHelpRemaining <= 0) {
    return false;
  }

  state.translationHelpRemaining -= 1;
  return true;
}

function showTranslationFallback() {
  state.activeTranslation = {
    questionIndex: state.currentIndex,
    title: "Translation",
    contentHtml: `<p class="translation-text">${escapeHtml(TRANSLATION_UNAVAILABLE_MESSAGE)}</p>`
  };
  renderTranslationHelp();
}

function buildQuestionTranslationHtml(question) {
  const sections = [];

  if (hasTranslationText(question.questionTranslation)) {
    sections.push(formatTranslationSection("Question Translation:", question.questionTranslation));
  }

  if (hasTranslationText(question.passageTranslation)) {
    sections.push(formatTranslationSection("Passage Translation:", question.passageTranslation));
  }

  return sections.length > 0 ? sections.join("") : "";
}

function buildAnswerTranslationsHtml(question) {
  const optionTranslations = getOptionTranslations(question);

  if (optionTranslations.length !== OPTION_LETTERS.length || optionTranslations.some((translation) => !hasTranslationText(translation))) {
    return "";
  }

  const rows = optionTranslations
    .map((translation, index) => `
      <li>
        <strong>${OPTION_LETTERS[index]}.</strong>
        <span>${escapeHtml(translation)}</span>
      </li>
    `)
    .join("");

  return `
    <div class="translation-section">
      <strong>Answer Translations:</strong>
      <ul class="translation-option-list">${rows}</ul>
    </div>
  `;
}

function formatTranslationSection(title, text) {
  return `
    <div class="translation-section">
      <strong>${title}</strong>
      <p class="translation-text">${escapeHtml(text)}</p>
    </div>
  `;
}

function hasTranslationText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function closeTranslationBox() {
  state.activeTranslation = null;
  renderTranslationHelp();
}

function renderQuestionJumpList() {
  elements.questionJumpList.innerHTML = "";

  state.questions.forEach((question, index) => {
    const button = document.createElement("button");
    const hasAnswer = state.answers[index] !== null;
    button.className = "jump-button";
    button.type = "button";
    button.textContent = index + 1;
    button.title = `${question.sectionTitle} question ${index + 1}`;

    if (index === state.currentIndex) {
      button.classList.add("current");
    } else if (hasAnswer) {
      button.classList.add("answered");
    } else {
      button.classList.add("unanswered");
    }

    button.addEventListener("click", () => moveToQuestion(index));

    elements.questionJumpList.appendChild(button);
  });
}

function moveToQuestion(questionIndex) {
  if (questionIndex === state.currentIndex) {
    return;
  }

  state.currentIndex = questionIndex;
  state.activeTranslation = null;
  renderQuestion();
}

function selectAnswer(optionIndex) {
  state.answers[state.currentIndex] = optionIndex;
  renderQuestion();
}

function goToPreviousQuestion() {
  if (state.currentIndex > 0) {
    moveToQuestion(state.currentIndex - 1);
  }
}

function goToNextQuestion() {
  if (state.currentIndex < state.questions.length - 1) {
    moveToQuestion(state.currentIndex + 1);
  }
}

function submitWithConfirmation() {
  const unansweredCount = state.answers.filter((answer) => answer === null).length;
  const message = unansweredCount > 0
    ? "You still have unanswered questions. Are you sure you want to submit?"
    : "Are you sure you want to submit?";
  const confirmed = window.confirm(message);

  if (confirmed) {
    finishTest({ timeExpired: false });
  }
}

function finishTest({ timeExpired }) {
  stopTimer();

  const result = calculateResult();
  result.timeExpired = timeExpired;
  state.activeResult = result;
  saveLatestResult(result);
  saveResultHistory(result);
  saveWrongAnswersFromResult(result);
  renderResult(result);
  showScreen("result");
}

function calculateResult() {
  const sectionBreakdown = {};
  let score = 0;
  const examConfig = getCurrentExamConfig();

  state.selectedTest.sections.forEach((section) => {
    sectionBreakdown[section.id] = {
      id: section.id,
      title: section.title,
      correct: 0,
      total: section.questions.length
    };
  });

  state.questions.forEach((question, index) => {
    const isCorrect = state.answers[index] === question.correctIndex;

    if (isCorrect) {
      score += 1;
      sectionBreakdown[question.sectionId].correct += 1;
    }
  });

  const totalQuestions = state.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const weakPointAnalysis = analyzeWeakPoints(state.questions, state.answers);

  return {
    testId: state.selectedTest.id,
    examId: state.selectedTest.examId || examConfig.id,
    exam: state.selectedTest.exam || examConfig.exam,
    language: state.selectedTest.language || examConfig.language,
    level: state.selectedTest.level || examConfig.level,
    examTitle: examConfig.title,
    modeId: state.selectedMode?.id || state.selectedTest.modeId || "full",
    modeTitle: state.selectedMode?.title || state.selectedTest.title,
    title: state.selectedTest.title,
    date: new Date().toISOString(),
    score,
    totalQuestions,
    percentage,
    sectionBreakdown,
    weakPointAnalysis,
    questionIds: state.questions.map((question) => question.id),
    questionSnapshots: state.questions.map(toQuestionSnapshot),
    answers: [...state.answers]
  };
}

function renderResult(result) {
  const examConfig = getExamConfigForResult(result);
  elements.resultTitle.textContent = result.title;
  elements.resultDate.textContent = result.timeExpired
    ? `Time ended - submitted on ${formatDate(result.date)}`
    : `Submitted on ${formatDate(result.date)}`;
  elements.scoreText.textContent = `${result.score} / ${result.totalQuestions}`;
  elements.percentageText.textContent = `${result.percentage}%`;
  elements.resultMessage.textContent = getResultMessage(result.percentage);
  elements.resultScoreNote.textContent = examConfig.exam === "HSK"
    ? "This is a practice score, not an official HSK scaled score."
    : examConfig.note;

  elements.sectionBreakdown.innerHTML = Object.values(result.sectionBreakdown)
    .map((section) => {
      const percentage = Math.round((section.correct / section.total) * 100);
      return `
        <div class="breakdown-row">
          <strong>${escapeHtml(section.title)}</strong>
          <span>${section.correct} / ${section.total} (${percentage}%)</span>
        </div>
      `;
    })
    .join("");

  const analysis = result.weakPointAnalysis || analyzeWeakPoints(state.questions, result.answers || []);
  elements.weakPointAnalysis.innerHTML = renderWeakPointAnalysis(analysis);
}

function analyzeWeakPoints(testQuestions, userAnswers) {
  const sectionMistakeMap = new Map();
  const wrongQuestions = [];

  testQuestions.forEach((question, index) => {
    const sectionId = question.sectionId || question.section;
    const sectionTitle = question.sectionTitle || getSectionTitle(sectionId);

    if (!sectionMistakeMap.has(sectionId)) {
      sectionMistakeMap.set(sectionId, {
        id: sectionId,
        title: sectionTitle,
        mistakes: 0
      });
    }

    if (userAnswers[index] !== question.correctIndex) {
      sectionMistakeMap.get(sectionId).mistakes += 1;
      wrongQuestions.push(question);
    }
  });

  const sectionMistakes = Array.from(sectionMistakeMap.values());
  const topWeakTags = getTopWeakTags(wrongQuestions);
  const weakestSection = getWeakestSection(sectionMistakes);
  const examConfig = getAnalysisExamConfig(testQuestions);

  return {
    examId: examConfig.id,
    exam: examConfig.exam,
    level: examConfig.level,
    totalWrong: wrongQuestions.length,
    totalQuestions: testQuestions.length,
    sectionMistakes,
    weakestSection,
    topWeakTags,
    recommendations: generateStudyRecommendations(sectionMistakes, topWeakTags, examConfig)
  };
}

function getAnalysisExamConfig(testQuestions) {
  const firstQuestion = testQuestions.find((question) => question?.exam || question?.level);
  return firstQuestion ? getExamConfigById(getQuestionExamId(firstQuestion)) : getCurrentExamConfig();
}

function getWeakestSection(sectionMistakes) {
  return sectionMistakes
    .filter((section) => section.mistakes > 0)
    .sort((first, second) => second.mistakes - first.mistakes)[0] || null;
}

function getTopWeakTags(wrongQuestions) {
  const tagCounts = new Map();

  wrongQuestions.forEach((question) => {
    if (!Array.isArray(question.tags)) {
      return;
    }

    question.tags.forEach((tag) => {
      if (typeof tag !== "string" || !tag.trim()) {
        return;
      }

      const cleanTag = tag.trim();
      tagCounts.set(cleanTag, (tagCounts.get(cleanTag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, mistakes]) => ({ tag, mistakes }))
    .sort((first, second) => second.mistakes - first.mistakes || first.tag.localeCompare(second.tag))
    .slice(0, 5);
}

function generateStudyRecommendations(sectionMistakes, weakTags, examConfig = getCurrentExamConfig()) {
  const recommendations = [];
  const weakTagText = weakTags.map((item) => item.tag.toLowerCase()).join(" ");
  const weakSections = sectionMistakes
    .filter((section) => section.mistakes > 0)
    .sort((first, second) => second.mistakes - first.mistakes);

  function addRecommendation(text) {
    if (!recommendations.includes(text)) {
      recommendations.push(text);
    }
  }

  if (examConfig.exam === "HSK") {
    if (weakTagText.includes("listening")) {
      addRecommendation("You should practice short Chinese conversations and focus on key information such as time, place, reason, and action.");
    }

    if (weakTagText.includes("reading")) {
      addRecommendation("You should practice reading short HSK 4 passages and identifying the main idea, reason, and details.");
    }

    if (weakTagText.includes("sentence order")) {
      addRecommendation("You should review Chinese sentence order, especially time, place, subject, verb, and object position.");
    }

    if (weakTagText.includes("grammar")) {
      addRecommendation("You should review common HSK 4 grammar patterns and sentence connectors.");
    }

    if (weakTagText.includes("vocabulary")) {
      addRecommendation("You should review HSK 4 vocabulary by topic and practice word usage in sentences.");
    }

    if (weakTagText.includes("因为") || weakTagText.includes("所以") || weakTagText.includes("因此") || weakTagText.includes("cause and effect")) {
      addRecommendation("You should review cause-and-effect sentences using 因为, 所以, 由于, and 因此.");
    }

    if (weakTagText.includes("虽然") || weakTagText.includes("但是") || weakTagText.includes("contrast")) {
      addRecommendation("You should review contrast patterns such as 虽然...但是....");
    }

    if (weakTagText.includes("把")) {
      addRecommendation("You should review 把 sentences: subject + 把 + object + verb result.");
    }

    if (weakTagText.includes("比") || weakTagText.includes("comparison")) {
      addRecommendation("You should review comparison sentences using 比.");
    }

    weakSections.forEach((section) => {
      if (section.id === "listening") {
        addRecommendation("You should practice listening-style scripts and underline keywords for time, place, reason, and action.");
      } else if (section.id === "reading") {
        addRecommendation("You should practice short HSK 4 readings and answer who, what, why, and main-idea questions.");
      } else if (section.id === "writing") {
        addRecommendation("You should practice arranging Chinese sentences with correct time, place, and object order.");
      } else if (section.id === "vocabulary") {
        addRecommendation("You should review HSK 4 vocabulary meanings and make one example sentence for each new word.");
      } else if (section.id === "grammar") {
        addRecommendation("You should review common HSK 4 connectors and grammar patterns in short example sentences.");
      }
    });

    if (weakSections.length > 0) {
      addRecommendation("Review the explanations for each missed HSK 4 question before retaking the same weak area.");
      addRecommendation("Try the HSK 4 practice mode for your weakest section, then take the mini test again.");
    }

    return recommendations.slice(0, 6);
  }

  if (examConfig.exam === "JLPT" && examConfig.level === "N4") {
    if (weakTagText.includes("particle")) {
      addRecommendation("You should review N4-level particles and sentence patterns.");
    }

    if (weakTagText.includes("kanji")) {
      addRecommendation("You should review common N4 kanji readings and vocabulary.");
    }

    if (weakTagText.includes("verb form") || weakTagText.includes("verb") || weakTagText.includes("potential")) {
      addRecommendation("You should review verb forms such as plain form, te-form, nai-form, ta-form, and potential form.");
    }

    if (weakTagText.includes("plain form") || weakTagText.includes("te-form") || weakTagText.includes("nai-form") || weakTagText.includes("ta-form")) {
      addRecommendation("You should practice choosing the correct plain, te-, nai-, and ta-form before N4 grammar patterns.");
    }

    if (weakTagText.includes("obligation") || weakTagText.includes("permission") || weakTagText.includes("prohibition")) {
      addRecommendation("You should review N4 rules for must do, may do, and must not do expressions.");
    }

    if (weakTagText.includes("purpose") || weakTagText.includes("reason") || weakTagText.includes("condition") || weakTagText.includes("sequence")) {
      addRecommendation("You should review N4 connectors for purpose, reason, condition, and action order.");
    }

    if (weakTagText.includes("grammar")) {
      addRecommendation("You should review N4 grammar patterns and sentence endings.");
    }

    if (weakTagText.includes("reading")) {
      addRecommendation("You should practice short N4 reading passages and focus on main idea, details, time, place, and reason.");
    }

    if (weakTagText.includes("listening")) {
      addRecommendation("You should practice short Japanese conversations and focus on keywords such as time, place, action, and intention.");
    }

    weakSections.forEach((section) => {
      if (section.id === "reading") {
        addRecommendation("You should practice N4 reading questions and mark who, when, where, why, and what happened.");
      } else if (section.id === "listening") {
        addRecommendation("You should practice listening-style scripts and focus on the speaker's action, reason, and intention.");
      } else if (section.id === "vocabulary") {
        addRecommendation("You should review N4 vocabulary by topic and pay attention to kanji readings.");
      } else if (section.id === "grammar") {
        addRecommendation("You should review N4 sentence patterns, particles, and verb forms with short example sentences.");
      }
    });

    if (weakSections.length > 0) {
      addRecommendation("Review the explanations for each missed N4 question before retaking the same weak area.");
      addRecommendation("Try the JLPT N4 practice mode for your weakest section, then take the mini test again.");
    }

    return recommendations.slice(0, 6);
  }

  if (weakTagText.includes("particle")) {
    addRecommendation("You should review basic particles such as は, が, を, に, で, へ, と, も, から, and まで.");
  }

  if (weakTagText.includes("kanji")) {
    addRecommendation("You should review basic N5 kanji readings and common kanji vocabulary.");
  }

  if (weakTagText.includes("time")) {
    addRecommendation("You should review time expressions, days of the week, dates, and frequency words.");
  }

  if (weakTagText.includes("adjective")) {
    addRecommendation("You should review い-adjectives and な-adjectives.");
  }

  if (weakTagText.includes("verb")) {
    addRecommendation("You should review basic verb forms, including ます form, past tense, and negative form.");
  }

  weakSections.forEach((section) => {
    if (section.id === "reading") {
      addRecommendation("You should practice reading short N5 passages and identifying key information such as who, where, when, and what.");
    } else if (section.id === "listening") {
      addRecommendation("You should practice short conversations and focus on keywords such as time, place, object, and action.");
    } else if (section.id === "vocabulary") {
      addRecommendation("You should review basic N5 vocabulary by topic, such as family, school, food, places, numbers, and time.");
    } else if (section.id === "grammar") {
      addRecommendation("You should review basic sentence patterns, particles, question words, and verb endings.");
    }
  });

  if (weakSections.length > 0) {
    addRecommendation("Review the explanations for each missed question before retaking the same weak area.");
    addRecommendation("Try a short practice mode for your weakest section, then take a mini test again.");
  }

  return recommendations.slice(0, 6);
}

function renderWeakPointAnalysis(analysis) {
  if (!analysis || analysis.totalWrong === 0) {
    return `
      <h3>Weak Point Analysis</h3>
      <div class="weak-empty">Excellent work. No weak points detected in this test.</div>
    `;
  }

  const sectionRows = analysis.sectionMistakes
    .filter((section) => section.mistakes > 0)
    .sort((first, second) => second.mistakes - first.mistakes)
    .map((section) => `
      <li>
        <span>${escapeHtml(section.title)}</span>
        <strong>${section.mistakes} ${section.mistakes === 1 ? "mistake" : "mistakes"}</strong>
      </li>
    `)
    .join("");
  const tagRows = analysis.topWeakTags.length > 0
    ? analysis.topWeakTags.map((item, index) => `
        <li>
          <span>${index + 1}. ${escapeHtml(item.tag)}</span>
          <strong>${item.mistakes} ${item.mistakes === 1 ? "mistake" : "mistakes"}</strong>
        </li>
      `).join("")
    : `<li><span>No tags were available for the missed questions.</span></li>`;
  const recommendationRows = analysis.recommendations
    .map((recommendation) => `<li>${escapeHtml(recommendation)}</li>`)
    .join("");

  return `
    <h3>Weak Point Analysis</h3>
    <div class="weak-grid">
      <div class="weak-panel">
        <span class="info-label">Weakest Section</span>
        <strong>${escapeHtml(analysis.weakestSection.title)} - ${analysis.weakestSection.mistakes} ${analysis.weakestSection.mistakes === 1 ? "mistake" : "mistakes"}</strong>
      </div>
      <div class="weak-panel">
        <span class="info-label">Total Missed</span>
        <strong>${analysis.totalWrong} / ${analysis.totalQuestions}</strong>
      </div>
    </div>
    <div class="weak-detail-grid">
      <div>
        <h4>Section Weakness</h4>
        <ul class="weak-list">${sectionRows}</ul>
      </div>
      <div>
        <h4>Top Weak Tags</h4>
        <ul class="weak-list">${tagRows}</ul>
      </div>
    </div>
    <div>
      <h4>Recommended Study</h4>
      <ul class="recommendation-list">${recommendationRows}</ul>
    </div>
  `;
}

function showHistory() {
  const history = loadResultHistory();

  if (history.length === 0) {
    elements.historyList.innerHTML = `
      <div class="empty-state">
        <strong>No result history yet.</strong>
        <p class="small-note">Take a test and your score will appear here.</p>
      </div>
    `;
    elements.clearHistoryBtn.disabled = true;
  } else {
    elements.clearHistoryBtn.disabled = false;
    elements.historyList.innerHTML = history.map(renderHistoryItem).join("");
  }

  showScreen("history");
}

function renderHistoryItem(result) {
  const sections = Object.values(result.sectionBreakdown || {})
    .map((section) => `<span>${escapeHtml(section.title)}: ${section.correct}/${section.total}</span>`)
    .join("");
  const weakSummary = renderHistoryWeakSummary(result.weakPointSummary);
  const examLabel = getResultExamLabel(result);

  return `
    <article class="history-item">
      <div>
        <span class="info-label">${formatDate(result.date)}</span>
        <p class="history-exam-label">${escapeHtml(examLabel)}</p>
        <strong>${escapeHtml(result.modeTitle || result.title || "JLPT N5 Practice")}</strong>
      </div>
      <div class="history-score">
        <strong>${result.score} / ${result.totalQuestions}</strong>
        <span>${result.percentage}%</span>
      </div>
      <div class="history-sections">${sections}</div>
      ${weakSummary}
    </article>
  `;
}

function renderHistoryWeakSummary(summary) {
  if (!summary) {
    return "";
  }

  if (!summary.totalWrong) {
    return `
      <div class="history-weak-summary">
        <span>Weak points: none</span>
      </div>
    `;
  }

  const weakestSection = summary.weakestSection
    ? `${summary.weakestSection.title}: ${summary.weakestSection.mistakes}`
    : "Not available";
  const topTag = summary.topWeakTags?.[0]?.tag || "No tag";

  return `
    <div class="history-weak-summary">
      <span>Weakest Section: ${escapeHtml(weakestSection)}</span>
      <span>Top Weak Tag: ${escapeHtml(topTag)}</span>
    </div>
  `;
}

function clearHistory() {
  const confirmed = window.confirm("Clear all saved result history?");

  if (!confirmed) {
    return;
  }

  removeKnownStorageKeys(["history", "latestResult"]);
  state.activeResult = null;
  showHistory();
}

function showPreviousResult() {
  const latestResult = loadLatestResult();

  if (!latestResult) {
    showHome();
    return;
  }

  const examConfig = getExamConfigForResult(latestResult);
  state.selectedExamId = examConfig.id;

  if (latestResult.questionSnapshots?.length) {
    state.selectedMode = getModeById(latestResult.modeId || examConfig.defaultModeId, examConfig.id);
    state.questions = buildQuestionsFromSnapshots(latestResult.questionSnapshots);
    state.selectedTest = createTestFromSavedQuestions(
      state.selectedMode,
      state.questions,
      latestResult.title || state.selectedMode.title
    );
  } else if (latestResult.questionIds?.length) {
    state.selectedMode = getModeById(latestResult.modeId || examConfig.defaultModeId, examConfig.id);
    state.questions = buildQuestionsFromIds(latestResult.questionIds);
    state.selectedTest = createTestFromSavedQuestions(
      state.selectedMode,
      state.questions,
      latestResult.title || state.selectedMode.title
    );
  } else if (latestResult.modeId) {
    const generatedTest = createTestFromMode(latestResult.modeId);
    state.selectedMode = generatedTest.mode;
    state.selectedTest = generatedTest.test;
    state.questions = flattenTest(state.selectedTest);
  } else {
    state.selectedMode = getModeById(examConfig.defaultModeId, examConfig.id);
    state.selectedTest = mockTests.find((test) => test.id === latestResult.testId) || mockTests[0];
    state.questions = flattenTest(state.selectedTest);
  }

  state.answers = latestResult.answers || new Array(state.questions.length).fill(null);
  state.activeResult = latestResult;

  renderResult(latestResult);
  showScreen("result");
}

function showReview() {
  if (!state.activeResult) {
    showHome();
    return;
  }

  state.reviewFilter = "all";
  renderReviewFilters();
  renderReviewList();
  showScreen("review");
}

function renderReviewFilters() {
  const reviewItems = getReviewItems();
  const sectionFilters = getActiveSectionMeta();
  const filterOptions = [
    { id: "all", label: "Show All", count: reviewItems.length },
    { id: "correct", label: "Correct Only", count: reviewItems.filter((item) => item.isCorrect).length },
    { id: "wrong", label: "Wrong Only", count: reviewItems.filter((item) => !item.isCorrect).length },
    ...sectionFilters.map((section) => ({
      id: section.id,
      label: section.title,
      count: reviewItems.filter((item) => item.question.sectionId === section.id).length
    }))
  ];

  elements.reviewFilters.innerHTML = "";

  filterOptions.forEach((filter) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.type = "button";
    button.textContent = `${filter.label} (${filter.count})`;
    button.setAttribute("aria-pressed", String(state.reviewFilter === filter.id));

    if (state.reviewFilter === filter.id) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      state.reviewFilter = filter.id;
      renderReviewFilters();
      renderReviewList();
    });

    elements.reviewFilters.appendChild(button);
  });
}

function renderReviewList() {
  elements.reviewList.innerHTML = "";
  const filteredItems = getFilteredReviewItems();

  if (filteredItems.length === 0) {
    elements.reviewList.innerHTML = `
      <div class="empty-state">
        <strong>No answers match this filter.</strong>
      </div>
    `;
    return;
  }

  filteredItems.forEach((item) => {
    const { question, questionNumber, selectedIndex, isCorrect } = item;
    const selectedText = selectedIndex === null || selectedIndex === undefined
      ? "No answer"
      : `${OPTION_LETTERS[selectedIndex]}. ${question.options[selectedIndex]}`;
    const correctText = `${OPTION_LETTERS[question.correctIndex]}. ${question.options[question.correctIndex]}`;

    const reviewItem = document.createElement("article");
    reviewItem.className = `review-item ${isCorrect ? "correct" : "wrong"}`;
    reviewItem.innerHTML = `
      <div class="review-meta">
        <span class="pill">Question ${questionNumber}</span>
        <span class="pill">${escapeHtml(question.sectionTitle)}</span>
        <span class="pill ${isCorrect ? "status-correct" : "status-wrong"}">${isCorrect ? "Correct" : "Needs Review"}</span>
      </div>
      ${question.passage ? `<div class="passage-box">${escapeHtml(question.passage)}</div>` : ""}
      <h3>${escapeHtml(question.question)}</h3>
      <p class="answer-line ${isCorrect ? "correct-text" : "wrong-text"}">Your answer: ${escapeHtml(selectedText)}</p>
      <p class="answer-line correct-text">Correct answer: ${escapeHtml(correctText)}</p>
      <div class="explanation">${escapeHtml(question.explanation)}</div>
    `;

    elements.reviewList.appendChild(reviewItem);
  });
}

function getReviewItems() {
  return state.questions.map((question, index) => {
    const selectedIndex = state.activeResult.answers[index];

    return {
      question,
      questionNumber: index + 1,
      selectedIndex,
      isCorrect: selectedIndex === question.correctIndex
    };
  });
}

function getFilteredReviewItems() {
  const reviewItems = getReviewItems();

  if (state.reviewFilter === "correct") {
    return reviewItems.filter((item) => item.isCorrect);
  }

  if (state.reviewFilter === "wrong") {
    return reviewItems.filter((item) => !item.isCorrect);
  }

  if (getActiveSectionMeta().some((section) => section.id === state.reviewFilter)) {
    return reviewItems.filter((item) => item.question.sectionId === state.reviewFilter);
  }

  return reviewItems;
}

function getResultMessage(percentage) {
  if (percentage >= 80) {
    return "Excellent";
  }

  if (percentage >= 60) {
    return "Good, but review your weak points";
  }

  return "Keep practicing";
}

function getExamConfigById(examId) {
  return EXAM_CONFIGS.find((examConfig) => examConfig.id === examId) || EXAM_CONFIGS[0];
}

function getCurrentExamConfig() {
  return getExamConfigById(state.selectedExamId || DEFAULT_EXAM_ID);
}

function getModesForExam(examId = state.selectedExamId || DEFAULT_EXAM_ID) {
  return TEST_MODES_BY_EXAM[examId] || [];
}

function getModeById(modeId, examId = state.selectedExamId || DEFAULT_EXAM_ID) {
  const modes = getModesForExam(examId);
  const examConfig = getExamConfigById(examId);
  return modes.find((mode) => mode.id === modeId)
    || modes.find((mode) => mode.id === examConfig.defaultModeId)
    || modes[0]
    || {
      id: examConfig.defaultModeId,
      title: examConfig.title,
      description: examConfig.description,
      timeLimitMinutes: 0,
      sections: {}
    };
}

function getRequestedQuestionCount(mode) {
  return Object.values(mode.sections).reduce((total, count) => total + count, 0);
}

function getModeMetaText(mode) {
  if (mode.isWrongReview) {
    const wrongAnswerCount = loadWrongAnswersForExam(getCurrentExamConfig()).length;
    const label = wrongAnswerCount === 1 ? "saved mistake" : "saved mistakes";
    return `${wrongAnswerCount} ${label} - ${mode.timeLimitMinutes} min`;
  }

  return `${getRequestedQuestionCount(mode)} questions - ${mode.timeLimitMinutes} min`;
}

function getSectionMetaForExam(examId = state.selectedExamId || DEFAULT_EXAM_ID) {
  return getExamConfigById(examId).sections;
}

function getActiveSectionMeta() {
  if (state.selectedTest?.sections?.length) {
    return state.selectedTest.sections.map((section) => ({
      id: section.id,
      title: section.title
    }));
  }

  return getSectionMetaForExam();
}

function getQuestionExamId(question) {
  normalizeQuestionDefaults(question);
  const matchedExam = EXAM_CONFIGS.find((examConfig) =>
    question.exam === examConfig.exam && question.level === examConfig.level
  );

  return matchedExam?.id || DEFAULT_EXAM_ID;
}

function questionMatchesExam(question, examConfig) {
  normalizeQuestionDefaults(question);
  return question.exam === examConfig.exam && question.level === examConfig.level;
}

function doesResultMatchExam(result, examConfig) {
  const resultExam = result.exam || "JLPT";
  const resultLevel = result.level || "N5";
  return resultExam === examConfig.exam && resultLevel === examConfig.level;
}

function getExamConfigForResult(result) {
  return EXAM_CONFIGS.find((examConfig) => doesResultMatchExam(result || {}, examConfig)) || getExamConfigById(DEFAULT_EXAM_ID);
}

function getResultExamLabel(result) {
  return getExamConfigForResult(result || {}).shortTitle;
}

function rememberRecentlyUsedQuestions(questionIds) {
  const recentQuestionIds = loadRecentQuestionIds();
  const updatedQuestionIds = [
    ...questionIds,
    ...recentQuestionIds.filter((questionId) => !questionIds.includes(questionId))
  ].slice(0, RECENT_QUESTION_LIMIT);

  saveRecentQuestionIds(updatedQuestionIds);
}

function loadRecentQuestionIds() {
  const recentQuestionIds = loadJson(STORAGE_KEYS.recentQuestions, []);
  return Array.isArray(recentQuestionIds)
    ? Array.from(new Set(recentQuestionIds.filter((questionId) => typeof questionId === "string")))
      .slice(0, RECENT_QUESTION_LIMIT)
    : [];
}

function saveRecentQuestionIds(questionIds) {
  const limitedQuestionIds = Array.from(new Set(
    questionIds.filter((questionId) => typeof questionId === "string")
  )).slice(0, RECENT_QUESTION_LIMIT);
  saveJson(STORAGE_KEYS.recentQuestions, limitedQuestionIds);
}

function buildQuestionsFromSnapshots(questionSnapshots) {
  return questionSnapshots.map((question) => ({
    id: question.id,
    exam: question.exam || "JLPT",
    language: question.language || "ja",
    level: question.level || "N5",
    sectionId: question.sectionId || question.section,
    sectionTitle: question.sectionTitle || getSectionTitle(question.sectionId || question.section, getQuestionExamId(question)),
    type: question.type,
    question: question.question,
    questionTranslation: question.questionTranslation || "",
    passage: question.passage,
    passageTranslation: question.passageTranslation || "",
    pinyin: question.pinyin || "",
    options: [...question.options],
    optionTranslations: getOptionTranslations(question),
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    difficulty: question.difficulty || "normal",
    tags: [...(question.tags || [])]
  }));
}

function buildQuestionsFromIds(questionIds) {
  const questionById = new Map(questionBank.map((question) => [question.id, question]));

  return questionIds
    .map((questionId) => questionById.get(questionId))
    .filter(Boolean)
    .map((question) => ({
      ...makeSessionQuestion(question, { shuffleOptions: false }),
      sectionId: question.section,
      sectionTitle: getSectionTitle(question.section, getQuestionExamId(question))
    }));
}

function createTestFromSavedQuestions(mode, questions, title) {
  const examConfig = getCurrentExamConfig();

  return {
    id: `saved-${mode.id}`,
    modeId: mode.id,
    examId: examConfig.id,
    exam: examConfig.exam,
    language: examConfig.language,
    title,
    level: examConfig.level,
    timeLimitMinutes: mode.timeLimitMinutes,
    sections: getSectionMetaForExam(examConfig.id)
      .map((section) => ({
        id: section.id,
        title: section.title,
        questions: questions
          .filter((question) => question.sectionId === section.id)
          .map(toSavedSectionQuestion)
      }))
      .filter((section) => section.questions.length > 0)
  };
}

function toSavedSectionQuestion(question) {
  return {
    id: question.id,
    exam: question.exam || "JLPT",
    language: question.language || "ja",
    level: question.level || "N5",
    type: question.type,
    question: question.question,
    questionTranslation: question.questionTranslation || "",
    passage: question.passage,
    passageTranslation: question.passageTranslation || "",
    pinyin: question.pinyin || "",
    options: question.options,
    optionTranslations: getOptionTranslations(question),
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    difficulty: question.difficulty || "normal",
    tags: question.tags
  };
}

function getSectionTitle(sectionId, examId = state.selectedExamId || DEFAULT_EXAM_ID) {
  return getSectionMetaForExam(examId).find((section) => section.id === sectionId)?.title || sectionId;
}

function formatQuestionType(type) {
  return type
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function saveResultHistory(result) {
  const history = loadResultHistory();
  const updatedHistory = [toHistoryResult(result), ...history].slice(0, HISTORY_LIMIT);
  saveJson(STORAGE_KEYS.history, updatedHistory);
}

function loadResultHistory() {
  const history = loadJson(STORAGE_KEYS.history, []);
  return Array.isArray(history) ? history : [];
}

function toHistoryResult(result) {
  return {
    testId: result.testId,
    examId: result.examId || DEFAULT_EXAM_ID,
    exam: result.exam || "JLPT",
    language: result.language || "ja",
    level: result.level || "N5",
    examTitle: result.examTitle || getResultExamLabel(result),
    modeId: result.modeId,
    modeTitle: result.modeTitle,
    title: result.title,
    date: result.date,
    score: result.score,
    totalQuestions: result.totalQuestions,
    percentage: result.percentage,
    sectionBreakdown: result.sectionBreakdown,
    weakPointSummary: summarizeWeakPointAnalysis(result.weakPointAnalysis),
    timeExpired: result.timeExpired
  };
}

function summarizeWeakPointAnalysis(analysis) {
  if (!analysis) {
    return null;
  }

  return {
    totalWrong: analysis.totalWrong || 0,
    totalQuestions: analysis.totalQuestions || 0,
    weakestSection: analysis.weakestSection ? {
      id: analysis.weakestSection.id,
      title: analysis.weakestSection.title,
      mistakes: analysis.weakestSection.mistakes
    } : null,
    topWeakTags: (analysis.topWeakTags || []).slice(0, 5).map((item) => ({
      tag: item.tag,
      mistakes: item.mistakes
    })),
    recommendations: (analysis.recommendations || []).slice(0, 6)
  };
}

function toQuestionSnapshot(question) {
  return {
    id: question.id,
    exam: question.exam || "JLPT",
    language: question.language || "ja",
    level: question.level || "N5",
    section: question.sectionId,
    sectionId: question.sectionId,
    sectionTitle: question.sectionTitle,
    type: question.type,
    question: question.question,
    questionTranslation: question.questionTranslation || "",
    passage: question.passage,
    passageTranslation: question.passageTranslation || "",
    pinyin: question.pinyin || "",
    options: [...question.options],
    optionTranslations: getOptionTranslations(question),
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    difficulty: question.difficulty || "normal",
    tags: [...(question.tags || [])]
  };
}

function saveWrongAnswersFromResult(result) {
  const wrongAnswerMap = new Map(
    loadWrongAnswers().map((entry) => [entry.questionId, entry])
  );

  state.questions.forEach((question, index) => {
    const selectedIndex = result.answers[index];

    if (selectedIndex === question.correctIndex) {
      wrongAnswerMap.delete(question.id);
      return;
    }

    wrongAnswerMap.set(question.id, {
      questionId: question.id,
      examId: result.examId || getQuestionExamId(question),
      exam: result.exam || question.exam || "JLPT",
      language: result.language || question.language || "ja",
      level: result.level || question.level || "N5",
      question: toStoredQuestion(question),
      userSelectedIndex: selectedIndex,
      correctIndex: question.correctIndex,
      date: result.date
    });
  });

  const updatedWrongAnswers = Array.from(wrongAnswerMap.values())
    .sort((first, second) => new Date(second.date) - new Date(first.date));
  saveWrongAnswers(updatedWrongAnswers);
}

function toStoredQuestion(question) {
  return {
    id: question.id,
    exam: question.exam || "JLPT",
    language: question.language || "ja",
    level: question.level || "N5",
    section: question.sectionId,
    sectionTitle: question.sectionTitle,
    type: question.type,
    question: question.question,
    questionTranslation: question.questionTranslation || "",
    passage: question.passage,
    passageTranslation: question.passageTranslation || "",
    pinyin: question.pinyin || "",
    options: question.options,
    optionTranslations: getOptionTranslations(question),
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    difficulty: question.difficulty || "normal",
    tags: question.tags
  };
}

function normalizeWrongAnswerEntry(entry) {
  if (!entry || !entry.question) {
    return entry;
  }

  normalizeQuestionDefaults(entry.question);

  return {
    ...entry,
    questionId: entry.questionId || entry.question.id,
    examId: entry.examId || getQuestionExamId(entry.question),
    exam: entry.exam || entry.question.exam || "JLPT",
    language: entry.language || entry.question.language || "ja",
    level: entry.level || entry.question.level || "N5"
  };
}

function loadWrongAnswers() {
  const wrongAnswers = loadJson(STORAGE_KEYS.wrongAnswers, []);
  return Array.isArray(wrongAnswers)
    ? wrongAnswers
      .map(normalizeWrongAnswerEntry)
      .filter((entry) => entry?.questionId && entry?.question)
    : [];
}

function loadWrongAnswersForExam(examConfig) {
  return loadWrongAnswers().filter((entry) => questionMatchesExam(entry.question, examConfig));
}

function saveWrongAnswers(wrongAnswers) {
  saveJson(STORAGE_KEYS.wrongAnswers, wrongAnswers);
}

function saveLatestResult(result) {
  saveJson(STORAGE_KEYS.latestResult, result);
}

function loadLatestResult() {
  return loadJson(STORAGE_KEYS.latestResult, null);
}

function exportProgress() {
  const progressExport = buildProgressExport();
  const exportText = JSON.stringify(progressExport, null, 2);
  const blob = new Blob([exportText], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = createProgressFilename(new Date(progressExport.exportedAt));
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  URL.revokeObjectURL(downloadUrl);

  showSavedProgressMessage("Progress exported as a JSON file.");
}

function buildProgressExport() {
  return {
    appName: APP_NAME,
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data: getSavedProgressData()
  };
}

function getSavedProgressData() {
  return {
    history: loadResultHistory(),
    wrongAnswers: loadWrongAnswers(),
    recentQuestions: loadRecentQuestionIds(),
    settings: loadSettings()
  };
}

function createProgressFilename(date = new Date()) {
  const datePart = date.toISOString().slice(0, 10);
  return `language-mock-test-progress-${datePart}.json`;
}

function handleProgressImport(event) {
  const fileInput = event.target;
  const selectedFile = fileInput.files && fileInput.files[0];

  if (!selectedFile) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    readImportedProgressText(String(reader.result || ""));
    fileInput.value = "";
  };

  reader.onerror = () => {
    showInvalidProgressFileMessage();
    fileInput.value = "";
  };

  reader.readAsText(selectedFile);
}

function readImportedProgressText(progressText) {
  let progressFile;

  try {
    progressFile = JSON.parse(progressText);
  } catch (error) {
    showInvalidProgressFileMessage();
    return false;
  }

  if (!isValidProgressFile(progressFile)) {
    showInvalidProgressFileMessage();
    return false;
  }

  const confirmed = window.confirm("Importing progress will replace your current saved progress on this browser. Continue?");

  if (!confirmed) {
    return false;
  }

  importProgressData(progressFile.data);
  state.activeResult = null;
  state.questions = [];
  state.answers = [];
  showHome();
  showSavedProgressMessage("Progress imported successfully.");
  return true;
}

function isValidProgressFile(progressFile) {
  return isPlainObject(progressFile)
    && progressFile.appName === APP_NAME
    && isPlainObject(progressFile.data);
}

function importProgressData(data) {
  const importedProgress = {
    history: sanitizeImportedHistory(data.history),
    wrongAnswers: sanitizeImportedWrongAnswers(data.wrongAnswers),
    recentQuestions: sanitizeImportedRecentQuestions(data.recentQuestions),
    settings: sanitizeImportedSettings(data.settings)
  };

  removeAllAppStorage();
  saveJson(STORAGE_KEYS.history, importedProgress.history);
  saveJson(STORAGE_KEYS.wrongAnswers, importedProgress.wrongAnswers);
  saveJson(STORAGE_KEYS.recentQuestions, importedProgress.recentQuestions);
  saveSettings(importedProgress.settings);
}

function sanitizeImportedHistory(history) {
  return Array.isArray(history)
    ? history
      .filter(isPlainObject)
      .map((entry) => ({
        ...entry,
        examId: entry.examId || DEFAULT_EXAM_ID,
        exam: entry.exam || "JLPT",
        language: entry.language || "ja",
        level: entry.level || "N5",
        sectionBreakdown: isPlainObject(entry.sectionBreakdown) ? entry.sectionBreakdown : {},
        weakPointSummary: isPlainObject(entry.weakPointSummary) ? entry.weakPointSummary : null
      }))
      .slice(0, HISTORY_LIMIT)
    : [];
}

function sanitizeImportedWrongAnswers(wrongAnswers) {
  return Array.isArray(wrongAnswers)
    ? wrongAnswers
      .filter(isPlainObject)
      .map(normalizeWrongAnswerEntry)
      .filter((entry) => entry?.questionId && isPlainObject(entry.question))
    : [];
}

function sanitizeImportedRecentQuestions(recentQuestions) {
  return Array.isArray(recentQuestions)
    ? recentQuestions
      .filter((questionId) => typeof questionId === "string")
      .slice(0, RECENT_QUESTION_LIMIT)
    : [];
}

function sanitizeImportedSettings(settings) {
  return isPlainObject(settings) ? { ...settings } : {};
}

function loadSettings() {
  const settings = loadJson(STORAGE_KEYS.settings, {});
  return isPlainObject(settings) ? settings : {};
}

function saveSettings(settings) {
  saveJson(STORAGE_KEYS.settings, sanitizeImportedSettings(settings));
}

function showInvalidProgressFileMessage() {
  showSavedProgressMessage("Invalid progress file. Please select a valid exported JSON file.", "error");
}

function migrateLegacyStorage() {
  Object.entries(LEGACY_STORAGE_KEYS).forEach(([storageName, legacyKey]) => {
    const newKey = STORAGE_KEYS[storageName];

    if (!newKey || hasStoredValue(newKey) || !hasStoredValue(legacyKey)) {
      return;
    }

    const legacyValue = loadJson(legacyKey, null);

    if (legacyValue !== null) {
      saveJson(newKey, legacyValue);
    }
  });
}

function clearSavedProgress() {
  const confirmed = window.confirm("This will delete your saved results, wrong answers, and progress on this browser. Continue?");

  if (!confirmed) {
    return;
  }

  removeAllAppStorage();
  state.activeResult = null;
  state.questions = [];
  state.answers = [];
  showHome();
  showSavedProgressMessage("Saved progress has been cleared on this browser.");
}

function showSavedProgressMessage(message, type = "success") {
  elements.savedProgressMessage.textContent = message;
  elements.savedProgressMessage.classList.remove("hidden");
  elements.savedProgressMessage.classList.toggle("is-error", type === "error");
}

function removeKnownStorageKeys(storageNames) {
  storageNames.forEach((storageName) => {
    if (STORAGE_KEYS[storageName]) {
      removeJson(STORAGE_KEYS[storageName]);
    }

    if (LEGACY_STORAGE_KEYS[storageName]) {
      removeJson(LEGACY_STORAGE_KEYS[storageName]);
    }
  });
}

function removeAllAppStorage() {
  Object.values(STORAGE_KEYS).forEach(removeJson);
  Object.values(LEGACY_STORAGE_KEYS).forEach(removeJson);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasStoredValue(key) {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.warn(`Could not check ${key} in localStorage.`, error);
    return false;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} to localStorage.`, error);
  }
}

function loadJson(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch (error) {
    console.warn(`Could not read ${key} from localStorage.`, error);
    return fallbackValue;
  }
}

function removeJson(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Could not remove ${key} from localStorage.`, error);
    return null;
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  return new Date(dateString).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
