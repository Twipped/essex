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
