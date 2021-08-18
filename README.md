### Hexlet tests and linter status:
[![Actions Status](https://github.com/Zenjo93/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Zenjo93/frontend-project-lvl2/actions)

[![tests](https://github.com/Zenjo93/frontend-project-lvl2/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/Zenjo93/frontend-project-lvl2/actions)

[![linter](https://github.com/Zenjo93/frontend-project-lvl2/actions/workflows/ci-linter.yml/badge.svg)](https://github.com/Zenjo93/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/0eaaa3bc1e140e8e9490/maintainability)](https://codeclimate.com/github/Zenjo93/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/0eaaa3bc1e140e8e9490/test_coverage)](https://codeclimate.com/github/Zenjo93/frontend-project-lvl2/test_coverage)

# Hexlet Project #2: Diff Generator

## How to install
This is training project therefore I used to ```npm publish --dry-run```.
For installing: clone repo to your computer and run ```make install```.

## Description
You can use program like CLI utility via ```gendiff``` command or like import package:```import genDiff from
'@hexlet/code' ```

### For help<br>
Type `gendiff -h`<br>
Example: <br>
<a href="https://asciinema.org/a/Oj2mbTeoGZBUyd1BvHh1NHcdZ"><img src="https://asciinema.org/a/Oj2mbTeoGZBUyd1BvHh1NHcdZ.png" width="400"/></a>

### Stylish format
For stylish format output type: ```gendiff -f stylish <file1> <file2>``` <br>
Also stylish format is  using by default <br>
<a href="https://asciinema.org/a/eK8MRkKP5WCLwcArhKD4UrApl"><img src="https://asciinema.org/a/eK8MRkKP5WCLwcArhKD4UrApl.png" width="400"/></a>

### Plain:
For plain format output type: ```gendiff -f plain <file1> <file2>``` <br>
<a href="https://asciinema.org/a/JZ7Xj7Y5yuR0w7NunX2FbhvXj"><img src="https://asciinema.org/a/JZ7Xj7Y5yuR0w7NunX2FbhvXj.png" width="400"/></a>

### JSON:
For json format output type: ```gendiff -f json <file1> <file2>``` <br>
<a href="https://asciinema.org/a/9r1aJFiQC7sYMXuwHZM3tQacQ"><img src="https://asciinema.org/a/9r1aJFiQC7sYMXuwHZM3tQacQ.png" width="400"/></a>