import yaml from 'js-yaml';

const mapping = {
  yaml: yaml.load,
  yml: yaml.load,
  json: JSON.parse,
};

export default (data, type) => mapping[type](data);
