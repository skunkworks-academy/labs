---
id: nmap-nse
title: Nmap NSE Service & Vulnerability Discovery
slug: /nmap-nse/
sidebar_position: 3
keywords: [Nmap, NSE, service detection, vulnerability discovery, network security]
---

# LAB-SEC-202 — Nmap NSE Service & Vulnerability Discovery

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Isolated 10.77.0.0/24 range</span></div>
  <div><strong>Evidence</strong><span>Service map + NSE rationale</span></div>
</div>

## Purpose

Use Nmap and the Nmap Scripting Engine (NSE) to create a reproducible service inventory, select scripts by risk and purpose, and validate network-scanner findings without turning a discovery exercise into uncontrolled exploitation.

## Authorised scope

Only the five hosts listed in the [Northstar scope](/fixtures/security-tools/northstar-scope.yaml) are permitted. Begin with safe/default scripts. Intrusive or vulnerability script categories require explicit instructor approval and must target one resettable host at a time.

## Learning objectives

- select host discovery, port and service-detection options deliberately;
- distinguish NSE categories such as `safe`, `default`, `discovery`, `auth`, `intrusive`, `vuln` and `exploit`;
- inspect script documentation before execution;
- preserve normal, XML and grepable output;
- correlate network evidence with OpenVAS findings.

## Task 1 — Baseline the tool and scope

```bash
nmap --version
ip route
getent hosts web.lab wordpress.lab drupal.lab linux-audit.lab metasploitable.lab
```

Record the source interface, route and resolved addresses. Any resolution outside `10.77.0.0/24` is a stop condition.

## Task 2 — Create a bounded service inventory

Run a conservative scan against the approved addresses:

```bash
mkdir -p evidence
nmap -sV --version-light --script safe,default \
  --max-retries 2 --host-timeout 5m \
  -oA evidence/northstar-baseline \
  10.77.0.20 10.77.0.30 10.77.0.31 10.77.0.40 10.77.0.50
```

Explain every option. Compare the result with the `nmap` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json).

## Task 3 — Inspect NSE documentation

Choose three scripts relevant to discovered services. Before running them, use:

```bash
nmap --script-help <script-name>
```

For each script, document:

- category and purpose;
- protocol and port assumptions;
- whether credentials are required;
- expected network effect;
- output that would support or refute a finding;
- stop conditions.

<div className="checkpoint">
<strong>Checkpoint:</strong> Script names are not a sufficient risk assessment. Read NSE documentation and source-level behaviour before adding a script to an approved profile.
</div>

## Task 4 — Run a service-specific verification

Select one non-destructive script for `web.lab` or `metasploitable.lab`. Example pattern:

```bash
nmap -p 80 -sV --script http-title,http-headers \
  -oA evidence/web-http-verification 10.77.0.20
```

Do not use broad wildcards or `--script all`. Do not run credential attacks, denial-of-service scripts or exploit scripts.

## Task 5 — Interpret uncertainty

Create a matrix:

| Observation | What Nmap proves | What remains unknown | Next validation step |
|---|---|---|---|
| Port open | TCP service accepted a connection | Application identity and patch state | Service-specific probe |
| Product family detected | Response resembled a product | Exact build and configuration | Manual banner/config review |
| NSE finding | Script observed a condition | Business impact and exploitability | Correlate with another source |
| Port filtered | Probe did not receive a definitive response | Whether service exists behind controls | Review firewall and host logs |

## Task 6 — Compare with OpenVAS

Reconcile:

- host availability;
- open ports;
- product/version evidence;
- vulnerability references;
- confidence and false-positive risk.

Produce one finding that is strengthened by correlation and one that remains unconfirmed.

## Evidence requirements

- exact command history;
- `.nmap`, `.xml` and `.gnmap` outputs;
- three NSE script-selection records;
- correlation matrix;
- one remediation and retest statement.

## Knowledge check

<details>
<summary>1. Why should `--script all` be avoided in a governed assessment?</summary>

It removes deliberate script selection and can invoke techniques with different traffic, authentication and operational effects.
</details>

<details>
<summary>2. What is the advantage of `-oA`?</summary>

It preserves multiple output formats for human review, machine processing and later comparison.
</details>

<details>
<summary>3. Does service-version detection prove a vulnerability?</summary>

No. It provides evidence for a hypothesis that must be validated against the exact build, configuration and runtime behaviour.
</details>

## References

- [Nmap Scripting Engine chapter](https://nmap.org/book/nse.html)
- [NSEDoc reference portal](https://nmap.org/nsedoc/)
