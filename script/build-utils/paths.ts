import { resolve } from 'path';

// 项目根目录
export const projRoot = resolve(__dirname, '..', '..');

// pkg根目录
export const pkgRoot = resolve(projRoot, 'packages');
// 组件根目录
export const compRoot = resolve(pkgRoot, 'components');

export const outCompPkg = resolve(pkgRoot, 'iui');
/** /dist */
export const buildOutput = resolve(projRoot, 'dist');

/** /dist/iui */

export const iuiOutput = resolve(buildOutput, 'iui');
