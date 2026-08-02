# LAB-REM-201 — REMnux Triage & Memory Forensics

An intermediate, browser-only learning lab that introduces safe malware-analysis and memory-forensics reasoning with simulated evidence. It does not include a sample, memory image, runtime VM or external network connection.

## Learner flow

1. Establish the authorised, isolated analysis boundary.
2. Preserve static observations: fixture hash, type and visible strings.
3. Correlate simulated process and socket records without calling one indicator a verdict.
4. Complete the six-question knowledge check and create a local learning record.

## Safety boundary

- Synthetic output only; no executable or memory image is bundled.
- Do not run unknown files, use a personal workstation as an analysis target or connect an analysis VM to public networks.
- Real incident work requires written authority, evidence-handling controls and the organisation’s incident-response process.

## Future hands-on runtime

The future runtime is an instructor-managed isolated VM with no public IP, default-deny egress, approved fixtures only, hard session expiry and snapshot/reset cleanup. It is not enabled by this static site.

## References

- REMnux documentation: https://docs.remnux.org/
- REMnux overview: https://remnux.org/
- Instructor guide: [instructor-guide.md](./instructor-guide.md)
