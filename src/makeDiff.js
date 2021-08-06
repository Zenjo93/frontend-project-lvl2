import parse from './parsers.js';
import { buildAST } from './buildAST.js';
import { formatStylish } from './formatStylish.js';
// TODO: Программа должна уметь работать как с относительными, так и абсолютными путями до файлов

export default (path1, path2) => {
  const [file1, file2] = parse(path1, path2);

  // Составление объекта с различиями
  const diffObject = buildAST(file1, file2);
  // console.log(`DIFFOBJECT: ${JSON.stringify(diffObject, null, 2)}`);

  // Форматирование объекта (stylish) возвращает строку
  const formatedDiffTree = formatStylish(diffObject);

  //console.log(`${'RESULT: ' + '\n'}${formatedDiffTree}`);

  // console.log('result:' + result);
  return formatedDiffTree;
};
