import fs from 'fs';
import path from 'path';

const lockPath = path.join(process.cwd(), 'package-lock.json');
if (!fs.existsSync(lockPath)) {
  console.error('package-lock.json is missing.');
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
const packages = lock.packages || {};
const allowlist = new Set(['esbuild', 'fsevents']);
const offenders = [];

for (const [pkgPath, info] of Object.entries(packages)) {
  if (!info?.hasInstallScript) {
    continue;
  }

  if (!pkgPath.startsWith('node_modules/')) {
    continue;
  }

  const name = pkgPath.replace(/^node_modules\//, '');
  if (!allowlist.has(name)) {
    offenders.push(name);
  }
}

if (offenders.length > 0) {
  console.error('Unexpected install scripts detected:');
  for (const pkg of offenders.sort()) {
    console.error(`- ${pkg}`);
  }
  process.exit(1);
}

console.log('Install script check passed.');
