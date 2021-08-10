import _ from 'lodash';

const INDENT_COUNT = 2;

const SIGNS = {
  deleted: ' - ',
  added: ' + ',
  unchanged: ' ',
};

// const getIndent = (depth = 1, size = 'half') => {
//
//   if (size === 'full') {
//     return ' '.repeat(INDENT_COUNT * depth);
//   }
//   return ' '.repeat(INDENT_COUNT * depth - 2);
//
// };
//

const getIndent = (depth = 1) => {
  // если есть знак + 2 без знака * 2
  const indentSize = depth * INDENT_COUNT;
  const currentIndent = ' '.repeat(indentSize);

  return currentIndent;
}


const buildValue = (value, depth) => {
  if (_.isObject(value)) {
    const keys = _.keys(value);
    const lines = keys.map((key) => {
      return `${getIndent(depth + 2, 'full')}${SIGNS.unchanged}${key}: ${buildValue(value[key], depth + 2)}`;
    });
    return ['{', ...lines, `${getIndent(depth)} }`,
    ].join('\n');
  } else {
    return value;
  }
};


const formatStylish = (tree, depth = 1) => {

  const lines = tree.flatMap((node) => {
    if (node.type === 'nested') {
      return `${getIndent(depth + 1)}${SIGNS.unchanged}${node.name}: ${formatStylish(node.children, depth + 2)}`;
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
  return ['{', ...lines, `${getIndent(depth - 1)} }`,
  ].join('\n');
};

export default formatStylish;
