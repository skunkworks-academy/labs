# Instructor guide - LAB-SYS-102

## Purpose

This 60-minute lab teaches operational reasoning around Linux ownership, permissions, processes, services and logs. It deliberately uses a simulated terminal: the aim is to build safe decision-making before a learner receives privileged access to an actual environment.

## Learning outcomes

By the end, a learner should be able to:

1. parse rwx mode alongside user and group ownership;
2. identify a least-privilege file-access design;
3. distinguish a service manager record from a running process record;
4. inspect status and journal context before restarting a service; and
5. document the next safe action and escalation boundary.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Ownership and rwx model | 12 | Owner, group and other are separate permission classes. |
| Permission-decision case | 15 | Challenge any proposal that uses 777 or broad write access. |
| Process/service/log case | 18 | Ask what evidence each command contributes. |
| Assessment and reflection | 15 | Require a terse operations note. |

## Concepts to reinforce

- rwx permissions are evaluated against the file owner, matching group, then other. A numeric mode is not useful without ownership and intended access context.
- For a service-owned configuration file, a sensible pattern is a controlled owner, an application-operations group, and no world write access. The exact mode is contextual; a training answer of 640 with intentional owner/group is more defensible than 777.
- ps describes processes at a moment in time. systemctl status provides service-manager state. journalctl -u gives logged context. These are complementary, not interchangeable.
- Restarting can clear useful evidence and make a transient incident harder to diagnose. Read, record and follow the approved runbook before changing state.

## Answer guide

### Checkpoint 1: permission decision

Correct answer: set deliberate ownership and group access, such as a root-owned file assigned to the approved application-operations group with mode 640, subject to the environment's approved access model. The lab does not teach a universal production command; it tests the least-privilege reasoning.

### Checkpoint 2: service triage

Correct answer: preserve the service status and recent unit logs, compare the timestamp with the symptom and then follow the approved runbook or escalate. Do not grant more file permissions or repeatedly restart a service without evidence.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Owner, group, then other | Linux evaluates the applicable class in that order. |
| 2 | Least-privilege owner/group mode | Access should be intentional, not universally writable. |
| 3 | systemctl status | It reports unit-manager state and recent context. |
| 4 | journalctl -u service | It focuses review on a service's logs. |
| 5 | ps | It lists process information, not a policy or remediation decision. |
| 6 | Record evidence before changing state | This protects diagnosis and auditability. |
| 7 | Follow the approved runbook/escalate | Production changes need authorisation and local context. |

## Evidence of learning

Require learners to submit a short operational note:

- file/service affected and observed symptom;
- two observations from the simulated output;
- proposed least-privilege action;
- change authority or escalation path.

## Accessibility and delivery

- Provide the terminal output in selectable text, not a screenshot.
- Explain every abbreviation on first use: UID, GID, PID and unit.
- Let learners work in pairs on the permission case and compare their reason, not just their numeric mode.

## Reference material

- [GNU Coreutils manual](https://www.gnu.org/software/coreutils/manual/)
- [systemd documentation](https://www.freedesktop.org/software/systemd/man/latest/)
- [Linux kernel administration guide](https://docs.kernel.org/admin-guide/README.html)

