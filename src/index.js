import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildAST from './buildAST.js';
import formatDiff from './formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath);
};

const getFileType = (filePath) => path.extname(filePath).replace('.', '');

export default (path1, path2, formatName = 'stylish') => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const data1Type = getFileType(path1);
  const data2Type = getFileType(path2);

  const parsedData1 = parse(data1, data1Type);
  const parsedData2 = parse(data2, data2Type);

  const tree = buildAST(parsedData1, parsedData2);

  return formatDiff(tree, formatName);
};
