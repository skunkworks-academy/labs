---
id: index
title: API Description & Discovery Labs
slug: /
sidebar_position: 1
---

# API Description & Discovery Labs

<div className="orange-rule"></div>

API contracts reduce guesswork. They expose operations, message shapes, parameters, schemas, response models, bindings and—in some formats—authentication requirements. For an authorised penetration tester or integration engineer, that information becomes a structured reconnaissance source.

:::warning Authorised scope only
Use the supplied fictional **Northstar Training Services** fixtures. Do not direct test traffic at a third-party or production API unless the system owner has explicitly authorised the target, time window and test techniques.
:::

## Track outcomes

By completing the track, you will be able to:

1. distinguish message formats from service-description formats;
2. extract a testable API surface from XML, YAML and GraphQL schema documents;
3. relate schemas and type systems to input-validation and data-exposure tests;
4. identify authentication, authorisation, error-handling and resource-consumption test cases;
5. produce a prioritised test charter with reproducible evidence requirements.

## Lab sequence

| Code | Lab | Primary artefact | Duration |
|---|---|---|---:|
| LAB-API-101 | [SOAP Message & Schema Analysis](./soap.md) | SOAP 1.2 XML + XSD | 60 min |
| LAB-API-102 | [Swagger / OpenAPI Contract Review](./openapi.md) | OpenAPI 3.1.2 YAML | 75 min |
| LAB-API-103 | [GraphQL Schema & Query Security](./graphql.md) | GraphQL SDL + operations | 75 min |
| LAB-API-104 | [WSDL Service Contract Mapping](./wsdl.md) | WSDL 2.0 XML | 60 min |
| LAB-API-105 | [WADL Legacy API Discovery](./wadl.md) | WADL XML | 60 min |
| LAB-API-190 | [API Contract Reconnaissance Capstone](./capstone.md) | Cross-format evidence pack | 90 min |

## Working method

For every format, use the same six-stage workflow:

1. **Identify** the document type, version and namespace.
2. **Inventory** operations, resources, fields, parameters and representations.
3. **Trace** authentication, authorisation and trust boundaries.
4. **Constrain** inputs using the contract or schema.
5. **Hypothesise** security and reliability test cases.
6. **Evidence** the result with source locations, expected behaviour and retest criteria.

## Required tools

A text editor with XML/YAML/GraphQL syntax highlighting is sufficient. Optional tools include an XML validator, an OpenAPI linter, GraphQL-aware editor tooling and a local static web server. No cloud account or production credential is required.
