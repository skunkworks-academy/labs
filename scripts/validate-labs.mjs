import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "CNAME",
  "catalog/labs.json",
  "schemas/lab.schema.json",
  "docs/architecture.md"
];

const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) errors.push(`Missing required file: ${file}`);
}

if (existsSync("catalog/labs.json")) {
  try {
    const labs = JSON.parse(readFileSync("catalog/labs.json", "utf8"));
    if (!Array.isArray(labs)) errors.push("catalog/labs.json must contain an array.");
    if (Array.isArray(labs) && labs.length === 0) errors.push("catalog/labs.json must contain at least one lab.");
  } catch (error) {
    errors.push(`catalog/labs.json is invalid JSON: ${error.message}`);
  }
}

if (errors.length) {
  console.error("Labs validation failed.");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Labs validation passed.");
