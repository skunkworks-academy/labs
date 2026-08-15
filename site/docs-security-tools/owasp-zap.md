---
id: owasp-zap
title: OWASP ZAP Baseline & Governed Active Scan
slug: /owasp-zap/
sidebar_position: 5
keywords: [OWASP ZAP, web scanner, baseline scan, active scan, automation framework]
---

# LAB-WEB-202 — OWASP ZAP Baseline & Governed Active Scan

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Resettable `web.lab` target</span></div>
  <div><strong>Evidence</strong><span>Baseline + active-scan comparison</span></div>
</div>

## Purpose

Use ZAP to distinguish passive baseline assessment from active scanning, define context and authentication, control scan intensity and convert alerts into evidence-led findings.

## Authorised scope

The target is `http://web.lab`. Baseline scanning is permitted throughout the lab window. Active scanning is permitted only after the instructor confirms the target snapshot is resettable. Maximum request rate: five requests per second.

## Learning objectives

- configure context, scope and authentication;
- run a baseline scan that does not actively attack the target;
- select active-scan policies by risk and business function;
- interpret alert risk and confidence independently;
- export machine-readable and human-readable evidence.

## Task 1 — Baseline scan

Using the stable ZAP container or desktop application, run a passive baseline scan. Example:

```bash
mkdir -p evidence

docker run --rm --network northstar-lab \
  -v "$PWD/evidence:/zap/wrk/:rw" \
  zaproxy/zap-stable zap-baseline.py \
  -t http://web.lab \
  -J zap-baseline.json \
  -r zap-baseline.html
```

Record the image digest or ZAP version and the exact command.

## Task 2 — Review passive coverage

For each visited path, note:

- whether it was reached anonymously or while authenticated;
- response code and content type;
- passive rules that executed;
- excluded logout, reset or destructive functions;
- areas not covered by the baseline scan.

## Task 3 — Create a governed active policy

In a ZAP context limited to `web.lab`, disable categories that may create excessive load or alter data. Select only checks required for the assigned test objective. Set:

- low thread count;
- request delay or rate control;
- maximum scan duration;
- logout and state-changing exclusions;
- alert threshold and strength.

Document why each selected rule is necessary.

<div className="checkpoint">
<strong>Checkpoint:</strong> A default active scan is not automatically appropriate. Scan policy is part of the rules of engagement.
</div>

## Task 4 — Execute and observe

Run the governed active scan against one approved path group. Monitor target health and stop if:

- response latency materially increases;
- error rates spike;
- the scanner leaves scope;
- the target state changes unexpectedly;
- the assigned time window ends.

## Task 5 — Triage alerts

Use the `web.zap` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json). For each alert, document:

| Field | Analysis |
|---|---|
| Risk | Technical severity assigned by ZAP |
| Confidence | How strongly the evidence supports the alert |
| Evidence | Header, response or request excerpt |
| Business relevance | Whether the affected function handles sensitive data or privileged actions |
| Validation | Manual or second-tool confirmation |
| Remediation | Specific header, cookie or application control |
| Retest | Exact observable secure result |

## Task 6 — Compare baseline and active results

Explain which alerts were found passively and which required active interaction. Identify one area where authentication coverage matters more than scan strength.

## Evidence requirements

- ZAP version/image digest;
- baseline command and reports;
- active-scan policy export or screenshots;
- scope and exclusion record;
- alert triage table;
- target-health and cleanup notes.

## Knowledge check

<details>
<summary>1. What is the key difference between a baseline scan and an active scan?</summary>

A baseline scan primarily spiders and passively analyses traffic; an active scan sends test payloads that can alter load or application state.
</details>

<details>
<summary>2. Why are risk and confidence separate?</summary>

Risk estimates potential impact, while confidence describes how strongly the scanner evidence supports the finding.
</details>

<details>
<summary>3. Why define a context?</summary>

It groups scope, authentication, users, session handling and exclusions into a controlled testing boundary.
</details>

## References

- [ZAP documentation](https://www.zaproxy.org/docs/)
- [ZAP Desktop User Guide](https://www.zaproxy.org/docs/desktop/)
