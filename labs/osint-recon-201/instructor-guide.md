# Instructor Guide — LAB-OSINT-201 OSINT Reconnaissance Workbench

## Delivery purpose

This lab teaches learners to treat OSINT as an intelligence and evidence discipline rather than a race to collect the largest amount of public information. The browser workbook uses only synthetic fixtures so the learner can practise Recon-ng and Shodan reasoning without directing traffic at a live target.

**Recommended duration:** 90 minutes  
**Level:** Intermediate  
**Companion course:** `SEC-OSINT-201`  
**Delivery mode:** Individual self-paced or instructor-facilitated browser session

## Instructor safety briefing

State the boundary before the lab begins:

- OSINT work still requires a legitimate purpose and defined scope.
- Public accessibility does not create unrestricted permission to probe, scrape, profile or reuse data.
- The lab does not authorise investigation of any real person, organisation or internet service.
- Learners must not test credentials or secrets that appear in public material.
- Moving from passive collection to direct target interaction requires explicit authorisation and a documented rules-of-engagement change.

If a learner proposes using a real third-party target, redirect them to the supplied synthetic case.

## Case context

The fictional client is **Northwind Learning Services**. The authorised identifiers are:

- `northwind-learning.example`
- synthetic service records in the workbook
- RFC documentation addresses such as `192.0.2.0/24`

No live DNS resolution, web search, Shodan query, port scan or third-party API request is needed to complete the lab.

## Checkpoint 1 — Authority and scope

### Expected reasoning

The correct collection plan:

- starts from a security question, not a tool;
- includes the fictional domain and synthetic fixtures only;
- excludes private individuals and unrelated infrastructure;
- contains a stop condition if credentials or unrelated personal data appear;
- stays passive unless written authority is expanded.

### Debrief prompt

Ask: “What changes if the client asks you to confirm whether an observed port is still open?”

Expected answer: that would create direct interaction with a target and must be handled under explicit active-testing authorisation, not silently added to an OSINT task.

## Checkpoint 2 — Recon-ng module selection

The workbook shows three fictionalised marketplace candidates derived from common Recon-ng module patterns.

Learners should choose the passive domain-to-host module whose input and output match the requirement, and should inspect:

- module path;
- description;
- dependencies;
- required API keys;
- update/status metadata.

The key teaching point is **methodology over module memorisation**. Marketplace modules and upstream services can change.

### Debrief prompt

Ask why “install every module” is poor operational practice. Expected themes: unnecessary dependencies, attack surface, maintenance burden, API-key sprawl and reduced reproducibility.

## Checkpoint 3 — Synthetic Recon-ng evidence

The fixture contains host leads with different confidence levels. Learners must avoid treating a Recon-ng database row as proof of current ownership.

Expected classification:

- a hostname linked by both certificate evidence and scoped naming conventions is a stronger lead;
- an old or weakly linked row remains unvalidated;
- the next step is corroboration with another approved source or internal asset ownership data.

## Checkpoint 4 — Shodan interpretation

The synthetic Shodan-style records deliberately include:

- one HTTPS observation strongly linked to the scoped hostname and certificate name;
- one SSH observation with weak identity linkage and an older timestamp.

Learners should recognise:

- Shodan records are observations, not live scans performed by the learner;
- timestamps matter;
- banner product/version strings are untrusted data;
- an indexed service does not automatically equal a vulnerability;
- ownership needs corroboration.

## Checkpoint 5 — Correlation and reporting

The strongest report format is:

1. **Observation** — what the source recorded.
2. **Corroboration** — what independent evidence agrees or conflicts.
3. **Inference** — the analyst's interpretation.
4. **Confidence** — High, Medium or Low, with a reason.
5. **Action** — the authorised validation or defensive next step.
6. **Boundary** — what the evidence does not prove.

A learner should be rewarded for leaving an item unresolved when the evidence is insufficient.

## Final assessment

The six-question assessment requires a score of **5/6**.

Correct themes:

1. Scope and written authority come before collection.
2. Recon-ng marketplace metadata is checked before installation/execution.
3. Shodan banner records require corroboration before ownership or vulnerability claims.
4. A discovered credential is not tested; it is escalated through an approved channel.
5. Observation and inference must be written separately.
6. Direct target interaction requires explicit active-testing authority.

## Completion record

The lab creates a printable **Local learning record only**. It is browser-local and does not represent server-side identity verification, formal certification or a Skunkworks Academy credential.

## Suggested extension for an instructor-led cohort

Provide a second synthetic evidence pack with one deliberate contradiction, for example:

- certificate transparency shows an old hostname;
- current DNS returns NXDOMAIN;
- a historical Shodan record still exists;
- the internal asset register marks the service retired.

Ask learners to explain why historical evidence should not be presented as current exposure.

## Assessment rubric for facilitated delivery

| Criterion | Weight | Competent evidence |
|---|---:|---|
| Scope and authority | 20% | Explicit requirement, scope, exclusions and stop conditions |
| Recon-ng reasoning | 20% | Correct input/output module selection and dependency/API awareness |
| Shodan interpretation | 20% | Timestamp-aware, evidence-led interpretation without unsupported vulnerability claims |
| Correlation | 20% | Independent evidence, contradictions and confidence are handled correctly |
| Reporting and privacy | 20% | Clear observation/inference separation and minimal retention of sensitive data |

## Instructor close-out

Finish with this question:

> What makes an OSINT analyst trustworthy when a tool returns a compelling result?

Target answer: disciplined scope, provenance, corroboration, calibrated confidence, privacy-aware handling and the willingness to say “not proven.”
