const { test } = require('tap');
const { mock } = require('test');
const { render, jsx, Fragment, Deferred, Priority } = require('..');
const { formatTestTitle } = require('./harness.cjs');
const fixtures = require('./fixtures/components.cjs');
const Markdown = require('./fixtures/markdown.cjs').default;
const path = require('path');
const pDelay = require('@twipped/utils/pDelay').default;

const table = [
  {
    name: '<span>Hello</span>',
    input: jsx('span', { children: 'Hello' }),
    expected: '<span>Hello</span>',
  },
  {
    name: '<span title="1">Hello</span>',
    input: jsx('span', { children: 'Hello', title: "1" }),
    expected: '<span title="1">Hello</span>',
  },
  {
    name: '<span title={1}>Hello</span>',
    input: jsx('span', { children: 'Hello', title: 1 }),
    expected: '<span title="1">Hello</span>',
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
    name: 'class prop as string',
    input: jsx('span', { class: 'foo' }),
    expected: '<span class="foo"></span>',
  },
  {
    name: 'className prop as string',
    input: jsx('span', { className: 'foo' }),
    expected: '<span class="foo"></span>',
  },
  {
    name: 'class prop as array',
    input: jsx('span', { class: [ 'foo', [ 'bar' ] ] }),
    expected: '<span class="foo bar"></span>',
  },
  {
    name: 'className prop as array',
    input: jsx('span', { className: [ 'foo', [ 0 ] ] }),
    expected: '<span class="foo 0"></span>',
  },
  {
    name: 'className prop as empty array',
    input: jsx('span', { className: [] }),
    expected: '<span></span>',
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
  {
    name: 'nested child arrays',
    input: jsx('a', { children: [ 'a', [ 'b', [ 'c' ] ] ] }),
    expected: '<a>abc</a>',
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
      t.same(warn.mock.calls, [], 'no warnings were issued');
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


test('component stack behaves as expected', async (t) => {
  const warn = mock.fn();
  let stack;

  function Element (props) {
    stack = this.getCallStack({ raw: true });
    return jsx('a', props);
  }

  const el = jsx('div', {
    children: [
      jsx('span'),
      jsx(Element),
      jsx('span'),
    ],
  });

  await render(el, { warn });

  // t.matchSnapshot(result);
  t.same(stack, [
    '<div>',
    '<Element>',
  ]);
});

test('deferred component', async (t) => {
  const warn = mock.fn();
  const sequence = [];

  function ImmediateComponent ({ children, step }) {
    sequence.push('I' + step);
    return jsx('a', { children, title: step });
  }
  function DeferredComponent ({ children, step }) {
    sequence.push('D' + step);
    return jsx('b', { children, title: step });
  }
  DeferredComponent[Deferred] = true;

  const el = jsx('div', {
    children: [
      jsx(ImmediateComponent, { step: 1 }),
      jsx(DeferredComponent, { step: 2,
        children: [
          jsx(ImmediateComponent, { step: 3 }),
          jsx(ImmediateComponent, { step: 4 }),
        ] }),
      jsx(ImmediateComponent, { step: 5 }),
      jsx(DeferredComponent, {
        step: 6,
        children: [
          jsx(ImmediateComponent, { step: 7 }),
          jsx(ImmediateComponent, { step: 8 }),
        ],
      }),
    ],
  });
  const output = await render(el, { warn });

  t.same(sequence, [ 'I1', 'I5', 'I3', 'I4', 'I7', 'I8', 'D2', 'D6' ], 'order of execution');
  t.same(output, '<div><a title="1"></a><b title="2"><a title="3"></a><a title="4"></a></b><a title="5"></a><b title="6"><a title="7"></a><a title="8"></a></b></div>', 'html');
});

test('deferred element', async (t) => {
  const warn = mock.fn();
  const sequence = [];
  async function Component ({ children, step, delay }) {
    if (delay) await pDelay(50);
    sequence.push(step);
    return jsx('a', { children, title: step });
  }

  const el = jsx('div', {
    children: [
      jsx(Component, { step: 1 }),
      jsx(Component, { step: 2, [Priority]: -1 }),
      jsx(Component, { step: 3 }),
      jsx(Component, { step: 4,
        [Priority]: 1,
        delay: true,
        children: [
          jsx(Component, { step: 5 }),
          jsx(Component, { step: 6, [Priority]: true }),
          jsx(Component, { step: 7 }),
        ] }),
      jsx(Component, { step: 8 }),
      jsx(Component, { step: 9, [Priority]: 5 }),
      jsx(Component, { step: 10 }),
    ],
  });
  const output = await render(el, { warn });

  t.same(sequence, [ 9, 4, 6, 5, 7, 1, 3, 8, 10, 2  ], 'order of execution');
  t.same(output, '<div><a title="1"></a><a title="2"></a><a title="3"></a><a title="4"><a title="5"></a><a title="6"></a><a title="7"></a></a><a title="8"></a><a title="9"></a><a title="10"></a></div>', 'html');
});
