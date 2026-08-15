---
id: aircrack-ng
title: Aircrack-ng Offline Capture Analysis
slug: /aircrack-ng/
sidebar_position: 11
keywords: [Aircrack-ng, wireless security, WPA, packet capture, offline analysis]
---

# LAB-WIFI-201 — Aircrack-ng Offline Capture Analysis

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Instructor-provided offline capture</span></div>
  <div><strong>Evidence</strong><span>Wireless control assessment</span></div>
</div>

## Purpose

Use Aircrack-ng tooling to inspect a synthetic 802.11 capture, verify whether authentication evidence is present and assess password-policy exposure without transmitting wireless frames or interacting with a real network.

## Authorised scope

Use only the instructor-provided `northstar-lab.cap` fixture for SSID `NORTHSTAR-LAB`. Live capture, packet injection, deauthentication and assessment of third-party networks are prohibited.

## Learning objectives

- identify access points, clients, channels and authentication evidence in a capture;
- distinguish capture quality from key strength;
- use Aircrack-ng in an offline, bounded workflow;
- explain why wireless password recovery is not a substitute for configuration review;
- recommend stronger authentication and monitoring controls.

## Task 1 — Preserve evidence

Before analysis:

```bash
sha256sum northstar-lab.cap | tee evidence/northstar-lab.sha256
file northstar-lab.cap
```

Record source, acquisition note, hash, analyst, date and tool version. Work from a copy and preserve the original fixture read-only.

## Task 2 — Inventory the capture

Use an offline viewer such as Wireshark or `aircrack-ng` to identify:

- SSID and BSSID;
- channel;
- access point and client addresses;
- encryption/authentication type;
- whether a complete authentication handshake is present;
- capture duration and packet count.

Example:

```bash
aircrack-ng northstar-lab.cap
```

Do not start monitor mode or transmit frames.

## Task 3 — Assess handshake quality

Explain:

- which frames demonstrate the authentication exchange;
- whether the capture is complete enough for offline password-policy validation;
- why the presence of a handshake does not mean the password is weak;
- how capture loss or channel mismatch affects confidence.

Use `wireless.aircrack` in the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) if the binary fixture is unavailable.

## Task 4 — Controlled password-policy validation

The instructor may provide a short, synthetic wordlist containing the known lab passphrase. Run only against the supplied fixture:

```bash
aircrack-ng -e NORTHSTAR-LAB -w northstar-lab-wordlist.txt northstar-lab.cap
```

Record elapsed time, candidate count and result. Do not use leaked password corpora, GPU cracking services or unbounded wordlists.

<div className="checkpoint">
<strong>Checkpoint:</strong> The exercise demonstrates why weak shared secrets are risky. It does not authorise password recovery against real wireless networks.
</div>

## Task 5 — Recommend controls

Address:

- WPA2/WPA3 mode and transition risks;
- enterprise authentication where appropriate;
- passphrase length and uniqueness;
- protected management frames;
- guest and corporate network separation;
- rogue access-point detection;
- rotation and incident-response procedures.

## Evidence requirements

- capture hash and provenance record;
- network inventory;
- handshake-quality analysis;
- bounded password-policy test result;
- control recommendations;
- confirmation that no live transmission occurred.

## Knowledge check

<details>
<summary>1. Does a captured handshake reveal the passphrase directly?</summary>

No. It enables offline verification of candidate secrets; key strength determines resistance.
</details>

<details>
<summary>2. Why hash the capture before analysis?</summary>

To prove evidence integrity and distinguish the original from working copies.
</details>

<details>
<summary>3. Why prohibit deauthentication in this lab?</summary>

It transmits disruptive frames and can affect users and systems beyond the intended evidence-analysis objective.
</details>

## References

- [Aircrack-ng documentation](https://www.aircrack-ng.org/documentation.html)
