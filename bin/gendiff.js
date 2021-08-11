#!/usr/bin/env node
import { program } from 'commander';
import makeDiff from '../src/makeDiff.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish');

program
  .arguments('<path1>, <path2>')
  .action((path1, path2, options) => {
    if (options.format === 'plain') {
      console.log('plain format');
    } else {
      console.log(makeDiff(path1, path2));
    }
  });

program.parse();
