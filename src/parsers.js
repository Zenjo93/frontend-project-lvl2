import yaml from 'js-yaml';

export default (data, extension) => {
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(data);
  }

  return JSON.parse(data);
};
