import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const expectedLabs = [
  ['LAB-SEC-201', 'openvas.md'],
  ['LAB-SEC-202', 'nmap-nse.md'],
  ['LAB-WEB-201', 'burp-suite.md'],
  ['LAB-WEB-202', 'owasp-zap.md'],
  ['LAB-WEB-203', 'nikto.md'],
  ['LAB-WEB-204', 'wapiti.md'],
  ['LAB-CMS-201', 'wpscan.md'],
  ['LAB-CMS-202', 'droopescan.md'],
  ['LAB-CMS-203', 'cmsmap.md'],
  ['LAB-WIFI-201', 'aircrack-ng.md'],
  ['LAB-WIFI-202', 'kismet.md'],
  ['LAB-SYS-201', 'lynis.md'],
  ['LAB-EXP-301', 'metasploit.md'],
  ['LAB-SEC-390', 'capstone.md'],
];

const requiredFiles = [
  'docs-security-tools/index.md',
  'sidebars-security-tools.js',
  'static/security-tool-labs.json',
  'static/fixtures/security-tools/northstar-scope.yaml',
  'static/fixtures/security-tools/synthetic-evidence-pack.json',
  ...expectedLabs.map(([, file]) => `docs-security-tools/${file}`),
];

const errors = [];
for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}

for (const [code, file] of expectedLabs) {
  const path = join(root, 'docs-security-tools', file);
  if (!existsSync(path)) continue;
  const content = readFileSync(path, 'utf8');
  for (const marker of [code, 'Authorised', 'Evidence', 'Knowledge check']) {
    if (!content.toLowerCase().includes(marker.toLowerCase())) {
      errors.push(`${file} is missing required marker: ${marker}`);
    }
  }
}

try {
  const catalogue = JSON.parse(readFileSync(join(root, 'static/security-tool-labs.json'), 'utf8'));
  const codes = new Set(catalogue.products?.map((item) => item.code));
  for (const [code] of expectedLabs) {
    if (!codes.has(code)) errors.push(`security-tool-labs.json is missing ${code}`);
  }
} catch (error) {
  errors.push(`security-tool-labs.json is invalid JSON: ${error.message}`);
}

try {
  const evidence = JSON.parse(readFileSync(join(root, 'static/fixtures/security-tools/synthetic-evidence-pack.json'), 'utf8'));
  if (evidence.classification !== 'synthetic-training-data') {
    errors.push('Synthetic evidence pack must declare classification: synthetic-training-data');
  }
} catch (error) {
  errors.push(`synthetic-evidence-pack.json is invalid JSON: ${error.message}`);
}

const scope = existsSync(join(root, 'static/fixtures/security-tools/northstar-scope.yaml'))
  ? readFileSync(join(root, 'static/fixtures/security-tools/northstar-scope.yaml'), 'utf8')
  : '';
for (const marker of ['public_network_scanning: prohibited', 'wireless_deauthentication: prohibited', 'destructive_modules: prohibited']) {
  if (!scope.includes(marker)) errors.push(`Scope fixture is missing safety control: ${marker}`);
}

if (errors.length) {
  console.error('Security tool lab validation failed.');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Security tool lab validation passed for ${expectedLabs.length} labs.`);
