# Instructor guide - LAB-SEC-101

## Purpose

This 55-minute lab teaches safe first-pass phishing triage. The synthetic message is intentionally non-actionable: the learner does not open a link, download a file or determine a real-world verdict. They practise preservation, evidence assessment, reporting and appropriate escalation.

## Learning outcomes

By the end, a learner should be able to:

1. separate a display name and visible claim from SMTP/header evidence;
2. explain what SPF, DKIM and DMARC outcomes contribute to a triage decision;
3. identify safe handling actions for a suspicious message; and
4. write a concise evidence-led triage note.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Safety boundary and evidence sources | 10 | No clicking, replying, forwarding externally or opening attachments. |
| Header activity | 17 | Authentication outcomes are signals; inspect alignment and context. |
| Disposition activity | 13 | Report, preserve and contain through the approved route. |
| Assessment and triage note | 15 | Explain uncertainty, confidence and next owner. |

## Concepts to reinforce

- The From display name is not authentication evidence. Check routing and authentication results without assuming a single field proves intent.
- SPF evaluates whether an IP is permitted to send for an envelope domain; DKIM provides a signed-domain result; DMARC uses aligned SPF and/or DKIM outcomes with a domain policy. These outcomes add evidence but a pass does not prove a message is benign.
- In a live organisation, use its approved Report Phishing workflow. Preserve message metadata, do not distribute a suspicious message further, and follow incident procedures if a user interacted.
- The lab's identifiers use non-routable/documentation-only values. They must not be searched, visited or treated as targets.

## Answer guide

### Checkpoint 1: header evidence

Correct answer: record the display claim, envelope/authentication outcomes and the mismatch or concern in a triage note; then use the approved reporting path. A learner should not declare a final attribution based on one header line.

### Checkpoint 2: safe disposition

Correct answer: report through the approved security channel, preserve the message for the security team and advise the recipient not to click, reply or open any attachment. If interaction is confirmed, escalate as an incident using the organisation's playbook.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Preserve and report through the approved path | It retains evidence without spreading the message. |
| 2 | SPF, DKIM and DMARC are triage signals | They require context and alignment interpretation. |
| 3 | Do not open links/attachments for confirmation | This can trigger harm or destroy evidence. |
| 4 | Display name is not proof of sender identity | It is easily chosen by a sender. |
| 5 | Document evidence, confidence and next action | A triage note must be useful to the next analyst. |
| 6 | Escalate an interaction under the incident process | The risk changes once the user clicks or supplies credentials. |
| 7 | Synthetic documentation-only indicator | The lab does not authorise external investigation. |

## Evidence of learning

Use this structured note:

| Field | Learner response |
| --- | --- |
| Scope | One sentence on the message and recipient context |
| Evidence | Two header/authentication observations |
| Confidence | Low, medium or high and why |
| Action | Report, preserve and escalation owner |

## Accessibility and delivery

- Make raw headers selectable and keep their line wrapping intact.
- Read dense header fields slowly and decode one field at a time.
- Allow learners to refer to the header legend while answering questions.

## Reference material

- [CISA - BOD 18-01: Enhance Email and Web Security](https://www.cisa.gov/news-events/directives/bod-18-01-enhance-email-and-web-security)
- [RFC 7489 - Domain-based Message Authentication, Reporting, and Conformance](https://www.rfc-editor.org/rfc/rfc7489)
- [RFC 7208 - Sender Policy Framework](https://www.rfc-editor.org/rfc/rfc7208)

