const lanes = {
  methods: { title: "Concepts" },
  statuses: { title: "API Lab" },
  response: { title: "Automation" },
  scenarios: { title: "Career" }
};

const laneOrder = Object.keys(lanes);
const authCredentials = [
  { username: "yvonne", password: "Learning777", role: "owner" },
  { username: "visitor", password: "visitor111", role: "visitor" }
];

const stages = [
  {
    title: "Week 1: API Basics",
    theme: "HTTP methods, status codes, JSON, and test scenarios.",
    daily: "Write 10 login API test scenarios after clearing this stage.",
    questions: {
      methods: [
        q("Scenario", "A screen needs to read an existing user's profile data.", "Endpoint: /users/10", "GET", [["GET", "Read existing data."], ["POST", "Create data."], ["PATCH", "Update part of data."], ["DELETE", "Remove data."]], "GET is used to read data without changing server state."),
        q("Scenario", "A signup form creates a new user account.", '{"name":"Ali","email":"ali@example.com"}', "POST", [["PUT", "Replace a resource."], ["POST", "Create a resource."], ["GET", "Read a resource."], ["DELETE", "Remove a resource."]], "POST is the usual method for creating new resources.")
      ],
      statuses: [
        q("Result", "Login succeeds and returns a token.", '{"token":"abc123xyz","userId":10}', "200", [["200", "OK."], ["401", "Unauthorized."], ["404", "Not Found."], ["500", "Server Error."]], "A successful login normally returns 200 OK."),
        q("Result", "The request body is missing a required email field.", '{"password":"Password123"}', "400", [["201", "Created."], ["400", "Bad Request."], ["403", "Forbidden."], ["500", "Server Error."]], "Missing or invalid input is usually a 400 Bad Request.")
      ],
      response: [
        q("Response", "Which assertion is strongest for a successful login?", 'Status: 200\n{"token":"abc123xyz","userId":10}', "Token exists and userId is a number", [["Only status is 200", "Too shallow alone."], ["Token exists and userId is a number", "Checks important body fields."], ["Response contains abc", "Too brittle."], ["No assertion needed", "Not a test."]], "Good API tests validate status and meaningful response fields."),
        q("Response", "The API returns passwordHash in user details. What is the issue?", '{"id":10,"email":"user@example.com","passwordHash":"$2a$10$..."}', "Sensitive data exposure", [["Cosmetic issue", "Not just display style."], ["Sensitive data exposure", "Sensitive fields should not be returned."], ["Expected behavior", "Passwords must be protected."], ["Network slowness", "This is data exposure."]], "API testers should notice sensitive data leaks.")
      ],
      scenarios: [
        q("Test Case", "Best expected result for login with a wrong password?", '{"email":"user@example.com","password":"wrongpass"}', "401 with no token returned", [["200 with token returned", "That would be a bug."], ["401 with no token returned", "Authentication failed."], ["201 with new user id", "Login should not create users."], ["404 for every wrong password", "The user may still exist."]], "Wrong credentials should not return a token."),
        q("Test Set", "Which set gives better login coverage?", "Feature: User Login API", "Valid login, wrong password, missing email, invalid email, locked account", [["Valid login only", "Too little."], ["Five copies of valid login", "Repetition adds little value."], ["Valid login, wrong password, missing email, invalid email, locked account", "Covers positive and negative paths."], ["Only response time checks", "Not enough functional coverage."]], "Good coverage includes happy path, validation, auth failure, and account state.")
      ]
    }
  },
  {
    title: "Week 2: Postman Project",
    theme: "Collections, environments, variables, and assertions.",
    daily: "Create one Postman collection folder for login, users, and errors.",
    questions: {
      methods: [
        q("Concept", "Why use a Postman environment variable for baseUrl?", "baseUrl = https://api.example.com", "To switch environments without editing every request", [["To switch environments without editing every request", "Flexible and maintainable."], ["To hide all test failures", "No."], ["To remove assertions", "No."], ["To make only GET requests", "No."]], "Variables reduce repeated editing across dev, staging, and production-like targets."),
        q("Concept", "Where should a shared token normally be stored during collection runs?", "Authorization: Bearer {{token}}", "Environment or collection variable", [["Request name", "Not executable."], ["Environment or collection variable", "Reusable across requests."], ["Screenshot only", "Not useful."], ["Random comment", "Not executable."]], "A token variable lets later requests reuse the login result.")
      ],
      statuses: [
        q("Postman", "Which Postman test checks a successful response code?", "pm.test(...)", "pm.response.to.have.status(200)", [["pm.response.to.have.status(200)", "Correct status assertion."], ["pm.sleep(200)", "Not a status check."], ["console.log(200)", "Only logs text."], ["pm.request.delete()", "Not an assertion."]], "Postman test scripts can assert exact status codes."),
        q("Postman", "Which script checks response time below 1000 ms?", "Response performance", "pm.expect(pm.response.responseTime).to.be.below(1000)", [["pm.expect(pm.response.responseTime).to.be.below(1000)", "Correct."], ["pm.response.to.have.status(404)", "Status only."], ["pm.environment.clear()", "Clears variables."], ["JSON.stringify(pm)", "No assertion."]], "Response time can be asserted with pm.response.responseTime.")
      ],
      response: [
        q("Assertion", "Which assertion validates token exists in JSON?", '{"token":"abc123xyz"}', "pm.expect(json.token).to.exist", [["pm.expect(json.token).to.exist", "Correct."], ["pm.expect(json.token).to.be.null", "Opposite."], ["pm.response.to.have.status(500)", "Wrong target."], ["pm.environment.get(\"missing\")", "Only reads a variable."]], "A useful Postman assertion checks the parsed JSON field."),
        q("Assertion", "What should a negative login test verify?", '{"error":"Invalid credentials"}', "401 status and useful error message", [["Only request name", "No validation."], ["401 status and useful error message", "Correct."], ["Token is present", "Wrong for failed login."], ["User is created", "Wrong feature."]], "Negative tests need both failure status and meaningful error checks.")
      ],
      scenarios: [
        q("Portfolio", "What belongs in a Postman project README?", "GitHub repo", "API scope, setup, run steps, and tested scenarios", [["Only your name", "Too little."], ["API scope, setup, run steps, and tested scenarios", "Strong portfolio evidence."], ["Random screenshots only", "Missing context."], ["Private passwords", "Never."]], "A README should help an interviewer run and understand your tests."),
        q("Portfolio", "Which public API is good for practice?", "Need safe demo target", "Reqres, JSONPlaceholder, or Restful Booker", [["Bank production API", "Not appropriate."], ["Reqres, JSONPlaceholder, or Restful Booker", "Common demo APIs."], ["A private company API without permission", "No."], ["No API", "You need a target."]], "Use public demo APIs for portfolio practice.")
      ]
    }
  },
  {
    title: "Week 3: Newman Reports",
    theme: "Run Postman from CLI and generate reports.",
    daily: "Run a collection with Newman and save a report screenshot.",
    questions: laneSet("Newman", "newman run collection.json -e env.json", "CLI reports show repeatable test execution outside the Postman UI.")
  },
  {
    title: "Week 4: Coding Basics",
    theme: "Python or JavaScript foundations for automation.",
    daily: "Write one small script that reads JSON and checks a field.",
    questions: laneSet("Coding", "if response.status_code == 200:\n    print('pass')", "Automation code needs variables, functions, conditions, loops, and JSON handling.")
  },
  {
    title: "Week 5: Pytest API Automation",
    theme: "Convert API scenarios into code tests.",
    daily: "Create tests for GET, POST, PUT/PATCH, DELETE, and invalid input.",
    questions: laneSet("Pytest", "def test_login_success():\n    assert response.status_code == 200", "Pytest plus requests is a practical API automation stack.")
  },
  {
    title: "Week 6: AI-Assisted QA",
    theme: "Use AI agents to generate, refactor, and debug tests responsibly.",
    daily: "Keep an AI_WORKFLOW.md with prompts, review notes, and final decisions.",
    questions: laneSet("AI Workflow", "Prompt -> review -> edit -> run -> verify", "AI can accelerate test work, but you own the assertions and quality decisions.")
  },
  {
    title: "Week 7: Playwright UI",
    theme: "Browser automation, locators, actions, and assertions.",
    daily: "Automate login success, login failure, and one form workflow.",
    questions: laneSet("Playwright", "await expect(page.getByText('Products')).toBeVisible()", "UI automation should use stable locators and clear assertions.")
  },
  {
    title: "Week 8: Framework Structure",
    theme: "Page objects, fixtures, config, test data, and reports.",
    daily: "Refactor repeated steps into helpers or page objects.",
    questions: laneSet("Framework", "pages/ tests/ data/ utils/ config/", "A framework makes tests easier to maintain as the suite grows.")
  },
  {
    title: "Week 9: GitHub Actions",
    theme: "Run tests automatically on push and save artifacts.",
    daily: "Add a workflow file and upload the test report as an artifact.",
    questions: laneSet("CI/CD", "on: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest", "CI proves your tests run repeatably, not only on your machine.")
  },
  {
    title: "Week 10: Resume Boss Level",
    theme: "Turn projects into resume bullets and interview stories.",
    daily: "Prepare a 5-minute explanation of your portfolio project.",
    questions: laneSet("Resume", "Built API and UI automation with reports and CI.", "Strong resume bullets show tools, action, and measurable quality value.")
  }
];

