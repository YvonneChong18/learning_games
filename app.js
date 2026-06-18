const lanes = {
  methods: { title: "Concepts" },
  statuses: { title: "API Lab" },
  response: { title: "Automation" },
  scenarios: { title: "Career" }
};

const laneOrder = Object.keys(lanes);
const authCredentials = [
  { username: "yvonne", password: "Learning777", role: "owner", storageUser: "yvonne" },
  { username: "visitor", password: "visitor111", role: "visitor", storageUser: "visitor" }
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
    questions: {
      methods: [
        q("Pytest", "Which file name will pytest discover automatically?", "Project: api-tests/", "test_login.py", [["login_check.py", "May not be auto-discovered."], ["test_login.py", "Pytest discovers files beginning with test_."], ["login.manual", "Not a Python test file."], ["README.md", "Documentation, not tests."]], "Pytest auto-discovers files named test_*.py or *_test.py."),
        q("Fixture", "What is the main purpose of a pytest fixture?", "@pytest.fixture\ndef token(): ...", "Share setup data across tests", [["Share setup data across tests", "Correct."], ["Delete all assertions", "No."], ["Only format reports", "No."], ["Replace GitHub Actions", "No."]], "Fixtures keep setup reusable, such as base URLs, tokens, and test data.")
      ],
      statuses: [
        q("Assertion", "Which assertion checks a successful API response in Python?", "response = requests.get(url)", "assert response.status_code == 200", [["assert response.status_code == 200", "Correct."], ["print(response)", "Only prints."], ["response.status_code = 200", "Assigns instead of checks."], ["return 200", "Does not validate response."]], "A pytest test should assert the API result explicitly."),
        q("Data", "Where should repeated test input usually live?", "email, password, payloads", "Test data file or fixture", [["Only inside every test", "Creates duplication."], ["Test data file or fixture", "Reusable and clearer."], ["Browser history", "Not stable."], ["Screenshot name", "Not data storage."]], "Shared data belongs in fixtures, JSON files, or helper modules.")
      ],
      response: [
        q("JSON", "Which code reads JSON response body with requests?", "response = requests.post(url, json=payload)", "body = response.json()", [["body = response.json()", "Correct."], ["body = response.text()", "Text only; sometimes useful but not parsed."], ["body = response.html()", "Not a requests method."], ["body = request.json()", "Wrong object."]], "response.json() parses the response body so fields can be asserted."),
        q("Negative", "What should an invalid-login pytest check include?", "Wrong password", "Status code and error message", [["Only print the response", "No assertion."], ["Status code and error message", "Correct."], ["Token must exist", "Wrong for invalid login."], ["Skip the test", "No."]], "Negative tests should verify both failure status and clear error output.")
      ],
      scenarios: [
        q("Structure", "Which folder layout is easiest to maintain?", "API framework", "tests/, data/, utils/, config/", [["Everything in one file", "Gets messy."], ["tests/, data/, utils/, config/", "Clean structure."], ["Only screenshots/", "Missing tests."], ["Random folders", "Hard to understand."]], "A clear framework structure makes your automation easier to explain and maintain."),
        q("Command", "Which command runs pytest quietly with short output?", "Terminal", "pytest -q", [["pytest -q", "Correct."], ["python readme.md", "No."], ["git push", "Publishes code, does not run tests."], ["newman run", "For Postman collections."]], "pytest -q runs the suite with compact output.")
      ]
    }
  },
  {
    title: "Week 6: AI-Assisted QA",
    theme: "Use AI agents to generate, refactor, and debug tests responsibly.",
    daily: "Keep an AI_WORKFLOW.md with prompts, review notes, and final decisions.",
    questions: {
      methods: [
        q("AI Workflow", "What is the safest AI-assisted testing workflow?", "Prompt -> ?", "Prompt, review, edit, run, verify", [["Prompt, copy, never check", "Risky."], ["Prompt, review, edit, run, verify", "Correct."], ["Ask AI to hide failures", "No."], ["Skip assertions", "No."]], "AI can help draft tests, but you still verify logic and results."),
        q("Prompt", "Which prompt is more useful?", "Need login API tests", "Generate positive and negative login API test cases with expected status codes", [["Make tests", "Too vague."], ["Generate positive and negative login API test cases with expected status codes", "Specific."], ["Do everything", "Too broad."], ["Ignore errors", "Bad testing."]], "Specific prompts produce better test ideas.")
      ],
      statuses: [
        q("Review", "AI generated a test with no assertion. What should you do?", "def test_login(): requests.post(...)", "Add meaningful assertions before accepting it", [["Accept it", "No."], ["Add meaningful assertions before accepting it", "Correct."], ["Delete the whole project", "Too much."], ["Only rename it", "Does not fix quality."]], "A test without assertions is weak automation."),
        q("Debug", "AI suggests changing expected 400 to 200 to pass. What is the right move?", "Failing negative test", "Check requirements and keep the correct expected behavior", [["Change to 200 blindly", "Wrong."], ["Check requirements and keep the correct expected behavior", "Correct."], ["Remove the test", "No."], ["Ignore all failures", "No."]], "Passing is not the goal; correct validation is the goal.")
      ],
      response: [
        q("Documentation", "What belongs in AI_WORKFLOW.md?", "Project notes", "Prompts used, changes reviewed, and final validation", [["Private passwords", "Never."], ["Prompts used, changes reviewed, and final validation", "Correct."], ["Only jokes", "Not useful."], ["Nothing", "No record."]], "Documenting AI usage shows responsibility and review."),
        q("Coverage", "How can AI help improve coverage?", "Existing tests only cover success", "Suggest missing negative and edge cases", [["Suggest missing negative and edge cases", "Correct."], ["Remove edge cases", "No."], ["Hide skipped tests", "No."], ["Delete reports", "No."]], "AI is useful for brainstorming missed scenarios.")
      ],
      scenarios: [
        q("Ownership", "Who owns the final test quality?", "AI-assisted project", "The tester", [["The tester", "Correct."], ["The AI tool only", "No."], ["Nobody", "No."], ["The browser", "No."]], "You can use AI, but you own the decisions and quality."),
        q("Refactor", "AI finds duplicated login code. What is a good improvement?", "Repeated login steps", "Move login setup into a helper or fixture", [["Copy more code", "No."], ["Move login setup into a helper or fixture", "Correct."], ["Remove login tests", "No."], ["Rename variables only", "Too small."]], "Refactoring duplication makes tests easier to maintain.")
      ]
    }
  },
  {
    title: "Week 7: Playwright UI",
    theme: "Browser automation, locators, actions, and assertions.",
    daily: "Automate login success, login failure, and one form workflow.",
    questions: {
      methods: [
        q("Locator", "Which locator is usually more stable?", "<button data-testid='login-button'>Login</button>", "page.getByTestId('login-button')", [["page.locator('div > div > button')", "Too brittle."], ["page.getByTestId('login-button')", "Correct."], ["page.locator('*')", "Too broad."], ["page.getByText('')", "Empty text is weak."]], "Stable test IDs are less likely to break when layout changes."),
        q("Action", "What should happen after clicking Login in a UI test?", "await page.getByText('Login').click()", "Assert the expected page or message appears", [["Close browser immediately", "No validation."], ["Assert the expected page or message appears", "Correct."], ["Wait forever", "No."], ["Only print done", "Weak."]], "Every UI flow needs an assertion after the action.")
      ],
      statuses: [
        q("Wait", "What is better than a fixed 10-second sleep?", "Loading dashboard", "Wait for a specific element to appear", [["Wait for a specific element to appear", "Correct."], ["Always sleep 10 seconds", "Slow and flaky."], ["Never wait", "Often flaky."], ["Reload randomly", "No."]], "Specific waits make UI tests faster and more reliable."),
        q("Failure", "What artifact helps debug a failed UI test?", "CI failure", "Screenshot or trace", [["Screenshot or trace", "Correct."], ["Only a pass badge", "Not enough."], ["Delete logs", "No."], ["Random comment", "No."]], "Screenshots/traces help explain what the browser saw.")
      ],
      response: [
        q("Assertion", "Which Playwright assertion checks a visible page title?", "<h1>Products</h1>", "await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()", [["await expect(page).toBeHidden()", "Wrong target."], ["await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()", "Correct."], ["console.log('Products')", "No assertion."], ["await page.close()", "No validation."]], "Role-based locators can be readable and accessible."),
        q("Negative UI", "For invalid login, what should the UI test verify?", "Wrong password", "Error message is visible", [["User reaches dashboard", "Wrong."], ["Error message is visible", "Correct."], ["Cart opens", "Unrelated."], ["No assertion", "Weak."]], "Negative UI tests should verify the user sees the proper error.")
      ],
      scenarios: [
        q("Flow", "Which flow is a good first Playwright project?", "Demo shop", "Login, add item, checkout validation", [["Login, add item, checkout validation", "Good end-to-end flow."], ["Only open homepage", "Too shallow."], ["Random clicks", "No clear purpose."], ["No assertions", "Not testing."]], "A real workflow makes UI automation more meaningful."),
        q("Maintenance", "Why use Page Object Model?", "Many tests use same login page", "Keep selectors and page actions reusable", [["Keep selectors and page actions reusable", "Correct."], ["Make tests impossible to read", "No."], ["Remove all assertions", "No."], ["Avoid Git", "No."]], "Page objects reduce duplicated selectors and actions.")
      ]
    }
  },
  {
    title: "Week 8: Framework Structure",
    theme: "Page objects, fixtures, config, test data, and reports.",
    daily: "Refactor repeated steps into helpers or page objects.",
    questions: {
      methods: [
        q("Architecture", "Where should reusable API helper functions go?", "Framework folders", "utils/ or helpers/", [["utils/ or helpers/", "Correct."], ["screenshots/", "Artifacts only."], ["README only", "Documentation only."], ["Nowhere", "No."]], "Reusable helpers keep tests small and readable."),
        q("Config", "What should a config file store?", "baseUrl, timeout, environment", "Environment settings", [["Environment settings", "Correct."], ["Every test assertion", "No."], ["Personal secrets in plain text", "Bad practice."], ["Screenshots only", "No."]], "Config keeps environment values separate from test logic.")
      ],
      statuses: [
        q("Reports", "What makes a test report useful?", "After test run", "Pass/fail, error details, and artifacts", [["Pass/fail, error details, and artifacts", "Correct."], ["Only a blank page", "No."], ["Hidden failures", "No."], ["No timestamps", "Weak."]], "Reports should help you understand results quickly."),
        q("Data", "Why separate test data from test logic?", "Many payloads", "Easier updates and data-driven tests", [["Easier updates and data-driven tests", "Correct."], ["Makes code longer for no reason", "Not the point."], ["Deletes validation", "No."], ["Blocks CI", "No."]], "Data separation helps scale test coverage.")
      ],
      response: [
        q("Logging", "What should logs help answer?", "Failed test", "What happened before the failure", [["What happened before the failure", "Correct."], ["Nothing", "No."], ["Only the tester name", "Too little."], ["Hide errors", "No."]], "Good logs shorten debugging time."),
        q("Naming", "Which test name is clearer?", "Login tests", "test_login_fails_with_wrong_password", [["test1", "Too vague."], ["abc", "Meaningless."], ["test_login_fails_with_wrong_password", "Clear."], ["final_final_test", "No."]], "Clear names explain behavior before you open the test.")
      ],
      scenarios: [
        q("Refactor", "Two tests repeat the same setup. What should you do?", "Repeated setup", "Create a fixture or helper", [["Create a fixture or helper", "Correct."], ["Copy it five more times", "No."], ["Delete assertions", "No."], ["Rename the folder only", "No."]], "Framework quality improves when duplication is reduced."),
        q("Readme", "What should the framework README include?", "New user wants to run tests", "Setup, run commands, structure, and reports", [["Setup, run commands, structure, and reports", "Correct."], ["Only screenshots", "Not enough."], ["No commands", "Hard to use."], ["Private tokens", "Never."]], "A good README makes your project easy to evaluate.")
      ]
    }
  },
  {
    title: "Week 9: GitHub Actions",
    theme: "Run tests automatically on push and save artifacts.",
    daily: "Add a workflow file and upload the test report as an artifact.",
    questions: {
      methods: [
        q("Workflow", "Where does a GitHub Actions workflow file live?", "Repository", ".github/workflows/tests.yml", [[".github/workflows/tests.yml", "Correct."], ["Desktop only", "No."], ["screenshots/tests.yml", "No."], ["README title", "No."]], "GitHub Actions reads workflow YAML files from .github/workflows."),
        q("Trigger", "What does on: [push] mean?", "workflow.yml", "Run workflow when code is pushed", [["Run workflow when code is pushed", "Correct."], ["Delete branch", "No."], ["Disable tests", "No."], ["Open Postman UI", "No."]], "A push trigger runs CI after repository updates.")
      ],
      statuses: [
        q("Runner", "Which runner is common for basic test automation?", "runs-on: ?", "ubuntu-latest", [["ubuntu-latest", "Correct."], ["my phone", "No."], ["README.md", "No."], ["localhost only", "Not a runner."]], "ubuntu-latest is a common GitHub-hosted runner."),
        q("Artifacts", "Why upload test reports as artifacts?", "CI run", "So reports can be downloaded after the run", [["So reports can be downloaded after the run", "Correct."], ["To hide results", "No."], ["To stop tests", "No."], ["To remove logs", "No."]], "Artifacts preserve useful output from CI.")
      ],
      response: [
        q("Failure", "If CI fails but local passes, what should you check first?", "Different environments", "Dependencies, env vars, and paths", [["Dependencies, env vars, and paths", "Correct."], ["Ignore CI forever", "No."], ["Delete workflow", "No."], ["Change all asserts to pass", "No."]], "CI failures often reveal setup differences."),
        q("Badge", "Why add a CI badge to README?", "Project page", "Shows current test status quickly", [["Shows current test status quickly", "Correct."], ["Stores passwords", "No."], ["Runs tests locally", "No."], ["Replaces reports", "No."]], "Badges give quick visibility into build health.")
      ],
      scenarios: [
        q("Pipeline", "Best CI pipeline order for API tests?", "GitHub Actions", "Checkout code, install dependencies, run tests, upload report", [["Checkout code, install dependencies, run tests, upload report", "Correct."], ["Upload report before tests", "Wrong order."], ["Run nothing", "No."], ["Delete repository", "No."]], "A CI job should set up the project before executing tests."),
        q("Secrets", "Where should private tokens be stored in GitHub?", "CI credentials", "GitHub Actions secrets", [["GitHub Actions secrets", "Correct."], ["Plain README", "Unsafe."], ["Commit history", "Unsafe."], ["Screenshot", "Unsafe."]], "Secrets should not be committed to the repository.")
      ]
    }
  },
  {
    title: "Week 10: Resume Boss Level",
    theme: "Turn projects into resume bullets and interview stories.",
    daily: "Prepare a 5-minute explanation of your portfolio project.",
    questions: laneSet("Resume", "Built API and UI automation with reports and CI.", "Strong resume bullets show tools, action, and measurable quality value.")
  }
];

