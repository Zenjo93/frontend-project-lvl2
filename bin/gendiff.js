#!/usr/bin/env node
import { program } from 'commander';
import makeDiff from '../src/makeDiff.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program
  .argument('filepath1')
  .argument('filepath2')
  .action((filepath1, filepath2) => makeDiff(filepath1, filepath2))
  .parse();
