import path from 'path';
import fs from 'fs';
import parse from './src/parsers.js';
import buildAST from './src/buildAST.js';
import formatDiff from './src/formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath);
};

export default (path1, path2, formatName = 'stylish') => {
  const file1 = readFile(path1);
  const file2 = readFile(path2);

  const extFile1 = path.extname(path1);
  const extFile2 = path.extname(path2);

  const data1 = parse(file1, extFile1);
  const data2 = parse(file2, extFile2);

  const tree = buildAST(data1, data2);

  return formatDiff(tree, formatName);
};