const state = {
  stage: Number(localStorage.getItem("qaArcadeStage") || 0),
  mode: localStorage.getItem("qaArcadeMode") || "methods",
  indexByStageMode: JSON.parse(localStorage.getItem("qaArcadeIndex") || "{}"),
  xp: Number(localStorage.getItem("qaArcadeXp") || 0),
  streak: Number(localStorage.getItem("qaArcadeStreak") || 0),
  completed: JSON.parse(localStorage.getItem("qaArcadeCompleted") || "{}"),
  answered: false,
  autoNextTimer: null
};

let currentRole = sessionStorage.getItem("qaArcadeRole") || "visitor";

const els = {
  campaignLabel: document.querySelector("#campaignLabel"),
  campaignList: document.querySelector("#campaignList"),
  level: document.querySelector("#levelValue"),
  xp: document.querySelector("#xpValue"),
  streak: document.querySelector("#streakValue"),
  modeEyebrow: document.querySelector("#modeEyebrow"),
  modeTitle: document.querySelector("#modeTitle"),
  missionType: document.querySelector("#missionType"),
  questionText: document.querySelector("#questionText"),
  payloadBlock: document.querySelector("#payloadBlock"),
  choices: document.querySelector("#choices"),
  feedback: document.querySelector("#feedback"),
  next: document.querySelector("#nextButton"),
  reset: document.querySelector("#resetButton"),
  logout: document.querySelector("#logoutButton"),
  loginForm: document.querySelector("#loginForm"),
  loginError: document.querySelector("#loginError"),
  usernameInput: document.querySelector("#usernameInput"),
  passwordInput: document.querySelector("#passwordInput"),
  skillTrack: document.querySelector("#skillTrack"),
  dailyPrompt: document.querySelector("#dailyPrompt"),
  modeButtons: document.querySelectorAll(".mode-button")
};

