import { test, expect } from '@twipped/festival';
import { transformAsync } from '@babel/core';
import fs from 'node:fs/promises';
import path from 'node:path';
const __dirname = path.dirname((new URL(import.meta.url)).pathname);

test('transforms JSX code correctly via babel', async () => {
  const fixtures = await fs.readFile(path.resolve(__dirname, 'fixtures', 'components.jsx'));
  const result = await transformAsync(fixtures, {
    babelrc: false,
    "presets": [
      [
        "@babel/preset-env", {
          "useBuiltIns": "entry",
          "corejs": 3,
          modules: 'cjs',
          "exclude": [ "transform-typeof-symbol" ],
        },
      ],
      [
        "@babel/preset-react",
        {
          "runtime": "automatic",
          "importSource": "..",
          "development": true,
        },
      ],
    ],
  });

  expect(result.code).toMatchSnapshot();
});
