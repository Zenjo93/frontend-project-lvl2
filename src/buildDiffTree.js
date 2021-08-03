import _ from 'lodash';


const getUniqKeys = (file1, file2) => {
  const keysFile1 = _.keys(file1);

  const diffKeys = _.difference(_.keys(file2), _.keys(file1));
  const uniqKeys = [...keysFile1, ...diffKeys].sort();

  // console.log('uniqKeys: ' + uniqKeys)
  return uniqKeys;
}


const getStatus = (key, file1, file2) => {
  let status = '';

  if ((_.has(file1, key) === true && (_.has(file2, key) === false))) {
    status = 'removed'
  }

  if ((_.has(file1, key) === false && (_.has(file2, key) === true))) {
    status = 'added'
  }

  // Если значения одинаковые, но для объектов не пройдет 
  if ((_.has(file1, key) && (_.has(file2, key)))) {
    if (Object.is(file1[key], file2[key])) {
      status = 'unchanged';
    }
    else if (!(Object.is(file1[key], file2[key]))) {
      status = 'changed';
    }
    if(file1[key] instanceof Object && file2[key] instanceof Object) {
      status = 'unchanged';
    }
  } 

  return status;
}


const getValue = (key, file1, file2) => {
  if (file1[key] instanceof Object && file2[key] instanceof Object) {
    return 'nested';
  }

  let result;

  let value1, value2;

  if (_.has(file1, key) && _.has(file2, key)) {
    value1 = file1[key];
    value2 = file2[key];
    result = value1 === value2 ? value1 : [value1, value2];
    return result;
  }
  else {
    result = _.has(file1, key) ? file1[key] : file2[key]
  }
  

  return result;

}


/*Отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают. 
Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле. 

Если значение ключа объект в обеих файлах, то unchanged
*/

// Получите уникальный список ключей из двух объектов. Дальше проверяйте объекты по каждому из этих ключей и формируйте одно дерево с дифом


export const buildDiffTree = (file1, file2) => {

  const iter = (file1, file2, depth) => {
    const uniqKeys = getUniqKeys(file1, file2);
    const diffTree = [];
  
    uniqKeys.forEach(key => {
    const prop = {};
    prop['name'] = key;
    prop['status'] = getStatus(key, file1, file2);
    prop['value'] = getValue(key, file1, file2) // возвращает массив если есть дифф
    prop['depth'] = depth;
    if (prop['value'] === 'nested') {
      prop['children'] = iter(file1[key], file2[key], depth + 1);
    }

    diffTree.push(prop);

  })

  return diffTree;

  }

  

return iter(file1, file2, 1);
}
