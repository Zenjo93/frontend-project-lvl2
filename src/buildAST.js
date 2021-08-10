import _ from 'lodash';

const getUniqKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  return _.union(keys1, keys2);
};

const buildAST = (file1, file2) => {
  const keys = getUniqKeys(file1, file2).sort();

  const result = [];

  for (const key of keys) {
    const node = {};
    node.name = key;

    if (_.isObject(file1[key]) && _.isObject((file2[key]))) {
      node.type = 'nested';
      node.children = buildAST(file1[key], file2[key]);
    } else if (!_.has(file1, key)) {
      node.type = 'added';
      node.value = file2[key];
    } else if (!_.has(file2, key)) {
      node.type = 'deleted';
      node.value = file1[key];
    } else if (file1[key] !== file2[key]) {
      node.type = 'changed';
      node.value = [file1[key], file2[key]];
    } else if (file1[key] === file2[key]) {
      node.type = 'unchanged';
      node.value = file1[key];
    }
    result.push(node);
  }

  return result;
};

export default buildAST;
