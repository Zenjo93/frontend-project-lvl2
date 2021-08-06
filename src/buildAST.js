import _ from 'lodash';

const getUniqKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  return _.union(keys1, keys2);
};

const getStatus = (key, file1, file2) => {
  if (_.isObject(file1[key]) && _.isObject((file2[key]))) {
    return 'nested';
  }
  if (!_.has(file1, key)) {
    return 'added';
  }
  if (!_.has(file2, key)) {
    return 'deleted';
  }
  if (file1[key] !== file2[key]) {
    return 'changed';
  }
  if (file1[key] === file2[key]) {
    return 'unchanged';
  }
  return new Error('Unknown status!');
};

const getValue = (key, status, file1, file2) => {
  switch (status) {
    case 'deleted':
      return file1[key];
    case 'added':
      return file2[key];
    case 'changed':
      return [file1[key], file2[key]];
    case 'unchanged':
      return file1[key];
    case 'nested':
      return buildAST(file1[key], file2[key]);
    default:
      throw new Error('Unknown status!');
  }
};

const buildAST = (file1, file2) => {
  const keys = getUniqKeys(file1, file2);

  const result = [];

  for (const key of keys) {
    const node = {};
    node.name = key;
    node.status = getStatus(key, file1, file2); // unchanged, changed, deleted, added / nested
    node.value = getValue(key, node.status, file1, file2); // примитив или // объект (дети)

    result.push(node);
  }

  return result;
};

export default buildAST;

const tree =
[
  {
    "name": "common",
    "status": "nested",
    "value": [
      {
        "name": "setting1",
        "status": "unchanged",
        "value": "Value 1"
      },
      {
        "name": "setting2",
        "status": "deleted",
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
        "name": "setting6",
        "status": "nested",
        "value": [
          {
            "name": "key",
            "status": "unchanged",
            "value": "value"
          },
          {
            "name": "doge",
            "status": "nested",
            "value": [
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
            "name": "ops",
            "status": "added",
            "value": "vops"
          }
        ]
      },
      {
        "name": "follow",
        "status": "added",
        "value": false
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
      }
    ]
  },
  {
    "name": "group1",
    "status": "nested",
    "value": [
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
    "status": "deleted",
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
