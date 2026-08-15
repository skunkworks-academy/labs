---
id: capstone
title: API Contract Reconnaissance Capstone
slug: /capstone/
sidebar_position: 7
keywords: [API security capstone, SOAP, OpenAPI, GraphQL, WSDL, WADL]
---

# LAB-API-190 — API Contract Reconnaissance Capstone

<div className="lab-meta">
  <div><strong>Level</strong><span>Applied intermediate</span></div>
  <div><strong>Duration</strong><span>90 minutes</span></div>
  <div><strong>Environment</strong><span>All supplied fixtures</span></div>
  <div><strong>Evidence</strong><span>Assessment-ready test plan</span></div>
</div>

## Brief

Northstar Training Services is consolidating several API estates. The organisation has SOAP messages and XSDs, an OpenAPI description, a GraphQL schema, a WSDL contract and a legacy WADL file. Your task is to produce one evidence-led reconnaissance pack before any active testing begins.

## Part 1 — Format classification

Complete:

| Format | Message, schema or service description? | Primary syntax | Main discovery value | Important limitation |
|---|---|---|---|---|
| SOAP |  |  |  |  |
| OpenAPI |  |  |  |  |
| GraphQL |  |  |  |  |
| WSDL |  |  |  |  |
| WADL |  |  |  |  |

## Part 2 — Unified surface register

Create a single register containing every operation or resource from the supplied fixtures. Required fields:

- source document and exact location;
- operation/resource name;
- protocol and endpoint information;
- input schema and constraints;
- response/fault model;
- documented authentication;
- authorisation hypothesis;
- personal or sensitive data;
- resource-consumption concerns;
- test priority.

## Part 3 — Trust-boundary diagram

Draw a diagram showing:

- external clients;
- API gateway or edge controls;
- SOAP and HTTP endpoints;
- GraphQL execution layer;
- identity provider;
- domain services and data stores;
- logging, monitoring and support access.

Mark where the contract gives evidence and where runtime verification is still required.

## Part 4 — Prioritised test charter

Produce 15 tests across at least these categories:

1. authentication;
2. object-level authorisation;
3. function/field-level authorisation;
4. schema and boundary validation;
5. mass assignment or over-posting;
6. sensitive-data exposure;
7. parser and content-type handling;
8. query depth, pagination or resource consumption;
9. error and fault leakage;
10. versioning, deprecated operations and shadow endpoints.

Each test must include:

- target operation;
- precondition and authorised identity;
- hypothesis;
- bounded test variation;
- expected secure behaviour;
- evidence to capture;
- cleanup or rollback requirement;
- retest criterion.

## Part 5 — Executive summary

Write no more than 400 words covering:

- what the contracts reveal;
- the three highest-risk unknowns;
- prerequisites for active testing;
- controls that should be validated first;
- how the test plan minimises production risk.

## Scoring rubric

| Area | Weight | Evidence of mastery |
|---|---:|---|
| Format interpretation | 20% | Correctly separates messages, schemas, abstract interfaces and concrete endpoints |
| Surface completeness | 20% | Traceable operation/resource inventory with source references |
| Security reasoning | 25% | Test hypotheses distinguish authentication, authorisation, validation and resource controls |
| Safety and governance | 15% | Clear scope, identities, rate limits, rollback and evidence handling |
| Technical communication | 20% | Prioritised, concise and reproducible deliverables |

## Completion standard

A passing submission is technically correct, traceable to the supplied artefacts and executable by another authorised tester without relying on undocumented assumptions.
