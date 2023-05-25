const { test } = require('tap');
const { mock } = require('test');
const { render, jsx, Fragment } = require('../src/index');

test('renders a div with styling', async (t) => {
  const warn = mock.fn();

  const el = jsx('div', { style: {
    fontWeight: 'bold',
    a: {
      textDecoration: 'none',
    },
  } });

  const result = await render(el, { warn });

  t.same(result, '<div style=\"font-weight:bold\"></div>');

  // t.snapshotFile = path.resolve(__dirname, '__snapshots__', 'emotion.mdx.snap.cjs');
  // t.matchSnapshot(result.value);

  console.log(warn.mock.calls);
});
