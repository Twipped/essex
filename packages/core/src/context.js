const { warn } = require('@twipped/utils');
const { Element } = require('./element');
const { CONTEXT } = require('./symbols');

function createContext (name = 'Unnamed', scope = Symbol(name)) {

  function Provider ({ value, key, children }) {
    const el = new Element({
      type: CONTEXT,
      props: {
        value,
        scope,
        children,
      },
      key,
    });
    el.name = `${name}.Provider`;
    return el;
  }
  Provider.displayName = `${name}.Provider`;

  return {
    [CONTEXT]: scope,
    Provider,
  };
}

class Context {

  space = 'html';

  name = false;

  fileName = false;

  lineNumber = false;

  columnNumber = false;

  depth = 0;

  constructor (config) {
    Object.assign(this, config);
  }

  warn (message) {
    warn(`${message}\n${this.getThrowStack()}`);
  }

  error (message) {
    const e = new Error(message);
    e._originalStack = e.stack;
    e.stack = `${e.message}\n${this.getThrowStack()}`.trim();
    throw e;
  }

  shard (wrap = {}) {
    const layer = { depth: this.depth + 1 };
    if (wrap.name === 'svg') {
      layer.space = 'svg';
    } else if (wrap.name === 'xml') {
      layer.space = 'xml';
    }

    return Object.assign(Object.create(this), wrap, layer);
  }

  getContext (context) {
    const symbol = context?.[CONTEXT];
    if (!symbol) {
      throw new Error('getContext did not receive a valid context object');
    }

    return this[symbol];
  }

  getThrowStack () {
    return Array.from(prototypeParents(this),
      ({ name, fileName = false, lineNumber = false, columnNumber = false }) => {
        if (!name) return null;
        if (fileName === false) return `    in <${name}>`;
        return `    in <${name}> (${fileName}:${lineNumber}:${columnNumber})`;
      }
    ).filter(Boolean).join('\n');
  }

  getCallStack () {
    const stack = Array.from(prototypeParents(this),
      ({
        isSymbolTag,
        shouldExclude,
        name,
        fileName = false,
        lineNumber = false,
        columnNumber = false,
      }) => {
        if (!name || isSymbolTag || shouldExclude) return null;
        if (fileName === false) return `<${name}>`;
        return `<${name}> (${fileName}:${lineNumber}:${columnNumber})`;
      }
    ).filter(Boolean);
    stack.reverse();
    return stack;
  }
}

function* prototypeParents (obj) {
  while (obj && obj !== Object.prototype) {
    yield obj;
    // eslint-disable-next-line no-param-reassign
    obj = Object.getPrototypeOf(obj);
  }
}

exports.createContext = createContext;
exports.Context = Context;
exports.ContextProvider = CONTEXT;

