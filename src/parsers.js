import * as fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath);
  return data;
};

export default (path1, path2) => {
  const file1 = readFile(path1);
  const file2 = readFile(path2);

  const extName = path.extname(path1);

  if (extName === '.yml' || extName === '.yaml') {
    const data1 = yaml.load(file1);
    const data2 = yaml.load(file2);
    return [data1, data2];
  }

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  return [data1, data2];
};
