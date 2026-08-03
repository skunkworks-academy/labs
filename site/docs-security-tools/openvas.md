---
id: openvas
title: OpenVAS / Greenbone Vulnerability Management
slug: /openvas/
sidebar_position: 2
keywords: [OpenVAS, Greenbone, vulnerability management, network scanner, CVE]
---

# LAB-SEC-201 — OpenVAS / Greenbone Vulnerability Management

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Greenbone Community Edition</span></div>
  <div><strong>Evidence</strong><span>Validated vulnerability register</span></div>
</div>

## Purpose

Use Greenbone Vulnerability Management to build a bounded network vulnerability assessment, interpret scan quality and convert raw vulnerability-test results into remediation-ready findings.

## Authorised scope

Target only `10.77.0.20` and `10.77.0.50` during the assigned window. Maximum concurrent scan tasks: **2**. Denial-of-service checks, default-credential checks and destructive tests remain disabled.

Download:

- [Northstar scope](/fixtures/security-tools/northstar-scope.yaml)
- [Synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json)

## Learning objectives

- distinguish assets, targets, port lists, scan configurations, tasks and reports;
- explain how feed freshness affects result quality;
- configure a scan that respects timing and traffic limits;
- separate scanner confidence from confirmed exploitability;
- prioritise findings using severity, exposure, asset role and compensating controls.

## Task 1 — Readiness and provenance

Record:

1. Greenbone/OpenVAS version;
2. vulnerability-test feed status and timestamp;
3. scanner time and timezone;
4. source interface and scanner address;
5. permitted targets and exclusions;
6. scan profile and port list.

Do not begin until the feed is available and the target list exactly matches the scope fixture.

## Task 2 — Build the target and task

Create a target named `northstar-bounded-target` containing:

```text
10.77.0.20
10.77.0.50
```

Use a TCP port list appropriate to the known lab services. Create a task named `northstar-bounded-scan`. Set concurrency to a conservative value and schedule only inside the authorised time window.

<div className="checkpoint">
<strong>Checkpoint:</strong> A broad default target is a governance failure even when the scanner itself is correctly installed.
</div>

## Task 3 — Execute and monitor

During execution, capture:

- start and completion timestamps;
- host availability results;
- scan interruptions or timeouts;
- number of vulnerability tests completed;
- any excluded or unreachable services;
- scanner resource pressure.

Stop the task if it resolves outside the lab subnet or creates abnormal load.

## Task 4 — Triage the report

For the two synthetic findings in the evidence pack, complete:

| Field | Required analysis |
|---|---|
| Finding | Exact scanner title and identifier |
| Asset | Host, service and business role |
| Severity | Scanner score and vector where available |
| Confidence | High, medium or low with justification |
| Evidence | Detection method, service response and raw output |
| Validation | Second tool or manual verification step |
| Impact | Plausible effect in the Northstar scenario |
| Remediation | Specific configuration, upgrade or isolation action |
| Retest | Observable secure state after remediation |

## Task 5 — Correlate with Nmap

Use the Nmap section of the synthetic evidence pack or complete `LAB-SEC-202`. Confirm whether the service inventory supports the OpenVAS findings. Record discrepancies such as:

- service found by one tool only;
- version mismatch;
- closed or filtered port during one scan;
- generic product-family detection without a precise version;
- vulnerability test based on banner inference rather than behaviour.

## Deliverables

- exported Greenbone report;
- scan configuration screenshot or settings export;
- finding-validation matrix;
- remediation priority list;
- one-paragraph limitations statement.

## Knowledge check

<details>
<summary>1. Why is a high severity score not sufficient proof of exploitability?</summary>

The scanner may infer risk from a service signature, version or configuration. Exploitability also depends on exact build, exposure, authentication, compensating controls and runtime behaviour.
</details>

<details>
<summary>2. What should be checked before trusting a vulnerability report?</summary>

Feed freshness, target accuracy, service reachability, detection evidence, scanner errors and independent validation.
</details>

<details>
<summary>3. Why retain the raw report after remediation?</summary>

It provides traceability for the original evidence, remediation decision and later retest comparison.
</details>

## References

- [Greenbone Community Documentation](https://greenbone.github.io/docs/latest/)
