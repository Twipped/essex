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


});
