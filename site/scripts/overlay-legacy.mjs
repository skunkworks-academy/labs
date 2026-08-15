import {cp, copyFile, mkdir, stat} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(here, '..');
const repoRoot = resolve(siteDir, '..');
const buildDir = resolve(siteDir, 'build');

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectory(name) {
  const source = resolve(repoRoot, name);
  if (await exists(source)) {
    await cp(source, resolve(buildDir, name), {recursive: true, force: true});
  }
}

async function copyRootFile(name) {
  const source = resolve(repoRoot, name);
  if (await exists(source)) {
    const target = resolve(buildDir, name);
    await mkdir(dirname(target), {recursive: true});
    await copyFile(source, target);
  }
}

for (const directory of ['labs', 'assets', 'catalog']) {
  await copyDirectory(directory);
}

for (const file of ['lab-catalog.json', 'site.webmanifest', 'favicon.ico', 'robots.txt']) {
  await copyRootFile(file);
}

console.log('Legacy lab assets overlaid into the Docusaurus build.');
