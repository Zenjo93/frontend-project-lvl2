import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const formatePlain = (tree) => {
  const iter = (tree, path = '') => {
    const lines = tree.flatMap((node) => {
      if (node.type === 'nested') {
        return iter(node.children, `${path}${node.name}.`);
      }
      if (node.type === 'deleted') {
        return `Property '${path}${node.name}' was removed`;
      }
      if (node.type === 'added') {
        return `Property '${path}${node.name}' was added with value: ${getValue(node.value)}`;
      }
      if (node.type === 'changed') {
        return `Property '${path}${node.name}' was updated. From ${getValue(node.value[0])} to ${getValue(node.value[1])}`;
      }
    });
    return [...lines].filter((el) => typeof el !== 'undefined').join('\n');
  };
  return iter(tree);
};

export default formatePlain;
