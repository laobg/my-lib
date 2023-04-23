import { series, parallel } from 'gulp';
import fs from 'fs';
import { resolve } from 'path';

import { run, outCompPkg, iuiOutput } from '@my-lib/build-utils';

const buildIui = async function () {
  run('pnpm -C packages/components run build');
};

const copyPkg = async function () {
  const file = fs.readFileSync(resolve(outCompPkg, 'package.json'));
  fs.writeFileSync(resolve(iuiOutput, 'package.json'), file);
  const md = fs.readFileSync(resolve(outCompPkg, 'README.md'));
  fs.writeFileSync(resolve(iuiOutput, 'README.md'), md);
};
export default series(buildIui, copyPkg);