function q(type, question, payload, answer, choices, explanation) {
  return { type, question, payload, answer, choices, explanation };
}

function laneSet(topic, payload, lesson) {
  return {
    methods: [
      q("Concept", `What is the main goal of ${topic} in your QA portfolio?`, payload, "Make testing repeatable and visible", [["Make testing repeatable and visible", "Best answer."], ["Replace all tester thinking", "No."], ["Avoid writing assertions", "No."], ["Hide failures", "No."]], lesson),
      q("Concept", `Which habit makes ${topic} work stronger?`, payload, "Small changes, clear commits, and verified results", [["Small changes, clear commits, and verified results", "Professional workflow."], ["No README", "Hard to review."], ["Only screenshots", "Not enough."], ["Never run tests", "Risky."]], lesson)
    ],
    statuses: [
      q("Lab", `Which output should you save from ${topic} practice?`, payload, "A report, screenshot, or terminal result", [["A report, screenshot, or terminal result", "Evidence matters."], ["Nothing", "No proof."], ["Private secrets", "Never."], ["Only browser history", "Not useful."]], lesson),
      q("Lab", `What should happen when a ${topic} test fails?`, payload, "The failure should show what broke and where", [["The failure should show what broke and where", "Debuggable tests are valuable."], ["The test should silently pass", "Dangerous."], ["Delete the test", "No."], ["Ignore the failure forever", "No."]], lesson)
    ],
    response: [
      q("Automation", `Which ${topic} practice is most resume-friendly?`, payload, "Reusable structure plus clear assertions", [["Reusable structure plus clear assertions", "Shows maintainability."], ["One messy script", "Weak signal."], ["Manual notes only", "Not automation."], ["No validation", "Not testing."]], lesson),
      q("Automation", `How do you improve duplicated ${topic} steps?`, payload, "Refactor into helpers, fixtures, or page objects", [["Refactor into helpers, fixtures, or page objects", "Keeps tests clean."], ["Copy everything forever", "Hard to maintain."], ["Remove assertions", "No."], ["Rename files randomly", "No."]], lesson)
    ],
    scenarios: [
      q("Career", `How should ${topic} appear on your resume?`, payload, "Action + tool + quality outcome", [["Action + tool + quality outcome", "Strong bullet structure."], ["Tool names only", "Too shallow."], ["Very vague statement", "Weak."], ["Unverified claims", "Risky."]], lesson),
      q("Career", `What interview story should you prepare for ${topic}?`, payload, "Problem, approach, result, and what you learned", [["Problem, approach, result, and what you learned", "Clear story arc."], ["Only say it was easy", "Too thin."], ["Blame the tool", "Unprofessional."], ["Skip the result", "Incomplete."]], lesson)
    ]
  };
}

