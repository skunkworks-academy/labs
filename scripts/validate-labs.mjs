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
  "labs/bits-and-bytes-101/instructor-guide.md",
  "labs/ipv4-subnetting-101/index.html",
  "labs/ipv4-subnetting-101/lab.css",
  "labs/ipv4-subnetting-101/lab.js",
  "labs/ipv4-subnetting-101/manifest.yaml",
  "labs/ipv4-subnetting-101/instructor-guide.md",
  "labs/analysis-toolkit-labs.css",
  "labs/analysis-toolkit-labs.js",
  "labs/it-foundations-labs.css",
  "labs/remnux-triage-201/index.html",
  "labs/remnux-triage-201/README.md",
  "labs/remnux-triage-201/manifest.yaml",
  "labs/remnux-triage-201/instructor-guide.md",
  "labs/flarevm-workbench-201/index.html",
  "labs/flarevm-workbench-201/README.md",
  "labs/flarevm-workbench-201/manifest.yaml",
  "labs/flarevm-workbench-201/instructor-guide.md",
  "labs/kali-forensics-201/index.html",
  "labs/kali-forensics-201/README.md",
  "labs/kali-forensics-201/manifest.yaml",
  "labs/kali-forensics-201/instructor-guide.md",
  "docs/malware-analysis-lab-runtime.md",
  "labs/dns-dhcp-arp-102/index.html",
  "labs/dns-dhcp-arp-102/README.md",
  "labs/dns-dhcp-arp-102/manifest.yaml",
  "labs/dns-dhcp-arp-102/instructor-guide.md",
  "labs/linux-admin-102/index.html",
  "labs/linux-admin-102/README.md",
  "labs/linux-admin-102/manifest.yaml",
  "labs/linux-admin-102/instructor-guide.md",
  "labs/phishing-triage-101/index.html",
  "labs/phishing-triage-101/README.md",
  "labs/phishing-triage-101/manifest.yaml",
  "labs/phishing-triage-101/instructor-guide.md",
  "labs/pcap-investigation-201/index.html",
  "labs/pcap-investigation-201/README.md",
  "labs/pcap-investigation-201/manifest.yaml",
  "labs/pcap-investigation-201/instructor-guide.md",
  "labs/entra-identity-101/index.html",
  "labs/entra-identity-101/README.md",
  "labs/entra-identity-101/manifest.yaml",
  "labs/entra-identity-101/instructor-guide.md",
  "labs/cloud-foundations-101/index.html",
  "labs/cloud-foundations-101/README.md",
  "labs/cloud-foundations-101/manifest.yaml",
  "labs/cloud-foundations-101/instructor-guide.md",
  "labs/azure-landing-zone-101/index.html",
  "labs/azure-landing-zone-101/README.md",
  "labs/azure-landing-zone-101/manifest.yaml",
  "labs/azure-landing-zone-101/instructor-guide.md",
  "labs/gcp-iam-finops-101/index.html",
  "labs/gcp-iam-finops-101/README.md",
  "labs/gcp-iam-finops-101/manifest.yaml",
  "labs/gcp-iam-finops-101/instructor-guide.md",
  "labs/git-secure-collaboration-101/index.html",
  "labs/git-secure-collaboration-101/README.md",
  "labs/git-secure-collaboration-101/manifest.yaml",
  "labs/git-secure-collaboration-101/instructor-guide.md",
  "labs/sql-analysts-102/index.html",
  "labs/sql-analysts-102/README.md",
  "labs/sql-analysts-102/manifest.yaml",
  "labs/sql-analysts-102/instructor-guide.md"
];

const analysisLabs = [
  {
    code: "LAB-REM-201",
    page: "labs/remnux-triage-201/index.html",
    manifest: "labs/remnux-triage-201/manifest.yaml",
    safetyMarker: "untrustedSampleExecution: disabled"
  },
  {
    code: "LAB-FLR-201",
    page: "labs/flarevm-workbench-201/index.html",
    manifest: "labs/flarevm-workbench-201/manifest.yaml",
    safetyMarker: "untrustedSampleExecution: disabled"
  },
  {
    code: "LAB-KAL-201",
    page: "labs/kali-forensics-201/index.html",
    manifest: "labs/kali-forensics-201/manifest.yaml",
    safetyMarker: "liveScanning: disabled"
  }
];

