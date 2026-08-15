---
id: wadl
title: WADL Legacy API Discovery
slug: /wadl/
sidebar_position: 6
keywords: [WADL, legacy API, XML, HTTP API, API migration]
---

# LAB-API-105 — WADL Legacy API Discovery

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>Browser / XML editor</span></div>
  <div><strong>Evidence</strong><span>Resource tree + migration brief</span></div>
</div>

## Purpose

WADL is an XML format for machine-processable descriptions of HTTP-based applications. It was published as a **W3C Member Submission**, not as a W3C Recommendation. It remains relevant when assessing or modernising legacy services.

## Fixture

- [`application.wadl`](/fixtures/api-description/wadl/application.wadl)

## Task 1 — Build the resource tree

Starting from the `resources` base URI, draw the complete URI tree. Include:

- path templates;
- matrix, path, query and header parameters;
- methods on each resource;
- request and response representations;
- status codes.

## Task 2 — Map methods and representations

Complete:

| Resource | Method | Parameters | Request media type | Success status | Response media type |
|---|---|---|---|---:|---|

Identify any method that changes state and any method that may return personal data.

## Task 3 — Identify description gaps

Record whether the WADL explains:

- authentication and credential location;
- role or scope requirements;
- rate limits;
- idempotency;
- pagination semantics;
- error schemas;
- deprecation and versioning;
- ownership and support contacts.

For each gap, state how you would verify the runtime behaviour safely.

## Task 4 — Compare with OpenAPI

Create a mapping from WADL concepts to OpenAPI concepts:

| WADL | OpenAPI equivalent | Migration concern |
|---|---|---|
| `resources` / `resource` |  |  |
| `method` |  |  |
| `param` |  |  |
| `representation` |  |  |
| `response status` |  |  |
| `grammars` |  |  |

<div className="checkpoint">
<strong>Checkpoint:</strong> Migration is not a syntax-only conversion. Preserve runtime semantics, authentication, error behaviour and backward-compatibility commitments.
</div>

## Task 5 — Produce a legacy-risk brief

Write a one-page brief that includes:

1. current documented surface;
2. missing security metadata;
3. operational dependencies on WADL tooling;
4. proposed OpenAPI migration sequence;
5. compatibility and regression tests;
6. a rollback plan.

## Deliverables

- URI resource tree;
- method/representation matrix;
- description-gap register;
- WADL-to-OpenAPI mapping;
- legacy-risk brief.

## Knowledge check

<details>
<summary>1. What status does WADL have at W3C?</summary>

It is a W3C Member Submission from 2009, not a W3C Recommendation.
</details>

<details>
<summary>2. What is the root value of WADL discovery?</summary>

The `resources` element establishes a base URI, under which resource elements define the HTTP application structure.
</details>

<details>
<summary>3. Why must migration include runtime regression testing?</summary>

A converted description can appear structurally correct while changing parameter serialization, status codes, authentication expectations, content types or other observable behaviour.
</details>

## Reference

- [Web Application Description Language — W3C Member Submission](https://www.w3.org/Submission/wadl/)
