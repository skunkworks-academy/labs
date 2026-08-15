---
id: wpscan
title: WPScan WordPress Assessment
slug: /wpscan/
sidebar_position: 8
keywords: [WPScan, WordPress security, plugin vulnerabilities, theme vulnerabilities, CMS scanning]
---

# LAB-CMS-201 — WPScan WordPress Assessment

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>Resettable `wordpress.lab` target</span></div>
  <div><strong>Evidence</strong><span>WordPress exposure register</span></div>
</div>

## Purpose

Use WPScan to inventory a WordPress deployment, identify version, theme and plugin exposure, and validate whether vulnerability intelligence applies to the exact installed components.

## Authorised scope

Target only `http://wordpress.lab`. User enumeration, password attacks and aggressive detection modes are prohibited. Use the Academy-provided API token only when instructed and never include it in screenshots or command history exports.

## Learning objectives

- distinguish passive and mixed detection methods;
- enumerate only the component classes required by scope;
- interpret version confidence and vulnerability references;
- verify plugin/theme presence manually;
- produce upgrade, removal or compensating-control guidance.

## Task 1 — Baseline the target

```bash
curl -I http://wordpress.lab/
curl -s http://wordpress.lab/ | head
wpscan --version
```

Record redirects, generator metadata, exposed paths and tool version.

## Task 2 — Run a bounded component scan

```bash
mkdir -p evidence
wpscan --url http://wordpress.lab \
  --enumerate vp,vt \
  --plugins-detection mixed \
  --format json \
  --output evidence/wpscan.json
```

Do not enumerate users or invoke password attacks. Store any API token in an environment variable rather than the command line.

## Task 3 — Validate component detection

For every detected plugin or theme, capture:

- detected slug and version;
- evidence source;
- confidence;
- whether the component is enabled;
- whether the path is publicly reachable;
- whether the version falls in an affected range;
- whether a patch or fixed version exists.

Use `cms.wpscan` in the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) when live infrastructure is unavailable.

## Task 4 — Assess exposure, not only CVEs

Review:

- XML-RPC availability;
- readme/changelog exposure;
- backup and database artefacts;
- directory listing;
- debug logs;
- plugin/theme update state;
- administrative interfaces and MFA requirements.

<div className="checkpoint">
<strong>Checkpoint:</strong> A vulnerable component reference matters only after the installed component and affected version range are confirmed.
</div>

## Task 5 — Prioritise remediation

Create a remediation table:

| Component/control | Current state | Risk | Recommended action | Downtime/change risk | Retest |
|---|---|---|---|---|---|
| WordPress core |  |  |  |  |  |
| Plugin |  |  |  |  |  |
| Theme |  |  |  |  |  |
| XML-RPC |  |  |  |  |  |
| Admin access |  |  |  |  |  |

## Evidence requirements

- WPScan JSON output;
- baseline HTTP evidence;
- component-validation table;
- vulnerability applicability decision;
- prioritised remediation plan;
- token-redaction confirmation.

## Knowledge check

<details>
<summary>1. Why avoid user enumeration unless it is explicitly required?</summary>

It increases privacy and account-targeting risk and is unnecessary for many component and configuration assessments.
</details>

<details>
<summary>2. Does detecting a plugin prove it is vulnerable?</summary>

No. The exact installed version, affected range, enabled state and reachable attack surface must be confirmed.
</details>

<details>
<summary>3. Why keep API tokens out of shell history?</summary>

Command-line secrets can be exposed through history, process listings, screenshots and logs.
</details>

## References

- [WPScan user documentation](https://github.com/wpscanteam/wpscan/wiki/WPScan-User-Documentation)
