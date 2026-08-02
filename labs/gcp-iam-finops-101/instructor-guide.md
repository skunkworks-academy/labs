# Instructor guide - LAB-GCP-101

## Purpose

Use this 60-minute browser workbook to make Google Cloud project ownership, IAM and FinOps concrete before learners access a real cloud organisation. It intentionally does not require a Google account or create a bill.

## Learning outcomes

By the end, learners should be able to:

1. place a workload project inside an organisation and folder structure that reflects its purpose;
2. form a least-privilege IAM request around a named principal, role, scope and review;
3. identify why shared privileged identities and copied long-lived keys create risk; and
4. build a label, budget and response process for accountable cloud spending.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Resource hierarchy | 15 | Explain inheritance and why a project should be owned in a managed structure. |
| IAM design | 20 | Make the principal, role, scope and duration/review visible in every access request. |
| FinOps guardrails | 15 | Distinguish notifications from hard technical controls; discuss ownership and response. |
| Assessment and debrief | 10 | Ask learners to justify an access request and cost exception. |

## Concepts to reinforce

- The organisation is the root node for a managed Google Cloud hierarchy. Folders group projects by purpose; projects provide a working resource and billing/access boundary.
- IAM is scoped. Prefer a named human or workload identity with the smallest role and scope that meets an authorised task. Review higher-risk permissions regularly.
- Service-account keys are credentials. Avoid long-lived keys where a safer identity or federation workflow is available, and never copy keys into repositories, documentation or chat.
- Labels are key-value metadata used to organise supported resources and cost reporting. Label schemes must be agreed before resources are created.
- Budgets and budget alerts inform a response. They should be combined with resource controls, capacity limits, lifecycle cleanup and accountable decision-making; they are not a universal instantaneous hard-stop guarantee.

## Answer guide

### Checkpoint 1: project placement

Correct answer: use a named project inside the appropriate production folder of the managed organisation. This lets baseline governance apply and preserves accountable workload ownership.

### Checkpoint 2: IAM design

Correct answer: use a named identity with an approved deploy role at the smallest project/service scope and review it. Do not grant a broad permanent organisation role or distribute a privileged long-lived key.

### Checkpoint 3: FinOps plan

Correct answer: agreed labels, a budget owner, threshold notifications, investigation and a documented response/cleanup route. Explicitly correct learners who describe a budget as a precise hard cap.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Managed governance/access scopes | The hierarchy establishes where inheritance can apply. |
| 2 | Named owned project in the managed hierarchy | It provides an accountable workload boundary. |
| 3 | Smallest role/scope for a named principal | This is least privilege. |
| 4 | Copying a long-lived privileged key | It creates credential exposure and weak auditability. |
| 5 | Cost attribution, organisation and reporting | These are appropriate label benefits. |
| 6 | Threshold signal and agreed response | This is the realistic budget-alert model. |
| 7 | Approved authority and a safe change plan | The lab cannot grant real cloud access. |

## Evidence of learning

Ask learners to create an access-and-cost design note for a fictional lab project containing:

- the proposed hierarchy placement and accountable owner;
- a single access request (principal, task, role, scope, approval, review date);
- prohibited credential-handling practices;
- the labels required at resource creation;
- budget thresholds, notification recipients and the action after an alert; and
- a cleanup or circuit-breaker proposal for unusually costly usage.

## Accessibility and delivery

- Explain “principal” as the identity receiving a permission before using the IAM term repeatedly.
- Leave product-specific role names out of the exercise unless the group is using the current official role catalogue in an approved sandbox.
- A live next step requires an organisation-controlled project, budget-capable owner, logging, approved image/service controls and a documented cleanup path.

## Reference material

- [Google Cloud billing resource organisation and access checklist](https://cloud.google.com/billing/docs/onboarding-checklist)
- [Google Cloud labels overview](https://cloud.google.com/resource-manager/docs/labels-overview)
- [Create budgets and budget alerts](https://cloud.google.com/billing/docs/how-to/budgets)
- [Cloud Billing reports and labels](https://cloud.google.com/billing/docs/how-to/reports)
