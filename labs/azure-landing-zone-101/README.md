# LAB-AZ-101 - Azure Landing Zone Essentials

A 60-minute, browser-only workbook on the Azure landing-zone controls that make multi-subscription cloud work governable and repeatable.

## What learners practise

- Relating management groups, subscriptions, resource groups and resources to their governance purposes.
- Distinguishing Azure RBAC (authorised actions) from Azure Policy (resource standards).
- Designing a workload onboarding path with ownership, logging, recovery and cost controls.
- Explaining why browser simulations never replace authorised tenant change control.

## Delivery and safety

- Level: Beginner to Intermediate
- Duration: 60 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and a printable personal completion record
- Network: No Microsoft Entra or Azure sign-in, tenant enumeration, subscription creation or policy/RBAC mutation occurs.

All organisation names, subscription structures and policies are fictional training material. The completion record is not an accredited certificate, Microsoft credential or deployment approval.

## Files

- `index.html` - learner-facing interactive workbook
- `manifest.yaml` - delivery, learning and safety metadata
- `instructor-guide.md` - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open `http://localhost:8080/labs/azure-landing-zone-101/`.
