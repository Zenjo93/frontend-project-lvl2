import _ from 'lodash';

const getUniqKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  return _.union(keys1, keys2);
};

const buildAST = (data1, data2) => {
  const keys = _.sortBy(getUniqKeys(data1, data2));
  const result = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject((data2[key]))) {
      return {
        name: key,
        type: 'nested',
        children: buildAST(data1[key], data2[key]),
      };
    } if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: data2[key],
      };
    } if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: data1[key],
      };
    } if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key,
        type: 'changed',
        value: [data1[key], data2[key]],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: data1[key],
    };
  });

  return result;
};

export default buildAST;
