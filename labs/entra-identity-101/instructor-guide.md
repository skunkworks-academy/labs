# Instructor guide - LAB-ID-101

## Purpose

This 60-minute simulated identity design lab introduces Microsoft Entra concepts through a fictional Academy tenant. It is deliberately not connected to a live tenant; learners need authorisation, a documented change plan and an approved emergency-access procedure before applying an identity policy in production.

## Learning outcomes

By the end, a learner should be able to:

1. distinguish users, groups, directory roles, authentication methods and Conditional Access policies;
2. choose least-privilege assignments for routine learner, instructor and support work;
3. describe a staged Conditional Access rollout; and
4. account for monitored emergency access and tenant lockout risk.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Identity-control model | 12 | Match each control to the right problem. |
| Least-privilege activity | 15 | A role is not a substitute for group membership or user lifecycle management. |
| Conditional Access activity | 18 | Start in report-only/pilot mode, monitor impact, then expand deliberately. |
| Assessment and architecture note | 15 | Have learners explain their exclusion and emergency-access reasoning. |

## Concepts to reinforce

- A user is an identity; a group is a management and assignment construct; a directory role grants administration capabilities; MFA verifies a sign-in; Conditional Access evaluates conditions and applies access controls.
- Prefer group-based assignment and the minimum administrative role that matches a specific task. Avoid making users Global Administrators for ordinary support or learning duties.
- A Conditional Access policy should be planned, tested and monitored. A broad blocking policy can lock out users or administrators if deployed without scope, exclusions and a recovery plan.
- Microsoft documents emergency access accounts as a tenant-resilience control. Production governance must follow the organisation's policy and current Microsoft guidance; the lab does not prescribe a one-click production configuration.

## Answer guide

### Checkpoint 1: least-privilege design

Correct answer: use the learner/instructor group for normal platform access and assign a narrowly scoped support role only where the individual has an approved operational task. Do not use Global Administrator for content publication, learner support or routine group management.

### Checkpoint 2: Conditional Access rollout

Correct answer: define the goal and target group, validate exclusions and emergency access, start in report-only or a pilot group, review sign-in impact and expand under change control. A first production action should not be a tenant-wide block with no test or recovery path.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Group | It enables scalable assignment and lifecycle management. |
| 2 | Least-privilege directory role | Routine work should not receive the broadest administrative role. |
| 3 | Authentication method/MFA | It proves or strengthens the sign-in. |
| 4 | Conditional Access | It applies a conditional access decision at sign-in. |
| 5 | Pilot/report-only plus monitoring | This reduces lockout and user-impact risk. |
| 6 | Monitored emergency access | It supports recovery where normal controls fail. |
| 7 | Change control and authorised tenant review | The browser workbook cannot change a real tenant. |

## Evidence of learning

Ask learners for a one-page design note:

- the user population and intended resource;
- group and role assignments;
- policy signal, condition and control;
- pilot and monitoring plan;
- emergency-access and rollback handling.

## Accessibility and delivery

- Use plain language before introducing Entra-specific terms.
- State clearly that portal labels can change; teach the control objective rather than memorising a UI path.
- Let learners use the role map while completing the assessment.

## Reference material

- [Microsoft Entra Conditional Access deployment planning](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)
- [Manage emergency access accounts in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access)
- [Microsoft Entra role-based access control](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/overview)

