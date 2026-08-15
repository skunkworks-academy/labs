# LAB-SYS-102 - Linux Files, Permissions and Processes

A practical, browser-only Linux administration workbook that uses simulated terminal output to teach permissions, ownership, processes, services and logs without giving a web page control of a learner's host.

## What learners practise

- Reading rwx permission notation, owners and groups.
- Choosing a least-privilege permission change for a shared service account.
- Distinguishing a process from a service and using logs as operational evidence.
- Writing a concise, safe service-triage note.

## Delivery and safety

- Level: Beginner to Intermediate
- Duration: 60 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and printable personal completion record
- Runtime: Simulated terminal output only; no command is run on the learner device.

The completion record is a local learning record only. It is not a verified credential or production change record.

## Files

- index.html - learner-facing interactive workbook
- manifest.yaml - delivery, learning and safety metadata
- instructor-guide.md - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open http://localhost:8080/labs/linux-admin-102/.
