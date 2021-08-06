import _ from 'lodash';

const formatStylish = (tree) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue.toString(); //
    }

    const spacesCount = 4;
    const indentSize = spacesCount * depth; // 4 * 1
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - spacesCount);

    const statusSigns = {
      deleted: ' - ',
      added: ' + ',
      unchanged: ' ',
      nested: ' ',
    };

    const lines = currentValue.flatMap(node => {
      const key = node.name;
      const status = node.status;
      const value = node.value;


    })

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');

  }

  return iter(tree, 1);
}
