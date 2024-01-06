const { test } = require('tap');

const { transformAsync } = require("@babel/core");
const fs = require('fs/promises');
const path = require('path');

test('transforms JSX code correctly via babel', async (t) => {
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

  t.snapshotFile = path.resolve(__dirname, '__snapshots__', 'babel.snap.cjs');
  t.matchSnapshot(result.code, 'fixture');
});
