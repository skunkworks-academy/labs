import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "catalog/labs.json",
  "lab-catalog.json",
  "site.webmanifest",
  "favicon.ico",
  "assets/icons/favicon-black.png",
  "assets/icons/favicon-white.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "labs/bits-and-bytes-101/index.html",
  "labs/bits-and-bytes-101/lab.css",
  "labs/bits-and-bytes-101/lab.js",
  "labs/bits-and-bytes-101/manifest.yaml",
  "labs/bits-and-bytes-101/instructor-guide.md"
];

const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    errors.push(`Missing required file: ${file}`);
  }
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${file} is invalid JSON: ${error.message}`);
    return null;
  }
}

function requireFields(record, fields, label) {
  for (const field of fields) {
    if (record[field] === undefined || record[field] === null || record[field] === "") {
      errors.push(`${label} is missing required field: ${field}`);
    }
  }
}

// Retain validation for the wider Labs catalogue, even though the launch landing page
// now reads the dedicated public product manifest below.
if (existsSync("catalog/labs.json")) {
  const labs = readJson("catalog/labs.json");

  if (labs && !Array.isArray(labs)) {
    errors.push("catalog/labs.json must be an array.");
  }

  if (Array.isArray(labs)) {
    for (const lab of labs) {
      requireFields(lab, ["id", "title", "track", "level", "durationMinutes", "status", "summary"], "Catalogue lab record");
      if (!Number.isFinite(lab.durationMinutes) || lab.durationMinutes <= 0) {
        errors.push(`Catalogue lab record has an invalid durationMinutes value: ${lab.id ?? "unknown"}`);
      }
    }
  }
}

if (existsSync("lab-catalog.json")) {
  const manifest = readJson("lab-catalog.json");

  if (manifest && (typeof manifest !== "object" || Array.isArray(manifest))) {
    errors.push("lab-catalog.json must be an object.");
  }

  if (manifest && typeof manifest === "object" && !Array.isArray(manifest)) {
    requireFields(manifest, ["schemaVersion", "catalogVersion", "products"], "Launch product manifest");

    if (!Array.isArray(manifest.products) || manifest.products.length === 0) {
      errors.push("lab-catalog.json must contain at least one product.");
    }

    if (Array.isArray(manifest.products)) {
      const productCodes = new Set();
      for (const product of manifest.products) {
        requireFields(product, ["code", "title", "summary", "availability", "delivery", "durationMinutes", "level"], "Launch product");
        if (productCodes.has(product.code)) {
          errors.push(`Launch product code is duplicated: ${product.code ?? "unknown"}`);
        }
        productCodes.add(product.code);
        if (!Number.isFinite(product.durationMinutes) || product.durationMinutes <= 0) {
          errors.push(`Launch product has an invalid durationMinutes value: ${product.code ?? "unknown"}`);
        }

        if (product.entitlement) {
          requireFields(product.entitlement, ["maxConcurrentSessionsPerLearner", "idleTimeoutMinutes", "sessionTimeoutMinutes", "cleanupRequired"], `Launch product entitlement: ${product.code ?? "unknown"}`);
        }

        if (product.checkout) {
          requireFields(product.checkout, ["status", "providers", "activation"], `Launch product checkout: ${product.code ?? "unknown"}`);
          if (!Array.isArray(product.checkout.providers) || product.checkout.providers.length === 0) {
            errors.push(`Launch product checkout must list at least one provider: ${product.code ?? "unknown"}`);
          }
        }
      }

      for (const expectedCode of ["LAB-LNX-101", "LAB-DAT-101"]) {
        if (!productCodes.has(expectedCode)) {
          errors.push(`Launch product manifest is missing expected product: ${expectedCode}`);
        }
      }
    }
  }
}

if (existsSync("site.webmanifest")) {
  const webManifest = readJson("site.webmanifest");
  if (webManifest && (typeof webManifest !== "object" || Array.isArray(webManifest))) {
    errors.push("site.webmanifest must be an object.");
  }

  if (webManifest && typeof webManifest === "object" && !Array.isArray(webManifest)) {
    requireFields(webManifest, ["name", "short_name", "start_url", "display", "icons"], "Web manifest");
    if (!Array.isArray(webManifest.icons) || webManifest.icons.length < 2) {
      errors.push("site.webmanifest must contain at least two install icons.");
    }
  }
}

if (existsSync("index.html")) {
  const html = readFileSync("index.html", "utf8");

  for (const expected of [
    "data-skunkworks-head=\"mandatory-v1\"",
    "/lab-catalog.json",
    "LAB-LNX-101",
    "LAB-DAT-101",
    "Launch catalogue",
    "/site.webmanifest",
    "/assets/icons/favicon-black.png",
    "/assets/icons/favicon-white.png"
  ]) {
    if (!html.includes(expected)) {
      errors.push(`index.html is missing expected content: ${expected}`);
    }
  }
}

if (errors.length) {
  console.error("Labs site validation failed.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Labs site validation passed.");
