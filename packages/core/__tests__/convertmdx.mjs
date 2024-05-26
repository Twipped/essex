/* eslint-disable n/shebang */

import fs from 'node:fs/promises';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import { transformAsync } from '@babel/core';

const fname = path.resolve(process.argv[2]);

const mjs = path.parse(fname);
mjs.base = mjs.base.slice(0, -mjs.ext.length);
mjs.base += '.mjs';

const cjs = path.parse(fname);
cjs.base = cjs.base.slice(0, -cjs.ext.length);
cjs.base += '.cjs';

const value = await fs.readFile(fname);

const compiled = String(await compile(
  {
    value,
    path: fname,
  },
  {
    jsxRuntime: 'automatic',
    jsxImportSource: 'essex',
    development: true,
  }
));

await fs.writeFile(path.format(mjs), compiled);

const commonjs = await transformAsync(compiled, {
  babelrc: false,
  'presets': [
    [
      '@babel/preset-env', {
        'useBuiltIns': 'entry',
        'corejs': 3,
        modules: 'cjs',
        'exclude': [ 'transform-typeof-symbol' ],
      },
    ],
  ],
});

await fs.writeFile(path.format(cjs), commonjs.code);
