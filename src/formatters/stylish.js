import _ from 'lodash';

const INDENT_COUNT = 4;

const SIGNS = {
  deleted: ' - ',
  added: ' + ',
  unchanged: '   ',
};

const getIndent = (depth) => {
  const indentSize = depth * INDENT_COUNT;
  return ' '.repeat(indentSize);
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const lines = keys.map((key) => `${getIndent(depth + 2)}${key}: ${stringify(value[key], depth + 1)}`);
  return ['{', ...lines, `${getIndent(depth + 1)}}`,
  ].join('\n');
};

const mapping = {
  deleted: ({ name, value }, depth) => ` ${getIndent(depth)}${SIGNS.deleted}${name}: ${stringify(value, depth)}`,
  added: ({ name, value }, depth) => ` ${getIndent(depth)}${SIGNS.added}${name}: ${stringify(value, depth)}`,
  changed: ({ name, value }, depth) => [
    ` ${getIndent(depth)}${SIGNS.deleted}${name}: ${stringify(value[0], depth)}`,
    ` ${getIndent(depth)}${SIGNS.added}${name}: ${stringify(value[1], depth)}`,
  ],
  unchanged: ({ name, value }, depth) => ` ${getIndent(depth)}${SIGNS.unchanged}${name}: ${stringify(value, depth)}`,
  nested: ({ name, children }, depth, formatStylish) => `${getIndent(depth + 1)}${name}: ${formatStylish(children, depth + 1)}`,
};

const formatStylish = (tree, depth = 0) => {
  const lines = tree.flatMap((node) => mapping[node.type](node, depth, formatStylish));
  return ['{', ...lines, `${getIndent(depth)}}`,
  ].join('\n');
};

export default formatStylish;
