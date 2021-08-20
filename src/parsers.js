import yaml from 'js-yaml';

export default (data, type) => {
  if (type === 'yaml') {
    return yaml.load(data);
  }
  if (type === 'JSON') {
    return JSON.parse(data);
  }
  throw new Error('unknown extension');
};
