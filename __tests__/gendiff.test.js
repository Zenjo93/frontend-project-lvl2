import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishExpected = fs.readFileSync(getFixturePath('stylishExpected.txt'), 'utf-8');
const plainExpected = fs.readFileSync(getFixturePath('plainExpected.txt'), 'utf-8');
const jsonExpected = fs.readFileSync(getFixturePath('jsonExpected.json'), 'utf-8');

const JSONPath1 = getFixturePath('file1.json');
const JSONPath2 = getFixturePath('file2.json');

const YmlPath1 = getFixturePath('file1.yml');
const YmlPath2 = getFixturePath('file2.yaml');

const cases = [
  {
    format: 'stylish',
    expected: stylishExpected,
  },
  {
    format: 'plain',
    expected: plainExpected,
  },
  {
    format: 'json',
    expected: jsonExpected,
  },
];

test.each(cases)('JSON format $format', ({
  format,
  expected,
}) => {
  const actual = genDiff(JSONPath1, JSONPath2, format);
  expect(actual)
    .toEqual(expected);
});

test.each(cases)('YML format $format', ({
  format,
  expected,
}) => {
  const actual = genDiff(YmlPath1, YmlPath2, format);
  expect(actual)
    .toEqual(expected);
});
