const { jsx, RawHtml, createContext, Priority } = require('essex');
const createCache = require('@emotion/cache').default;
const { serializeStyles } = require('@emotion/serialize');

const EmotionContext = createContext('EmotionContext', 'emotion');

function EmotionProvider ({ cacheKey = 'essex', theme, children }) {
  const cache = createCache({ key: cacheKey });
  const pageStyles = new Set();

  function attach (styles, props) {
    const classNames = [];
    let serialized = serializeStyles(styles, cache.registered, { ...props, theme });
    do {
      const className = `${cacheKey}-${serialized.name}`;
      const maybeStyles = cache.insert(
        `.${className}`,
        serialized,
        cache.sheet,
        true
      );

      classNames.push(className);
      if (maybeStyles) pageStyles.add(maybeStyles);
    } while (serialized.next && (serialized = serialized.next));

    return classNames;
  }

  function attachGlobal (styles) {
    const serialized = serializeStyles(styles, undefined, { theme });

    let serializedNames = serialized.name;
    let serializedStyles = serialized.styles;
    let next = serialized.next;
    while (next !== undefined) {
      serializedNames += ` ${next.name}`;
      serializedStyles += next.styles;
      next = next.next;
    }

    const maybeStyles = cache.insert(
      '',
      { name: serializedNames, styles: serializedStyles },
      cache.sheet,
      false
    );

    if (maybeStyles) pageStyles.add(maybeStyles);
  }

  function flatten () {
    return {
      css: Array.from(pageStyles).join('\n'),
      nonce: cache.sheet.nonce,
    };
  }

  return (
    jsx(EmotionContext.Provider, {
      value: {
        attach,
        attachGlobal,
        flatten,
      },
      children: [
        jsx(EmotionStyles, { [Priority]: -10000 }),
        children,
      ],
    })
  );
}

module.exports = exports = EmotionProvider;

function EmotionStyles () {
  const { css, nonce } = this.emotion.flatten();
  return jsx('style', {
    type: 'text/css',
    nonce,
    children: jsx(RawHtml, { children: css }),
  });
}
