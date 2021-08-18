import parse from './src/parsers.js';
import buildAST from './src/buildAST.js';
import formatDiff from './src/formatters/index.js';

export default (path1, path2, formatName = 'stylish') => {
  const [file1, file2] = parse(path1, path2);
  const tree = buildAST(file1, file2);

  const diff = formatDiff(tree, formatName);

  return diff;
};
