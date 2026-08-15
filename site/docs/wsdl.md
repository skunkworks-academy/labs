---
id: wsdl
title: WSDL Service Contract Mapping
slug: /wsdl/
sidebar_position: 5
keywords: [WSDL, SOAP, XML, web services, API contract]
---

# LAB-API-104 — WSDL Service Contract Mapping

<div className="lab-meta">
  <div><strong>Level</strong><span>Intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>Browser / XML editor</span></div>
  <div><strong>Evidence</strong><span>Abstract-to-concrete map</span></div>
</div>

## Purpose

WSDL 2.0 separates the abstract functionality of a service from concrete transport, wire-format and endpoint details. That separation is valuable when reviewing a service because it helps distinguish **what** the service offers from **how** and **where** it is exposed.

## Fixture

- [`training-service.wsdl`](/fixtures/api-description/wsdl/training-service.wsdl)

## Task 1 — Identify the WSDL version

Record:

- the root element and namespace;
- the target namespace;
- imported or embedded type systems;
- the prefixes used for WSDL, XML Schema and SOAP binding extensions.

## Task 2 — Map the abstract contract

Create an abstract-service table:

| Interface | Operation | Message exchange pattern | Input element | Output element | Fault element |
|---|---|---|---|---|---|

Explain why the interface does not, by itself, commit the service to HTTP, SOAP or a specific network address.

## Task 3 — Map the concrete exposure

Trace:

1. which binding implements the interface;
2. the protocol and SOAP version in the binding;
3. the action associated with each operation;
4. the service component;
5. every endpoint address.

<div className="checkpoint">
<strong>Checkpoint:</strong> One interface can be exposed through multiple bindings or endpoints. Treat each concrete exposure as a separate deployment and trust-boundary question.
</div>

## Task 4 — Generate a testing inventory

For each operation, record:

- required request elements and constraints;
- expected response and faults;
- transport and content-type assumptions;
- authentication information that is absent from the WSDL;
- authorisation decisions that must be validated at runtime;
- whether non-production or internal endpoints are disclosed.

## Task 5 — Contract and deployment risks

Assess these potential findings:

- obsolete endpoint still present in the WSDL;
- test hostname exposed publicly;
- operation declared but not supported;
- schema allows more data than the implementation expects;
- binding action does not match runtime routing;
- detailed faults disclose internal classes or database identifiers.

For each, assign impact, evidence required and remediation owner.

## Deliverables

- version and namespace record;
- abstract-service table;
- interface → binding → service → endpoint diagram;
- operation testing inventory;
- five-risk register.

## Knowledge check

<details>
<summary>1. What does a WSDL 2.0 interface group?</summary>

Operations, without committing them to a transport or wire format.
</details>

<details>
<summary>2. What does a binding add?</summary>

Concrete transport and wire-format details for one or more interfaces.
</details>

<details>
<summary>3. What is the endpoint's role?</summary>

It associates a network address with a binding. A service groups endpoints implementing a common interface.
</details>

## References

- [WSDL 2.0 Part 0: Primer](https://www.w3.org/TR/wsdl20-primer/)
- [WSDL 2.0 Part 1: Core Language](https://www.w3.org/TR/wsdl20/)
