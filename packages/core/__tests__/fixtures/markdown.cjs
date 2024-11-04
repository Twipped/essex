"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MDXContent;
var _jsxDevRuntime = require("essex/jsx-dev-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createMdxContent(props) {
  var _components = _objectSpread({
    em: "em",
    h1: "h1"
  }, props.components);
  return (0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
    children: [(0, _jsxDevRuntime.jsxDEV)("div", {
      children: [(0, _jsxDevRuntime.jsxDEV)(_components.em, {
        children: "hi"
      }, undefined, false, {
        fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
        lineNumber: 1,
        columnNumber: 6
      }, this), "?"]
    }, undefined, true, {
      fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
      lineNumber: 1,
      columnNumber: 1
    }, this), "\n", (0, _jsxDevRuntime.jsxDEV)("div", {
      children: (0, _jsxDevRuntime.jsxDEV)(_components.h1, {
        children: "hello!"
      }, undefined, false, {
        fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
        lineNumber: 4,
        columnNumber: 3
      }, this)
    }, undefined, false, {
      fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
      lineNumber: 3,
      columnNumber: 1
    }, this), "\n", (0, _jsxDevRuntime.jsxDEV)("main", {
      children: (0, _jsxDevRuntime.jsxDEV)("div", {
        children: (0, _jsxDevRuntime.jsxDEV)(_components.h1, {
          children: "how are you?"
        }, undefined, false, {
          fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
          lineNumber: 10,
          columnNumber: 5
        }, this)
      }, undefined, false, {
        fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
        lineNumber: 8,
        columnNumber: 3
      }, this)
    }, undefined, false, {
      fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
      lineNumber: 7,
      columnNumber: 1
    }, this)]
  }, undefined, true, {
    fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
    lineNumber: 1,
    columnNumber: 1
  }, this);
}
function MDXContent() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = props.components || {},
    MDXLayout = _ref.wrapper;
  return MDXLayout ? (0, _jsxDevRuntime.jsxDEV)(MDXLayout, _objectSpread(_objectSpread({}, props), {}, {
    children: (0, _jsxDevRuntime.jsxDEV)(_createMdxContent, _objectSpread({}, props), undefined, false, {
      fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx"
    }, this)
  }), undefined, false, {
    fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx"
  }, this) : _createMdxContent(props);
}