# Skunkworks Academy Mandatory Page Head

Every current and future Skunkworks Academy Labs HTML page must include the mandatory site page `<head>` standard.

## Mandatory rule

All public HTML pages must include the Skunkworks Academy head marker:

```html
<meta charset="utf-8" data-skunkworks-head="mandatory-v1">
```

This marker is intentionally checked by CI. Do not remove or rename it unless the CI validation script and this document are updated in the same commit.

## Required head coverage

Each page head must provide, at minimum:

1. Character encoding and responsive viewport.
2. SEO title, description, canonical URL, author, publisher, and robot directives.
3. Brand metadata, favicon, Apple touch icon, theme colour, and manifest link.
4. Open Graph metadata for rich previews.
5. Twitter/X card metadata.
6. Referrer policy and permissions policy metadata for static-page hardening.
7. Structured data using JSON-LD.
8. Shared global stylesheet link.

## Approved baseline include

Use this file as the canonical source:

```text
_includes/mandatory-head.html
```

For plain static HTML pages, copy the full include into the `<head>` block and adjust only the page-specific values:

- `<title>`
- `meta[name="description"]`
- `link[rel="canonical"]`
- `og:title`
- `og:description`
- `og:url`
- `og:image`, when page-specific artwork exists
- `twitter:title`
- `twitter:description`
- `twitter:image`, when page-specific artwork exists

## Minimum implementation example

```html
<!doctype html>
<html lang="en-ZA">
<head>
  <meta charset="utf-8" data-skunkworks-head="mandatory-v1">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Page Title | Skunkworks Academy Labs</title>
  <meta name="description" content="Clear page description for search and sharing.">
  <link rel="canonical" href="https://labs.skunkworksacademy.com/page-path/">
</head>
<body>
  <main id="main-content">
    <!-- Page content -->
  </main>
</body>
</html>
```

## Commit requirement

Before pushing any page creation or page update, run:

```bash
node scripts/validate-mandatory-head.js
```

CI will also run this check on every push and pull request.

## Failure condition

A commit fails if any `.html` file outside ignored folders does not include:

```html
data-skunkworks-head="mandatory-v1"
```

## Ignored folders

The validator ignores generated and dependency directories:

- `.git`
- `node_modules`
- `dist`
- `build`
- `.next`
- `.nuxt`
- `coverage`
- `vendor`
