#!/usr/bin/env node

/**
 * Skunkworks Academy Labs mandatory page-head validator.
 *
 * Fails when any committed/static .html page is missing the mandatory head marker:
 *   data-skunkworks-head="mandatory-v1"
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const REQUIRED_MARKER = 'data-skunkworks-head="mandatory-v1"';
const HTML_EXTENSION = '.html';

const IGNORED_DIRECTORIES = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.nuxt',
  'coverage',
  'vendor'
]);

function walk(directory, files = []) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(ROOT, fullPath);

    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) {
        walk(fullPath, files);
      }
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(HTML_EXTENSION)) {
      files.push(relativePath);
    }
  }

  return files;
}

function validateHtmlFile(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  return content.includes(REQUIRED_MARKER);
}

function main() {
  const htmlFiles = walk(ROOT);
  const failures = htmlFiles.filter((file) => !validateHtmlFile(file));

  if (htmlFiles.length === 0) {
    console.log('No HTML files found. Mandatory head validation passed.');
    return;
  }

  if (failures.length > 0) {
    console.error('\nMandatory Skunkworks Academy page head validation failed.');
    console.error(`Missing marker: ${REQUIRED_MARKER}\n`);
    failures.forEach((file) => console.error(`- ${file}`));
    console.error('\nFix: add the approved head block from _includes/mandatory-head.html.');
    process.exit(1);
  }

  console.log(`Mandatory head validation passed for ${htmlFiles.length} HTML file(s).`);
}

main();
