# LAB-OSINT-201 — OSINT Reconnaissance Workbench

A 90-minute browser-only Skunkworks Academy lab for learning disciplined open-source intelligence (OSINT) collection and analysis with **synthetic Recon-ng and Shodan-style evidence**.

## Companion course

- `SEC-OSINT-201` — Open-Source Intelligence (OSINT) Gathering with Recon-ng and Shodan
- Course route: `https://catalog.skunkworksacademy.com/courses/open-source-intelligence-gathering`

## Learning outcomes

Learners will:

1. define an intelligence requirement, authority boundary, scope and stop condition;
2. choose a Recon-ng module based on input/output, dependencies and required API keys;
3. interpret synthetic host-discovery evidence as leads rather than facts;
4. read Shodan-style service observations with timestamp and attribution context;
5. correlate independent evidence sources and assign confidence;
6. produce a concise report that separates observation, inference and recommended action.

## Safety model

This lab deliberately contains **no live target queries** and **no public-network interaction**. All domains, addresses, search results, host records and service observations are fictional or use documentation-only values.

The learner must not convert the exercise into live reconnaissance against third parties. Specifically:

- no active scanning;
- no brute-force enumeration;
- no credential testing;
- no bypassing authentication or rate limits;
- no private-person profiling;
- no investigation of systems outside explicit written scope.

## Lab flow

1. Authority and scope
2. Recon-ng module selection
3. Synthetic Recon-ng evidence
4. Shodan interpretation
5. Correlation and reporting
6. Final six-question safety and analysis check
7. Browser-local completion record

## Evidence model

Progress is stored only in the learner's browser. The completion record is a **local learning record only**; it is not a verified Skunkworks Academy credential or server-side assessment result.

## Files

- `index.html` — interactive learner workbook
- `manifest.yaml` — machine-readable lab metadata and safety controls
- `instructor-guide.md` — facilitation notes, expected reasoning and debrief prompts
- shared presentation layer — `../it-foundations-labs.css`
- shared interaction layer — `../analysis-toolkit-labs.js`

## Source-of-truth references

The companion course links to official Recon-ng upstream documentation, the official Recon-ng marketplace, Shodan's official query/API documentation, IANA example domains and RFC documentation address ranges. Tool availability and marketplace modules can change; learners should treat the operating method, source provenance and verification workflow as the durable skill.
