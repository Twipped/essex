const { jsx, createContext } = require('essex');
const createCache = require('@emotion/cache').default;
const { serializeStyles } = require('@emotion/serialize');

const EmotionContext = createContext('EmotionContext', 'emotion');

function EmotionProvider ({
  cacheKey = 'essex',
  cache = createCache({ key: cacheKey }),
  collection: pageStyles = new Set(),
  theme,
  noop,
  children,
}) {
  function attach (styles, props) {
    if (noop) return [];
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
    if (noop) return;
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
      children,
    })
  );
}

module.exports = exports = EmotionProvider;
exports.createCache = createCache;
