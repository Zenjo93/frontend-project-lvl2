import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const formatDiff = (tree, formatName) => {
  if (formatName === 'plain') {
    return formatPlain(tree);
  }
  if (formatName === 'json') {
    return formatJSON(tree);
  }
  return formatStylish(tree);
};

export default formatDiff;
