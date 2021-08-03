
import _ from "lodash";

export const formatStylish = (diffTree) => {

  const iter = (diffTree, depth) => {
    let diff = '';
    const tabs = '--'.repeat(depth);

    diffTree.forEach(el => {
    if (el['value'] === 'nested') {
      
      diff =  diff.concat(`${tabs}${el['name']}: ${iter(el['children'], depth + 1)}`)
    }

    else if (el['status'] === 'removed') {
      const value = stringify(el['value'], depth)
      diff = diff.concat(`${tabs}- ${el['name']}: ${value}\n`);
    
      
    }
    else if (el['status'] === 'added') {
      const value = stringify(el['value'], depth)
      diff =  diff.concat(`${tabs}+ ${el['name']}: ${value}\n`)
    }

    else if(el['status'] === 'changed') {
      const value1 = stringify(el['value'][0], depth)
      const value2 = stringify(el['value'][1], depth)
      diff = diff.concat(`${tabs}- ${el['name']}: ${value1}\n`)
      diff = diff.concat(`${tabs}+ ${el['name']}: ${value2}\n`)
    }

    else {
      const value = stringify(el['value'], depth)
      diff = diff.concat(`${tabs}  ${el['name']}: ${value}\n`);
    }
  })

  return `{\n${diff}${tabs}}\n`;
  }


return iter(diffTree, 1);
}

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    return toString(value, depth)
  }

  return value;
}

const toString = (obj, depth) => {
  
    const keys = _.keys(obj);
    let stringObj = '\n';
    const tabs = '++'.repeat(depth);

    keys.forEach(key => {
      const value = obj[key];
  
      if (_.isObject(value)) {
        stringObj = stringObj.concat(`${tabs}${key}: ${toString(value, depth + 1)}\n`);
      }
      else {
        stringObj = stringObj.concat(`!!!!${tabs}${key}: ${value}\n`);
      }
    })

  return `{${stringObj}${tabs}}`
}

// OLD

// const toString = (obj) => {
//   const iter = (obj, depth) => {
//     const keys = _.keys(obj);
//     let stringObj = '{' + '\n';
//     const tabs = '    '.repeat(depth);

//     keys.forEach(key => {
//       const value = obj[key];
  
//       if (_.isObject(value)) {
//         stringObj = stringObj.concat(`${tabs}${key}: ${iter(value, depth + 1)}\n`);
//       }
//       else {
//         stringObj = stringObj.concat(`${tabs}${key}: ${value}\n`);
//       }
//     })

//     return `${stringObj}${tabs}}`
//   }

//   return iter(obj, 2);
// }







/*
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}

  */

/*************** Результат *********

[
  {
    "name": "common",
    "status": "unchanged",
    "value": "nested",
    "children": [
      {
        "name": "follow",
        "status": "added",
        "value": false
      },
      {
        "name": "setting1",
        "status": "unchanged",
        "value": "Value 1"
      },
      {
        "name": "setting2",
        "status": "removed",
        "value": 200
      },
      {
        "name": "setting3",
        "status": "changed",
        "value": [
          true,
          null
        ]
      },
      {
        "name": "setting4",
        "status": "added",
        "value": "blah blah"
      },
      {
        "name": "setting5",
        "status": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "name": "setting6",
        "status": "unchanged",
        "value": "nested",
        "children": [
          {
            "name": "doge",
            "status": "unchanged",
            "value": "nested",
            "children": [
              {
                "name": "wow",
                "status": "changed",
                "value": [
                  "",
                  "so much"
                ]
              }
            ]
          },
          {
            "name": "key",
            "status": "unchanged",
            "value": "value"
          },
          {
            "name": "ops",
            "status": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "name": "group1",
    "status": "unchanged",
    "value": "nested",
    "children": [
      {
        "name": "baz",
        "status": "changed",
        "value": [
          "bas",
          "bars"
        ]
      },
      {
        "name": "foo",
        "status": "unchanged",
        "value": "bar"
      },
      {
        "name": "nest",
        "status": "changed",
        "value": [
          {
            "key": "value"
          },
          "str"
        ]
      }
    ]
  },
  {
    "name": "group2",
    "status": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "name": "group3",
    "status": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]

*/