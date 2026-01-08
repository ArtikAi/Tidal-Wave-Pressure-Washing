import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const targets = ['src', 'index.html'];
const allowedExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.html']);
const needle = 'dangerouslySetInnerHTML';
const matches = [];

function shouldScan(filePath) {
  const ext = path.extname(filePath);
  return allowedExtensions.has(ext);
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(needle)) {
    matches.push(path.relative(projectRoot, filePath));
  }
}

function walk(currentPath) {
  const stats = fs.statSync(currentPath);
  if (stats.isDirectory()) {
    const entries = fs.readdirSync(currentPath);
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === 'dist' || entry === 'updated-site') {
        continue;
      }
      walk(path.join(currentPath, entry));
    }
    return;
  }

  if (shouldScan(currentPath)) {
    scanFile(currentPath);
  }
}

for (const target of targets) {
  const resolved = path.join(projectRoot, target);
  if (fs.existsSync(resolved)) {
    walk(resolved);
  }
}

if (matches.length > 0) {
  console.error(`${needle} found in:`);
  for (const file of matches) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Security check passed.');
