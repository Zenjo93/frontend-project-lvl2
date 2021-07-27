import _ from 'lodash';


const getUniqKeys = (file1, file2) => {
  const keysFile1 = _.keys(file1);

  const diffKeys = _.difference(_.keys(file2), _.keys(file1));
  const uniqKeys = [...keysFile1, ...diffKeys].sort();

  console.log('uniqKeys: ' + uniqKeys)
  return uniqKeys;
}

/* unchaged 
  changed
  removed
  added
*/

const getStatus = (key, file1, file2) => {
  let status = '';

  if ((_.has(file1, key) && !(_.has(file1, key)))) {
    status = 'removed'
  }

  if (!(_.has(file1, key) && (_.has(file1, key)))) {
    status = 'added'
  }

  // Если значения одинаковые, но для объектов не пройдет 
  if ((_.has(file1, key) && (_.has(file1, key)))) {
    if (Object.is(file1[key], file2[key])) {
      status = 'unchanged';
    }
    if(file1[key] instanceof Object && file2[key] instanceof Object) {
      status = 'unchanged';
    }
  } else {
    status = 'changed';
  }

  return status;
}


const getValue = (key, file1, file2) => {
  if (file1[key] instanceof Object && file2[key] instanceof Object) {
    return 'nested';
  }
  const value1 = file1[key]
  const value2 = file2[key]

  if (value1 === value2) {
    return value1;
  }
   else {
    return [value1, value2];
  }


}
/*Отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают. 
Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле. 

Если значение ключа объект в обеих файлах, то unchanged
*/

// Получите уникальный список ключей из двух объектов. Дальше проверяйте объекты по каждому из этих ключей и формируйте одно дерево с дифом
export const buildDiffTree = (file1, file2) => {
  const uniqKeys = getUniqKeys(file1, file2);
  const diffTree = [];
  

  uniqKeys.forEach(key => {
    const prop = {};
    prop['name'] = key;
    prop['status'] = getStatus(key, file1, file2);
    prop['value'] = getValue(key, file1, file2) // возвращает массив если есть дифф
    if (prop['value'] === 'nested') {
      prop['children'] = buildDiffTree(file1[key], file2[key]);
    }

    diffTree.push(prop);
  })


  return diffTree;
}



/* unchaged 
  changed
  removed
  added

// https://ru.hexlet.io/courses/js-trees/lessons/aggregation/theory_unit

/*

[ {
  name: "common",
  value: nested,
  status: unchanged / 
  children: [
    {
      name: follow
      value: false
      status: added
    },
    {
      name: setting1
      value: 200
      status: unchanged
    }
    ,
    {
      name: setting3
      status: updated
      oldValue: true
      newValue: null
    }
    ,
    {
      name: setting5
      value: nested
      status: added
      children: [
        {
          name: key5
          value: value5
          status: added
      }
    ]
    }
  ]


]


----------  1 ---------

{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}


----------  2 ---------
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}

*/