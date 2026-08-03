---
id: kismet
title: Kismet Passive Wireless Reconnaissance
slug: /kismet/
sidebar_position: 12
keywords: [Kismet, wireless monitoring, passive reconnaissance, rogue access point, Wi-Fi]
---

# LAB-WIFI-202 — Kismet Passive Wireless Reconnaissance

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Recorded Kismet dataset</span></div>
  <div><strong>Evidence</strong><span>Wireless asset and anomaly report</span></div>
</div>

## Purpose

Use Kismet data to build a passive wireless inventory, distinguish access points from clients and identify configuration drift or rogue-network indicators without transmitting traffic.

## Authorised scope

Primary delivery uses the recorded `northstar-lab.kismet` fixture. Live capture is permitted only inside an instructor-controlled RF environment. Packet injection, association attempts and deauthentication are prohibited.

## Learning objectives

- understand Kismet server, data source, device and log concepts;
- identify SSIDs, BSSIDs, channels, encryption and client relationships;
- detect duplicate, hidden, stale or unexpected wireless networks;
- separate passive observations from verified ownership;
- produce a wireless inventory and anomaly-handling plan.

## Task 1 — Record dataset provenance

Capture:

- Kismet version;
- dataset name and hash;
- collection date and location label;
- data-source type;
- whether GPS data exists;
- analyst and evidence-copy location.

## Task 2 — Build the wireless inventory

Using the Kismet web interface or exported data, list:

| Device | Type | SSID | BSSID/MAC | Channel | Encryption | First/last seen | Confidence |
|---|---|---|---|---:|---|---|---|

Use `wireless.kismet` in the [synthetic evidence pack](/fixtures/security-tools/synthetic-evidence-pack.json) when the recorded database is unavailable.

## Task 3 — Identify relationships

Map:

- access points broadcasting the same SSID;
- clients associated with each access point;
- probe requests for remembered networks;
- devices changing channels or identities;
- manufacturer/OUI information and its limitations.

Explain why a MAC vendor lookup is not proof of device ownership.

## Task 4 — Investigate the unexpected SSID

The dataset includes `NORTHSTAR-GUEST-OLD`. Determine:

1. first and last seen times;
2. BSSID and channel;
3. encryption mode;
4. associated clients;
5. signal pattern or location evidence;
6. whether the network could be stale configuration, a test device or a rogue access point;
7. what additional evidence is needed before containment.

<div className="checkpoint">
<strong>Checkpoint:</strong> Passive detection supports a hypothesis. Ownership and intent require inventory, controller, switch-port and physical-location evidence.
</div>

## Task 5 — Design monitoring controls

Recommend:

- approved SSID/BSSID baseline;
- alerting for new or changed networks;
- retention and access control for wireless logs;
- privacy-safe handling of client identifiers;
- investigation workflow with network and facilities teams;
- response actions that avoid disrupting legitimate networks.

## Evidence requirements

- dataset provenance and hash;
- wireless inventory;
- relationship diagram;
- unexpected-SSID investigation record;
- monitoring and response plan;
- statement confirming passive-only analysis.

## Knowledge check

<details>
<summary>1. What is the benefit of passive wireless monitoring?</summary>

It can inventory and observe wireless activity without associating with or actively probing devices.
</details>

<details>
<summary>2. Why can a hidden SSID still be discovered?</summary>

Management traffic and client behaviour can reveal network identifiers or relationships even when beaconing is limited.
</details>

<details>
<summary>3. Why protect client MAC data?</summary>

It can support device tracking and may be sensitive operational or personal data.
</details>

## References

- [Kismet documentation](https://www.kismetwireless.net/docs/)
