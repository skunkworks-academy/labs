---
id: nikto
title: Nikto Web Server Misconfiguration Review
slug: /nikto/
sidebar_position: 6
keywords: [Nikto, web server scanner, misconfiguration, headers, default files]
---

# LAB-WEB-203 — Nikto Web Server Misconfiguration Review

<div className="lab-meta">
  <div><strong>Level</strong><span>Foundation to intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>`web.lab` web server</span></div>
  <div><strong>Evidence</strong><span>Misconfiguration validation sheet</span></div>
</div>

## Purpose

Use Nikto to identify web-server configuration weaknesses, exposed files, banners and insecure defaults, then validate whether each observation is a real security issue in the Northstar environment.

## Authorised scope

Target only `http://web.lab`. Use one scan process, no mutation modes and no proxy chain outside the lab. Stop if the scanner resolves a redirect to another host.

## Learning objectives

- run a bounded Nikto assessment with saved output;
- distinguish web-server findings from application-layer vulnerabilities;
- validate headers, default files and banner observations manually;
- reduce false positives caused by custom error pages and redirects;
- write precise remediation and retest criteria.

## Task 1 — Baseline

```bash
nikto -Version
curl -I http://web.lab/
```

Record the resolved address, HTTP status, redirect behaviour, server time and response headers.

## Task 2 — Run the assessment

```bash
mkdir -p evidence
nikto -h http://web.lab \
  -Format json \
  -output evidence/nikto-web-lab.json
```

Save the exact command and tool version. Do not use broad mutation options in this lab.

## Task 3 — Validate findings

For each result, reproduce the request with `curl` or Burp Repeater. Confirm:

- the path exists and is reachable;
- the response is not a custom 404;
- the header or file is security-relevant;
- the observation is not already mitigated elsewhere;
- the evidence contains no credentials or personal data.

Use the `web.nikto` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) if a live target is unavailable.

## Task 4 — Classify the result

| Classification | Definition |
|---|---|
| Confirmed finding | Reproduced and security impact is plausible |
| Hardening opportunity | Valid observation with limited direct exploitability |
| Informational | Useful inventory data without a weakness |
| False positive | Scanner interpretation does not match target behaviour |
| Out of scope | Requires a prohibited or unapproved test |

<div className="checkpoint">
<strong>Checkpoint:</strong> A missing header is not automatically high risk. Link the control to the actual application behaviour and threat model.
</div>

## Task 5 — Produce remediation guidance

For two confirmed or hardening findings, write:

- affected virtual host and path;
- current behaviour;
- risk and realistic abuse case;
- exact configuration or deployment change;
- regression risk;
- retest request and expected response.

## Evidence requirements

- Nikto JSON output;
- baseline header capture;
- manual validation requests;
- classification table;
- two remediation and retest statements.

## Knowledge check

<details>
<summary>1. What is Nikto primarily assessing?</summary>

Web-server exposure, default content, insecure files, outdated components and configuration weaknesses.
</details>

<details>
<summary>2. Why can custom 404 pages create false positives?</summary>

They may return a successful status or similar body for nonexistent paths, causing a scanner to interpret the response as exposed content.
</details>

<details>
<summary>3. Why retain the exact target URL?</summary>

Scheme, host, port and virtual-host routing affect what the server returns and are required for reproducibility.
</details>

## References

- [Nikto documentation](https://github.com/sullo/nikto/wiki)
