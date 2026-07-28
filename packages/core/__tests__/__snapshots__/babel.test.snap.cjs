// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`transforms JSX code correctly via babel 1`] = `
"\\"use strict\\";

Object.defineProperty(exports, \\"__esModule\\", {
  value: true
});
exports.ContextReceiver = ContextReceiver;
exports.ContextWrapper = ContextWrapper;
exports.DeepThrow = DeepThrow;
exports.Span = Span;
exports.Throws = Throws;
exports.span = span;
exports.spanFragment = spanFragment;
var _essex = require(\\"essex\\");
var _jsxDevRuntime = require(\\"../jsx-dev-runtime\\");
var _jsxFileName = \\"\\";
function Span({
  children
}) {
  return (0, _jsxDevRuntime.jsxDEV)(\\"span\\", {
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 10
  }, this);
}
function span() {
  return (0, _jsxDevRuntime.jsxDEV)(Span, {
    children: \\"Hello\\"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 10
  }, this);
}
function spanFragment() {
  return (0, _jsxDevRuntime.jsxDEV)(Span, {
    children: (0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
      children: \\"Hello\\"
    }, void 0, false)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 10
  }, this);
}
async function ContextReceiver() {
  return (0, _jsxDevRuntime.jsxDEV)(Span, {
    children: this.FOO
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 10
  }, this);
}
function ContextWrapper() {
  return (0, _jsxDevRuntime.jsxDEV)(_essex.ContextProvider, {
    scope: \\"FOO\\",
    value: \\"VALUE\\",
    children: (0, _jsxDevRuntime.jsxDEV)(\\"div\\", {
      children: (0, _jsxDevRuntime.jsxDEV)(ContextReceiver, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
function Throws({
  message = 'oh no!'
}) {
  throw new Error(message);
}
function DeepThrow() {
  return (0, _jsxDevRuntime.jsxDEV)(Span, {
    children: (0, _jsxDevRuntime.jsxDEV)(\\"div\\", {
      children: (0, _jsxDevRuntime.jsxDEV)(Throws, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 21
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 16
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 10
  }, this);
}"
`;
