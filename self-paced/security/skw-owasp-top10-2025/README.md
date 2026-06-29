# SKW-OWASP10-2025: Skunkworks OWASP Top 10 Web Application Security

**Brand:** Skunkworks Academy  
**Mode:** Self-paced with optional instructor support  
**Duration:** 16–20 hours  
**Level:** Foundation to intermediate  
**Audience:** Developers, DevOps engineers, QA engineers, security analysts, solution architects, and technical instructors  
**Lab target:** The included local intentionally vulnerable application in `vulnerable-app/`

> **Safety boundary:** Perform the lab tasks only against the included local lab application or systems where written authorization exists. Do not point the techniques, payloads, or scanners at public or third-party systems.

---

## Course positioning and originality

This is original Skunkworks Academy courseware. It uses the OWASP Top 10:2025 category taxonomy as a reference framework, but the explanations, lab scenarios, vulnerable application, assessments, and remediation tasks were authored for Skunkworks Academy delivery.

The official OWASP Top 10:2025 page describes the Top 10 as a standard awareness document for developers and web application security and lists the 2025 categories used in this course.[^1^] The OWASP project page identifies OWASP Top Ten 2025 as the current released version.[^2^] This course also references OWASP ASVS for verification alignment and OWASP WSTG for testing discipline.[^3^][^4^]

Skunkworks Academy is not affiliated with or endorsed by OWASP. OWASP names are used for nominative reference and attribution only.

---

## Learning outcomes

By the end of this course, learners can:

1. Explain each OWASP Top 10:2025 web application risk in business, attacker, and engineering terms.
2. Identify vulnerable patterns in code, configuration, authentication, APIs, logs, and error handling.
3. Use a controlled local lab to demonstrate impact safely.
4. Apply secure-by-design and secure-by-default remediation patterns.
5. Map findings to practical verification activities and engineering backlog items.
6. Produce a concise remediation report for application owners and technical teams.
7. Describe how OWASP Top 10 awareness connects to ASVS, WSTG, secure SDLC, dependency governance, and security champions.

---

## Repository structure

```text
self-paced/security/skw-owasp-top10-2025/
├── README.md
├── labs.md
├── references.md
├── LICENSE-NOTICE.md
├── assessments/
│   ├── knowledge-checks.md
│   └── answer-key.md
└── vulnerable-app/
    ├── package.json
    ├── server.js
    ├── Dockerfile
    └── docker-compose.yml
```

---

## Running the lab app

### Option A: Node.js

```bash
cd self-paced/security/skw-owasp-top10-2025/vulnerable-app
npm install
npm start
```

Open `http://localhost:3000`.

### Option B: Docker Compose

```bash
cd self-paced/security/skw-owasp-top10-2025/vulnerable-app
docker compose up --build
```

Open `http://localhost:3000`.

---

## Assessment model

| Assessment | Weight | Evidence |
|---|---:|---|
| Module knowledge checks | 20% | Completed answers with remediation notes |
| Practical labs | 50% | Screenshots, commands, observed impact, root cause, and fix notes |
| Final scenario assessment | 20% | Written risk analysis and control mapping |
| Capstone remediation report | 10% | Executive summary and technical remediation plan |

Recommended pass mark: **70% overall** and completion of at least **8 of 10 labs**.

---

## Module map

### Module 0 — Orientation, ethics, and safe lab operations

**Goal:** Establish the legal, ethical, and technical operating boundary.

Topics:

- Authorized testing and written scope.
- Evidence capture without exposing real secrets.
- Responsible disclosure.
- Local lab isolation.
- Difference between demonstrating risk and causing harm.

Activity: create a lab notebook with fields for target, scope, steps, evidence, impact, remediation, and verification.

---

### Module 1 — A01:2025 Broken Access Control

Broken access control occurs when the application does not reliably enforce what a user may do. In practice, this includes insecure direct object reference, missing server-side authorization, privilege escalation, forced browsing, overly permissive CORS, and trust in client-controlled metadata.

