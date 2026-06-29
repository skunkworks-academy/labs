# SKW-OWASP10-2025 Practical Lab Guide

These labs use the included intentionally vulnerable application in `vulnerable-app/`. The application is deliberately unsafe and must not be deployed publicly.

## Setup

```bash
cd self-paced/security/skw-owasp-top10-2025/vulnerable-app
npm install
npm start
```

Or use Docker:

```bash
cd self-paced/security/skw-owasp-top10-2025/vulnerable-app
docker compose up --build
```

Open `http://localhost:3000`.

For every lab, capture the URL or command used, observed result, security impact, root cause, remediation, and verification result.

---

## Lab 1 — A01 Broken Access Control: IDOR

**Objective:** Demonstrate horizontal privilege escalation through an insecure direct object reference.

1. Open the lab app.
2. Log in as `alice@example.test` with password `Password1!`.
3. Open Alice’s profile.
4. Change the profile URL from `/profile/1` to `/profile/2`.
5. Record whether Alice can see Bob’s profile.

**Expected vulnerable result:** Alice can retrieve another user’s profile by changing the object ID.

**Fix:** Modify `/profile/:id` so users can access only their own record unless the server-side session indicates an administrator role.

**Verify:** Alice should receive `403 Forbidden` for Bob’s profile.

---

## Lab 2 — A02 Security Misconfiguration: Debug and headers

**Objective:** Identify unsafe debug exposure and missing baseline hardening.

1. Visit `/admin/debug`.
2. Check whether authentication is required.
3. Use browser developer tools or `curl -I http://localhost:3000` to inspect headers.
4. Record framework leakage, missing headers, and overly detailed diagnostics.

**Expected vulnerable result:** Debug information and application internals are exposed without authorization.

**Fix:** Protect `/admin/debug`, disable unnecessary framework banners, and add a minimal security header set or vetted middleware.

**Verify:** Unauthenticated requests to `/admin/debug` should return `401` or `403`.

---

## Lab 3 — A03 Software Supply Chain Failures: Dependency governance

**Objective:** Review dependency and package governance.

1. Inspect `package.json`.
2. Identify dependency version ranges.
3. Check whether a lockfile exists.
4. Run `npm audit --omit=dev` in the lab folder.
5. Review package scripts and lifecycle risk.

**Expected vulnerable result:** The project demonstrates weak governance patterns such as broad version ranges and no documented supply-chain review process.

**Fix:** Generate and commit a lockfile, document dependency update cadence, add dependency review to pull requests, restrict CI token permissions, and generate an SBOM in controlled environments.

**Verify:** The project has repeatable installs and documented dependency review criteria.

---

## Lab 4 — A04 Cryptographic Failures: Weak token generation

**Objective:** Show why deterministic weak hashes are unsuitable for security tokens.

1. Open `/token-demo?user=alice`.
2. Refresh several times.
3. Open `/token-demo?user=bob`.
4. Compare token format and repeatability.
5. Inspect `server.js` for the token function.

**Expected vulnerable result:** The token is deterministic and generated using an unsuitable hash construction.

**Fix:** Use cryptographically secure random values for session secrets and reset tokens, store token state safely, and validate signed token formats correctly where tokens are used.

**Verify:** Repeated token generation for the same user should produce different values, and tokens should not embed predictable secrets.

---

## Lab 5 — A05 Injection: Query and browser rendering confusion

**Objective:** Demonstrate how untrusted input can be interpreted by a downstream component.

1. Open `/orders?customer=alice`.
2. Use the built-in simulated injection link on the lab home page and compare the returned records.
3. Open `/comment?message=Hello`.
4. Use a harmless browser-rendering test value in the `message` parameter and observe whether the app reflects raw input into HTML.

**Expected vulnerable result:** The orders endpoint simulates dynamic query confusion, and the comment endpoint reflects untrusted input into HTML.

**Fix:** Use parameterized queries, allow-list validation, contextual output encoding, and defense-in-depth response headers.

**Verify:** Query semantics must not change because of user input, and browser-rendered output must treat learner input as inert text.

---

## Lab 6 — A06 Insecure Design: Business logic abuse

**Objective:** Identify a missing business control that cannot be solved by input validation alone.

1. Log in as Alice.
2. Submit a transfer request with a negative amount to `/transfer` using JSON.
3. Submit a transfer request above the intended business limit.
4. Record whether the app accepts both transactions.

**Expected vulnerable result:** The app accepts unsafe transaction values because the business rule was not designed and enforced.

**Fix:** Define and enforce transaction rules: positive amount, transaction limit, source-account ownership, step-up authentication for high risk, and auditable transaction state.

**Verify:** Negative and excessive transfers should be rejected with clear, safe errors.

---

## Lab 7 — A07 Authentication Failures: Unsigned session tampering

**Objective:** Demonstrate why client-controlled session state must be signed and validated.

1. Log in as Alice.
2. Inspect the `skw_session` cookie.
3. Decode the base64 value.
4. Modify the role claim locally, encode the JSON again, and replace the cookie.
5. Visit `/admin/debug`.

**Expected vulnerable result:** The app trusts a client-editable session token.

**Fix:** Use a server-side session store or a correctly signed token library. Validate signature, issuer, audience, expiry, and claims.

**Verify:** Modified session tokens should be rejected and force re-authentication.

---

## Lab 8 — A08 Software or Data Integrity Failures: Mass assignment

**Objective:** Show how trusting client-submitted object fields can alter protected state.

1. Submit a JSON body to `/import-profile` for user `1` that includes normal profile data and protected fields such as `role` or `verified`.
2. Open `/profile/1`.
3. Record whether protected fields changed.

**Expected vulnerable result:** The import endpoint accepts fields that should be server-controlled.

**Fix:** Allow-list fields that may be updated and reject protected fields such as role, verification status, balance, or approval flags.

**Verify:** Attempts to set protected fields should fail and generate a security log event.

---

## Lab 9 — A09 Security Logging and Alerting Failures: Log integrity

**Objective:** Demonstrate how unsafe log construction weakens incident evidence.

1. Open `/log?event=login_failed`.
2. Send a log event containing encoded line-break characters.
3. Inspect the console output where the app is running.
4. Try repeated failed logins and check whether an alert occurs.

**Expected vulnerable result:** User-controlled line breaks can forge log records, and repeated failed login behavior has no alert path.

**Fix:** Use structured JSON logs, encode log fields, add event IDs and correlation IDs, avoid secrets in logs, and define alert thresholds.

**Verify:** Injected line breaks should be encoded, and repeated failed logins should trigger a security alert event.

---

## Lab 10 — A10 Mishandling of Exceptional Conditions: Verbose error and fail-open

**Objective:** Identify unsafe exception behavior.

1. Open `/calculate?items=abc`.
2. Observe error detail.
3. Open `/authorize?mode=fail-open`.
4. Record whether access is granted during an authorization failure.

**Expected vulnerable result:** The application exposes internal error detail and may fail open.

**Fix:** Return generic errors to users, log diagnostics server-side only, default authorization errors to deny, and test failure paths.

**Verify:** Invalid input should return a safe `400`, and authorization failure should return `403`.

---

## Capstone lab — Security remediation report

Create a concise report with this table:

| Finding | OWASP category | Evidence | Impact | Risk | Remediation | Verification |
|---|---|---|---|---|---|---|

Minimum findings: 10, one per category. Include an executive summary, quick wins, engineering backlog, and residual risk statement.
