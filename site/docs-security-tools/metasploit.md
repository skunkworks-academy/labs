---
id: metasploit
title: Metasploit Vulnerability Validation
slug: /metasploit/
sidebar_position: 14
keywords: [Metasploit, vulnerability validation, exploitation, auxiliary scanner, controlled lab]
---

# LAB-EXP-301 — Metasploit Vulnerability Validation

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate to advanced</span></div>
  <div><strong>Duration</strong><span>90 minutes</span></div>
  <div><strong>Environment</strong><span>Isolated `metasploitable.lab` target</span></div>
  <div><strong>Evidence</strong><span>Check-first validation record</span></div>
</div>

## Purpose

Use Metasploit Framework to correlate scanner evidence, select an appropriate module, perform a non-destructive check and—only after instructor approval—validate exploitability on a resettable target. The lab excludes persistence, lateral movement, credential harvesting and payload evasion.

## Authorised scope

The only permitted target is `10.77.0.50`. The learner workstation and target must be attached to the isolated Northstar lab network with no route to production or the internet. Destructive modules, denial-of-service, brute force, persistence, pivoting and data exfiltration are prohibited.

## Learning objectives

- create a dedicated Metasploit workspace;
- import or correlate Nmap service evidence;
- search modules by service and vulnerability reference;
- review module documentation, targets, options and reliability;
- use `check` before exploitation where supported;
- capture minimal proof and cleanly terminate sessions.

## Task 1 — Initialise the workspace

```text
msfconsole
workspace -a northstar-lab
workspace northstar-lab
setg RHOSTS 10.77.0.50
```

Record Metasploit version, database status, workspace and system time.

## Task 2 — Collect non-exploitative evidence

Use an auxiliary scanner that matches the known service. Example:

```text
search type:auxiliary ftp version
use auxiliary/scanner/ftp/ftp_version
set RHOSTS 10.77.0.50
set RPORT 21
run
```

Compare the result with Nmap and OpenVAS evidence. Do not proceed unless the service and target match the approved lab finding.

## Task 3 — Review a candidate exploit module

The resettable lab target is designed for the classic vulnerable FTP service exercise. Review the module before use:

```text
search type:exploit name:vsftpd
use exploit/unix/ftp/vsftpd_234_backdoor
info
show options
show targets
```

Document:

- vulnerability reference and affected version;
- module rank/reliability;
- required target conditions;
- network connections created;
- expected session type;
- cleanup and snapshot-reset requirements;
- why the module is prohibited outside this target.

## Task 4 — Check first

Where the selected module supports it:

```text
set RHOSTS 10.77.0.50
set RPORT 21
check
```

If `check` is unsupported or inconclusive, stop and record the limitation. Do not substitute a different exploit without a scope amendment.

<div className="checkpoint">
<strong>Checkpoint:</strong> A scanner match and a module match are hypotheses. The check result, exact target state and controlled validation determine whether exploitability is demonstrated.
</div>

## Task 5 — Instructor-approved exploitability validation

Proceed only after the instructor verifies the target snapshot and records approval. Run the selected module once:

```text
run
sessions
```

If a session opens, collect only minimal proof:

```text
sessions -i <session-id>
id
uname -a
exit
```

Do not browse user data, collect credentials, alter files, create accounts or establish persistence.

## Task 6 — Cleanup and reset

```text
sessions -K
jobs -K
workspace
exit -y
```

Then:

1. reset the target snapshot;
2. verify the service returned to its baseline state;
3. confirm no sessions or handlers remain;
4. preserve console output with secrets redacted;
5. record start, approval, exploitation and cleanup timestamps.

Use the `metasploit` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) for browser-only delivery.

## Task 7 — Report the finding

Your finding must distinguish:

- vulnerability identified by scanner;
- service/version evidence;
- module applicability;
- `check` result;
- controlled exploit result;
- privilege obtained;
- business impact in a real environment;
- remediation and compensating controls;
- exact retest method.

## Evidence requirements

- workspace and tool baseline;
- auxiliary-scanner output;
- module-selection rationale;
- instructor approval record;
- check result;
- minimal exploit evidence;
- cleanup and reset confirmation;
- remediation and retest statement.

## Knowledge check

<details>
<summary>1. Why use an auxiliary scanner before an exploit module?</summary>

It strengthens service and version evidence with lower operational impact and reduces blind module selection.
</details>

<details>
<summary>2. What does a successful session prove?</summary>

That the controlled target met the module conditions and permitted code execution or access under the tested circumstances; it does not automatically describe every production environment.
</details>

<details>
<summary>3. Why collect only minimal proof?</summary>

The assessment objective is vulnerability validation. Additional collection increases privacy, operational and legal risk without improving the core evidence.
</details>

## References

- [Metasploit documentation](https://docs.metasploit.com/)
- [Using Metasploit modules](https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html)