function stageKey(stageIndex, mode) {
  return `${stageIndex}-${mode}`;
}

function stageScore(stageIndex) {
  return activeLaneOrder().reduce((sum, mode) => sum + (state.completed[stageKey(stageIndex, mode)] || 0), 0);
}

function stageTotal(stageIndex) {
  return activeLaneOrder().reduce((sum, mode) => sum + stages[stageIndex].questions[mode].length, 0);
}

function isStageUnlocked(stageIndex) {
  if (stageIndex === 0) return true;
  return stageScore(stageIndex - 1) >= Math.ceil(stageTotal(stageIndex - 1) * 0.75);
}

function currentQuestion() {
  normalizeVisitorState();
  const key = stageKey(state.stage, state.mode);
  const questions = stages[state.stage].questions[state.mode];
  return displayQuestion(questions[(state.indexByStageMode[key] || 0) % questions.length]);
}

function persist() {
  localStorage.setItem("qaArcadeStage", String(state.stage));
  localStorage.setItem("qaArcadeMode", state.mode);
  localStorage.setItem("qaArcadeIndex", JSON.stringify(state.indexByStageMode));
  localStorage.setItem("qaArcadeXp", String(state.xp));
  localStorage.setItem("qaArcadeStreak", String(state.streak));
  localStorage.setItem("qaArcadeCompleted", JSON.stringify(state.completed));
}

function updateScoreboard() {
  els.xp.textContent = state.xp;
  els.streak.textContent = state.streak;
  els.level.textContent = Math.floor(state.xp / 120) + 1;
  persist();
}

function renderCampaign() {
  els.campaignList.innerHTML = stages.map((stage, index) => {
    if (!isStageVisible(index)) return "";
    const unlocked = isStageUnlocked(index);
    const score = stageScore(index);
    const total = stageTotal(index);
    const progress = Math.round((score / total) * 100);
    const title = displayStageTitle(stage.title).replace("Week ", "W");
    return `
      <button class="campaign-button ${index === state.stage ? "active" : ""} ${unlocked ? "" : "locked"}" type="button" data-stage="${index}" ${unlocked ? "" : "aria-disabled=\"true\""}>
        <span class="campaign-head">
          <span class="campaign-number">${index + 1}</span>
          <span class="campaign-stars">${unlocked ? `${score}/${total}` : "LOCK"}</span>
        </span>
        <span class="campaign-title">${escapeHtml(title)}</span>
        <span class="campaign-theme">${escapeHtml(displayStageTheme(stage.theme))}</span>
        <span class="campaign-progress" aria-hidden="true"><span style="width: ${progress}%"></span></span>
      </button>
    `;
  }).join("");
}

function renderSkillTrack() {
  const stage = stages[state.stage];
  els.skillTrack.innerHTML = activeLaneOrder().map((mode) => {
    const key = stageKey(state.stage, mode);
    const count = state.completed[key] || 0;
    const total = stage.questions[mode].length;
    return `
      <div class="skill-item ${count >= total ? "done" : ""}">
        <strong>${lanes[mode].title}</strong>
        <span>${count}/${total} cleared. ${displayStageTheme(stage.theme)}</span>
      </div>
    `;
  }).join("");
}

function renderQuestion() {
  clearAutoNext();
  normalizeVisitorState();
  const stage = stages[state.stage];
  const question = currentQuestion();
  state.answered = false;

  els.campaignLabel.textContent = `Stage ${state.stage + 1}`;
  els.modeEyebrow.textContent = displayStageTitle(stage.title);
  els.modeTitle.textContent = lanes[state.mode].title;
  els.missionType.textContent = question.type;
  els.questionText.textContent = question.question;
  els.payloadBlock.textContent = question.payload;
  els.dailyPrompt.textContent = displayDailyPrompt(stage.daily);
  els.feedback.className = "feedback";
  els.feedback.innerHTML = "<strong>Ready</strong><span>Pick the best answer to clear this gate.</span>";

  els.choices.innerHTML = question.choices.map(([label], index) => `
    <button class="choice-button" type="button" data-answer="${escapeHtml(label)}">
      <span class="choice-detail">Choice ${String.fromCharCode(65 + index)}</span>
      <span class="choice-label">${escapeHtml(label)}</span>
    </button>
  `).join("");

  els.modeButtons.forEach((button) => {
    const isVisitorHidden = currentRole === "visitor" && button.dataset.mode === "scenarios";
    button.hidden = isVisitorHidden;
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });
  renderCampaign();
  renderSkillTrack();
  updateScoreboard();
}