const state = {
  stage: 0,
  mode: "methods",
  indexByStageMode: {},
  xp: 0,
  streak: 0,
  completed: {},
  answered: false,
  autoNextTimer: null
};

let currentRole = sessionStorage.getItem("qaArcadeRole") || "visitor";
let currentUser = sessionStorage.getItem("qaArcadeUser") || "visitor";

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
  localStorage.setItem(progressKey(), JSON.stringify({
    stage: state.stage,
    mode: state.mode,
    indexByStageMode: state.indexByStageMode,
    xp: state.xp,
    streak: state.streak,
    completed: state.completed
  }));
}

function progressKey(user = currentUser) {
  return `qaArcadeProgress:${user}`;
}

function defaultProgress() {
  return {
    stage: 0,
    mode: "methods",
    indexByStageMode: {},
    xp: 0,
    streak: 0,
    completed: {}
  };
}

function loadProgress() {
  migrateLegacyProgress();
  const saved = readProgress(progressKey());
  const progress = saved || defaultProgress();
  state.stage = Number(progress.stage || 0);
  state.mode = progress.mode || "methods";
  state.indexByStageMode = progress.indexByStageMode || {};
  state.xp = Number(progress.xp || 0);
  state.streak = Number(progress.streak || 0);
  state.completed = progress.completed || {};
  normalizeVisitorState();
}

