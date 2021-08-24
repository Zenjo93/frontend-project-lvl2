import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const format = {
  plain: formatPlain,
  stylish: formatStylish,
  json: formatJSON,
};

const formatDiff = (tree, formatName) => {
  if (!_.has(format, formatName)) {
    throw new Error('unknown format');
  }
  return format[formatName](tree);
};

export default formatDiff;
