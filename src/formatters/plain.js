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
  deleted: (path, { name }) => `Property '${path}${name}' was removed`,
  added: (path, { name, value }) => `Property '${path}${name}' was added with value: ${stringify(value)}`,
  changed: (path, { name, value }) => `Property '${path}${name}' was updated. From ${stringify(value[0])} to ${stringify(value[1])}`,
  unchanged: () => 'unchanged',
  nested: (path, { name, children }, iter) => iter(children, `${path}${name}.`),
};

// попробуй прокинуть в итер нужные параметры для нестеда

const formatPlain = (tree) => {
  const iter = (currentNode, path = '') => {
    const lines = currentNode.flatMap((node) => {
      return mapping[node.type](path, node, iter);
    });
    return [...lines].filter((el) => el !== 'unchanged')
      .join('\n');
  };
  return iter(tree);
};

export default formatPlain;

