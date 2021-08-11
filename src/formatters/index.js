import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatDiff = (tree, formatName) => {
  if (formatName === 'plain') {
    return formatPlain(tree);
  }
  return formatStylish(tree);
};

export default formatDiff;
