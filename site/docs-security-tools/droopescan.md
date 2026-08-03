---
id: droopescan
title: Droopescan Drupal & Joomla Discovery
slug: /droopescan/
sidebar_position: 9
keywords: [Droopescan, Drupal security, Joomla security, CMS fingerprinting]
---

# LAB-CMS-202 — Droopescan Drupal & Joomla Discovery

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>Resettable `drupal.lab` target</span></div>
  <div><strong>Evidence</strong><span>CMS fingerprint and exposure record</span></div>
</div>

## Purpose

Use Droopescan to identify a Drupal/Joomla deployment, enumerate bounded component evidence and assess whether exposed metadata or version indicators create actionable risk.

## Authorised scope

Target only `http://drupal.lab`. Do not use credential guessing, broad internet targets or recursive scans beyond the assigned host.

## Learning objectives

- select the correct CMS mode and output format;
- interpret version and component detection confidence;
- verify interesting paths and metadata manually;
- distinguish exposed information from exploitable weakness;
- recommend update, removal and access-control actions.

## Task 1 — Confirm the target and tool

```bash
droopescan --help
curl -I http://drupal.lab/
```

Record tool version or package source, target resolution and redirect behaviour.

## Task 2 — Run a bounded Drupal scan

```bash
mkdir -p evidence
droopescan scan drupal \
  -u http://drupal.lab \
  -o json > evidence/droopescan-drupal.json
```

Use the syntax supported by the installed release. Do not add credential or password-testing options.

## Task 3 — Validate fingerprint evidence

For each result, record:

- feature or component detected;
- response path and status;
- version or product inference;
- confidence and alternative explanation;
- security relevance;
- manual validation request.

Use `cms.droopescan` in the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) when required.

## Task 4 — Review interesting URLs

Inspect only the paths returned by the scanner. Determine whether each path:

- reveals exact version information;
- exposes administrative functionality;
- leaks source, configuration or backup data;
- is intentionally public documentation;
- returns a custom error page rather than real content.

<div className="checkpoint">
<strong>Checkpoint:</strong> Product fingerprinting is evidence for inventory. It does not replace verification of the exact installed version and patch state.
</div>

## Task 5 — Create a CMS hardening plan

Cover:

1. core update process;
2. module/extension governance;
3. removal of unused components;
4. access restrictions for administrative routes;
5. metadata and changelog exposure;
6. logging and file-integrity monitoring;
7. backup protection and recovery testing.

## Evidence requirements

- Droopescan JSON output;
- baseline HTTP evidence;
- fingerprint-confidence table;
- interesting-path validation;
- CMS hardening and retest plan.

## Knowledge check

<details>
<summary>1. Why is CMS mode selection important?</summary>

Different platforms expose different structures, components and fingerprints; using the wrong mode reduces accuracy.
</details>

<details>
<summary>2. When is an exposed changelog a finding?</summary>

When it reveals sensitive deployment detail or materially assists attack planning and is not justified by business need.
</details>

<details>
<summary>3. Why remove unused modules?</summary>

Unused code still expands patching requirements and attack surface.
</details>

## References

- [Droopescan project](https://github.com/SamJoan/droopescan)
- [Droopescan documentation](https://droopescan-docs.readthedocs.io/en/latest/)
