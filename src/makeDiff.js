import _ from 'lodash';
import parse from './parsers.js';
import { buildDiffTree } from './buildDiffTree.js';

// TODO: Программа должна уметь работать как с относительными, так и абсолютными путями до файлов

export default (path1, path2) => {
  const [file1, file2] = parse(path1, path2);

  // Составление объекта с различиями 
  const diffObject = buildDiffTree(file1, file2);
  console.log(JSON.stringify(diffObject, null, 2));

  // Форматирование объекта (stylish) возвращает строку
  //const formatedDiffTree = formatStylish(diffObject);

  //console.log('result:' + result);
  //return formatedDiffTree;

}

//   const file1SortedKeys = Object.keys(file1).sort();
//   const file2SortedKeys = Object.keys(file2).sort();

//   const diffKeys = _.difference(file2SortedKeys, file1SortedKeys).sort();

//   let result = '{' + '\n';

//   file1SortedKeys.forEach((key) => {
//     const file1Key = key;
//     const file1Value = file1[key];

//     const file2Key = file2.hasOwnProperty(key) ? key : null;
//     const file2Value = file2[key];

//     if (file2Key !== null && file1Key === file2Key) {
//       if (file1Value === file2Value) {
//         result = result.concat(`    ${key}: ${file1Value}\n`);
//       } else {
//         result = result.concat(`  - ${key}: ${file1Value}\n`);
//         result = result.concat(`  + ${key}: ${file2Value}\n`);
//       }
//     }
//     if (file2Key === null) {
//       result = result.concat(`  - ${key}: ${file1Value}\n`);
//     }
//   });

//   diffKeys.forEach((key) => result = result.concat(`  + ${key}: ${file2[key]}\n`));

//   result = result.concat('}' + '\n');

//   console.log(result);
//   return result;
