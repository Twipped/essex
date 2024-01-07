import {Fragment as _Fragment, jsxDEV as _jsxDEV} from "essex/jsx-dev-runtime";
function _createMdxContent(props) {
  const _components = {
    em: "em",
    h1: "h1",
    ...props.components
  };
  return _jsxDEV(_Fragment, {
    children: [_jsxDEV("div", {
      children: [_jsxDEV(_components.em, {
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
    }, this), "\n", _jsxDEV("div", {
      children: _jsxDEV(_components.h1, {
        children: "hello?"
      }, undefined, false, {
        fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
        lineNumber: 4,
        columnNumber: 3
      }, this)
    }, undefined, false, {
      fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx",
      lineNumber: 3,
      columnNumber: 1
    }, this), "\n", _jsxDEV("main", {
      children: _jsxDEV("div", {
        children: _jsxDEV(_components.h1, {
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
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsxDEV(MDXLayout, {
    ...props,
    children: _jsxDEV(_createMdxContent, {
      ...props
    }, undefined, false, {
      fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx"
    }, this)
  }, undefined, false, {
    fileName: "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/markdown.mdx"
  }, this) : _createMdxContent(props);
}
