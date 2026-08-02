# LAB-ID-101 - Entra ID, MFA and Conditional Access

A full-length identity and access design lab. Learners use a fictional Academy tenant to practise the relationships among identities, groups, roles, MFA and Conditional Access without connecting to a real tenant.

## What learners practise

- Identity, group, role and administrative-scope distinctions.
- Least-privilege role selection for learner, instructor and administrator duties.
- A staged MFA and Conditional Access baseline.
- Emergency-access account, break-glass and policy rollout considerations.

## Delivery and safety

- Level: Beginner to Intermediate
- Duration: 60 minutes
- Environment: Any modern browser
- Evidence: Browser-local progress and printable personal completion record
- Runtime: Simulation only; no real identity, tenant, policy or role data is collected or changed.

The lab complements, but does not replace, a governed Entra tenant review by an authorised identity administrator.

## Files

- index.html - learner-facing interactive workbook
- manifest.yaml - delivery, learning and safety metadata
- instructor-guide.md - facilitation, answer and reference guidance

## Local preview

From the repository root, run:

    python3 -m http.server 8080

Then open http://localhost:8080/labs/entra-identity-101/.
