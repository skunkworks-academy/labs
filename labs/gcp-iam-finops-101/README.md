# LAB-GCP-101 - Google Cloud IAM and FinOps Guardrails

A 60-minute browser-only workbook that teaches the ownership and governance decisions which should exist before a Google Cloud project is used for a real workload.

## What learners practise

- Using the organisation, folder and project hierarchy to create governed workload boundaries.
- Applying named, scoped, least-privilege IAM rather than broad shared administration.
- Explaining why service-account keys need careful control and should not be copied into repositories or chat.
- Using labels, budgets, threshold alerts and an accountable response process for FinOps.

## Delivery and safety

- Level: Beginner to Intermediate
- Duration: 60 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and a printable personal completion record
- Network: No Google account, organisation, project, billing account, role or service-account key is used.

All project names, roles, labels and cost scenarios are fictional. The completion record is not an accredited certificate, Google Cloud credential or access entitlement.

## Files

- `index.html` - learner-facing interactive workbook
- `manifest.yaml` - delivery, learning and safety metadata
- `instructor-guide.md` - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open `http://localhost:8080/labs/gcp-iam-finops-101/`.