function readProgress(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function migrateLegacyProgress() {
  if (localStorage.getItem(progressKey("yvonne"))) return;
  if (!localStorage.getItem("qaArcadeStage") && !localStorage.getItem("qaArcadeCompleted")) return;

  localStorage.setItem(progressKey("yvonne"), JSON.stringify({
    stage: Number(localStorage.getItem("qaArcadeStage") || 0),
    mode: localStorage.getItem("qaArcadeMode") || "methods",
    indexByStageMode: readLegacyJson("qaArcadeIndex"),
    xp: Number(localStorage.getItem("qaArcadeXp") || 0),
    streak: Number(localStorage.getItem("qaArcadeStreak") || 0),
    completed: readLegacyJson("qaArcadeCompleted")
  }));
}

function readLegacyJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
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
    button.style.display = isVisitorHidden ? "none" : "";
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
    }, 10000);
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
    currentUser = sessionStorage.getItem("qaArcadeUser") || "visitor";
    loadProgress();
    applyRoleClass();
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
      sessionStorage.setItem("qaArcadeUser", account.storageUser);
      currentRole = account.role;
      currentUser = account.storageUser;
      loadProgress();
      applyRoleClass();
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
    sessionStorage.removeItem("qaArcadeUser");
    currentRole = "visitor";
    currentUser = "visitor";
    loadProgress();
    applyRoleClass();
    document.body.classList.add("auth-locked");
    els.passwordInput.value = "";
    els.usernameInput.focus();
  });
}

function unlockApp() {
  applyRoleClass();
  document.body.classList.remove("auth-locked");
}

function applyRoleClass() {
  document.body.classList.toggle("visitor-mode", currentRole === "visitor");
  document.body.classList.toggle("owner-mode", currentRole === "owner");
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
