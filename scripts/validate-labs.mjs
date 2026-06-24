import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "catalog/labs.json"
];

const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    errors.push(`Missing required file: ${file}`);
  }
}

if (existsSync("catalog/labs.json")) {
  try {
    const labs = JSON.parse(readFileSync("catalog/labs.json", "utf8"));

    if (!Array.isArray(labs)) {
      errors.push("catalog/labs.json must be an array.");
    }

    for (const lab of labs) {
      for (const field of ["id", "title", "track", "level", "durationMinutes", "status", "summary"]) {
        if (!lab[field]) {
          errors.push(`Lab record is missing required field: ${field}`);
        }
      }
    }
  } catch (error) {
    errors.push(`catalog/labs.json is invalid JSON: ${error.message}`);
  }
}

if (existsSync("index.html")) {
  const html = readFileSync("index.html", "utf8");

  for (const expected of ["catalog/labs.json", "renderLabs", "labGrid", "Available labs"]) {
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