function answerQuestion(event) {
  const button = event.target.closest(".choice-button");
  if (!button || state.answered) return;

  const question = currentQuestion();
  const isCorrect = button.dataset.answer === question.answer;
  const key = stageKey(state.stage, state.mode);

  if (isCorrect) {
    state.answered = true;
    button.classList.add("correct");
    els.choices.querySelectorAll(".choice-button").forEach((choice) => {
      choice.disabled = true;
    });
    state.streak += 1;
    state.xp += 25 + Math.min(state.streak * 2, 20);
    state.completed[key] = Math.min((state.completed[key] || 0) + 1, stages[state.stage].questions[state.mode].length);
    els.feedback.className = "feedback success";
    els.feedback.innerHTML = `<strong>Gate cleared</strong><span>${question.explanation} Moving to the next gate...</span>`;
    document.querySelector(".mission-panel").classList.remove("screen-flash");
    window.requestAnimationFrame(() => {
      document.querySelector(".mission-panel").classList.add("screen-flash");
    });
    state.autoNextTimer = window.setTimeout(() => {
      advanceAfterCorrect();
    }, 950);
  } else {
    state.streak = 0;
    button.classList.add("wrong");
    button.disabled = true;
    els.feedback.className = "feedback error";
    els.feedback.innerHTML = "<strong>Try again</strong><span>That choice is not the best fit. Pick another answer.</span>";
  }

  updateScoreboard();
  renderCampaign();
  renderSkillTrack();
}

function nextQuestion() {
  clearAutoNext();
  const key = stageKey(state.stage, state.mode);
  state.indexByStageMode[key] = (state.indexByStageMode[key] || 0) + 1;
  renderQuestion();
}

function advanceAfterCorrect() {
  clearAutoNext();

  if (!isLaneCleared(state.stage, state.mode)) {
    incrementCurrentQuestion();
    renderQuestion();
    return;
  }

  const nextMode = nextIncompleteLane(state.stage, state.mode);
  if (nextMode) {
    state.mode = nextMode;
    renderQuestion();
    return;
  }

  const nextStage = nextVisibleStage(state.stage);
  if (nextStage !== null && isStageUnlocked(nextStage)) {
    state.stage = nextStage;
    state.mode = firstIncompleteLane(nextStage) || laneOrder[0];
    renderQuestion();
    return;
  }

  incrementCurrentQuestion();
  renderQuestion();
}

function incrementCurrentQuestion() {
  const key = stageKey(state.stage, state.mode);
  state.indexByStageMode[key] = (state.indexByStageMode[key] || 0) + 1;
}

function isLaneCleared(stageIndex, mode) {
  const key = stageKey(stageIndex, mode);
  return (state.completed[key] || 0) >= stages[stageIndex].questions[mode].length;
}

function nextIncompleteLane(stageIndex, currentMode) {
  const lanesForRole = activeLaneOrder();
  const start = lanesForRole.indexOf(currentMode) + 1;
  return lanesForRole.slice(start).find((mode) => !isLaneCleared(stageIndex, mode)) || null;
}

function firstIncompleteLane(stageIndex) {
  return activeLaneOrder().find((mode) => !isLaneCleared(stageIndex, mode)) || null;
}

function switchMode(event) {
  clearAutoNext();
  const button = event.target.closest(".mode-button");
  if (!button) return;
  state.mode = button.dataset.mode;
  renderQuestion();
}

function switchStage(event) {
  clearAutoNext();
  const button = event.target.closest(".campaign-button");
  if (!button) return;
  const nextStage = Number(button.dataset.stage);
  if (!isStageVisible(nextStage)) return;
  if (!isStageUnlocked(nextStage)) {
    els.feedback.className = "feedback error";
    els.feedback.innerHTML = "<strong>Locked</strong><span>Clear 75% of the previous stage first.</span>";
    return;
  }
  state.stage = nextStage;
  renderQuestion();
}

