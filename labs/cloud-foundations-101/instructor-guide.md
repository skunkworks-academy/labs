# Instructor guide - LAB-CLD-101

## Purpose

Use this 60-minute browser-only workbook to establish a sound cloud mental model before learners use Azure, Google Cloud, AWS, IBM Cloud or another provider. It is not a sales comparison and it does not give learners a cloud account. The purpose is to connect service choice to operating responsibility.

## Learning outcomes

By the end, learners should be able to:

1. describe the operating boundary of IaaS, PaaS and SaaS;
2. choose a starting service model from stated workload requirements;
3. map customer responsibility for identity, data, application configuration and operations; and
4. name the governance and recovery decisions needed before a production launch.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Service-model reasoning | 15 | Use a workload requirement, not a product name, to choose a starting point. |
| Shared responsibility | 18 | Challenge the belief that managed services transfer data or access accountability. |
| Operating model | 17 | Turn a cloud diagram into an identity, recovery, cost and support plan. |
| Knowledge check and debrief | 10 | Ask learners to explain what must be true before a real deployment. |

## Concepts to reinforce

- **IaaS** provides computing, network and storage building blocks, while the customer typically operates more of the OS, runtime and workload stack.
- **PaaS** lets a team focus more on application code, data and configuration, while the provider operates a defined platform layer. It does not remove application-security or data-governance duties.
- **SaaS** provides a finished application capability, but the customer still owns user access, business configuration, data handling, integration and supplier governance.
- Shared responsibility is service-specific. Avoid generic statements such as "the cloud secures everything" or "the customer secures everything." Instead, identify the component, service commitment, configuration and accountable owner.
- A production cloud launch needs an operating model: environments, access, logs, backup/recovery evidence, budget ownership, alerts and incident escalation.

## Answer guide

### Checkpoint 1: service model

Correct answer: evaluate **PaaS**. The portal is custom software that needs code, data and identity control, but it does not have a stated requirement for the team to administer a virtual-machine operating system. A final service choice still needs functional, risk, cost and integration assessment.

### Checkpoint 2: responsibility map

Correct answer: the Academy retains responsibility for authorised access, data handling, configuration review and responsible application operation. The provider can offer technical service capabilities without deciding the Academy's users, data-retention rules or business controls.

### Checkpoint 3: operating plan

Correct answer: separate environments; define data and access rules; test recovery; route operational alerts; and assign a budget owner before launch. A diagram without operating controls is incomplete.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | Workload capability and control need | The service model follows requirements, not fashion. |
| 2 | PaaS | It can reduce OS administration for a custom app team. |
| 3 | Customer organisation | It owns authorisation decisions for its data. |
| 4 | Data classification, access and retention | Managed storage does not determine customer data policy. |
| 5 | Monitoring, recovery evidence and escalation | These must exist before an outage. |
| 6 | Cost attribution, review and escalation | Tags/labels and budget ownership make spend governable. |
| 7 | Authorised access, current guidance and change/recovery plan | The browser lab is not production authority. |

## Evidence of learning

Ask learners to produce a one-page cloud decision note for a fictional workload with:

- the business outcome and data classification;
- the preferred service model and the control requirement that supports it;
- a responsibility table for provider, platform team and workload team;
- the identity, logging, recovery and cost controls; and
- the approval, change and incident escalation route.

## Accessibility and delivery

- Explain IaaS, PaaS and SaaS before using acronyms repeatedly.
- Treat the selected answer as a discussion prompt; a different model can be reasonable if the learner states a credible requirement and responsibility plan.
- Do not ask learners to use a personal credit card, create a free trial, share an access key or expose production data.
- For a live follow-on, use an approved organisation sandbox with time-bound roles, hard budget limits and an owner responsible for cleanup.

## Reference material

- [NIST SP 800-145: The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final)
- [Azure landing zone design principles](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-principles)
- [Google Cloud billing and resource organisation guidance](https://cloud.google.com/billing/docs/onboarding-checklist)
