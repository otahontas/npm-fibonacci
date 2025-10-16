import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

const currentVersion = pkg.version;

const versionDeps = Object.keys(pkg.dependencies)
  .filter(key => /^\d+\.\d+\.\d+$/.test(key))
  .sort((a, b) => parseInt(a) - parseInt(b));

delete pkg.dependencies[versionDeps[0]];

pkg.dependencies[currentVersion] = `otahontas/npm-fibonacci#${currentVersion}`;

writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

execSync('npm update', { stdio: 'inherit' });
execSync('npm install', { stdio: 'inherit' });

const nMinus1 = currentVersion;
const nMinus2 = versionDeps[1];

const indexContent = `import nMinus1 from "${nMinus1}";
import nMinus2 from "${nMinus2}";
export default nMinus1 + nMinus2;
`;
writeFileSync('index.js', indexContent);

const result = (await import('./index.js')).default;
const newVersion = `${result}.0.0`;

execSync(`npm version ${newVersion} --no-git-tag-version`, { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -m "${newVersion}" --no-verify`, { stdio: 'inherit' });
execSync(`git tag -af ${newVersion} -m "${newVersion}"`, { stdio: 'inherit' });
execSync('git push origin main', { stdio: 'inherit' });
execSync(`git push origin ${newVersion}`, { stdio: 'inherit' });
