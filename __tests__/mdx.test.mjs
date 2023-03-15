import { test } from 'tap';

import { compile } from "@mdx-js/mdx";
import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname((new URL(import.meta.url)).pathname);

test('transforms JSX code correctly via babel', async (t) => {
  const fixtures = await fs.readFile(path.resolve(__dirname, 'fixtures', 'markdown.mdx'));
  const result = await compile(fixtures, {
    jsxRuntime: "automatic",
    jsxImportSource: "..",
    development: true,
  });

  t.snapshotFile = path.resolve(__dirname, '__snapshots__', 'markdown.mdx.snap.cjs');
  t.matchSnapshot(result.value, 'markdown');
});
