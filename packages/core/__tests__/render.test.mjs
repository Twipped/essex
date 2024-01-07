import fest, { test, expect } from '@twipped/festival';
import pDelay from '@twipped/utils/pDelay';
import { render, jsx, Fragment, Deferred, Priority } from '../src/index.js';
import * as fixtures from './fixtures/components.mjs';
import Markdown from './fixtures/markdown.mjs';

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

test.each(table)('$name', async (row) => {
  const warn = fest.fn();
  const output = await render(row.input, { warn });
  expect(output).toEqual(row.expected);
  if (row.warnings) {
    const actual = warn.mock.calls.map(([ message ]) => message);
    expect(actual).toEqual(row.warnings);
  } else {
    expect(warn).not.toHaveBeenCalled();
  }
});
// }

test('markdown.mdx', async () => {
  const output = await render(Markdown);
  expect(output).toMatchSnapshot();
});

test('thrown error in render pipeline', async () => {
  const p = render(jsx(fixtures.DeepThrow));
  await expect(p).rejects.toThrow('oh no!');

  const err = await p.catch((e) => e);
  expect(err.stack).toMatch(/<Throws>/);
});

test('throws if given empty string as type', async () => {
  const p = render(jsx(''));
  await expect(p).rejects.toThrow('essex.render() received an element of an unknown type: ""');

  const err = await p.catch((e) => e);
  expect(err.stack).toEqual(err.message);
});

test('throws if given empty string as type, nested', async () => {
  const p = render(jsx('a', { children: jsx('') }));
  await expect(p).rejects.toThrow('essex.render() received an element of an unknown type: ""');

  const err = await p.catch((e) => e);
  // trace contains the parent element
  expect(err.stack).toMatch(`${err.message}\n    in <a>`);
});


test('component stack behaves as expected', async () => {
  const warn = fest.fn();
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

  expect(stack).toEqual([
    '<div>',
    '<Element>',
  ]);
});

test('deferred component', async () => {
  const warn = fest.fn();
  const sequence = [];

  function ImmediateComponent ({ children, step }) {
    sequence.push(`I${step}`);
    return jsx('a', { children, title: step });
  }
  function DeferredComponent ({ children, step }) {
    sequence.push(`D${step}`);
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

  expect(sequence).toEqual([ 'I1', 'I5', 'I3', 'I4', 'I7', 'I8', 'D2', 'D6' ]);
  expect(output).toMatchSnapshot();
  expect(warn).not.toHaveBeenCalled();
});

test('deferred element', async () => {
  const warn = fest.fn();
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

  expect(sequence).toEqual([ 9, 4, 6, 5, 7, 1, 3, 8, 10, 2 ]);
  expect(output).toMatchSnapshot();
  expect(warn).not.toHaveBeenCalled();
});

test('renders a div with a style object', async () => {
  const warn = fest.fn();

  const el = jsx('div', {
    style: {
      fontWeight: 'bold',
      a: {
        textDecoration: 'none',
      },
    },
  });

  const result = await render(el, { warn });

  expect(result).toEqual('<div style="font-weight:bold"></div>');
  expect(warn).not.toHaveBeenCalled();
});
