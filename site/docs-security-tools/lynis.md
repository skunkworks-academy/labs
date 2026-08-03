---
id: lynis
title: Lynis Linux Security Audit
slug: /lynis/
sidebar_position: 13
keywords: [Lynis, Linux audit, hardening, system security, compliance]
---

# LAB-SYS-201 — Lynis Linux Security Audit

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>`linux-audit.lab`</span></div>
  <div><strong>Evidence</strong><span>Hardening backlog + retest plan</span></div>
</div>

## Purpose

Use Lynis to perform a local Linux security audit, interpret warnings and suggestions in system context, and convert the report into a prioritised, change-controlled hardening backlog.

## Authorised scope

Audit only `linux-audit.lab`. The lab is read-oriented: do not apply automated remediation, change boot configuration or restart services until the instructor authorises the change phase.

## Learning objectives

- record system and audit provenance;
- run Lynis with explicit log and report destinations;
- interpret warnings, suggestions and hardening index cautiously;
- validate findings using native Linux commands;
- plan remediation with rollback and service-impact considerations.

## Task 1 — Baseline the host

```bash
hostnamectl
uname -a
cat /etc/os-release
id
sudo -l
lynis show version
```

Record host identity, OS, kernel, time, analyst account and privilege level.

## Task 2 — Run the audit

```bash
sudo mkdir -p /var/tmp/northstar-evidence
sudo lynis audit system --quick \
  --log-file /var/tmp/northstar-evidence/lynis.log \
  --report-file /var/tmp/northstar-evidence/lynis-report.dat
```

Do not enable automatic fixes. Preserve both files before interpretation.

## Task 3 — Interpret report categories

Group results into:

- authentication and account controls;
- SSH and remote access;
- filesystems and permissions;
- kernel and process hardening;
- logging and monitoring;
- packages and patching;
- network configuration;
- boot and service controls;
- cryptography and certificates.

Use the `lynis` section of the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) if a live host is unavailable.

## Task 4 — Validate two findings

For each selected warning or suggestion, run native commands to confirm current state. Examples:

```bash
sshd -T | grep -i passwordauthentication
systemctl status unattended-upgrades --no-pager
find /opt/northstar -xdev -type f -perm /022 -ls
systemctl is-enabled systemd-journald
```

Choose commands appropriate to the installed distribution. Do not change the system during validation.

<div className="checkpoint">
<strong>Checkpoint:</strong> The hardening index is a directional metric, not a compliance certificate or a substitute for risk analysis.
</div>

## Task 5 — Build a hardening backlog

For at least five items, document:

| Control | Current state | Risk | Change | Owner | Rollback | Test | Priority |
|---|---|---|---|---|---|---|---|

Prioritise based on exposure, privilege, exploitability, operational impact and existing compensating controls.

## Task 6 — Retest design

Write exact retest commands and expected secure output. Example:

```text
Retest: sshd -T | grep passwordauthentication
Expected: passwordauthentication no
```

## Evidence requirements

- system baseline;
- Lynis log and report;
- finding-category summary;
- two native-command validations;
- five-item hardening backlog;
- rollback and retest plan.

## Knowledge check

<details>
<summary>1. Why should findings be validated with native commands?</summary>

To confirm actual system state, distribution behaviour and configuration precedence before changing the host.
</details>

<details>
<summary>2. Why avoid automatic remediation?</summary>

Security changes can disrupt authentication, networking, boot and applications; they require ownership, testing and rollback.
</details>

<details>
<summary>3. Does a higher hardening index always mean lower risk?</summary>

No. Risk depends on asset role, exposure, threats, configuration quality and control effectiveness, not one aggregate score.
</details>

## References

- [CISOfy Lynis documentation](https://docs.cisofy.com/)