const foundationLabs = [
  {
    code: "LAB-NET-102",
    page: "labs/dns-dhcp-arp-102/index.html",
    manifest: "labs/dns-dhcp-arp-102/manifest.yaml",
    path: "/labs/dns-dhcp-arp-102/",
    safetyMarker: "packetCapture: synthetic-only"
  },
  {
    code: "LAB-SYS-102",
    page: "labs/linux-admin-102/index.html",
    manifest: "labs/linux-admin-102/manifest.yaml",
    path: "/labs/linux-admin-102/",
    safetyMarker: "interactiveShell: simulated-only"
  },
  {
    code: "LAB-SEC-101",
    page: "labs/phishing-triage-101/index.html",
    manifest: "labs/phishing-triage-101/manifest.yaml",
    path: "/labs/phishing-triage-101/",
    safetyMarker: "messageFixtures: synthetic-only"
  },
  {
    code: "LAB-NET-201",
    page: "labs/pcap-investigation-201/index.html",
    manifest: "labs/pcap-investigation-201/manifest.yaml",
    path: "/labs/pcap-investigation-201/",
    safetyMarker: "liveCapture: disabled"
  },
  {
    code: "LAB-ID-101",
    page: "labs/entra-identity-101/index.html",
    manifest: "labs/entra-identity-101/manifest.yaml",
    path: "/labs/entra-identity-101/",
    safetyMarker: "liveTenantAccess: disabled"
  },
  {
    code: "LAB-CLD-101",
    page: "labs/cloud-foundations-101/index.html",
    manifest: "labs/cloud-foundations-101/manifest.yaml",
    path: "/labs/cloud-foundations-101/",
    safetyMarker: "liveCloudAccess: disabled"
  },
  {
    code: "LAB-AZ-101",
    page: "labs/azure-landing-zone-101/index.html",
    manifest: "labs/azure-landing-zone-101/manifest.yaml",
    path: "/labs/azure-landing-zone-101/",
    safetyMarker: "liveTenantAccess: disabled"
  },
  {
    code: "LAB-GCP-101",
    page: "labs/gcp-iam-finops-101/index.html",
    manifest: "labs/gcp-iam-finops-101/manifest.yaml",
    path: "/labs/gcp-iam-finops-101/",
    safetyMarker: "liveProjectAccess: disabled"
  },
  {
    code: "LAB-DEV-101",
    page: "labs/git-secure-collaboration-101/index.html",
    manifest: "labs/git-secure-collaboration-101/manifest.yaml",
    path: "/labs/git-secure-collaboration-101/",
    safetyMarker: "repositoryAccess: disabled"
  },
  {
    code: "LAB-DAT-102",
    page: "labs/sql-analysts-102/index.html",
    manifest: "labs/sql-analysts-102/manifest.yaml",
    path: "/labs/sql-analysts-102/",
    safetyMarker: "liveDatabaseAccess: disabled"
  }
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
    const ids = new Set();
    for (const lab of labs) {
      requireFields(lab, ["id", "title", "track", "level", "durationMinutes", "status", "summary"], "Catalogue lab record");
      if (!Number.isFinite(lab.durationMinutes) || lab.durationMinutes <= 0) {
        errors.push(`Catalogue lab record has an invalid durationMinutes value: ${lab.id ?? "unknown"}`);
      }
      ids.add(lab.id);
    }
    for (const expectedId of ["LAB-NET-102", "LAB-SYS-102", "LAB-SEC-101", "LAB-NET-201", "LAB-ID-101", "LAB-CLD-101", "LAB-AZ-101", "LAB-GCP-101", "LAB-DEV-101", "LAB-DAT-102", "LAB-REM-201", "LAB-FLR-201", "LAB-KAL-201"]) {
      if (!ids.has(expectedId)) {
        errors.push(`catalog/labs.json is missing expected lab: ${expectedId}`);
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

      for (const expectedCode of ["LAB-LNX-101", "LAB-DAT-101", "LAB-NET-101", "LAB-NET-102", "LAB-SYS-102", "LAB-SEC-101", "LAB-NET-201", "LAB-ID-101", "LAB-CLD-101", "LAB-AZ-101", "LAB-GCP-101", "LAB-DEV-101", "LAB-DAT-102", "LAB-REM-201", "LAB-FLR-201", "LAB-KAL-201"]) {
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
    "LAB-NET-101",
    "LAB-NET-102",
    "LAB-SYS-102",
    "LAB-SEC-101",
    "LAB-NET-201",
    "LAB-ID-101",
    "LAB-CLD-101",
    "LAB-AZ-101",
    "LAB-GCP-101",
    "LAB-DEV-101",
    "LAB-DAT-102",
    "LAB-REM-201",
    "LAB-FLR-201",
    "LAB-KAL-201",
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

for (const lab of analysisLabs) {
  if (existsSync(lab.page)) {
    const page = readFileSync(lab.page, "utf8");
    for (const expected of [
      'data-skunkworks-head="mandatory-v1"',
      `data-lab-code="${lab.code}"`,
      "../analysis-toolkit-labs.css",
      "../analysis-toolkit-labs.js",
      "Synthetic",
      "id=\"assessmentForm\"",
      "id=\"completion\""
    ]) {
      if (!page.includes(expected)) {
        errors.push(`${lab.page} is missing expected content: ${expected}`);
      }
    }
  }
  if (existsSync(lab.manifest)) {
    const manifest = readFileSync(lab.manifest, "utf8");
    for (const expected of [`code: ${lab.code}`, "environment: browser-only-simulation", "publicNetwork: forbidden", lab.safetyMarker]) {
      if (!manifest.includes(expected)) {
        errors.push(`${lab.manifest} is missing expected safety metadata: ${expected}`);
      }
    }
  }
}

for (const lab of foundationLabs) {
  if (existsSync(lab.page)) {
    const page = readFileSync(lab.page, "utf8");
    for (const expected of [
      'data-skunkworks-head="mandatory-v1"',
      'data-lab-code="' + lab.code + '"',
      "../it-foundations-labs.css",
      "../analysis-toolkit-labs.js",
      'id="assessmentForm"',
      'id="completion"',
      "Local learning record only"
    ]) {
      if (!page.includes(expected)) {
        errors.push(lab.page + " is missing expected content: " + expected);
      }
    }
  }
  if (existsSync(lab.manifest)) {
    const manifest = readFileSync(lab.manifest, "utf8");
    for (const expected of ["code: " + lab.code, "environment: browser-only-simulation", "publicNetwork: forbidden", lab.safetyMarker]) {
      if (!manifest.includes(expected)) {
        errors.push(lab.manifest + " is missing expected safety metadata: " + expected);
      }
    }
  }
}

if (existsSync("sitemap.xml")) {
  const sitemap = readFileSync("sitemap.xml", "utf8");
  for (const lab of foundationLabs) {
    if (!sitemap.includes("https://labs.skunkworksacademy.com" + lab.path)) {
      errors.push("sitemap.xml is missing expected lab: " + lab.path);
    }
  }
}

if (errors.length) {
  console.error("Labs site validation failed.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Labs site validation passed.");
