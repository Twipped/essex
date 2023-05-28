const { jsx } = require('./jsx-runtime');
const { RAW, FRAGMENT } = require('./symbols');

function fragment (children) {
  return jsx(FRAGMENT, {
    children: Array.isArray(children) ? children : [ children ],
  });
}
exports.fragment = fragment;

function raw (children) {
  return jsx(RAW, {
    children,
  });
}
exports.rawHtml = raw;

