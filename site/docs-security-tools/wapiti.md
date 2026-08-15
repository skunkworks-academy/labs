---
id: wapiti
title: Wapiti Black-Box Web Application Scan
slug: /wapiti/
sidebar_position: 7
keywords: [Wapiti, web application scanner, black-box testing, crawler, input validation]
---

# LAB-WEB-204 — Wapiti Black-Box Web Application Scan

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Resettable `web.lab` target</span></div>
  <div><strong>Evidence</strong><span>Coverage and finding report</span></div>
</div>

## Purpose

Use Wapiti to perform a constrained black-box assessment, understand crawler-derived coverage and evaluate injection-oriented findings without assuming that automated payload behaviour is safe for every target.

## Authorised scope

Target `http://web.lab/training/` only. Keep scope at folder level, use a single scan process and exclude logout, reset, upload and administration routes.

## Learning objectives

- configure URL scope, modules, exclusions and output;
- explain how crawling controls what can be tested;
- distinguish discovery gaps from clean scan results;
- validate scanner findings with one-variable manual tests;
- document operational impact and scan limitations.

## Task 1 — Inspect modules and scope

```bash
wapiti --version
wapiti --list-modules
```

Classify available modules as low, medium or high operational impact. Select only the modules approved by the instructor.

## Task 2 — Run the constrained scan

```bash
mkdir -p evidence/wapiti
wapiti -u http://web.lab/training/ \
  --scope folder \
  --skip logout --skip reset --skip upload --skip admin \
  -m common,csp,cookieflags \
  -f json \
  -o evidence/wapiti
```

The command is a lab baseline. Adjust module names only after checking the installed version and help output.

## Task 3 — Measure coverage

Create a coverage table:

| Application function | URL discovered? | Form/input discovered? | Authentication state | Tested module | Coverage gap |
|---|---|---|---|---|---|
| Login |  |  |  |  |  |
| Learner profile |  |  |  |  |  |
| Enrolments |  |  |  |  |  |
| Course search |  |  |  |  |  |

Explain why an absent finding on an undiscovered route has no assurance value.

## Task 4 — Validate two findings

Use the `web.wapiti` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) or live results. For each finding:

1. reproduce the baseline request;
2. change only the relevant input or header;
3. observe the response and final application state;
4. record whether the scanner evidence is confirmed;
5. define remediation and retest criteria.

<div className="checkpoint">
<strong>Checkpoint:</strong> Automated fuzzing can create records, trigger workflows or stress fragile code. Use exclusions and resettable data even in an authorised lab.
</div>

## Task 5 — Compare with ZAP

Compare Wapiti and ZAP results across:

- discovered routes;
- authentication handling;
- input points;
- passive versus active checks;
- severity terminology;
- report evidence.

Identify one complementary strength and one source of duplicate findings.

## Evidence requirements

- tool version and module list;
- exact scan command;
- JSON report;
- coverage table;
- two manual validations;
- Wapiti/ZAP comparison;
- cleanup record.

## Knowledge check

<details>
<summary>1. What does black-box scanning mean in this context?</summary>

The scanner assesses the deployed application through requests and responses without relying on source-code analysis.
</details>

<details>
<summary>2. Why is crawler coverage important?</summary>

Only discovered and reachable inputs can be assessed; incomplete navigation or authentication produces incomplete testing.
</details>

<details>
<summary>3. Why should high-impact modules be selected explicitly?</summary>

They may generate more traffic, alter application state or trigger fragile code paths.
</details>

## References

- [Wapiti documentation and project site](https://wapiti-scanner.github.io/)
