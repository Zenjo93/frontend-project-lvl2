#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../gendiff.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish');

program
  .arguments('<path1>, <path2>')
  .action((path1, path2, options) => {
    console.log(genDiff(path1, path2, options.format));
  });

program.parse();
