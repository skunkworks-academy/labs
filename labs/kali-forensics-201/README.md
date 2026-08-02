# LAB-KAL-201 — Kali Linux Evidence & Network Forensics

An intermediate, browser-only learning lab for evidence preservation, disk-image triage and offline PCAP analysis. It deliberately avoids live scanning, acquisition and access to any real network or system.

## Learner flow

1. Start with documented authority and a validated read-only evidence workflow.
2. Record simulated hash, partition and file-inventory facts from a raw image.
3. Read a stored PCAP with an offline filter and preserve the query used.
4. Complete the six-question knowledge check and create a local learning record.

## Safety boundary

- Synthetic output only; no disk image or PCAP is bundled.
- Do not probe, scan or contact a host mentioned in an artefact.
- Real-world forensic work needs legal authority, validated tools, approved write protection and a documented chain of custody.

## Future hands-on runtime

The future runtime is an instructor-managed Kali VM with read-only synthetic fixtures, no public IP, default-deny egress, no live target range and automatic session reset.

## References

- Kali Linux forensic mode: https://www.kali.org/docs/general-use/kali-linux-forensics-mode/
- Kali tools documentation: https://www.kali.org/tools/
- Instructor guide: [instructor-guide.md](./instructor-guide.md)
