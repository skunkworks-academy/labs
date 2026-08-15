---
id: burp-suite
title: Burp Suite Proxy & Manual Validation
slug: /burp-suite/
sidebar_position: 4
keywords: [Burp Suite, proxy, Repeater, web application security, manual testing]
---

# LAB-WEB-201 — Burp Suite Proxy & Manual Validation

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>90 minutes</span></div>
  <div><strong>Environment</strong><span>Resettable `web.lab` target</span></div>
  <div><strong>Evidence</strong><span>Request/response test record</span></div>
</div>

## Purpose

Use Burp Suite as an intercepting proxy and evidence workbench. The lab focuses on session-aware mapping, request minimisation, manual authorisation checks and reproducible validation—not uncontrolled payload generation.

## Authorised scope

Test only `http://web.lab` and the two supplied learner accounts. Do not spider outside the host, submit destructive requests, upload executable content or exceed five requests per second.

## Learning objectives

- configure a dedicated browser profile and proxy listener;
- define target scope before intercepting traffic;
- use HTTP history, Site map, Repeater and Comparer methodically;
- test object-level and field-level authorisation with bounded variations;
- redact session tokens and personal data from evidence.

## Task 1 — Configure the project

Create a temporary Burp project named `northstar-web-validation`. Configure:

- proxy listener bound to loopback only;
- browser certificate trust for the lab profile;
- target scope limited to `web.lab`;
- logging and project file location;
- interception disabled until the browser is confirmed to use the proxy.

Capture the Burp edition and version in your evidence record.

## Task 2 — Map the authenticated workflow

Log in as learner `1001`. Navigate only these functions:

1. dashboard;
2. learner profile;
3. active enrolments;
4. profile update;
5. logout.

In HTTP history, identify:

- session cookie or bearer token;
- anti-CSRF mechanism;
- object identifiers;
- content types;
- state-changing requests;
- security-relevant response headers.

## Task 3 — Send a bounded request to Repeater

Select `GET /api/learners/1001`. Send it to Repeater and establish a baseline. Then change only the object identifier to `1002`.

Expected secure behaviour: an indistinguishable `404` or an explicit `403` without another learner's data.

Record:

- baseline request and response;
- modified request and response;
- identity used;
- result and confidence;
- server-side control inferred;
- additional verification required.

## Task 4 — Test over-posting safely

Send the profile update request to Repeater. Add a single unadvertised field:

```json
{"role":"admin"}
```

Do not combine multiple mutations. The secure application should reject or ignore the field and preserve the learner role. Verify the account state through the normal UI after the request.

<div className="checkpoint">
<strong>Checkpoint:</strong> A changed response code is not enough. Confirm the final server-side state and retain evidence that no privilege change occurred.
</div>

## Task 5 — Compare authenticated responses

Use Comparer to contrast:

- learner `1001` requesting their own profile;
- learner `1001` requesting learner `1002`;
- unauthenticated request to the same endpoint.

Identify differences in status, body length, error structure, cache headers and timing. Note whether error responses leak object existence.

## Task 6 — Review passive findings

Review passive issues only. For each, classify:

- confirmed configuration weakness;
- informational observation;
- false positive;
- requires manual validation.

Correlate with the `web.burp` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json).

## Evidence requirements

- project configuration screenshot;
- scoped Site map export;
- two Repeater test records;
- response comparison notes;
- passive-finding triage;
- cleanup record confirming logout and project closure.

## Knowledge check

<details>
<summary>1. Why use a dedicated browser profile?</summary>

It isolates proxy settings, trusted certificates, cookies and test data from normal browsing.
</details>

<details>
<summary>2. Why change one request element at a time?</summary>

It preserves causality and makes the test reproducible.
</details>

<details>
<summary>3. Why must tokens be redacted from screenshots and reports?</summary>

They can grant access and are not required to prove most findings.
</details>

## References

- [Burp Suite desktop documentation](https://portswigger.net/burp/documentation/desktop)
