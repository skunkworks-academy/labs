# LAB-SEC-101 - Phishing and Email Header Triage

A safety-first email-analysis lab that teaches learners to document authentication and routing evidence, decide a safe disposition, and report suspicious messages without opening links or attachments.

## What learners practise

- Separating a visible sender display name from the envelope and header evidence.
- Interpreting simplified SPF, DKIM and DMARC results.
- Identifying the appropriate report, contain and preserve workflow.
- Writing a concise triage note with evidence, confidence and next action.

## Delivery and safety

- Level: Beginner
- Duration: 55 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and printable personal completion record
- Runtime: Synthetic message and header data only; no links are active and no attachments are available.

The lab does not establish whether a real-world email is malicious. It teaches a defensible first-pass workflow and escalation boundary.

## Files

- index.html - learner-facing interactive workbook
- manifest.yaml - delivery, learning and safety metadata
- instructor-guide.md - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open http://localhost:8080/labs/phishing-triage-101/.
