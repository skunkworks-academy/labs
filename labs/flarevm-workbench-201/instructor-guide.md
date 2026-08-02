# Instructor guide — LAB-FLR-201

## Purpose and scope

Use this 60-minute lab to teach the operational model behind a Windows reverse-engineering workbench. The page uses fabricated static and telemetry output. It does not install FLARE VM, deliver a Windows VM, contain an executable or ask a learner to weaken their own device.

FLARE VM is a collection of installation scripts that set up and maintain a Windows reverse-engineering environment. Its upstream project states that it should only be installed on a VM. The Academy lesson turns that prerequisite into a wider practice: controlled image ownership, snapshot recovery, restricted networking, traceable tool output and safe reset.

## Learner profile

- Analysts, SOC staff, Windows administrators and security-engineering learners.
- Learners should already understand basic Windows processes and files.
- Suitable for self-paced delivery, virtual instruction or an instructor-led workshop.
- No VM, elevated privileges, installer, download or sample is required.

## Learning outcomes

By the end of the lab, learners can:

1. Explain why the analysis workbench must be a disposable virtual machine rather than a daily host or production asset.
2. Identify the purpose of a known-good image record, a clean snapshot and restricted/host-only networking.
3. Preserve static observations with fixture hash, tool provenance and a fact-versus-hypothesis distinction.
4. Interpret a pre-recorded process/file/network timeline without treating one event as proof.
5. Close a controlled activity by preserving authorised output and resetting the environment.

## Facilitator safety controls

- Keep the session browser-only until the Academy’s staff-managed Windows image and control plane exist.
- Do not ask learners to run FLARE VM’s installer, turn off endpoint protection, change script-execution policy, download tools or execute an unknown file.
- Do not bring malware, customer artefacts, telemetry or passwords into a public learning page.
- If live work is later approved, learners receive a constrained session from a staff-owned image; they never receive an unrestricted Windows VM or cloud subscription.
- Stop and escalate any real-world suspicious-file discussion according to the organisation’s incident-response procedure.

## Suggested facilitation plan

| Time | Activity | Instructor cue |
| --- | --- | --- |
| 0–7 min | Position FLARE VM | Explain the difference between a useful toolkit and a safe operational environment. |
| 7–17 min | Module 1: managed VM boundary | Ask learners to name the recovery point and why bridged networking is unsuitable. |
| 17–31 min | Module 2: static evidence | Walk through hash, simulated PE metadata and decoded strings. Label raw observation versus hypothesis. |
| 31–43 min | Module 3: telemetry | Read process launch, file write and synthetic network rows as a timeline. Ask what evidence would be needed to interpret it. |
| 43–53 min | Knowledge check | Let learners retry. Debrief the unsafe options, especially use of a host workstation. |
| 53–60 min | Wrap-up | Learners create a short runbook: prepare → observe → preserve → stop → reset. |

## Teaching notes

### Workbench lifecycle

Use this simplified lifecycle:

1. **Prepare:** use the approved image and record its version.
2. **Recover:** create or verify a clean snapshot before a session.
3. **Constrain:** keep network access restricted; permit only documented lab services if ever needed.
4. **Observe:** preserve tool, fixture, timestamp and output provenance.
5. **Close:** export authorised learning artefacts, stop the session and restore known-good state.

This lifecycle remains important even when tooling becomes more automated. It protects the learner’s host, Academy infrastructure and the repeatability of the lesson.

### Static-workbench output

The page’s PE-style record, imports and decoded strings are fabricated. They demonstrate which facts to preserve, not how to determine a file’s intent. The good note states the exact observed fields, tool/version and fixture hash. It must not claim malware from the label `Portable Executable-style`, a familiar DLL name or a string.

### Dynamic-telemetry output

The process, filesystem and FakeNet-style events are also fabricated. They model what an analyst would seek to correlate:

- source process and parent process;
- execution/observation timestamps;
- files read or written;
- network request associated with a process;
- lab configuration that explains synthetic DNS or HTTP records.

The correct close is to preserve approved outputs, stop the disposable session and revert/reset. It is never to connect the VM to the public internet or leave it available for another learner.

## Checkpoint and assessment key

| Item | Correct response | Rationale |
| --- | --- | --- |
| Safety checkpoint | Staff-managed disposable VM with recorded image, clean snapshot and restricted networking | FLARE VM is designed for a VM; this makes the exercise recoverable. |
| Static checkpoint | Preserve hash, tool/version and observed output; label hypotheses | Separates fact from interpretation. |
| Telemetry checkpoint | Preserve/correlate the timeline and revert the session | A synthetic event line is not a real-world conclusion. |
| Q1 | Virtual machine | This is the upstream FLARE VM requirement. |
| Q2 | Return to known-good state | Snapshot is a recovery control. |
| Q3 | Cryptographic hash | Anchors output to a specific fixture. |
| Q4 | A fact requiring context | Imports do not prove intent. |
| Q5 | Restricted or host-only access | Analysis workbench should not join trusted networks by default. |
| Q6 | Preserve, stop and reset | Closes the controlled session safely. |

## Evidence and accessibility

- The output transcript is paired with plain-language explanation and does not rely solely on colour.
- Controls are keyboard accessible; feedback is announced through live regions.
- The printable record is expressly local-only. It is not a verified completion certificate, proof of skill, install approval or evidence-handling authorisation.

## Future live-runtime gate

Before enabling a live FLARE VM exercise, require staff-built and patched images, image-version inventory, no public IP, private browser gateway, egress control, credentials isolated from the image, approved non-malicious fixtures, hard session expiry, automatic disposal, audit logs, cost controls and a documented incident/abuse playbook.

## References

- FLARE VM project and requirements: https://github.com/mandiant/flare-vm
- FLARE Learning Hub: https://github.com/mandiant/flare-learning-hub
