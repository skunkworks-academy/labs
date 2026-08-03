# Skunkworks Academy Labs — Docusaurus site

The Docusaurus source lives in `site/` while existing browser labs remain under the repository-level `labs/` directory.

## Local development

```bash
cd site
npm install
npm start
```

## Production build

```bash
npm run build:deploy
```

`build:deploy` creates the Docusaurus build and overlays the existing `labs/`, `assets/`, `catalog/` and public manifest files so existing lab URLs remain available.
