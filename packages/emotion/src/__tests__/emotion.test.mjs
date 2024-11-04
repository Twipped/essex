/* eslint-disable no-shadow */

import fest, { test, expect, describe } from '@twipped/festival';
import { render, jsx, Priority } from 'essex';
import { styled, EmotionProvider, Outlet } from '../index.js';
import Global from '../Global.js';


describe('styled components', async () => {
  test('renders a styled div', async () => {
    const warn = fest.fn();
    const Element = styled('div')({
      fontWeight: 'bold',
      a: {
        textDecoration: 'none',
      },
    });

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Element),
        ' - ',
        jsx(Element),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('renders nested', async () => {
    const warn = fest.fn();
    const Element1 = styled('div')({
      color: 'orange',
    });

    const Element2 = styled('div')({
      color: 'red',
    });

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx('div', { children: [
          jsx(Element1),
          ' - ',
          jsx(Element2),
        ],
        }),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('does not evaluate styles when noop', async () => {
    const warn = fest.fn();
    const Element = styled('div')({
      fontWeight: 'bold',
      a: {
        textDecoration: 'none',
      },
    });

    const el = jsx(EmotionProvider, {
      noop: true,
      children: [
        jsx(Element),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('renders a styled styled element', async () => {
    const warn = fest.fn();
    let stack;

    function Element (props) {
      stack = this.getCallStack({ raw: true });
      return jsx('div', props);
    }

    const Element2 = styled(Element, { name: 'Element2' })({
      fontWeight: 'bold',
      a: {
        textDecoration: 'none',
      },
    });

    const StyledElement2 = styled(Element2)({
      color: 'black',
    });

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(StyledElement2),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
    expect(stack).toEqual([
      '<EmotionProvider>',
      '<EmotionContext.Provider>',
      '<Styled(Element2)>',
      '<Element2>',
      '<Element>',
    ]);
  });

  test('renders with a theme', async () => {
    const warn = fest.fn();
    const Element = styled('div')(
      ({ theme }) => ({
        fontWeight: 'bold',
        a: {
          color: theme.colors.primary,
        },
      })
    );

    const testTheme = {
      colors: {
        primary: 'hotpink',
      },
    };

    const el = jsx(EmotionProvider, {
      theme: testTheme,
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Element),
        ' - ',
        jsx(Element),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('renders with a class label', async () => {
    const warn = fest.fn();
    const Element = styled('div', { label: 'MyComponent' })({
      fontWeight: 'bold',
    });

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Element),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('does not forward doNotForward', async () => {
    const warn = fest.fn();
    const Element = styled('div', { doNotForward: [ 'color' ] })(
      ({ color }) => ({
        backgroundColor: color,
      })
    );

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Element, { color: 'fuscia' }),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('passes `props`, with no styles', async () => {
    const warn = fest.fn();
    const Element = styled('div', {
      props: {
        role: 'slider',
      },
    })();

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Element),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('passes `props` to another styled component', async () => {
    const warn = fest.fn();

    const Element1 = styled('div', { doNotForward: [ 'color' ] })(
      ({ color }) => ({
        backgroundColor: color,
      })
    );

    const Element2 = styled(Element1, {
      props: {
        color: 'purple',
      },
    })();

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Element2),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

  test('multiple renders against shared cache and collection', async () => {
    const warn = fest.fn();

    const cache = EmotionProvider.createCache({ key: 'essex' });
    const collection = new Set();

    const Element1 = styled('div')({
      color: 'red',
    });

    const Element2 = styled('div')({
      color: 'blue',
    });

    const input1 = jsx(EmotionProvider, {
      cache,
      collection,
      children: [
        jsx(Element1),
      ],
    });

    const input2 = jsx(EmotionProvider, {
      cache,
      collection,
      children: [
        jsx(Element2),
      ],
    });

    const result1 = await render(input1, { warn });
    const result2 = await render(input2, { warn });

    expect(result1).toMatchSnapshot('result1');
    expect(result2).toMatchSnapshot('result2');
    expect(collection).toMatchSnapshot('collection');
  });

});

describe('global styles', async () => {
  test('renders global styles', async () => {
    const warn = fest.fn();

    const styles = {
      html: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        boxSizing: 'border-box',
        WebkitTextSizeAdjust: '100%',
      },
      '*, *::before, *::after': { boxSizing: 'inherit' },
      'strong, b': { fontWeight: 700 },
      body: {
        margin: 0,
        color: 'rgba(0, 0, 0, 0.87)',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        backgroundColor: '#fff',
        '@media print': { backgroundColor: '#fff' },
        '&::backdrop': { backgroundColor: '#fff' },
      },
    };

    const el = jsx(EmotionProvider, {
      children: [
        jsx(Outlet, { [Priority]: -10000 }),
        jsx(Global, { styles }),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });
});
