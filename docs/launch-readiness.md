# Labs launch readiness

## Purpose

This repository is the public Skunkworks Academy Labs catalogue. It is safe to publish from GitHub Pages because it contains no payment secrets, identity secrets, learner records, or runner credentials.

`LAB-LNX-101` is the first release candidate: a 45-minute browser-based Linux terminal. It is deliberately smaller than a full Google Cloud sandbox so the team can prove the complete purchase, entitlement, launch, timeout, and cleanup lifecycle at low operational risk.

## What is live in this repository

- Public product catalogue and learner-facing launch-pilot experience.
- Brand-aligned information architecture, accessibility controls, metadata, sitemap, and `security.txt`.
- A versioned lab catalogue (`lab-catalog.json`).
- A lab manifest and guided exercise for `LAB-LNX-101`.
- A service API contract. The contract is not an executable payment or provisioning service.

## What must remain private

Create a separate private repository named `skunkworks-academy/labs-platform` for the control plane. Do not add the following to this public catalogue repository:

- PayFast merchant ID, merchant key, passphrase, ITN validation data, or any callback secret.
- PayPal client secret, webhook ID, or access tokens.
- Entra client secret, tenant secrets, API signing keys, or learner tokens.
- Database connection strings, Cloud SQL credentials, GCP service-account keys, or runner configuration secrets.
- Learner PII, payments, orders, entitlement records, session logs, audit exports, or support attachments.

## Target production topology

```text
Public catalogue (GitHub Pages)
  -> Labs application (Cloud Run, authenticated)
  -> Hosted PayFast / PayPal checkout
  -> Verified provider webhook
  -> Entitlement ledger (Cloud SQL)
  -> Cloud Tasks
  -> Provisioner / lab runner pool (private Cloud Run or GCE)
  -> Browser gateway
```

The learner only receives a time-bound entitlement and browser session. They do not receive unrestricted Google Cloud project ownership, billing access, public SSH, or a shared account.

## Required production gates

### Domain and delivery

1. Treat `labs.skunkworksacademy.com` as authoritative. It is the live hostname; `lab.skunkworksacademy.com` currently returns an error while the repository CNAME still contains the singular form.
2. Replace the GitHub Pages CNAME with `labs.skunkworksacademy.com`, then verify the corresponding DNS CNAME and TLS certificate as part of the publish check.
3. Configure `app.labs.skunkworksacademy.com` for the authenticated control plane. It must not be served by the public catalogue repository.
4. Keep GitHub Pages deployment restricted to the `main` branch and protect that branch with review and required checks.

### Identity

1. Register a dedicated Entra application for the Labs application.
2. Configure production and non-production redirect URIs separately.
3. Validate issuer, audience, tenant, nonce, state, PKCE, and token expiry on the server; never trust identity information sent only by the browser.
4. Map only the minimum required roles: learner, instructor, support, and platform administrator.

### Payments

1. Start in PayFast sandbox and PayPal sandbox.
2. Use hosted checkout. Card data must never transit the Labs application.
3. Verify a PayFast notification using the provider's signature and server-side validation procedure.
4. Verify the PayPal webhook signature against the provider's API using the configured webhook ID.
5. Record the immutable provider event ID before changing an order. Duplicate deliveries must not create a second entitlement.
6. Issue an entitlement only from a verified server-to-server payment event, never from a browser return URL.

### Google Cloud and runner safety

1. Use separate production projects for the control plane, runtime pool, and observability/billing operations.
2. Use an individual service account for each Cloud Run service/job. Disable service-account key creation.
3. Do not assign public IPs to runners. The gateway is the only externally reachable path to a lab session.
4. Enforce the manifest session TTL and idle timeout. Automatically stop or delete the runner at expiry.
5. Label every resource with `lab_run_id`, `template_version`, `environment`, and `expires_at`.
6. Run a scheduled reconciliation job to detect and remove orphaned resources.
7. Create budget and anomaly alerts, plus a circuit-breaker that suspends new launches when a safety threshold is reached.

## Release acceptance tests

| Test | Expected result |
| --- | --- |
| Unauthenticated checkout request | Rejected; no order or provider session is created. |
| Browser success return without a webhook | No entitlement and no lab access. |
| Verified PayFast/PayPal event | One paid order and one entitlement only. |
| Repeated provider event | Idempotent response; no duplicate entitlement. |
| Launch with valid unexpired entitlement | One browser lab session is created. |
| Second simultaneous launch | Rejected or resumes the existing session according to the entitlement policy. |
| Session reaches idle/absolute timeout | Runner is stopped and access is revoked. |
| Provisioner failure | Operation is retried safely and shown to support; no unmanaged cost leak. |
| Reconciliation run | Detects lab resources without a live entitlement and cleans them up. |
| Refund or chargeback | Future launch is suspended and support receives an auditable event. |

## Enablement order

1. Merge and publish the public catalogue updates.
2. Confirm the canonical Labs hostname and fix the existing singular/plural domain mismatch.
3. Create the private control-plane repository and baseline Cloud Run/Cloud SQL/Cloud Tasks infrastructure.
4. Implement Entra sign-in and the service contract in `docs/labs-control-api.openapi.yaml`.
5. Run PayFast and PayPal sandbox payments, then webhook/idempotency tests.
6. Enable three pre-warmed private `LAB-LNX-101` runner slots.
7. Complete security, cost, and cleanup acceptance tests.
8. Switch self-service checkout on for the first product; retain a kill switch that blocks new sessions without destroying support access.

## Operational ownership

| Role | Responsibility |
| --- | --- |
| Product owner | Catalogue, price, VAT treatment, refund policy, terms, and learner communications. |
| Platform administrator | GCP organisation policies, IAM, deployment approval, budgets, and incident response. |
| Training owner | Lab outcomes, instructions, evidence rubric, curriculum alignment, and cohort delivery. |
| Support | Session recovery, payment escalation, refund workflow, and learner assistance. |

## Safety rule

**A learner purchases a time-bound lab entitlement, not unrestricted cloud infrastructure.**
