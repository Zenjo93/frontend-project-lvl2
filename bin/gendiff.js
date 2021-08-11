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
    console.log(makeDiff(path1, path2, options.format));
  });

program.parse();
