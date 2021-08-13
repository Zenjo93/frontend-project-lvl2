import _ from 'lodash';

const getUniqKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  return _.union(keys1, keys2);
};

const buildAST = (file1, file2) => {
  const keys = _.sortBy(getUniqKeys(file1, file2));
  const result = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject((file2[key]))) {
      return {
        name: key,
        type: 'nested',
        children: buildAST(file1[key], file2[key]),
      };
    } if (!_.has(file1, key)) {
      return {
        name: key,
        type: 'added',
        value: file2[key],
      };
    } if (!_.has(file2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: file1[key],
      };
    } if (file1[key] !== file2[key]) {
      return {
        name: key,
        type: 'changed',
        value: [file1[key], file2[key]],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: file1[key],
    };
  });

  return result;
};

export default buildAST;
