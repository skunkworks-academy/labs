---
id: cmsmap
title: CMSmap Cross-CMS Fingerprinting
slug: /cmsmap/
sidebar_position: 10
keywords: [CMSmap, CMS security, WordPress, Joomla, Drupal, fingerprinting]
---

# LAB-CMS-203 — CMSmap Cross-CMS Fingerprinting

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>Synthetic CMS target</span></div>
  <div><strong>Evidence</strong><span>Cross-tool fingerprint matrix</span></div>
</div>

## Purpose

Use CMSmap as a cross-CMS reconnaissance tool, then verify its product and component inferences against HTTP evidence and specialist scanners. The objective is accurate inventory—not blind acceptance of fingerprints.

## Authorised scope

Use only `http://wordpress.lab` or `http://drupal.lab`, one target per scan. Credential attacks and brute-force modes are prohibited.

## Learning objectives

- identify CMS fingerprint signals in responses and paths;
- run a bounded CMSmap assessment;
- assess confidence and false-positive causes;
- compare generalist and specialist CMS scanners;
- produce a defensible platform inventory.

## Task 1 — Establish baseline evidence

Collect:

```bash
curl -I http://wordpress.lab/
curl -s http://wordpress.lab/ | head -n 40
```

Record generator metadata, cookies, static asset paths, headers and response patterns.

## Task 2 — Run CMSmap

From the approved lab installation, check the current help output and run a single-target scan. Example pattern:

```bash
python3 cmsmap.py -t http://wordpress.lab -o evidence/cmsmap-wordpress.txt
```

Do not enable brute-force, password or multi-target options.

## Task 3 — Trace fingerprint sources

For each product or component inference, identify the supporting signal:

- generator metadata;
- predictable path;
- static asset naming;
- cookie name;
- response header;
- readme/changelog;
- behaviour of a CMS-specific endpoint.

Use `cms.cmsmap` in the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) if necessary.

## Task 4 — Compare specialist tools

Compare CMSmap with WPScan or Droopescan:

| Data point | CMSmap result | Specialist result | Manual evidence | Final conclusion |
|---|---|---|---|---|
| CMS family |  |  |  |  |
| Core version |  |  |  |  |
| Theme/template |  |  |  |  |
| Plugins/modules |  |  |  |  |
| Interesting paths |  |  |  |  |

<div className="checkpoint">
<strong>Checkpoint:</strong> A general fingerprint can be useful for triage, but a specialist scanner and manual evidence usually provide stronger component-level confidence.
</div>

## Task 5 — Write the inventory finding

Create one report entry with:

- confirmed CMS family;
- version confidence;
- installed components observed;
- exposed metadata and paths;
- patching ownership;
- recommended next assessment step;
- limitations and false-positive risk.

## Evidence requirements

- baseline HTTP capture;
- CMSmap output;
- fingerprint-source register;
- cross-tool comparison;
- final platform-inventory finding.

## Knowledge check

<details>
<summary>1. Why can reverse proxies and themes confuse CMS fingerprinting?</summary>

They may modify headers, paths, error pages and static assets, masking or imitating expected platform signals.
</details>

<details>
<summary>2. What is stronger than a single fingerprint?</summary>

Multiple independent signals that agree and can be reproduced manually.
</details>

<details>
<summary>3. Why is CMS inventory security-relevant?</summary>

It determines patch ownership, component exposure, vulnerability applicability and hardening requirements.
</details>

## References

- [CMSmap project](https://github.com/Dionach/CMSmap)
