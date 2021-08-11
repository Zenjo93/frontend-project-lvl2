import parse from './parsers.js';
import buildAST from './buildAST.js';
import formatDiff from './formatters/index.js';
// TODO: Программа должна уметь работать как с относительными, так и абсолютными путями до файлов

export default (path1, path2, formatName = 'stylish') => {
  const [file1, file2] = parse(path1, path2);
  const tree = buildAST(file1, file2);

  const diff = formatDiff(tree, formatName);

  return diff;
};
