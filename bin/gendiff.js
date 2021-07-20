#!/usr/bin/env node
import gendiff from '../src/gendiffcli.js'
import  { program } from 'commander';

program.version('0.0.1');
program
.description('Compares two configuration files and shows a difference.')
.parse(process.argv);
  

gendiff();




