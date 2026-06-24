import { existsSync } from 'node:fs';
const required = ['CNAME','catalog/labs.json','docs/architecture.md'];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) { console.error('Missing files:', missing.join(', ')); process.exit(1); }
console.log('Labs validation passed.');