Engineering signals:

- Authorization checks exist only in the UI.
- Object IDs are predictable.
- APIs trust `userId`, `role`, or `tenantId` from request data.
- Admin routes rely on hidden links instead of server-side policy.
- Access is not denied by default.

Secure patterns:

- Centralize authorization policy.
- Authorize every request on the server side.
- Enforce object ownership and tenant boundaries.
- Use deny-by-default.
- Test horizontal and vertical privilege boundaries.

Lab: IDOR and profile access boundary testing.

---

### Module 2 — A02:2025 Security Misconfiguration

Security misconfiguration is weak or unsafe setup across application code, frameworks, cloud services, headers, build artifacts, debug tools, secrets, and platform components.

Engineering signals:

- Debug endpoints available.
- Stack traces exposed.
- Default credentials.
- Overly permissive CORS.
- Missing security headers.
- Unused services enabled.
- Environment drift between development, QA, and production.

Secure patterns:

- Automate hardened baseline configuration.
- Remove sample and debug functions.
- Disable unnecessary framework banners.
- Add security headers.
- Use safe error handling.
- Review infrastructure-as-code and application configuration.

Lab: debug endpoint and response header hardening.

---

### Module 3 — A03:2025 Software Supply Chain Failures

Software supply chain failures appear when third-party dependencies, build scripts, package sources, CI/CD workflows, plugins, or artifact repositories are not governed and verified.

Engineering signals:

- No lockfile.
- Unpinned dependency versions.
- Unreviewed package scripts.
- No SBOM.
- No dependency review in pull requests.
- CI/CD secrets available to untrusted workflows.
- Build artifacts are not signed or traceable.

Secure patterns:

- Maintain dependency inventory.
- Generate SBOMs.
- Use lockfiles and trusted package registries.
- Enable dependency and secret scanning.
- Review workflow permissions.
- Verify artifact provenance where feasible.

Lab: dependency and build pipeline review.

---

### Module 4 — A04:2025 Cryptographic Failures

Cryptographic failures involve missing encryption, weak algorithms, poor key management, predictable tokens, unsafe random generation, and leakage of sensitive data.

Engineering signals:

- Plaintext secrets.
- Reversible password storage.
- Weak hashes such as MD5 or SHA-1 for security-sensitive use.
- Static keys in source code.
- No TLS enforcement.
- Sensitive data in URLs or logs.
- No key rotation process.

Secure patterns:

- Use vetted cryptographic libraries.
- Hash passwords with Argon2id, bcrypt, or scrypt.
- Encrypt sensitive data in transit and at rest where required.
- Keep keys outside source code.
- Rotate keys and certificates.
- Avoid custom crypto.

Lab: weak deterministic token generation.

---

### Module 5 — A05:2025 Injection

Injection occurs when untrusted input is interpreted as a command, query, expression, template, or executable structure.

Engineering signals:

- String concatenation in queries.
- Direct shell command construction.
- Unescaped output in HTML contexts.
- Dynamic template rendering from user input.
- No parameterized query pattern.

Secure patterns:

- Use parameterized queries.
- Validate input by allow-list.
- Encode output for the specific rendering context.
- Avoid shell invocation when safe APIs exist.
- Add tests for hostile input.

Lab: simulated SQL injection and reflected XSS.

---

### Module 6 — A06:2025 Insecure Design

Insecure design is a missing or ineffective control at requirements, architecture, or business-logic level. Unlike a coding defect, it cannot be reliably fixed by patching one or two lines if the control was never designed.

Engineering signals:

- No threat model.
- Business rules enforced only in the UI.
- No abuse-case testing.
- Unsafe state transitions.
- No anti-automation controls on high-risk flows.
- Missing rate limits or transaction limits.
- No explicit trust boundary.

Secure patterns:

