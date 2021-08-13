import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishFormat = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const plainFormat = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const JSONFormat = fs.readFileSync(getFixturePath('jsonFormat.json'), 'utf-8');

const JSONPath1 = getFixturePath('file1.json');
const JSONPath2 = getFixturePath('file2.json');

const YmlPath1 = getFixturePath('file1.yml');
const YmlPath2 = getFixturePath('file2.yaml');

describe('Stylish formatting', () => {
  test('JSON files', () => {
    const actual = genDiff(JSONPath1, JSONPath2);
    expect(actual).toEqual(stylishFormat);
  });

  test('YML files', () => {
    const actual = genDiff(YmlPath1, YmlPath2);
    expect(actual).toEqual(stylishFormat);
  });
});

describe('Plain formatting', () => {
  test('JSON files', () => {
    const actual = genDiff(JSONPath1, JSONPath2, 'plain');
    expect(actual).toEqual(plainFormat);
  });

  test('YML files', () => {
    const actual = genDiff(YmlPath1, YmlPath2, 'plain');
    expect(actual).toEqual(plainFormat);
  });
});

describe('JSON formatting', () => {
  test('JSON files', () => {
    const actual = genDiff(JSONPath1, JSONPath2, 'json');
    expect(actual).toEqual(JSONFormat);
  });

  test('YML files', () => {
    const actual = genDiff(YmlPath1, YmlPath2, 'json');
    expect(actual).toEqual(JSONFormat);
  });
});
