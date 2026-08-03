---
id: index
title: Security Scanning & Validation Labs
slug: /
sidebar_position: 1
keywords: [vulnerability scanning, web security, CMS security, wireless security, system auditing, Metasploit]
---

# Security Scanning & Validation Labs

<div className="orange-rule"></div>

This track develops disciplined use of security assessment tools across network, web application, content-management, wireless and Linux environments. The emphasis is not merely running a scanner: learners define scope, select bounded techniques, preserve evidence, validate findings, minimise false positives and produce remediation-ready reports.

:::danger Authorised lab targets only
Use only the supplied **Northstar Training Services** lab range, synthetic evidence and instructor-approved vulnerable targets. Never scan public IP space, third-party websites, production applications, customer wireless networks or systems outside a written rules-of-engagement document.
:::

## Track outcomes

By completing the track, you will be able to:

1. translate a rules-of-engagement document into tool-safe target and timing controls;
2. distinguish discovery, vulnerability identification, verification and exploitation;
3. configure scanners to reduce unnecessary traffic and operational risk;
4. correlate findings across tools rather than treating scanner output as proof;
5. preserve timestamps, commands, configurations and raw evidence for reproducibility;
6. assign remediation priorities using exploitability, exposure, business impact and compensating controls;
7. close an assessment with cleanup, retesting and residual-risk documentation.

## Lab sequence

| Purpose | Code | Lab | Duration |
|---|---|---|---:|
| Network vulnerability scanning | LAB-SEC-201 | [OpenVAS / Greenbone Vulnerability Management](./openvas.md) | 75 min |
| Network vulnerability scanning | LAB-SEC-202 | [Nmap NSE Service & Vulnerability Discovery](./nmap-nse.md) | 75 min |
| Web application scanning | LAB-WEB-201 | [Burp Suite Proxy & Manual Validation](./burp-suite.md) | 90 min |
| Web application scanning | LAB-WEB-202 | [OWASP ZAP Baseline & Governed Active Scan](./owasp-zap.md) | 75 min |
| Web application scanning | LAB-WEB-203 | [Nikto Web Server Misconfiguration Review](./nikto.md) | 60 min |
| Web application scanning | LAB-WEB-204 | [Wapiti Black-Box Web Application Scan](./wapiti.md) | 75 min |
| CMS scanning | LAB-CMS-201 | [WPScan WordPress Assessment](./wpscan.md) | 60 min |
| CMS scanning | LAB-CMS-202 | [Droopescan Drupal/Joomla Discovery](./droopescan.md) | 60 min |
| CMS scanning | LAB-CMS-203 | [CMSmap Cross-CMS Fingerprinting](./cmsmap.md) | 60 min |
| Wireless | LAB-WIFI-201 | [Aircrack-ng Offline Capture Analysis](./aircrack-ng.md) | 75 min |
| Wireless | LAB-WIFI-202 | [Kismet Passive Wireless Reconnaissance](./kismet.md) | 75 min |
| System auditing | LAB-SYS-201 | [Lynis Linux Security Audit](./lynis.md) | 75 min |
| Exploitation + scanning | LAB-EXP-301 | [Metasploit Vulnerability Validation](./metasploit.md) | 90 min |
| Integrated assessment | LAB-SEC-390 | [Security Assessment Capstone](./capstone.md) | 150 min |

## Authorised environment

The fictional Northstar range uses reserved lab names and a private subnet:

| Asset | Address | Purpose |
|---|---|---|
| `scanner.lab` | `10.77.0.5` | Learner assessment workstation |
| `web.lab` | `10.77.0.20` | Resettable vulnerable web application |
| `wordpress.lab` | `10.77.0.30` | Resettable WordPress target |
| `drupal.lab` | `10.77.0.31` | Resettable Drupal target |
| `linux-audit.lab` | `10.77.0.40` | Linux auditing target |
| `metasploitable.lab` | `10.77.0.50` | Isolated exploitation target |
| `NORTHSTAR-LAB` | offline fixture | Synthetic wireless capture and Kismet database |

Download the [scope fixture](/fixtures/security-tools/northstar-scope.yaml) before beginning. The [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) supports browser-only delivery when live lab infrastructure is unavailable.

## Standard workflow

Every lab follows the same control cycle:

1. **Authorise** — confirm target, identity, time window, traffic limits and prohibited techniques.
2. **Baseline** — record tool version, system time, DNS resolution and target reachability.
3. **Configure** — save the exact profile, command or project settings.
4. **Execute** — run the least intrusive technique capable of answering the question.
5. **Correlate** — compare at least two evidence sources before declaring a finding.
6. **Report** — document impact, confidence, evidence, remediation and retest criteria.
7. **Clean up** — stop scans, close sessions, remove test data and reset vulnerable targets.

## Prohibited actions

- internet-wide, customer or production scanning;
- credential stuffing, password spraying or uncontrolled brute force;
- wireless deauthentication against real networks;
- persistence, payload obfuscation, lateral movement or data exfiltration;
- denial-of-service, destructive modules or unrestricted scanner concurrency;
- publishing target details, credentials, captures or exploit evidence outside the lab record.
