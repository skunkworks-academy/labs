---
id: graphql
title: GraphQL Schema & Query Security
slug: /graphql/
sidebar_position: 4
keywords: [GraphQL, schema, query, API security, introspection]
---

# LAB-API-103 — GraphQL Schema & Query Security

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>75 minutes</span></div>
  <div><strong>Environment</strong><span>Browser / GraphQL editor</span></div>
  <div><strong>Evidence</strong><span>Query set + control matrix</span></div>
</div>

## Purpose

GraphQL combines a query language, a type system and an execution model. A schema can make the available data graph highly discoverable, but the schema alone does not guarantee resolver-level authorisation, query-cost controls or safe error handling.

## Fixtures

- [`schema.graphql`](/fixtures/api-description/graphql/schema.graphql)
- [`learner-query.graphql`](/fixtures/api-description/graphql/learner-query.graphql)
- [`learner-response.json`](/fixtures/api-description/graphql/learner-response.json)

## Task 1 — Draw the type graph

From `schema.graphql`, map:

- root operation types;
- object types and their relationships;
- interfaces, enums and input objects;
- nullable, non-null and list boundaries;
- fields that appear sensitive or role-restricted.

Mark every path from `Query` to personal data.

## Task 2 — Minimise the query

The supplied query requests more data than a learner dashboard needs. Produce a replacement query that returns only:

- learner ID;
- display name;
- active enrolment course code and title;
- progress percentage.

Use variables and a named operation. Explain how field-level selection supports data minimisation but does not replace server-side authorisation.

## Task 3 — Review authorisation hypotheses

Create test hypotheses for:

1. a learner requesting another learner by ID;
2. an instructor requesting learners outside their assigned cohort;
3. a learner selecting `billingEmail` or `adminNotes`;
4. a mutation changing a protected field;
5. a nested resolver returning an object the caller cannot access directly.

<div className="checkpoint">
<strong>Checkpoint:</strong> GraphQL should enforce authorisation at every relevant resolver or domain-service boundary. Hiding a field from the UI is not a control.
</div>

## Task 4 — Resource-consumption controls

Using the schema, design tests for:

- excessive query depth;
- high field count or alias multiplication;
- large pagination limits;
- repeated expensive nested relationships;
- batched operations;
- subscription lifecycle limits, where applicable.

For each test, specify a control such as depth limits, cost analysis, persisted operations, pagination ceilings, timeouts or per-principal rate limits.

## Task 5 — Interpret partial responses

Inspect `learner-response.json`:

- Which fields succeeded?
- Which field failed?
- How is the failing response path represented?
- Does the error reveal implementation detail?
- What should be logged internally versus returned to the client?

## Task 6 — Introspection decision

Write a decision record covering:

- whether introspection is enabled in development, test and production;
- who can access schema documentation;
- how schema changes are reviewed;
- how deprecated fields are retired;
- why disabling introspection does not remove the need for authorisation.

## Deliverables

- type graph;
- minimal dashboard query;
- five authorisation hypotheses;
- resource-consumption matrix;
- partial-response analysis;
- introspection decision record.

## Knowledge check

<details>
<summary>1. What are the three GraphQL operation types?</summary>

Query, mutation and subscription.
</details>

<details>
<summary>2. What does a leading double underscore indicate?</summary>

Names beginning with `__` are reserved for the GraphQL introspection system.
</details>

<details>
<summary>3. Can a client select subfields from a scalar?</summary>

No. Scalars and enums are leaf fields and must not have a subselection. Object, interface and union fields require a subselection.
</details>

## References

- [GraphQL learning resources](https://graphql.org/learn/)
- [GraphQL September 2025 specification](https://spec.graphql.org/September2025/)
