/* eslint-disable no-shadow */

import fest, { test, expect, describe } from '@twipped/festival';
import { render, jsx } from 'essex';
import { styled, EmotionProvider } from '../index.js';


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
    const Element = styled('div')(({ theme }) => ({
      fontWeight: 'bold',
      a: {
        color: theme.colors.primary,
      },
    }));

    const testTheme = {
      colors: {
        primary: 'hotpink',
      },
    };

    const el = jsx(EmotionProvider, {
      theme: testTheme,
      children: [
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
        jsx(Element),
      ],
    });

    const result = await render(el, { warn });

    expect(result).toMatchSnapshot();
  });

});
