/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const { Element } = require('./element');

// eslint-disable-next-line no-unused-vars
function createElement (
  type,
  props = {},
  key = null,
  isStaticChildren = false,
  { fileName = false, lineNumber = false, columnNumber = false } = {}
) {
  if (type instanceof Element) {
    // eslint-disable-next-line new-cap
    return new type({
      props,
      key,
      isStaticChildren,
      fileName,
      lineNumber,
      columnNumber,
    });
  }

  return new Element({
    type,
    props,
    key,
    isStaticChildren,
    fileName,
    lineNumber,
    columnNumber,
  });
}

exports.Fragment = require('./symbols').FRAGMENT;
exports.createElement = createElement;
exports.jsx = createElement;
exports.jsxs = createElement;
exports.jsxDEV = createElement;