- Threat model early.
- Write abuse cases next to user stories.
- Define misuse-resistant business rules.
- Validate state transitions.
- Put security requirements in acceptance criteria.

Lab: negative transfer and missing transaction controls.

---

### Module 7 — A07:2025 Authentication Failures

Authentication failures occur when applications incorrectly identify users or fail to protect sessions and credentials.

Engineering signals:

- Weak password policy.
- No MFA for privileged access.
- No brute-force protection.
- Session tokens are unsigned, predictable, or not invalidated.
- Weak password reset.
- Credentials in source code.

Secure patterns:

- Use a trusted identity provider where practical.
- Store passwords with strong password hashing.
- Implement MFA for high-risk actions.
- Rate-limit authentication.
- Sign and validate session tokens.
- Rotate sessions after login.

Lab: unsigned session token tampering.

---

### Module 8 — A08:2025 Software or Data Integrity Failures

Software or data integrity failures happen when the application trusts code, updates, plugins, serialized data, or client-submitted objects without integrity verification.

Engineering signals:

- Mass assignment.
- Unsigned update packages.
- Trusting client-side role or approval fields.
- Unsafe deserialization.
- Scripts from untrusted CDNs.
- No review for data import jobs.

Secure patterns:

- Verify signatures and checksums.
- Allow-list importable fields.
- Avoid unsafe deserialization.
- Keep trusted server state authoritative.
- Use Subresource Integrity for external static assets where appropriate.

Lab: mass assignment and trusted field abuse.

---

### Module 9 — A09:2025 Security Logging and Alerting Failures

Logging and alerting failures reduce detection, response, forensics, and accountability.

Engineering signals:

- Failed logins are not logged.
- Logs store passwords or tokens.
- Logs can be forged with newline characters.
- No alert threshold.
- Logs remain only on the local host.
- No correlation identifiers.

Secure patterns:

- Log authentication, authorization, data changes, and security-relevant errors.
- Protect logs from tampering.
- Encode log output.
- Avoid sensitive data in logs.
- Define alert thresholds.
- Route logs to central monitoring.

Lab: log injection and missing alert conditions.

---

### Module 10 — A10:2025 Mishandling of Exceptional Conditions

Mishandled exceptional conditions occur when an application fails open, exposes sensitive error detail, ignores edge cases, or enters an unsafe state after unexpected input, missing dependencies, timeouts, privilege failures, or resource pressure.

Engineering signals:

- Raw stack traces in responses.
- Error handlers leak environment variables.
- Missing parameters cause inconsistent authorization.
- Failure defaults to allow.
- Timeout handling is absent.
- Exceptions are swallowed without logging.

Secure patterns:

- Fail closed.
- Return generic user-facing errors.
- Log diagnostic detail server-side only.
- Validate inputs close to the function boundary.
- Test failure paths deliberately.
- Apply timeouts, rollback, and safe defaults.

Lab: verbose errors and fail-open authorization.

---

## Capstone

Produce a remediation report for the included vulnerable app. Minimum sections:

1. Executive summary.
2. Top 10 mapping.
3. Evidence table.
4. Risk rating.
5. Remediation plan.
6. Verification steps.
7. Developer backlog items.
8. Residual risk statement.

---

## References

[^1^]: OWASP Top 10:2025 official release page — https://owasp.org/Top10/2025/  
[^2^]: OWASP Top Ten Web Application Security Risks project page — https://owasp.org/www-project-top-ten/  
[^3^]: OWASP Application Security Verification Standard — https://owasp.org/www-project-application-security-verification-standard/  
[^4^]: OWASP Web Security Testing Guide — https://owasp.org/www-project-web-security-testing-guide/  
[^5^]: OWASP Cheat Sheet Series — https://cheatsheetseries.owasp.org/  
[^6^]: OWASP SAMM — https://owasp.org/www-project-samm/  
[^7^]: NIST Secure Software Development Framework SP 800-218 — https://csrc.nist.gov/publications/detail/sp/800-218/final
