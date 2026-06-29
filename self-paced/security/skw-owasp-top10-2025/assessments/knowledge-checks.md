# SKW-OWASP10-2025 Knowledge Checks

Use these questions for self-paced review. Answers are in `assessments/answer-key.md`.

## Module 0 — Orientation and ethics

1. What is the difference between authorized vulnerability testing and unauthorized attack activity?
2. Why should a learner avoid scanning third-party systems while practicing these labs?
3. What evidence should be captured for a practical security lab?
4. Why should secrets be redacted from screenshots and reports?

## Module 1 — Broken Access Control

1. Why is hiding an admin link in the UI not sufficient access control?
2. What is an insecure direct object reference?
3. Which side must enforce authorization: browser or server?
4. Name two tests for horizontal access control failure.

## Module 2 — Security Misconfiguration

1. Give three examples of security misconfiguration.
2. Why should development, QA, and production environments be hardened consistently?
3. What is the risk of exposing debug endpoints?
4. Why are secure response headers defense-in-depth rather than the entire control?

## Module 3 — Software Supply Chain Failures

1. Why does a lockfile improve repeatability?
2. What is an SBOM?
3. Why should CI/CD workflow permissions be minimized?
4. What is the risk of unreviewed package lifecycle scripts?

## Module 4 — Cryptographic Failures

1. Why is MD5 unsuitable for security-sensitive token generation?
2. What is the difference between encryption and hashing?
3. Where should application secrets be stored?
4. Why should teams avoid custom cryptographic algorithms?

## Module 5 — Injection

1. What is the common principle behind SQL, OS command, and template injection?
2. Why are parameterized queries preferred over string concatenation?
3. What is contextual output encoding?
4. Why is input validation alone not enough for XSS prevention?

## Module 6 — Insecure Design

1. How does insecure design differ from insecure implementation?
2. What is an abuse case?
3. Why should business rules be enforced server-side?
4. Name two controls that should be defined during design for high-risk transactions.

## Module 7 — Authentication Failures

1. Why is a base64-encoded JSON cookie not a secure session token by itself?
2. What is credential stuffing?
3. Why should sessions rotate after login?
4. What controls reduce brute-force risk?

## Module 8 — Software or Data Integrity Failures

1. What is mass assignment?
2. Why should client-submitted role fields be treated as untrusted?
3. What is unsafe deserialization?
4. How can applications verify the integrity of external scripts or updates?

## Module 9 — Security Logging and Alerting Failures

1. Which events should generally be security logged?
2. Why is logging passwords or tokens dangerous?
3. What is log injection?
4. Why must alerts have escalation paths?

## Module 10 — Mishandling of Exceptional Conditions

1. What does “fail closed” mean?
2. Why should stack traces not be returned to users?
3. What is the risk of swallowing exceptions silently?
4. Why should failure paths be tested?

## Final scenario assessment

A development team ships a customer portal with the following observations:

- Users can view invoices by changing `invoiceId` in the URL.
- The app exposes `/debug/config` without authentication.
- `package.json` has broad dependency ranges and no lockfile.
- Password reset tokens are deterministic.
- A search field is concatenated into a SQL query.
- The transfer workflow accepts negative values.
- The session cookie contains unsigned base64 JSON.
- The profile import API accepts `role`.
- Failed logins are not alerted.
- A payment service timeout defaults to “approved.”

Answer:

1. Map each observation to an OWASP Top 10:2025 category.
2. Pick the three highest business risks and justify your ranking.
3. Provide one remediation and one verification step for each observation.
4. Write a five-sentence executive summary for the application owner.
