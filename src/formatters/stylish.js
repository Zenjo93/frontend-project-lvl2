import _ from 'lodash';

const INDENT_COUNT = 2;

const SIGNS = {
  deleted: '- ',
  added: '+ ',
  unchanged: '',
};

const getIndent = (depth = 1) => {
  const indentSize = depth * INDENT_COUNT;
  const currentIndent = ' '.repeat(indentSize);

  return currentIndent;
};

const buildValue = (value, depth) => {
  if (_.isObject(value)) {
    const keys = _.keys(value);
    const lines = keys.map((key) => {
      return `${getIndent(depth + 2)}${key}: ${buildValue(value[key], depth + 2)}`;
    });
    return ['{', ...lines, `${getIndent(depth)}}`,
    ].join('\n');
  }
  return value;
};

const stylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    if (node.type === 'nested') {
      return `${getIndent(depth + 1)}${node.name}: ${stylish(node.children, depth + 2)}`;
    }
    if (node.type === 'deleted') {
      return `${getIndent(depth)}${SIGNS.deleted}${node.name}: ${buildValue(node.value, depth + 1)}`;
    }
    if (node.type === 'added') {
      return `${getIndent(depth)}${SIGNS.added}${node.name}: ${buildValue(node.value, depth + 1)}`;
    }
    if (node.type === 'changed') {
      return [
        `${getIndent(depth)}${SIGNS.deleted}${node.name}: ${buildValue(node.value[0], depth + 1)}`,
        `${getIndent(depth)}${SIGNS.added}${node.name}: ${buildValue(node.value[1], depth + 1)}`,
      ];
    }
    return `${getIndent(depth + 1)}${SIGNS.unchanged}${node.name}: ${buildValue(node.value, depth + 1)}`;
  });
  return ['{', ...lines, `${getIndent(depth - 1)}}`,
  ].join('\n');
};

export default stylish;
