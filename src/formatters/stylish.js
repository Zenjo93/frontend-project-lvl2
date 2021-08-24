import _ from 'lodash';

const INDENT_COUNT = 4;

const SIGNS = {
  deleted: ' - ',
  added: ' + ',
  unchanged: '   ',
};

const getIndent = (depth) => {
  const indentSize = depth * INDENT_COUNT;
  const currentIndent = ' '.repeat(indentSize);

  return currentIndent;
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
 
  const keys = _.keys(value);
  const lines = keys.map((key) => `${getIndent(depth)}${key}: ${stringify(value[key], depth)}`);
  return ['{', ...lines, `${getIndent(depth)}}`,
  ].join('\n');
};

const mapping = {
  deleted: (name, value, depth) => ` ${getIndent(depth)}${SIGNS.deleted}${name}: ${stringify(value, depth)}`,
  added: (name, value, depth) => ` ${getIndent(depth)}${SIGNS.added}${name}: ${stringify(value, depth)}`,
  changed: (name, value, depth) => [
    ` ${getIndent(depth)}${SIGNS.deleted}${name}: ${stringify(value[0], depth)}`,
    ` ${getIndent(depth)}${SIGNS.added}${name}: ${stringify(value[1], depth)}`,
  ],
  unchanged: (name, value, depth) => ` ${getIndent(depth)}${SIGNS.unchanged}${name}: ${stringify(value, depth)}`,
};

const formatStylish = (tree, depth = 0) => {
  const lines = tree.flatMap((node) => {
    if (node.type === 'nested') {
      return `${getIndent(depth + 1)}${node.name}: ${formatStylish(node.children, depth + 1)}`;
    }
    return mapping[node.type](node.name, node.value, depth);
  });
  return ['{', ...lines, `${getIndent(depth)}}`,
  ].join('\n');
};

export default formatStylish;


// const formatStylish = (tree, depth = 1) => {
//   const lines = tree.flatMap((node) => {
//     if (node.type === 'nested') {
//       return `${getIndent(depth + 1)}${node.name}: ${formatStylish(node.children, depth + 2)}`;
//     }
//     if (node.type === 'deleted') {
//       return `${getIndent(depth)}${SIGNS.deleted}${node.name}: ${stringify(node.value, depth + 1)}`;
//     }
//     if (node.type === 'added') {
//       return `${getIndent(depth)}${SIGNS.added}${node.name}: ${stringify(node.value, depth + 1)}`;
//     }
//     if (node.type === 'changed') {
//       return [
//         `${getIndent(depth)}${SIGNS.deleted}${node.name}: ${stringify(node.value[0], depth + 1)}`,
//         `${getIndent(depth)}${SIGNS.added}${node.name}: ${stringify(node.value[1], depth + 1)}`,
//       ];
//     }
//     return `${getIndent(depth + 1)}${SIGNS.unchanged}${node.name}: ${stringify(node.value, depth + 1)}`;
//   });
//   return ['{', ...lines, `${getIndent(depth - 1)}}`,
//   ].join('\n');
// };