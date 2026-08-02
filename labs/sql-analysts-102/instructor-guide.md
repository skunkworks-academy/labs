# Instructor guide - LAB-DAT-102

## Purpose

This 60-minute browser-only workbook teaches SQL as a method for precise, governed data reasoning. It contains no real database, input runner, credential or personal data. The emphasis is on an analyst’s decision process before a query is executed.

## Learning outcomes

By the end, learners should be able to:

1. define a question and expected row meaning before writing SQL;
2. select only the fields and rows relevant to an approved analysis;
3. explain how a join condition follows a documented relationship;
4. use aggregate/grouping reasoning and state the limits of an aggregate result; and
5. name safe controls for real database access and application queries.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Question, selection and filtering | 18 | Make the result definition and data minimisation explicit. |
| Relationships and joins | 18 | Draw the data model before discussing syntax. |
| Aggregation and interpretation | 14 | Separate a numeric finding from a causal conclusion. |
| Assessment and debrief | 10 | Ask learners to report one result and one limitation. |

## Concepts to reinforce

- A query begins with a business question and a clear definition of what one output row should represent.
- Use **SELECT** to choose fields, **FROM** to identify the source, **WHERE** to filter rows, **JOIN ... ON** to combine a documented relationship, **GROUP BY** to form aggregate groups and **ORDER BY** to present results predictably.
- `COUNT`, `SUM`, `AVG`, `MIN` and `MAX` aggregate values. The result is only as good as the data definition, filters, keys, time period and row cardinality.
- Use data minimisation: return only the approved fields and rows needed. In application code, use parameterised queries and least-privilege database access; do not concatenate untrusted input into a query.
- A result can report a pattern. It does not automatically establish cause, competence, quality or an individual identity.

## Answer guide

### Checkpoint 1: minimal query design

Correct answer: count completion records filtered to the named lab, completed status and July range. This uses the question to constrain the fields/rows rather than retrieving all learner information.

### Checkpoint 2: join relationship

Correct answer: connect `completion.lab_code` to `lab.lab_code`. Explain that this relates each completion event to its lab definition; ensure the learner understands that the expected one-to-many relationship matters.

### Checkpoint 3: aggregate interpretation

Correct answer: in the fictitious data and period, `LAB-SEC-101` has the highest displayed average score. It does not prove a cause or comprehensive learner competence. Ask what additional context would be needed.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | State the approved question and row meaning | The query should be driven by a defined outcome. |
| 2 | WHERE | It filters rows by a condition. |
| 3 | Data minimisation/review | Broad field selection can expose unnecessary data. |
| 4 | Documented key relationship | A join must preserve known data meaning. |
| 5 | COUNT with GROUP BY lab | This counts events per grouping. |
| 6 | Bounded pattern, not causation | Aggregates require contextual interpretation. |
| 7 | Approved access and data governance | The lab gives no real database permission. |

## Evidence of learning

Ask learners to produce an analysis plan using synthetic data:

- business question and the intended row meaning;
- table/field list and why each field is necessary;
- join relationship and expected cardinality;
- filter, aggregate and grouping approach;
- result statement and limitation statement; and
- data handling controls required before the same analysis uses a real dataset.

## Accessibility and delivery

- Read the queries aloud in the order learners will reason about them; avoid assuming that monospaced syntax is self-explanatory.
- Keep synthetic data visibly labelled. Do not invite learners to paste production exports, customer names, emails or credentials into a shared session.
- A live follow-on should use a disposable read-only database with synthetic rows, a low-privilege account, query limits and a reset plan.

## Reference material

- [PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html)
- [PostgreSQL joins tutorial](https://www.postgresql.org/docs/current/tutorial-join.html)
- [PostgreSQL aggregate functions tutorial](https://www.postgresql.org/docs/current/tutorial-agg.html)
- [PostgreSQL table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
