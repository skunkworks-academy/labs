# Instructor guide — LAB-REM-201

## Purpose and scope

Use this 55-minute lab to introduce the analytical discipline that should surround REMnux-based malware analysis and memory forensics. The browser lab uses invented terminal output only. It is not an execution lab, does not include malware, and must not be represented as incident-response practice against a real case.

REMnux is a Linux toolkit for reverse engineering and analysing malicious software. This exercise focuses on the safer first steps: authority, isolation, provenance, static facts and cross-source corroboration.

## Learner profile

- Junior SOC, DFIR, malware-analysis or security-engineering learners.
- Learners who already understand basic files, processes and IP addressing.
- Suitable for self-paced delivery, virtual facilitation or a 60-minute classroom block.
- No account, VM, package installation, sample, memory image or command line is required.

## Learning outcomes

By the end of the lab, learners can:

1. State why an unknown artefact needs an authorised and isolated analysis boundary.
2. Record a fixture’s hash, broad type, tool command and selected string output as reproducible facts.
3. Explain why a file type or readable string is a lead rather than a behaviour or intent verdict.
4. Identify the process-parent, socket, module and timeline questions that help correlate a memory artefact.
5. Describe the limits of a local browser completion record.

## Facilitator safety controls

- Keep the activity in its browser-only form unless the Academy has approved the future isolated runtime design.
- Do not introduce a learner-supplied file, production log, credential, memory image or external URL into the session.
- Use the words *synthetic*, *simulated* and *authorised* consistently. The supplied hash, address, domain and process names are fictional.
- Do not ask learners to run an unknown executable, relax host controls or connect a VM to an external network.
- If a learner reports a real suspicious artefact, stop the exercise and route it through the client or employer incident-response process.

## Suggested facilitation plan

| Time | Activity | Instructor cue |
| --- | --- | --- |
| 0–5 min | Frame the evidence boundary | Ask: “What must be true before we touch an unknown artefact?” Surface authority, isolation and recoverability. |
| 5–13 min | Module 1: safety checkpoint | Contrast an authorised disposable VM with a daily workstation or bridged network. |
| 13–25 min | Module 2: static triage | Reinforce the sequence hash → type → strings → note. Ask learners to separate an observation from an interpretation. |
| 25–38 min | Module 3: memory correlation | Read the synthetic process/socket table together. Ask what additional data would strengthen or weaken a hypothesis. |
| 38–48 min | Knowledge check | Allow individual retries. Review why the wrong answers overstate evidence or expand scope. |
| 48–55 min | Debrief | Ask each learner to write a three-line evidence note: source, observed fact and next question. |

## Teaching notes

### Static triage sequence

The lab transcript models a defensible record:

1. Identify the fixture and capture a cryptographic hash.
2. Record the exact command/tool context that produced an observation.
3. Record broad file-type information without treating it as intent.
4. Record visible strings as leads, including the context in which they were seen.
5. Separate the analyst’s hypothesis from the raw observation.

The string `analysis.training.invalid` is expressly a documentation-only training indicator. The address `198.51.100.21` is also a documentation-only value in this scenario. Learners must not contact either value.

### Memory-forensics reasoning

The `update-helper.exe` and socket row are designed to prompt questions, not conclusions. Good questions include:

- Which process launched PID 3892, and is that parentage expected in the case timeline?
- What command line, loaded modules, file handles and user context are associated with it?
- Does another authorised evidence source corroborate the connection record?
- Does the stated lab design explain the use of documentation-only networking indicators?

Do not call an artefact malicious based solely on a process name, imported library, string or socket row.

## Checkpoint and assessment key

| Item | Correct response | Rationale |
| --- | --- | --- |
| Safety checkpoint | Authorised disposable VM, clean snapshot, approved fixture and restricted network | Keeps analysis recoverable and separate from trusted environments. |
| Static checkpoint | Preserve hash, command, type and strings as leads | Creates reproducible facts before interpretation. |
| Memory checkpoint | Correlate parentage, command line, modules, timeline and case context | A single memory artefact cannot establish intent. |
| Q1 | SHA-256 hash | Identifies the exact fixture version. |
| Q2 | Restricted by default | Public/bridged access is not the safe baseline. |
| Q3 | A lead requiring correlation | A string alone is not a verdict. |
| Q4 | Parent process, command line and timeline | Connects a process to its operating context. |
| Q5 | Synthetic documentation-only indicator | The output is invented for training. |
| Q6 | Local learning progress only | This page issues no verified credential or case record. |

## Evidence and accessibility

- All answers are keyboard operable and feedback is announced through live regions.
- The terminal transcript is paired with explanatory text; do not rely only on colour or monospaced styling.
- Progress remains in browser-local storage. Clearing website data, printing or moving devices does not create a verified record.
- For learners needing more support, provide a simple worksheet with columns for **source**, **command**, **observed fact**, **hypothesis** and **next question**.

## Future live-runtime gate

Do not convert this into a live sample-execution lab until the Academy has a private control plane with approved image versions, no public IP, default-deny egress, immutable fixture delivery, session expiry, snapshot/reset, audit logs, instructor approval and an incident-handling procedure.

## References

- REMnux documentation: https://docs.remnux.org/
- REMnux overview: https://remnux.org/
- REMnux memory-forensics section: https://docs.remnux.org/discover-the-tools/perform%2Bmemory%2Bforensics
