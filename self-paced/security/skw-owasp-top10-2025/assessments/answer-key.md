# SKW-OWASP10-2025 Answer Key

Accept equivalent answers that show correct reasoning.

## Module 0

1. Authorized testing is performed within written scope and permission; unauthorized activity lacks consent and may be unlawful.
2. Third-party systems are outside scope and could be disrupted or accessed illegally.
3. Capture commands, URLs, screenshots, responses, impact, root cause, remediation, and verification.
4. Redaction prevents accidental disclosure and keeps the report safe to share.

## Module 1

1. UI hiding is client-side behavior; attackers can call server routes directly.
2. IDOR is access to another object by changing an identifier without proper authorization.
3. Server-side code or trusted serverless APIs must enforce authorization.
4. Examples: access another user’s profile by ID; call admin API as a standard user; attempt another tenant’s object ID.

## Module 2

1. Examples: debug mode, default credentials, missing headers, permissive CORS, exposed admin tools.
2. Inconsistent hardening creates environment-specific bypasses and production surprises.
3. Debug endpoints leak internals, secrets, stack traces, and operational details.
4. Headers reduce browser-side risk but do not replace secure application logic.

## Module 3

1. Lockfiles make dependency resolution reproducible.
2. An SBOM is a software bill of materials listing components and versions.
3. Minimization reduces impact if workflows are compromised.
4. Package scripts can execute arbitrary commands during install/build.

## Module 4

1. MD5 is fast, collision-prone, and unsuitable for modern security-sensitive use.
2. Encryption is reversible with a key; hashing is one-way.
3. Secrets should be stored in a secrets manager or protected runtime configuration, not source code.
4. Custom crypto usually lacks peer review and fails in edge cases.

## Module 5

1. Untrusted input is interpreted as executable syntax or commands.
2. Parameterized queries separate query structure from data.
3. Encoding output for the exact context, such as HTML body, attribute, JavaScript, URL, or CSS.
4. XSS also depends on output context; valid input can still be dangerous in the wrong rendering context.

## Module 6

1. Design flaws are missing controls in architecture/business logic; implementation flaws are mistakes in coding a control.
2. An abuse case describes how a feature can be misused.
3. Client-side controls can be bypassed.
4. Examples: transaction limits, step-up authentication, anti-automation, approval workflow, state-machine validation.

## Module 7

1. Base64 is encoding, not integrity protection or encryption.
2. Credential stuffing uses breached username/password pairs against other services.
3. Rotation prevents fixation and reduces token reuse risk.
4. Rate limits, lockout or risk-based throttling, MFA, bot detection, and alerting.

## Module 8

1. Mass assignment occurs when client-supplied fields are bound directly to internal objects.
2. Role is authorization state and must be controlled by trusted server policy.
3. Unsafe deserialization processes untrusted serialized data in a way that can alter state or execute code.
4. Use digital signatures, checksums, trusted repositories, SRI, and verified update channels.

## Module 9

1. Logins, failed logins, authorization denials, admin actions, sensitive data changes, errors, and high-value transactions.
2. Logs are widely accessed and retained; secrets in logs become secondary breach material.
3. Log injection inserts control characters or forged records into logs.
4. Alerts without ownership and escalation do not produce timely response.

## Module 10

1. Fail closed means deny or stop safely when the control cannot make a safe decision.
2. Stack traces disclose internals useful to attackers.
3. Silent exceptions hide security failures and undermine detection.
4. Untested failure paths often behave differently from the intended secure design.

## Final scenario mapping

| Observation | Category |
|---|---|
| Change `invoiceId` to view other invoices | A01 Broken Access Control |
| `/debug/config` exposed | A02 Security Misconfiguration |
| Broad dependency ranges and no lockfile | A03 Software Supply Chain Failures |
| Deterministic password reset tokens | A04 Cryptographic Failures |
| Search concatenated into SQL | A05 Injection |
| Transfer accepts negative values | A06 Insecure Design |
| Unsigned base64 JSON session cookie | A07 Authentication Failures |
| Profile import accepts `role` | A08 Software or Data Integrity Failures |
| Failed logins not alerted | A09 Security Logging and Alerting Failures |
| Timeout defaults to approved | A10 Mishandling of Exceptional Conditions |

High-risk ranking should consider business impact, exploitability, data sensitivity, and likelihood. Reasonable top-three choices include broken access control for invoice exposure, deterministic reset tokens for account takeover, and payment fail-open behavior for financial loss.
