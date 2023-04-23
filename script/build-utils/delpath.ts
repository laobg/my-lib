import fs from 'fs';
import { resolve } from 'path';
import { iuiOutput } from './paths';

// 保留文件
const stayFile = ['package.json', 'README.md'];

export const delPath = async (path: string) => {
  let files: string[] = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(async (file) => {
      const curPath = resolve(path, file);

      if (fs.statSync(curPath).isDirectory()) {
        if (file !== 'node_modules') await delPath(curPath);
      } else {
        if (!stayFile.includes(curPath)) {
          fs.unlinkSync(curPath);
        }
      }
    });

    if (path !== iuiOutput) fs.rmdirSync(path);
  }
};
