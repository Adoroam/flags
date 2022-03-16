# @utility_belt/flags

## installation

`npm install @utility_belt/flags`

---

## usage

This package contains 2 exports.

- The `flags` function which can be run on an array of strings as if it were a CLI argument. This is used for testing and non-standard cases.
- The `default` export returns the results of the `flags` function run on the current process' `argv2`.

---

### typescript example

```ts
// index.ts
import flags from '@utility_belt/flags'
```

When running the command `ts-node index.ts -ab --path some/nested/path` the flags object should resemble the following:

```js
{a: true, b: true, path: 'some/nested/path'}
```

---

### javascript example

If you're using commonjs with require statments it would look like this.

```js
// index.js
const flags = require('@utility_belt/flags').default
```

### other examples

```ts
// typescript or .mjs module
import { flags } from '@utility_belt/flags'
// commonjs
const { flags } = require('@utility_belt/flags')

const testArray = ['-ab', '--path', 'some/nested/path']
const output = flags(testArray) 
// output would be the same as previous examples
```
### contact the author
For questions/comments you can reach me via discord `Adoroam#8739`