
/* Описываем каждый ключ, у ключа есть значение 1, значение 2 и дети (наличие)

возвращаем объект с различиями
*/

export const buildDiffTree = (file1, file2) => {
  const file1SortedKeys = Object.keys(file1).sort();

  console.log('file1: ' + file1SortedKeys);
  

}