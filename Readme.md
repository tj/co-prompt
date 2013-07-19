
# co-prompt

  Sane terminal user-input for nodejs that return thunks for [co](https://github.com/visionmedia/co).

## Installation

```
$ npm install co-fs
```

## Examples

```js
var name = yield prompt('username: ');
var pass = yield password('password: ');
var desc = yield multiline('description: ');
var ok = yield confirm('are you sure? ');
```

## API

### prompt(msg)

  Prompt for user input with `msg`.

### prompt.password(msg, [mask])

  Prompt for password input with `msg` and optional `mask`
  defaulting to "*".

### prompt.multiline(msg)

  Prompt for multi-line input with `msg`.

### prompt.confirm(msg)

  Prompt for confirmation with `msg`.

## License

  MIT

