import { test, expect } from '@twipped/festival';

import { compile } from "@mdx-js/mdx";
import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname((new URL(import.meta.url)).pathname);

test('transforms MDX code correctly via babel', async () => {
  const fixtures = await fs.readFile(path.resolve(__dirname, 'fixtures', 'markdown.mdx'));
  const result = await compile(fixtures, {
    jsxRuntime: "automatic",
    jsxImportSource: "..",
    development: true,
  });

  expect(result.value).toMatchSnapshot();
});
