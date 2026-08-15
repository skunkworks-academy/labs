---
id: soap
title: SOAP Message & Schema Analysis
slug: /soap/
sidebar_position: 2
keywords: [SOAP, XML, XSD, API security, XML web services]
---

# LAB-API-101 — SOAP Message & Schema Analysis

<div className="lab-meta">
  <div><strong>Level</strong><span>Foundation–Intermediate</span></div>
  <div><strong>Duration</strong><span>60 minutes</span></div>
  <div><strong>Environment</strong><span>Browser / text editor</span></div>
  <div><strong>Evidence</strong><span>Message map + test charter</span></div>
</div>

## Purpose

SOAP 1.2 defines an XML-based messaging framework. The contract and schemas around a SOAP service can reveal message structure, namespaces, required headers, body elements and fault behaviour before any authorised request is sent.

## Learning outcomes

You will:

- identify the SOAP `Envelope`, optional `Header`, mandatory `Body` and `Fault` structure;
- distinguish the SOAP namespace from application namespaces;
- map XML elements to XSD constraints;
- identify security-relevant headers and error-handling behaviours;
- draft safe positive and negative test cases without attacking a live service.

## Scenario

Northstar Training Services exposes an order-processing service to approved reseller systems. You have been given four synthetic artefacts:

- [`order-request.xml`](/fixtures/api-description/soap/order-request.xml)
- [`order-response.xml`](/fixtures/api-description/soap/order-response.xml)
- [`order-fault.xml`](/fixtures/api-description/soap/order-fault.xml)
- [`order.xsd`](/fixtures/api-description/soap/order.xsd)

## Task 1 — Build the message map

Open `order-request.xml` and record:

1. the SOAP version implied by the envelope namespace;
2. every namespace prefix and its URI;
3. the header blocks, their intended purpose and whether they appear mandatory;
4. the immediate child of the SOAP body;
5. the business identifiers that should be correlated across request, response and logs.

<div className="checkpoint">
<strong>Checkpoint:</strong> Your map must distinguish protocol metadata from business data. Do not treat the `auth:AccessContext` header as part of the order payload.
</div>

## Task 2 — Reconcile the request with the XSD

Use `order.xsd` to determine:

- which elements are mandatory;
- the allowed `deliveryMode` values;
- the minimum and maximum quantity;
- the pattern applied to the reseller reference;
- whether additional elements are accepted by the schema.

Create a constraint table:

| Field | XSD type / rule | Valid example | Invalid boundary example |
|---|---|---|---|
| `resellerReference` |  |  |  |
| `courseCode` |  |  |  |
| `quantity` |  |  |  |
| `deliveryMode` |  |  |  |

## Task 3 — Analyse fault handling

Inspect `order-fault.xml` and answer:

1. Which SOAP fault code is used?
2. Is the reason safe for a client to see?
3. Does the detail block disclose internal implementation data?
4. Which fields should be logged internally but removed from the public response?
5. What correlation identifier would let support staff investigate without exposing a stack trace?

## Task 4 — Create an authorised test charter

Write at least eight tests across these categories:

- **schema conformance:** missing, malformed and boundary values;
- **header processing:** absent or invalid access context, unknown header with `mustUnderstand` semantics;
- **authorisation:** reseller attempts to reference another reseller's order;
- **fault handling:** client-safe errors, stable correlation IDs and no implementation leakage;
- **parser hardening:** documented rejection of unsafe XML features and oversized messages;
- **transport:** correct media type, TLS requirement and request-size limits.

Do not include live exploit payloads. State the expected defensive behaviour instead.

## Task 5 — Produce evidence

Submit:

1. an annotated request showing envelope, header and body boundaries;
2. the completed XSD constraint table;
3. a fault-disclosure finding with severity and remediation;
4. the eight-test charter with expected results;
5. a one-paragraph explanation of why schema validation does not replace authorisation.

## Knowledge check

<details>
<summary>1. Does SOAP itself define the business structure inside the body?</summary>

No. SOAP defines the messaging framework and body container. Application semantics are defined by the service contract and schemas.
</details>

<details>
<summary>2. Why are namespace URIs important during assessment?</summary>

They determine the vocabulary to which an element belongs. Prefix text can change; namespace identity is carried by the URI.
</details>

<details>
<summary>3. What is the security value of a stable correlation ID?</summary>

It permits investigation and support without returning stack traces, database identifiers or other sensitive implementation details to the client.
</details>

## References

- [SOAP Version 1.2 Part 1: Messaging Framework](https://www.w3.org/TR/soap12-part1/)
- [SOAP Version 1.2 specifications](https://www.w3.org/TR/soap12/)
- [W3C XML Schema](https://www.w3.org/XML/Schema)
