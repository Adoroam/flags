# @utility_belt/flags
## installation
`npm install @utility_belt/flags`

## usage
This package contains 2 exports. 
- The `flags` function which can be run on an string as if it were a CLI argument. This is used for testing and non-standard cases. 
- The `default` export returns the results of the `flags` function run on the current process' `argv2`. 

If you're using import statements you could simply call:

```javascript
// for the default export which gives an object of key/value pairs
import flags from '@utility_belt/flags'
```
or 
```javaScript
// for the plain function that takes strings
import { flags } from '@utility_belt/flags'
```

If you're using stock node without imports it would look like this:

```javascript
// for the default export which gives an object of key/value pairs
const flags = require('@utility_belt/flags').default
```
or
```javascript
// for the plain function that takes strings
const { flags } = require('@utility_belt/flags')
```
