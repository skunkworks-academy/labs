---
id: capstone
title: Integrated Security Assessment Capstone
slug: /capstone/
sidebar_position: 15
keywords: [security assessment capstone, vulnerability management, web security, wireless security, Linux audit, Metasploit]
---

# LAB-SEC-390 — Integrated Security Assessment Capstone

<div className="lab-meta">
  <div><strong>Level</strong><span>Applied intermediate</span></div>
  <div><strong>Duration</strong><span>150 minutes</span></div>
  <div><strong>Environment</strong><span>Northstar controlled lab range</span></div>
  <div><strong>Evidence</strong><span>Assessment-ready report pack</span></div>
</div>

## Brief

Northstar Training Services has requested a bounded security assessment before a learner portal pilot. You must combine network, web, CMS, wireless and Linux evidence into one defensible report. Controlled exploitation is allowed only for the designated `metasploitable.lab` finding and only after a check-first decision.

## Authorised scope

Use the [Northstar scope fixture](/fixtures/security-tools/northstar-scope.yaml). The assessment window, permitted targets, rate limits and prohibited techniques are mandatory. Use the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) for browser-only delivery.

## Part 1 — Assessment plan

Prepare a one-page plan containing:

- business objective;
- in-scope assets and exclusions;
- test identities;
- selected tools and why each is needed;
- scan order and concurrency;
- stop conditions;
- evidence locations and retention;
- communication and escalation route;
- cleanup and retest ownership.

## Part 2 — Asset and service inventory

Use OpenVAS and Nmap evidence to produce a reconciled asset register:

| Asset | Address | Role | Open services | Product/version confidence | Exposure | Owner |
|---|---|---|---|---|---|---|

Flag any conflict between scanner outputs and state how it should be resolved.

## Part 3 — Web and CMS assessment

Use at least three of:

- Burp Suite;
- OWASP ZAP;
- Nikto;
- Wapiti;
- WPScan;
- Droopescan;
- CMSmap.

Your evidence must cover:

1. authenticated application mapping;
2. one object-level or field-level authorisation test;
3. security-header and cookie review;
4. crawler/scan coverage limitations;
5. CMS component inventory and patch applicability;
6. false-positive validation.

Do not duplicate a finding merely because multiple tools report it. Create one correlated finding with all supporting evidence.

## Part 4 — Wireless assessment

Using the offline Aircrack-ng and Kismet evidence:

- inventory approved and unexpected wireless networks;
- verify capture provenance and integrity;
- assess shared-secret policy exposure;
- investigate `NORTHSTAR-GUEST-OLD` without assuming it is malicious;
- recommend monitoring, segmentation and authentication controls.

## Part 5 — Linux system audit

Use Lynis evidence to create a five-item hardening backlog for `linux-audit.lab`. Each item requires:

- current state;
- native-command validation;
- risk and affected service;
- change owner;
- rollback;
- expected secure state;
- retest command.

## Part 6 — Controlled exploitability decision

Review the `metasploitable.lab` FTP finding. Produce a decision record before exploitation:

| Decision field | Required content |
|---|---|
| Evidence | Nmap, OpenVAS and auxiliary-scanner correlation |
| Module | Exact Metasploit module and documentation reviewed |
| Conditions | Service/version and network requirements |
| Risk | Operational effect and session type |
| Approval | Instructor name/time or browser-only synthetic approval |
| Proof limit | Commands permitted after session opens |
| Cleanup | Session termination and snapshot reset |

If approval exists, record the check-first and single-run validation. Otherwise, explain why exploitation was not performed and what evidence remains outstanding.

<div className="checkpoint">
<strong>Checkpoint:</strong> A professional assessment can be complete without exploitation when scope, safety, target state or evidence quality does not justify the action.
</div>

## Part 7 — Correlated finding register

Submit 8–12 findings. Required fields:

- unique identifier and title;
- affected asset/function;
- evidence from one or more tools;
- confidence and validation status;
- technical severity;
- business impact;
- exploitability/exposure;
- remediation owner and action;
- compensating controls;
- retest method;
- residual risk.

Use this priority model:

```text
Priority = technical severity + exposure + business impact + evidence confidence
           - compensating control effectiveness
```

Do not present the formula as a universal risk score; explain how judgement was applied.

## Part 8 — Executive summary

Write no more than 500 words covering:

- assessment objective and scope;
- material risks;
- strengths observed;
- top five remediation actions;
- limitations and untested areas;
- recommended retest window.

## Part 9 — Evidence index

Create an index linking each finding to:

- raw scanner output;
- command/profile used;
- timestamps;
- screenshots or request/response pairs;
- validation notes;
- cleanup evidence;
- redaction status.

## Scoring rubric

| Area | Weight | Evidence of mastery |
|---|---:|---|
| Scope and safety | 15% | Exact targets, bounded techniques, stop conditions and cleanup |
| Tool configuration | 15% | Profiles and commands are deliberate and reproducible |
| Evidence quality | 20% | Raw artefacts, timestamps, provenance and validation are traceable |
| Correlation | 20% | Duplicate outputs are reconciled into defensible findings |
| Risk and remediation | 20% | Priorities reflect exposure, impact and control effectiveness |
| Communication | 10% | Clear executive and technical reporting |

## Completion standard

A passing submission is reproducible, respects the rules of engagement, clearly separates observation from validation, and gives system owners actionable remediation and retest criteria.

## Knowledge check

<details>
<summary>1. Why should tool outputs be correlated?</summary>

Different tools use different evidence and assumptions. Correlation improves confidence, exposes conflicts and reduces duplicate or false-positive findings.
</details>

<details>
<summary>2. What is the purpose of a stop condition?</summary>

It defines when testing must halt to protect availability, scope, data and authorised operations.
</details>

<details>
<summary>3. What makes evidence assessment-ready?</summary>

It is traceable to the target, time, tool configuration, raw output, analyst interpretation and cleanup record.
</details>
