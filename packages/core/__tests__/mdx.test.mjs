import { test, expect } from '@twipped/festival';

import { compile, evaluate } from '@mdx-js/mdx';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { render, jsx } from '../src/index.js';
import * as runtime from '../jsx-dev-runtime.js';

const __dirname = path.dirname((new URL(import.meta.url)).pathname);

test('transforms MDX code correctly via babel', async () => {
  const fixpath = path.resolve(__dirname, 'fixtures', 'markdown.mdx');
  const fixtures = await fs.readFile(fixpath);
  const result = await compile(fixtures, {
    jsxRuntime: 'automatic',
    jsxImportSource: '..',
    development: true,
  });

  expect(result.value).toMatchSnapshot('compiled');

  const mod = await evaluate(fixtures, {
    ...runtime,
    baseUrl: pathToFileURL(fixpath),
  });

  const rendered = await render(jsx(mod.default));

  expect(rendered).toMatchSnapshot('rendered');
});
