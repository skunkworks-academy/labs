# Instructor guide - LAB-AZ-101

## Purpose

This 60-minute browser workbook introduces Azure landing-zone reasoning. It uses a fictional Academy workload and intentionally makes no Azure or Entra connection. It should prepare learners to participate in governed cloud design conversations, not encourage them to apply tenant-wide controls without authority.

## Learning outcomes

By the end, learners should be able to:

1. explain why a landing zone is a governed foundation rather than a single template;
2. describe the intended governance role of management groups, subscriptions, resource groups and resources;
3. distinguish Azure RBAC from Azure Policy; and
4. outline a safe workload onboarding and operating path.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Resource hierarchy | 15 | Connect scope to billing, policy, access and workload accountability. |
| Policy and RBAC | 20 | Use the same scenario to make the difference between authorisation and compliance clear. |
| Workload onboarding | 15 | Turn guardrails into a consumable product for workload teams. |
| Assessment and debrief | 10 | Ask learners to explain an exception and its narrowest safe scope. |

## Concepts to reinforce

- Azure landing zones provide a flexible foundation for governing, securing and scaling workloads in a multi-subscription environment. They are not a substitute for workload architecture.
- Use management groups for shared governance across subscriptions; use subscriptions as accountable boundaries for billing, access and policy; and use resource groups for related resource lifecycle and operations.
- Azure RBAC decides which authenticated principal can take which authorised action at a scope. Azure Policy evaluates and can enforce resource configuration standards. They complement rather than replace each other.
- Named identities, least privilege, access review, monitored logs, cost ownership, documented exceptions and recovery testing are normal operating controls, not paperwork added after deployment.

## Answer guide

### Checkpoint 1: hierarchy

Correct answer: start with a dedicated, governed production subscription under the appropriate management structure. It provides a clearer accountable boundary than putting the workload into any unrelated subscription or treating the tenant root as its workload home.

### Checkpoint 2: guardrails

Correct answer: use least-privilege RBAC for authorised action and scoped Azure Policy guardrails for resource standards. The answer must also recognise monitoring and operational ownership.

### Checkpoint 3: onboarding

Correct answer: an authorised review confirms ownership, access scope, policy compliance, logging, recovery evidence and cost controls. A loading URL is not proof of a secure, governable deployment.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Govern, secure and scale workloads through a foundation | The landing zone is a governance architecture. |
| 2 | Subscription | It is a practical boundary for billing, access and policy scope. |
| 3 | Which principal can act at which scope | This is the RBAC decision. |
| 4 | Azure Policy | It applies resource configuration standards. |
| 5 | Attribute resource, cost and ownership | Tags support accountability and cost governance. |
| 6 | Named identities with the smallest role/scope | This applies least privilege. |
| 7 | Authority, current guidance, approval and recovery/change plan | The simulation grants no tenant authority. |

## Evidence of learning

Ask learners to draw a one-page fictional onboarding design containing:

- management-group and subscription placement;
- workload team, platform team and budget-owner responsibilities;
- two RBAC assignments and two Policy guardrails, each with a scope and rationale;
- required tags, logs, recovery proof and exception route; and
- a short description of how the design avoids persistent broad Owner assignments.

## Accessibility and delivery

- Use the phrase "authorised action" for RBAC and "resource rule" for Policy until learners are comfortable with the product names.
- Do not teach a UI sequence as a production recipe; portal labels and deployment accelerators change.
- A safe live follow-on should use a dedicated approved sandbox subscription, time-bound access, defined budget and instructor oversight.

## Reference material

- [What is an Azure landing zone?](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/)
- [Azure landing-zone design principles](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-principles)
- [Azure governance design area](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/governance)
- [Azure identity and access management design area](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/identity-access)
