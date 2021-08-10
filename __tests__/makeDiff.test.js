import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import makeDiff from '../src/makeDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = fs.readFileSync(getFixturePath('resultTree.txt'), 'utf-8');

const JSONPath1 = getFixturePath('file1.json');
const JSONpath2 = getFixturePath('file2.json');

const YmlPath1 = getFixturePath('file1.yml');
const YmlPath2 = getFixturePath('file2.yaml');

test('JSON files', () => {
  const actual = makeDiff(JSONPath1, JSONpath2);
  expect(actual).toEqual(expected);
});

test('YML files', () => {
  const actual = makeDiff(YmlPath1, YmlPath2);
  expect(actual).toEqual(expected);
});
