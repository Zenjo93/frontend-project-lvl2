import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const mapping = {
  deleted: (path, nodeName) => `Property '${path}${nodeName}' was removed`,
  added: (path, nodeName, nodeValue) => `Property '${path}${nodeName}' was added with value: ${stringify(nodeValue)}`,
  changed: (path, nodeName, nodeValue) => `Property '${path}${nodeName}' was updated. From ${stringify(nodeValue[0])} to ${stringify(nodeValue[1])}`,
  unchanged: () => 'unchanged',
};

const formatPlain = (tree) => {
  const iter = (currentNode, path = '') => {
    const lines = currentNode.flatMap((node) => {
      if (node.type === 'nested') {
        return iter(node.children, `${path}${node.name}.`);
      }
      return mapping[node.type](path, node.name, node.value);
    });
    return [...lines].filter((el) => el !== 'unchanged')
      .join('\n');
  };
  return iter(tree);
};

export default formatPlain;

// const formatPlain = (tree) => {
//   const iter = (currentNode, path = '') => {
//     const lines = currentNode.filter((node) => node.type !== 'unchanged').flatMap((node) => {
//       if (node.type === 'nested') {
//         return iter(node.children, `${path}${node.name}.`);
//       }
//       if (node.type === 'deleted') {
//         return `Property '${path}${node.name}' was removed`;
//       }
//       if (node.type === 'added') {
//         return `Property '${path}${node.name}' was added with value: ${getValue(node.value)}`;
//       }
// eslint-disable-next-line max-len
//       return `Property '${path}${node.name}' was updated. From ${getValue(node.value[0])} to ${getValue(node.value[1])}`;
//     });
//     return [...lines].filter((el) => typeof el !== 'undefined').join('\n');
//   };
//   return iter(tree);
// };
