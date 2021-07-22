import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import makeDiff from '../src/makeDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('JSON files', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(makeDiff(path1, path2)).toMatch(result);
});

test('YML files', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yaml');

  expect(makeDiff(path1, path2)).toMatch(result);
});
