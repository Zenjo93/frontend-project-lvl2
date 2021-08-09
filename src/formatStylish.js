import _ from 'lodash';

const getChildren = (tree) => {
  if (Array.isArray(tree)) {
    return tree;
  }
  return tree.children;
};


const hasChildren = (node) => {
  return _.has(node, 'children')
}

const buildString = (node, currentIndent) => {
  switch (node.status) {
    case 'deleted':
      return `${currentIndent} - ${node.name}: ${node.value}`;
    case 'added':
      return `${currentIndent} + ${node.name}: ${node.value}`;
    case 'changed':
      return [
        `${currentIndent} - ${node.name}: ${node.value[0]}`,
        `${currentIndent} + ${node.name}: ${node.value[1]}`].join('\n');
    case 'unchanged':
      return `${currentIndent}   ${node.name}: ${node.value}`;

    default: return new Error('Unknown status');
  }
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const spacesCount = 2;
    const indentSize = depth + spacesCount;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - spacesCount);

    if (_.has(node, 'value')) {
      return buildString(node, currentIndent);
    }

    const name = node.name;
    const children = getChildren(node);

    const lines = children.flatMap((child) => {

      // console.log('child: ' + JSON.stringify(child, null, 2))
      // return `${currentIndent}${child.name}: {${iter(child, depth + 1)}`;
      return iter(child, depth + 1);

    });

    if (typeof name === 'undefined') {
      return ['{', ...lines, `${bracketIndent}}`].join('\n');
    }
    return [`${currentIndent}${name}: {`, ...lines, `${bracketIndent}}`].join('\n');


  };

  return iter(tree, 1);
};

export default formatStylish;
