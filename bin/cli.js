#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<path1>, <path2>')
  .action((path1, path2, options) => console.log(genDiff(path1, path2, options.format)))
  .parse();
