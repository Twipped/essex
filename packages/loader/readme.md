# import-essex

> Import and transpile JSX via [loader hooks](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#loaders) for use with the [Essex template runtime](https://www.npmjs.com/package/essex). It doesn't transpile anything besides JSX and caches transpiled sources by default.

This library has been forked from [vadimdemedes/import-jsx](https://github.com/vadimdemedes/import-jsx).

## Install

```console
npm install import-essex
```

## Usage

> **Note**:
> `import-essex` only works with ES modules.

```sh
node --loader=import-essex example.js
```

**example.js**

```jsx
const HelloWorld = () => <h1>Hello world</h1>;
```

Alternatively, the following can be placed in the entry file for your Node application.

```js
import { register } from 'node:module';
register(import.meta.resolve('import-essex'));
```


### Disable cache

`import-essex` caches transpiled sources by default, so that the same file is transpiled only once.
If that's not a desired behavior, turn off caching by setting `IMPORT_ESSEX_CACHE=0` or `IMPORT_ESSEX_CACHE=false` environment variable.

```console
IMPORT_ESSEX_CACHE=0 node --loader=import-essex my-code.js
```
