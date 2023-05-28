const { Element } = require('./element');
const { CONTEXT } = require('./symbols');
const { warn } = require('@twipped/utils');

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
    el.name = undefined;
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

  constructor (config) {
    Object.assign(this, config);
  }

  warn (message) {
    warn(`${message}\n${this.getCallStack()}`);
  }

  error (message) {
    const e = new Error(message);
    e._originalStack = e.stack;
    e.stack = `${e.message}\n${this.getCallStack()}`.trim();
    throw e;
  }

  shard (wrap) {
    const layer = {};
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

  getCallStack () {
    return Array.from(prototypeParents(this),
      ({ name, fileName = false, lineNumber = false, columnNumber = false }) => {
        if (!name) return null;
        if (fileName === false) return `    in <${name}>`;
        return `    in <${name}> (${fileName}:${lineNumber}:${columnNumber})`;
      }
    ).filter(Boolean).join('\n');
  }
}

function* prototypeParents (obj) {
  while (obj && obj !== Object.prototype) {
    yield obj;
    obj = Object.getPrototypeOf(obj);
  }
}

exports.createContext = createContext;
exports.Context = Context;
exports.ContextProvider = CONTEXT;

