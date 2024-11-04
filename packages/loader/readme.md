# import-essex

> Import and transpile JSX via [loader hooks](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#loaders) for use with the Essex template runtime. It doesn't transpile anything besides JSX and caches transpiled sources by default.

This library has been forked from [vadimdemedes/import-jsx](https://github.com/vadimdemedes/import-jsx).

## Install

```console
npm install import-essex
```

## Usage

> **Note**:
> `import-essex` only works with ES modules.

```sh
node --loader=import-essex react-example.js
```

**react-example.js**

```jsx
const HelloWorld = () => <h1>Hello world</h1>;
```

## Examples

### React

React is auto-detected by default and `react` will be auto-imported, if it's not already.

```jsx
const HelloWorld = () => <h1>Hello world</h1>;
```

### Disable cache

`import-jsx` caches transpiled sources by default, so that the same file is transpiled only once.
If that's not a desired behavior, turn off caching by setting `IMPORT_JSX_CACHE=0` or `IMPORT_JSX_CACHE=false` environment variable.

```console
IMPORT_JSX_CACHE=0 node --loader=import-jsx my-code.js
```
