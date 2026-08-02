# Instructor guide — LAB-KAL-201

## Purpose and scope

Use this 55-minute lab to teach forensic discipline with the useful evidence-analysis tooling in Kali Linux. It deliberately does **not** teach live scanning, wireless testing, target enumeration, acquisition or access to systems. The browser page uses invented hash, disk-image and PCAP output only.

Kali Linux Live provides a forensic mode that is intended to avoid touching internal disks or auto-mounting removable media. Its documentation also makes an important operational point: practitioners should validate tools and procedures for their own circumstances. Treat the feature as part of a validated workflow, not a universal guarantee.

## Learner profile

- Junior DFIR, SOC, IT support, security engineering and network-analysis learners.
- Learners should understand files, hashes and basic network terminology.
- Suitable for self-paced delivery, virtual learning or a classroom block.
- No boot media, VM, disk image, PCAP, target system or network access is required.

## Learning outcomes

By the end of the lab, learners can:

1. Start an examination with documented authority, chain-of-custody thinking and a validated read-only workflow.
2. State why hash values, tool commands, offsets and output records make disk-image observations repeatable.
3. Explain why a file path is an observation and not a finding by itself.
4. Read a stored PCAP offline, preserve the applied filter and avoid connecting to hosts named in the capture.
5. Distinguish a forensic toolkit activity from live enumeration or unauthorised access.

## Facilitator safety controls

- Use the browser workbook or Academy-supplied synthetic fixtures only.
- Do not accept actual customer disks, media, traffic captures or endpoint data in a general class session.
- Do not ask learners to boot a real device, mount unknown removable media, probe an address in a capture or scan a live network.
- Make the distinction between **observation**, **inference** and **finding** explicit at each module.
- If an organisation needs incident support, pause the exercise and use its approved legal, privacy, chain-of-custody and response procedures.

## Suggested facilitation plan

| Time | Activity | Instructor cue |
| --- | --- | --- |
| 0–6 min | Frame evidence integrity | Ask what actions can change evidence before a tool even opens it. |
| 6–16 min | Module 1: preservation | Discuss authority, read-only handling, hashes and why automated mounting can be risky. |
| 16–30 min | Module 2: disk triage | Walk through the synthetic hash, partition record and file-list output. Capture the offset in the case note. |
| 30–41 min | Module 3: offline PCAP | Emphasise that an address inside a PCAP is not an invitation to contact it. Preserve the filter exactly. |
| 41–50 min | Knowledge check | Allow retries and review the reasons a live scan is not a forensic next step. |
| 50–55 min | Debrief | Learners produce a one-paragraph observation note and state one limitation. |

## Teaching notes

### Evidence-preserving start

The expected answer includes:

- written authority and scope;
- documented case/source information;
- validated procedure and tooling;
- read-only handling or forensic-image workflow;
- hashes or other integrity controls appropriate to the engagement.

Kali forensic mode helps prevent automatic interaction with internal and removable media, but real work still needs tool validation. Do not promise that a mode, VM or command alone meets legal or evidentiary requirements.

### Disk-image triage

The `case-disk.raw` transcript is simulated. It models this fact chain:

1. Calculate and record the image SHA-256.
2. Record observed partition information from the image.
3. Record the relevant offset used to query a file system.
4. Record file-list results as observations, with the exact command and version when running a real engagement.

A path such as `LabEvidence/incident-notes.txt` is not proof of a compromise. It is a clue that needs scope, provenance and corroboration.

### Offline PCAP analysis

The PCAP transcript uses the documentation-only domain `telemetry.training.invalid` and a documentation-only IP range. A correct analyst note includes the capture hash, exact offline filter, observed rows, timestamps and the limitation that the output alone does not identify the originating user, process or intent.

The learner should not scan, browse to or otherwise contact values displayed in a network capture unless a separate authorised procedure explicitly requires it.

## Checkpoint and assessment key

| Item | Correct response | Rationale |
| --- | --- | --- |
| Safety checkpoint | Authority, case detail and validated read-only/forensic-image workflow | Preserves scope and integrity before examination. |
| Disk checkpoint | Record hash, `mmls`/`fls` observations and offset | Makes the examination repeatable. |
| PCAP checkpoint | Preserve hash, exact offline filter and output | A PCAP does not authorise a live follow-up connection. |
| Q1 | Authority, scope and procedure | Required before an evidence examination. |
| Q2 | Avoid automatic interaction with internal/removable media | The relevant forensic-mode characteristic. |
| Q3 | Exact data version examined | Hashes support reproducibility. |
| Q4 | Reproduce image-layout observation | Offset records where the file-system view came from. |
| Q5 | Stay offline and preserve filter/observation | Live probing expands scope and changes risk. |
| Q6 | Local learning progress only | The page is not an evidence record or credential. |

## Evidence and accessibility

- The terminal transcript has supporting text and does not depend only on visual styling.
- Interactive controls are keyboard operable; feedback uses live regions.
- Browser-local progress is not a learner identity assertion and can disappear when site data is cleared.
- Offer a worksheet with columns for **artefact**, **integrity identifier**, **tool/query**, **observed fact**, **limitation** and **next authorised action**.

## Future live-runtime gate

Do not make this a live Kali exercise until the Academy control plane supplies a private session, synthetic read-only images and PCAPs, no public IP, default-deny egress, no target range, session expiry, audit logs, automatic cleanup, facilitator approval and an explicit acceptable-use policy.

## References

- Kali Linux forensic mode: https://www.kali.org/docs/general-use/kali-linux-forensics-mode/
- Kali tools documentation: https://www.kali.org/tools/
