---
id: openapi
title: Swagger / OpenAPI Contract Review
slug: /openapi/
sidebar_position: 3
keywords: [Swagger, OpenAPI, OAS, REST API, API security]
---

# LAB-API-102 — Swagger / OpenAPI Contract Review

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Browser / YAML editor</span></div>
  <div><strong>Evidence</strong><span>Attack-surface register</span></div>
</div>

## Purpose

Swagger is a widely used tooling family. The underlying interface-description standard is the **OpenAPI Specification (OAS)**. OpenAPI descriptions can expose paths, operations, parameters, request bodies, responses, schemas and security schemes in a machine-readable form.

The latest published OAS line includes 3.2.0, while this lab fixture uses **OpenAPI 3.1.2** to exercise broadly supported tooling and JSON Schema-aligned schemas.

## Scenario and fixture

Review Northstar's synthetic learner-management contract:

- [`openapi.yaml`](/fixtures/api-description/openapi/openapi.yaml)
- [`invalid-openapi.yaml`](/fixtures/api-description/openapi/invalid-openapi.yaml)

## Task 1 — Inventory the surface

Create one row per operation:

| Operation ID | Method | Path | Authentication | Inputs | Success response | Error responses |
|---|---|---|---|---|---|---|

Then identify:

- path parameters and query parameters;
- request-body media types;
- reusable schemas under `components`;
- pagination controls;
- operations that override global security requirements.

## Task 2 — Trace security schemes

For every entry under `components.securitySchemes`, record:

1. the scheme type;
2. where the credential is carried;
3. the scopes or claims implied by each operation;
4. whether the description is sufficient to implement and test authentication;
5. which authorisation decisions remain outside the OpenAPI document.

<div className="checkpoint">
<strong>Checkpoint:</strong> A documented OAuth scope does not prove object-level authorisation. Add a separate test for cross-tenant or cross-learner resource access.
</div>

## Task 3 — Review schemas as test generators

For `LearnerCreate` and `Learner`:

- list required fields;
- note formats, lengths, patterns and enumerations;
- identify read-only versus write-only properties;
- create one valid case and two invalid boundary cases per constrained property;
- identify personal data that should not be returned to every role.

## Task 4 — Find contract defects

Open `invalid-openapi.yaml`. Locate at least six defects, including:

- a missing path-parameter declaration;
- an undocumented success response;
- an ambiguous security requirement;
- an unconstrained request property;
- inconsistent schema naming;
- a response that may reveal sensitive data.

For each defect, state whether it is a **specification validity**, **testability**, **security** or **maintainability** issue.

## Task 5 — Build a prioritised test plan

Create at least ten tests covering:

- authentication and token handling;
- function-level and object-level authorisation;
- path/query parameter validation;
- request-body validation and mass assignment;
- pagination and resource consumption;
- content negotiation;
- response schema and sensitive-data minimisation;
- error consistency and correlation IDs;
- idempotency for state-changing operations;
- undocumented or deprecated operations.

Use this format:

| Priority | Operation | Hypothesis | Request variation | Expected control | Evidence |
|---|---|---|---|---|---|

## Deliverables

- completed operation inventory;
- security-scheme trace;
- defect register for the invalid fixture;
- ten-test plan ranked by business impact and likelihood;
- short note on tool compatibility between OAS versions.

## Knowledge check

<details>
<summary>1. Is every OpenAPI-described API necessarily RESTful?</summary>

No. OAS describes HTTP APIs and can represent many styles. The specification does not require a particular development process or strict REST architectural conformance.
</details>

<details>
<summary>2. What does an empty or missing security array prove?</summary>

It does not, by itself, prove that the API has no external security arrangements. The assessor must verify runtime controls and deployment context.
</details>

<details>
<summary>3. Why is `operationId` useful?</summary>

It gives a stable operation identifier for documentation, code generation, test cases and traceability, although uniqueness and naming quality still need validation.
</details>

## References

- [OpenAPI Specification versions](https://spec.openapis.org/oas/)
- [OpenAPI Specification repository](https://github.com/OAI/OpenAPI-Specification)
- [Swagger documentation](https://swagger.io/docs/)
