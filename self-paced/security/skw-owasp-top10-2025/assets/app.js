(() => {
  'use strict';

  const COURSE_URL = 'https://skunkworksacademy.com/self-paced/security/skw-owasp-top10-2025/';
  const LAB_BASE = 'http://localhost:3000';
  const STORE = 'skw-owasp10-2025-progress-v1';

  const modules = [
    {
      id: 'M00', code: 'Orientation', title: 'Ethics, Scope, and Lab Operations', time: '45 min',
      summary: 'Set the safe operating model for application security learning, evidence capture, and authorized testing.',
      outcomes: ['Define written scope and authorization boundaries', 'Prepare a local-only lab environment', 'Capture evidence without exposing secrets'],
      learn: ['This course is designed for defensive education. Learners must test only the supplied local lab app or systems where they have written authorization.', 'A professional lab record must include target, scope, steps, observed result, impact, remediation, and verification.', 'Evidence should prove the issue without exposing passwords, tokens, private keys, or personal data.'],
      build: ['Create a local folder for screenshots and notes.', 'Record the course URL, local lab URL, browser version, and date.', 'Confirm the Node/Express lab app is reachable on localhost before starting practical exercises.'],
      question: { text: 'Which activity is acceptable during this course?', options: ['Testing any public website that looks vulnerable', 'Testing only the provided local lab app or explicitly authorized systems', 'Scanning a partner network to collect extra evidence'], answer: 1 }
    },
    {
      id: 'A01', code: 'A01:2025', title: 'Broken Access Control', time: '90 min',
      summary: 'Learn how missing authorization checks expose data and actions across users, roles, and tenants.',
      outcomes: ['Explain horizontal and vertical privilege escalation', 'Identify object ownership failures', 'Design server-side deny-by-default authorization'],
      learn: ['Broken access control appears when the server does not enforce what the authenticated user may access.', 'Common signals include predictable object IDs, hidden admin URLs, UI-only checks, and client-supplied user or tenant identifiers.', 'Controls must be centralized and evaluated for every request, not only when rendering navigation.'],
      build: ['Review profile access in the lab app.', 'Write an authorization rule for owner-only access.', 'Add a negative test that confirms Alice cannot read Bob’s profile.'],
      question: { text: 'Why is hiding an admin link not enough?', options: ['It improves user experience only', 'The browser can still call the route directly', 'It makes CSS harder to maintain'], answer: 1 }
    },
    {
      id: 'A02', code: 'A02:2025', title: 'Security Misconfiguration', time: '75 min',
      summary: 'Harden exposed debug functions, unsafe defaults, headers, framework leakage, and environment drift.',
      outcomes: ['Recognize debug and diagnostic exposure', 'Apply secure response-header baselines', 'Separate development and production configuration'],
      learn: ['Misconfiguration is usually a deployment and operations failure rather than a single coding mistake.', 'Debug endpoints, default credentials, verbose errors, and unneeded services increase attacker visibility.', 'Automated configuration checks reduce environment drift across dev, QA, and production.'],
      build: ['Inspect the lab app debug endpoint.', 'List missing hardening controls.', 'Draft a secure baseline checklist for future course apps.'],
      question: { text: 'Which item is a security misconfiguration?', options: ['A protected route returning 403', 'A public debug endpoint showing runtime headers', 'A unit test that checks authorization'], answer: 1 }
    },
    {
      id: 'A03', code: 'A03:2025', title: 'Software Supply Chain Failures', time: '75 min',
      summary: 'Control third-party dependency, build, artifact, and CI/CD risks.',
      outcomes: ['Explain SBOM and lockfile value', 'Review package scripts and dependency ranges', 'Define dependency governance for pull requests'],
      learn: ['Modern applications depend on packages, build scripts, containers, workflows, and artifact repositories.', 'A repeatable build starts with a lockfile, minimal workflow permissions, and dependency review.', 'SBOMs help teams identify affected components during vulnerability response.'],
      build: ['Inspect package.json.', 'Run a dependency review locally.', 'Create a one-page dependency update policy.'],
      question: { text: 'What does a lockfile primarily improve?', options: ['Visual design', 'Repeatable dependency resolution', 'User authentication'], answer: 1 }
    },
    {
      id: 'A04', code: 'A04:2025', title: 'Cryptographic Failures', time: '75 min',
      summary: 'Avoid weak algorithms, predictable tokens, unsafe storage, and poor key management.',
      outcomes: ['Differentiate hashing, encryption, and signing', 'Identify weak deterministic token generation', 'Define safe secret and key handling'],
      learn: ['Cryptographic failure often comes from misusing good libraries or selecting obsolete algorithms.', 'Security tokens must be unpredictable and protected from tampering.', 'Secrets belong in a secrets manager or protected runtime configuration, not source code.'],
      build: ['Inspect token generation.', 'Replace deterministic token behavior in a local experiment.', 'Define a key rotation checklist.'],
      question: { text: 'Why is deterministic token generation risky?', options: ['It makes tokens easier to predict', 'It makes CSS render slowly', 'It requires HTTPS'], answer: 0 }
    },
    {
      id: 'A05', code: 'A05:2025', title: 'Injection', time: '90 min',
      summary: 'Prevent untrusted input from becoming executable query, command, template, or browser-rendered content.',
      outcomes: ['Explain interpreter confusion', 'Apply parameterized query patterns', 'Use contextual output encoding'],
      learn: ['Injection occurs when data is interpreted as syntax by a downstream component.', 'Parameterized queries separate query structure from data.', 'Browser output must be encoded for the target context or rendered as text.'],
      build: ['Inspect the simulated orders query.', 'Review the safe comment rendering route.', 'Write a remediation note that separates validation from output encoding.'],
      question: { text: 'What is the strongest query remediation pattern?', options: ['String concatenation with comments', 'Parameterized queries', 'Longer variable names'], answer: 1 }
    },
    {
      id: 'A06', code: 'A06:2025', title: 'Insecure Design', time: '75 min',
      summary: 'Move security into requirements, abuse cases, business rules, and architecture decisions.',
      outcomes: ['Separate design flaws from implementation defects', 'Write abuse cases', 'Define server-side business controls'],
      learn: ['Insecure design is a missing or ineffective control at the requirements or architecture level.', 'Abuse cases describe how valid features can be misused.', 'High-risk workflows need transaction limits, state validation, and step-up controls.'],
      build: ['Review the transfer workflow.', 'Create positive and negative business rules.', 'Define acceptance criteria for secure transactions.'],
      question: { text: 'What is an abuse case?', options: ['A positive user story only', 'A description of how a feature can be misused', 'A CSS test case'], answer: 1 }
    },
    {
      id: 'A07', code: 'A07:2025', title: 'Authentication Failures', time: '90 min',
      summary: 'Protect identities, sessions, password reset flows, and authentication telemetry.',
      outcomes: ['Identify unsafe client-controlled sessions', 'Explain brute-force and credential stuffing controls', 'Define session validation requirements'],
      learn: ['Encoding is not encryption or integrity protection.', 'Session tokens must be signed, validated, and rotated during key authentication events.', 'MFA, throttling, and alerting reduce the impact of credential attacks.'],
      build: ['Inspect the session cookie behavior.', 'Document safe session requirements.', 'Write an authentication hardening checklist.'],
      question: { text: 'What does Base64 provide?', options: ['Integrity protection', 'Encoding only', 'Strong authentication'], answer: 1 }
    },
    {
      id: 'A08', code: 'A08:2025', title: 'Software or Data Integrity Failures', time: '75 min',
      summary: 'Protect trusted state, updates, serialized data, profile imports, and external scripts.',
      outcomes: ['Explain mass assignment', 'Allow-list updateable fields', 'Verify trusted software and data channels'],
      learn: ['Integrity failures happen when the application trusts code or data without verification.', 'Mass assignment occurs when client-submitted fields bind directly to internal objects.', 'Server-controlled fields such as role, balance, and approval state should not be accepted from profile updates.'],
      build: ['Review profile import behavior.', 'Define an allow-list mapping.', 'Design a server-side rejection log for protected fields.'],
      question: { text: 'Which field should not be client-updateable in a profile import?', options: ['Display name', 'Preferred language', 'Role'], answer: 2 }
    },
    {
      id: 'A09', code: 'A09:2025', title: 'Security Logging and Alerting Failures', time: '75 min',
      summary: 'Build logs that support detection, investigation, and response without leaking secrets.',
      outcomes: ['Identify security-relevant events', 'Prevent log forging and sensitive data leakage', 'Define actionable alert thresholds'],
      learn: ['Logs are evidence. They must be structured, protected, and useful during incident response.', 'User-controlled text should be normalized before logging to prevent record manipulation.', 'Alerts need owners, thresholds, and escalation paths.'],
      build: ['Test the log route with normal event input.', 'Review structured JSON logging.', 'Define three alert rules for authentication failures.'],
      question: { text: 'Why should log fields be normalized?', options: ['To make them more decorative', 'To reduce forged records and parsing issues', 'To disable all alerts'], answer: 1 }
    },
    {
      id: 'A10', code: 'A10:2025', title: 'Mishandling of Exceptional Conditions', time: '75 min',
      summary: 'Fail closed, return safe errors, log diagnostics server-side, and test failure paths.',
      outcomes: ['Explain fail-closed behavior', 'Avoid user-facing stack traces', 'Design tests for timeout and dependency failures'],
      learn: ['Unexpected conditions are security-relevant because control decisions often happen during failure.', 'Authorization and payment workflows should default to safe denial when a dependency is unavailable.', 'Diagnostics belong in protected logs, not user responses.'],
      build: ['Inspect calculate and authorize endpoints.', 'Write safe error response requirements.', 'Create negative tests for timeout and invalid input paths.'],
      question: { text: 'What should an authorization dependency failure normally do?', options: ['Fail open and allow access', 'Fail closed and deny or require retry', 'Return a stack trace to the user'], answer: 1 }
    }
  ];

  const labs = [
    ['L01','A01 Broken Access Control','Validate owner-only access with profile records.','/profile/1','Login as Alice, view her profile, then attempt another user profile.','Access to another user profile must be denied after remediation.'],
    ['L02','A02 Security Misconfiguration','Review debug exposure and header posture.','/admin/debug','Open the debug endpoint and inspect the response.','Debug data should require admin authorization and hardened headers.'],
    ['L03','A03 Supply Chain Review','Assess dependency and build governance.','./vulnerable-app/package.json','Inspect package metadata, dependency ranges, and scripts.','Lockfile, review process, and SBOM plan are documented.'],
    ['L04','A04 Token Review','Evaluate weak deterministic token behavior.','/token-demo?user=alice','Open the token endpoint several times and compare results.','Tokens should be unpredictable and safely stored or signed.'],
    ['L05','A05 Injection Review','Review query simulation and browser-safe output handling.','/orders?customer=alice','Compare normal query behavior with abnormal input and review comment rendering.','Parameterized queries and safe text rendering are documented.'],
    ['L06','A06 Business Logic','Test transaction rule failures.','/transfer','Submit boundary cases to the transfer endpoint with an API client.','Negative, excessive, and unauthorized transfers are rejected.'],
    ['L07','A07 Session Integrity','Inspect client-controlled session risks.','/','Review the session cookie after login.','Sessions should be signed, server-side, or otherwise integrity protected.'],
    ['L08','A08 Data Integrity','Review mass assignment in profile import.','/import-profile','Submit normal and protected fields to the import route.','Only allow-listed user-editable fields are accepted.'],
    ['L09','A09 Logging','Validate structured logging and alert design.','/log?event=login_failed','Send a normal log event and inspect the server console output.','User input is normalized and alerts are designed for repeated failures.'],
    ['L10','A10 Exception Handling','Verify safe failure paths.','/calculate?items=abc','Send invalid input and review the user response and server log.','User receives a safe error and diagnostics stay server-side.']
  ].map(([id,title,summary,route,task,done]) => ({ id,title,summary,route,task,done }));

  const finalQuestions = [
    ['Changing invoiceId to view another user invoice maps to:', ['A01 Broken Access Control','A03 Supply Chain','A09 Logging'], 0],
    ['A public debug route maps mainly to:', ['A02 Security Misconfiguration','A04 Crypto','A08 Integrity'], 0],
    ['No lockfile and broad dependencies map to:', ['A03 Supply Chain Failures','A05 Injection','A10 Exceptions'], 0],
    ['A deterministic reset token maps mainly to:', ['A04 Cryptographic Failures','A06 Design','A09 Logging'], 0],
    ['String-built database queries map to:', ['A05 Injection','A02 Misconfiguration','A08 Integrity'], 0],
    ['Negative transfer accepted by business workflow maps to:', ['A06 Insecure Design','A07 Authentication','A04 Crypto'], 0],
    ['Unsigned client-controlled session claims map to:', ['A07 Authentication Failures','A03 Supply Chain','A10 Exceptions'], 0],
    ['Profile import accepts role updates. This maps to:', ['A08 Software or Data Integrity Failures','A02 Misconfiguration','A04 Crypto'], 0],
    ['No alerting on repeated failed logins maps to:', ['A09 Logging and Alerting Failures','A01 Access Control','A05 Injection'], 0],
    ['Authorization timeout defaults to allow. This maps to:', ['A10 Mishandling of Exceptional Conditions','A03 Supply Chain','A07 Authentication'], 0]
  ];

  const refs = [
    ['OWASP Top 10:2025','https://owasp.org/Top10/2025/'],
    ['OWASP Top Ten project','https://owasp.org/www-project-top-ten/'],
    ['OWASP ASVS','https://owasp.org/www-project-application-security-verification-standard/'],
    ['OWASP WSTG','https://owasp.org/www-project-web-security-testing-guide/'],
    ['OWASP Cheat Sheet Series','https://cheatsheetseries.owasp.org/'],
    ['OWASP SAMM','https://owasp.org/www-project-samm/'],
    ['NIST SSDF SP 800-218','https://csrc.nist.gov/publications/detail/sp/800-218/final']
  ];

  const state = loadState();
  let activeTab = 'modules';
  let activeModule = state.activeModule || 'M00';
  let activeLab = state.activeLab || 'L01';

  function loadState(){ try { return JSON.parse(localStorage.getItem(STORE)) || { modules:{}, labs:{}, notes:{}, answers:{} }; } catch { return { modules:{}, labs:{}, notes:{}, answers:{} }; } }
  function save(){ state.activeModule = activeModule; state.activeLab = activeLab; localStorage.setItem(STORE, JSON.stringify(state)); renderProgress(); }
  function $(id){ return document.getElementById(id); }
  function escapeHtml(value){ return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }
  function localUrl(route){ return route.startsWith('./') ? route : `${LAB_BASE}${route}`; }

  function renderProgress(){
    const moduleDone = Object.values(state.modules || {}).filter(Boolean).length;
    const labDone = Object.values(state.labs || {}).filter(Boolean).length;
    const total = modules.length + labs.length;
    const done = moduleDone + labDone;
    const pct = Math.round((done / total) * 100);
    $('progressBar').style.width = `${pct}%`;
    $('metricModules').textContent = `${moduleDone}/${modules.length}`;
    $('metricLabs').textContent = `${labDone}/${labs.length}`;
    $('metricScore').textContent = `${pct}%`;
  }

  function renderNav(){
    $('moduleNav').innerHTML = modules.map(m => `<button class="nav-btn" data-module="${m.id}" aria-current="${m.id===activeModule}"><strong>${m.code}</strong> ${escapeHtml(m.title)}<small>${m.time} · ${state.modules[m.id] ? 'Complete' : 'Not complete'}</small></button>`).join('');
    document.querySelectorAll('[data-module]').forEach(btn => btn.addEventListener('click', () => { activeModule = btn.dataset.module; activeTab='modules'; render(); }));
  }

  function renderTabs(){
    document.querySelectorAll('[data-tab]').forEach(tab => {
      tab.setAttribute('aria-selected', String(tab.dataset.tab === activeTab));
      tab.onclick = () => { activeTab = tab.dataset.tab; render(); };
    });
  }

  function renderModule(){
    const m = modules.find(x => x.id === activeModule) || modules[0];
    $('mainView').innerHTML = `<article class="module-view"><div class="eyebrow">${m.code}</div><h2>${escapeHtml(m.title)}</h2><p class="lead">${escapeHtml(m.summary)}</p><div class="pill-row"><span class="pill">${m.time}</span><span class="pill">Self-paced</span><span class="pill">Knowledge check</span></div><div class="section-grid"><section class="mini-card"><h3>Learning outcomes</h3><ul>${m.outcomes.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="mini-card"><h3>Core concepts</h3><ul>${m.learn.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="mini-card"><h3>Practical build tasks</h3><ul>${m.build.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="mini-card"><h3>Knowledge check</h3><div id="moduleQuestion"></div></section></div><div class="actions"><button class="btn primary" id="completeModule">${state.modules[m.id] ? 'Completed' : 'Mark module complete'}</button><button class="btn" id="nextModule">Next module</button></div></article>`;
    renderSingleQuestion('moduleQuestion', m.id, m.question);
    $('completeModule').onclick = () => { state.modules[m.id] = true; save(); render(); };
    $('nextModule').onclick = () => { const i = modules.findIndex(x=>x.id===m.id); activeModule = modules[(i+1)%modules.length].id; save(); render(); };
  }

  function renderSingleQuestion(targetId, key, q){
    $(targetId).innerHTML = `<div class="question"><fieldset><legend>${escapeHtml(q.text)}</legend>${q.options.map((o,i)=>`<label><input type="radio" name="q-${key}" value="${i}"> ${escapeHtml(o)}</label>`).join('')}</fieldset><p class="feedback" id="fb-${key}"></p></div>`;
    document.querySelectorAll(`input[name="q-${key}"]`).forEach(input => input.addEventListener('change', () => {
      const ok = Number(input.value) === q.answer;
      state.answers[key] = ok; save();
      const fb = $(`fb-${key}`); fb.textContent = ok ? 'Correct. Continue.' : 'Review the module concept and try again.'; fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
    }));
  }

  function renderLabs(){
    $('mainView').innerHTML = `<section class="lab-view"><div class="eyebrow">Hands-on labs</div><h2>Practical lab workspace</h2><p class="lead">Each lab contains an objective, local route, checklist, evidence notes, and completion tracking. Run the Node/Express lab app locally before launching endpoint links.</p><div class="actions"><a class="btn primary" href="${LAB_BASE}" target="_blank" rel="noopener">Open local lab app</a><a class="btn" href="./vulnerable-app/" target="_blank" rel="noopener">View lab app source</a></div><div class="lab-grid">${labs.map(l=>`<article class="lab-card"><h3>${l.id} · ${escapeHtml(l.title)}</h3><p>${escapeHtml(l.summary)}</p><div class="actions"><button class="btn small" data-lab="${l.id}">Open lab</button><a class="btn small" href="${localUrl(l.route)}" target="_blank" rel="noopener">Launch route</a><button class="btn small ${state.labs[l.id] ? 'done' : ''}" data-done-lab="${l.id}">${state.labs[l.id] ? 'Done' : 'Mark done'}</button></div></article>`).join('')}</div><div id="labDetail"></div></section>`;
    document.querySelectorAll('[data-lab]').forEach(b => b.onclick = () => { activeLab = b.dataset.lab; save(); renderLabDetail(); });
    document.querySelectorAll('[data-done-lab]').forEach(b => b.onclick = () => { state.labs[b.dataset.doneLab] = true; save(); renderLabs(); });
    renderLabDetail();
  }

  function renderLabDetail(){
    const l = labs.find(x=>x.id===activeLab) || labs[0];
    const notes = state.notes[l.id] || '';
    $('labDetail').innerHTML = `<article class="mini-card" style="margin-top:18px"><div class="eyebrow">${l.id}</div><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.task)}</p><div class="codebox"><code>Target: ${escapeHtml(localUrl(l.route))}\nEvidence required: URL or command, observed result, impact, root cause, remediation, verification.</code></div><div class="checklist"><label class="check"><input type="checkbox" data-step="1"> I opened the local lab app and confirmed the scope.</label><label class="check"><input type="checkbox" data-step="2"> I executed the lab task and captured evidence.</label><label class="check"><input type="checkbox" data-step="3"> I wrote the remediation and verification step.</label></div><p><strong>Completion target:</strong> ${escapeHtml(l.done)}</p><label>Evidence notes<textarea id="labNotes">${escapeHtml(notes)}</textarea></label><div class="actions"><a class="btn primary" href="${localUrl(l.route)}" target="_blank" rel="noopener">Launch endpoint</a><button class="btn" id="saveLabNotes">Save evidence notes</button><button class="btn done" id="finishLab">Mark lab complete</button></div></article>`;
    $('saveLabNotes').onclick = () => { state.notes[l.id] = $('labNotes').value; save(); };
    $('finishLab').onclick = () => { state.notes[l.id] = $('labNotes').value; state.labs[l.id] = true; save(); renderLabs(); };
  }

  function renderAssessment(){
    $('mainView').innerHTML = `<section class="assessment-view"><div class="eyebrow">Final assessment</div><h2>Scenario-based knowledge check</h2><p class="lead">Answer all questions, then generate a self-attestation record for internal learning evidence.</p><div id="finalQuestions"></div><div class="actions"><button class="btn primary" id="gradeFinal">Grade final check</button><button class="btn" id="downloadRecord">Download completion record</button></div><p class="feedback" id="finalScore"></p><section class="mini-card"><h3>Capstone remediation report</h3><p class="note">Complete the table below in your own report. Use one finding per OWASP category.</p><textarea id="capstoneNotes" placeholder="Executive summary, evidence table, risk rating, remediation plan, verification steps..."></textarea><button class="btn" id="saveCapstone">Save capstone notes</button></section></section>`;
    $('finalQuestions').innerHTML = finalQuestions.map((q,idx)=>`<div class="question"><fieldset><legend>${idx+1}. ${escapeHtml(q[0])}</legend>${q[1].map((o,i)=>`<label><input type="radio" name="final-${idx}" value="${i}"> ${escapeHtml(o)}</label>`).join('')}</fieldset></div>`).join('');
    $('capstoneNotes').value = state.notes.capstone || '';
    $('saveCapstone').onclick = () => { state.notes.capstone = $('capstoneNotes').value; save(); };
    $('gradeFinal').onclick = () => {
      let score = 0; finalQuestions.forEach((q,idx)=>{ const picked = document.querySelector(`input[name="final-${idx}"]:checked`); if (picked && Number(picked.value) === q[2]) score++; });
      const pct = Math.round(score/finalQuestions.length*100); $('finalScore').textContent = `Score: ${score}/${finalQuestions.length} (${pct}%). ${pct >= 70 ? 'Pass threshold met.' : 'Review modules and retry.'}`; $('finalScore').className = `feedback ${pct>=70?'ok':'bad'}`; state.answers.finalScore = pct; save();
    };
    $('downloadRecord').onclick = downloadRecord;
  }

  function renderResources(){
    $('mainView').innerHTML = `<section class="assessment-view"><div class="eyebrow">Resources</div><h2>References, policies, and publishing notes</h2><div class="section-grid"><section class="mini-card"><h3>Primary references</h3><ul>${refs.map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener">${escapeHtml(r[0])}</a></li>`).join('')}</ul></section><section class="mini-card"><h3>Publishing target</h3><p>The canonical course URL is:</p><div class="codebox"><code>${COURSE_URL}</code></div><p class="note">The hosting layer must map this folder to the root Academy domain for the URL to resolve there.</p></section><section class="mini-card"><h3>Legal note</h3><p>OWASP names are used for reference and attribution. This is original Skunkworks Academy courseware and is not OWASP-endorsed.</p></section><section class="mini-card"><h3>Local lab command</h3><div class="codebox"><code>cd vulnerable-app\nnpm install\nnpm start</code></div></section></div></section>`;
  }

  function downloadRecord(){
    const moduleDone = Object.values(state.modules || {}).filter(Boolean).length;
    const labDone = Object.values(state.labs || {}).filter(Boolean).length;
    const body = [`Skunkworks Academy - OWASP Top 10:2025 Completion Record`,`URL: ${COURSE_URL}`,`Date: ${new Date().toISOString()}`,`Modules completed: ${moduleDone}/${modules.length}`,`Labs completed: ${labDone}/${labs.length}`,`Final score: ${state.answers.finalScore ?? 'not graded'}%`,`Capstone notes:`, state.notes.capstone || 'Not provided'].join('\n');
    const blob = new Blob([body], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'skw-owasp10-2025-completion-record.txt'; a.click(); URL.revokeObjectURL(a.href);
  }

  function render(){
    renderTabs(); renderNav(); renderProgress();
    if(activeTab === 'modules') renderModule();
    if(activeTab === 'labs') renderLabs();
    if(activeTab === 'assessment') renderAssessment();
    if(activeTab === 'resources') renderResources();
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('year').textContent = new Date().getFullYear();
    $('startCourse').onclick = () => { activeTab='modules'; activeModule='M00'; render(); document.getElementById('courseWorkspace').scrollIntoView({behavior:'smooth'}); };
    $('continueCourse').onclick = () => { const next = modules.find(m=>!state.modules[m.id]) || modules[0]; activeModule = next.id; activeTab='modules'; render(); document.getElementById('courseWorkspace').scrollIntoView({behavior:'smooth'}); };
    $('downloadOutline').onclick = () => { const blob = new Blob([modules.map(m=>`${m.code} - ${m.title}: ${m.summary}`).join('\n')],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='skw-owasp10-2025-outline.txt'; a.click(); URL.revokeObjectURL(a.href); };
    document.querySelectorAll('[data-tab]').forEach(t=>t.addEventListener('click',()=>{activeTab=t.dataset.tab; render();}));
    render();
  });
})();