function resetProgress() {
  clearAutoNext();
  state.stage = 0;
  state.mode = "methods";
  state.xp = 0;
  state.streak = 0;
  state.completed = {};
  state.indexByStageMode = {};
  renderQuestion();
}

function clearAutoNext() {
  if (!state.autoNextTimer) return;
  window.clearTimeout(state.autoNextTimer);
  state.autoNextTimer = null;
}

function initAuth() {
  if (sessionStorage.getItem("qaArcadeAuth") === "yes") {
    currentRole = sessionStorage.getItem("qaArcadeRole") || "visitor";
    unlockApp();
  }

  els.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = els.usernameInput.value.trim();
    const password = els.passwordInput.value;

    const account = authCredentials.find((item) => item.username === username && item.password === password);

    if (account) {
      sessionStorage.setItem("qaArcadeAuth", "yes");
      sessionStorage.setItem("qaArcadeRole", account.role);
      currentRole = account.role;
      els.loginError.textContent = "";
      unlockApp();
      normalizeVisitorState();
      renderQuestion();
      return;
    }

    els.loginError.textContent = "Invalid username or password.";
    els.passwordInput.value = "";
    els.passwordInput.focus();
  });

  els.logout.addEventListener("click", () => {
    sessionStorage.removeItem("qaArcadeAuth");
    sessionStorage.removeItem("qaArcadeRole");
    currentRole = "visitor";
    document.body.classList.add("auth-locked");
    els.passwordInput.value = "";
    els.usernameInput.focus();
  });
}

function unlockApp() {
  document.body.classList.remove("auth-locked");
}

function activeLaneOrder() {
  return currentRole === "visitor" ? laneOrder.filter((mode) => mode !== "scenarios") : laneOrder;
}

function isStageVisible(stageIndex) {
  return currentRole !== "visitor" || stageIndex < 9;
}

function nextVisibleStage(stageIndex) {
  for (let index = stageIndex + 1; index < stages.length; index += 1) {
    if (isStageVisible(index)) return index;
  }
  return null;
}

function normalizeVisitorState() {
  if (currentRole !== "visitor") return;
  if (state.mode === "scenarios") state.mode = "methods";
  if (!isStageVisible(state.stage)) {
    state.stage = 0;
    state.mode = "methods";
  }
}

function displayStageTitle(title) {
  if (currentRole !== "visitor") return title;
  return title
    .replace("Week 10: Resume Boss Level", "Week 10: Final Challenge")
    .replace("Postman Project", "Postman Practice")
    .replace("Pytest API Automation", "Pytest API Challenge");
}

function displayStageTheme(theme) {
  if (currentRole !== "visitor") return theme;
  return theme
    .replace("Turn projects into resume bullets and interview stories.", "Review the learning journey and final challenge.")
    .replace("Convert API scenarios into code tests.", "Practice turning API scenarios into code tests.")
    .replace("Use AI agents to generate, refactor, and debug tests responsibly.", "Use AI tools to generate, refactor, and debug tests responsibly.");
}

function displayDailyPrompt(prompt) {
  if (currentRole !== "visitor") return prompt;
  return prompt
    .replace("Create one Postman collection folder for login, users, and errors.", "Create one Postman collection folder for login, users, and error cases.")
    .replace("Prepare a 5-minute explanation of your portfolio project.", "Prepare a short explanation of what you learned.");
}

function displayQuestion(question) {
  if (currentRole !== "visitor") return question;
  return {
    ...question,
    question: visitorText(question.question),
    payload: visitorText(question.payload),
    explanation: visitorText(question.explanation),
    choices: question.choices.map(([label, detail]) => [visitorText(label), visitorText(detail)])
  };
}

function visitorText(value) {
  return String(value)
    .replaceAll("resume-friendly", "useful for learning")
    .replaceAll("resume", "learning notes")
    .replaceAll("Resume", "Learning")
    .replaceAll("career", "learning")
    .replaceAll("Career", "Learning")
    .replaceAll("portfolio", "practice")
    .replaceAll("Portfolio", "Practice")
    .replaceAll("interview", "review")
    .replaceAll("Interview", "Review")
    .replaceAll("next software tester role", "testing practice");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

els.choices.addEventListener("click", answerQuestion);
els.next.addEventListener("click", nextQuestion);
els.reset.addEventListener("click", resetProgress);
els.campaignList.addEventListener("click", switchStage);
els.modeButtons.forEach((button) => button.addEventListener("click", switchMode));

initAuth();
renderQuestion();
