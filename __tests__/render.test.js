const { test } = require('tap');
const { mock } = require('test');
const { render, jsx, Fragment } = require('..');
const { formatTestTitle } = require('./harness.cjs');
const fixtures = require('./fixtures/components.cjs');
const Markdown = require('./fixtures/markdown.cjs').default;
const path = require('path');

const table = [
  {
    name: '<span>Hello</span>',
    input: jsx('span', { children: 'Hello' }),
    expected: '<span>Hello</span>',
  },
  {
    name: '<fixtures.span />',
    input: fixtures.span,
    expected: '<span>Hello</span>',
  },
  {
    name: '<Span>Hello</Span>',
    input: jsx(fixtures.Span, { children: 'Hello' }),
    expected: '<span>Hello</span>',
  },
  {
    name: '<Span><>Hello</></Span>',
    input: jsx(fixtures.Span, { children: jsx(Fragment, { children: 'Hello' }) }),
    expected: '<span>Hello</span>',
  },
  {
    name: '<Span><>Hello</></Span>',
    input: fixtures.ContextWrapper,
    expected: '<div><span>VALUE</span></div>',
  },
  {
    name: 'empty string as children',
    input: jsx('span', { children: '' }),
    expected: '<span></span>',
  },
  {
    name: 'null as children',
    input: jsx('span', { children: null }),
    expected: '<span></span>',
  },
  {
    name: 'empty array as children',
    input: jsx('span', { children: [] }),
    expected: '<span></span>',
  },
  {
    name: 'number as children',
    input: jsx('span', { children: 0 }),
    expected: '<span>0</span>',
  },
  {
    name: '<input type="radio" checked>',
    input: jsx('input', { type: 'radio', checked: true }),
    expected: '<input type="radio" checked>',
  },
  {
    name: '<input type="radio" checked={false}>',
    input: jsx('input', { type: 'radio', checked: false }),
    expected: '<input type="radio">',
  },
  {
    name: 'radiobutton',
    input: jsx('input', { type: 'radio', download: true }),
    expected: '<input type="radio" download>',
    warnings: [
      "The \"download\" attribute is not typically used with <input>.",
    ],
  },
  {
    name: 'radiobutton',
    input: jsx('div', { style: { fontWeight: 'bold' } }),
    expected: "<div style=\"font-weight:bold\"></div>",
  },
];

let i = 0;
for (const row of table) {
  i++;
  const name = formatTestTitle('render($name)', row, i);
  test(name, async (t) => {
    const warn = mock.fn();
    const output = await render(row.input, { warn });
    t.same(output, row.expected, row.expected);
    if (row.warnings) {
      const actual = warn.mock.calls.map(({ arguments: [ message ] }) => message);
      t.match(actual, row.warnings, 'got expected warnings');
    } else {
      t.same(warn.mock.calls.length, 0, 'no warnings were issued');
    }
  });
}

test('markdown.mdx', async (t) => {
  const output = await render(Markdown);
  t.snapshotFile = path.resolve(__dirname, '__snapshots__', 'markdown.js.snap.cjs');
  t.matchSnapshot(output, 'render(Markdown)');
});

test('thrown error in render pipeline', async (t) => {
  const p = render(jsx(fixtures.DeepThrow));
  await t.rejects(p);
  const err = await p.catch((e) => e);
  t.same(err.message, 'oh no!');

  t.match(err.stack, /<Throws>/, 'found Throws component in call stack');
});

test('throws if given empty string as type', async (t) => {
  const p = render(jsx(''));
  await t.rejects(p);
  const err = await p.catch((e) => e);
  t.same(err.message, 'essex.render() received an element of an unknown type: ""', 'correct message');
  t.same(err.stack, err.message, 'call stack is empty');
});

test('throws if given empty string as type, nested', async (t) => {
  const p = render(jsx('a', { children: jsx('') }));
  await t.rejects(p);
  const err = await p.catch((e) => e);
  t.same(err.message, 'essex.render() received an element of an unknown type: ""', 'correct message');
  t.same(err.stack, `${err.message}\n    in <a>`, 'trace contains the parent element');
});
