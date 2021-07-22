import * as fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default (path1, path2) => {
  const extName = path.extname(path1);

  if (extName === '.yml' || extName === '.yaml') {
    const file1 = yaml.load(fs.readFileSync(path1));
    const file2 = yaml.load(fs.readFileSync(path2));
    return [file1, file2];
  }

  const file1 = JSON.parse(fs.readFileSync(path1));
  const file2 = JSON.parse(fs.readFileSync(path2));
  return [file1, file2];
};
