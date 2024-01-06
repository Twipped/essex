const { isFunction, isString } = require('@twipped/utils/types');
const { FRAGMENT, CONTEXT } = require('./symbols');

exports.getComponentName = function getComponentName (type) {
  return (
    (isFunction(type) && (type.displayName || type.name))
    || (isString(type) && type)
    || (type === CONTEXT && 'ContextProvider')
    || ((!type || type === FRAGMENT) && 'Fragment')
    || type.constructor?.name
    || 'Anonymous'
  );
};

exports.Envelope = class Envelope {
  _resolve = null;
  _reject = null;

  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (r) => resolve(r);
      this.reject = reject;
    });
  }

  then (...args) {
    // eslint-disable-next-line promise/catch-or-return
    this.promise.then(...args);
  }

  catch (...args) {
    this.promise.catch(...args);
  }

};
