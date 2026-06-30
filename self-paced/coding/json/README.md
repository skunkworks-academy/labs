# Learn JSON — Interactive Self-Paced Course

**Brand:** Skunkworks Academy
**Track:** Coding fundamentals
**Mode:** Self-paced, interactive (browser-based)
**Duration:** ~30 minutes
**Level:** Beginner — no prior programming experience required
**Landing URL:** https://skunkworksacademy.com/self-paced/coding/json/

A fully interactive, single-page course that teaches JSON from first principles. Learners read short lessons, take instant knowledge checks, explore live structure trees, and build valid JSON in a hands-on playground that validates their work in real time.

---

## Learning outcomes

By the end of this course, a learner can:

1. Explain what JSON is and why it is used to store and exchange data.
2. Recognise where JSON appears in everyday software (APIs, config files, app data).
3. Read and write JSON **objects** (`{ }`) and **arrays** (`[ ]`).
4. Identify the six JSON value types: string, number, boolean, null, object, array.
5. Nest objects and arrays to describe richer data.
6. Spot and fix the most common JSON mistakes (unquoted keys, trailing commas, single quotes, comments).
7. Build valid JSON against a requirement checklist in the live playground.

---

## Course structure

| Module | Lessons | Focus |
|---|---|---|
| 1 — Meet JSON | What is JSON?, Where JSON lives | Concept and real-world context |
| 2 — The Building Blocks | Objects, Arrays, Values & types | Core syntax |
| 3 — Putting It Together | Nesting data, Avoid common mistakes | Structure and correctness |
| 4 — Practice | Playground challenge | Hands-on, validated building |

Eight lessons total, each with worked code examples, an interactive structure tree, and a knowledge check.

---

## Features

- **Progress tracking** — completed lessons, knowledge-check answers, XP, and module badges are saved to the browser's `localStorage` (key `jsoncourse_v1`), so a learner can leave and resume where they left off.
- **Live JSON playground** — three challenges (*Describe a book*, *Make a playlist*, *Free build*) with a real-time validator, a structure tree of the parsed data, a one-click formatter, and a per-requirement checklist that turns green as the learner satisfies each rule.
- **Accessibility & theming** — respects a `reduceMotion` setting, exposes an accent-colour option, and works keyboard-first.
- **Zero build step** — ships as static `index.html` + `support.js` and renders entirely in the browser.

---

## Files

```text
self-paced/coding/json/
├── index.html        # The interactive course (self-contained page)
├── support.js        # Design-component runtime that boots the page
├── README.md
└── LICENSE-NOTICE.md
```

## Running locally

This is a static page. Serve the folder with any static web server and open `index.html`:

```bash
cd self-paced/coding/json
python3 -m http.server 8080
# then open http://localhost:8080/
```

> The page loads its rendering runtime (React) and web fonts from public CDNs, so an internet connection is required the first time it runs.

---

## Catalogue registration

This course is registered in the Labs catalogue at [`catalog/labs.json`](../../../catalog/labs.json) under id **`SKW-JSON-2026`** so it appears on the Labs landing page alongside the other self-paced courses.
