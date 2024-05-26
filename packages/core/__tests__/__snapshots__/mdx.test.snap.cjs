// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`transforms MDX code correctly via babel: compiled 1`] = `
"import {Fragment as _Fragment, jsxDEV as _jsxDEV} from \\"../jsx-dev-runtime\\";
function _createMdxContent(props) {
  const _components = {
    em: \\"em\\",
    h1: \\"h1\\",
    ...props.components
  };
  return _jsxDEV(_Fragment, {
    children: [_jsxDEV(\\"div\\", {
      children: [_jsxDEV(_components.em, {
        children: \\"hi\\"
      }, undefined, false, {
        fileName: \\"<source.js>\\",
        lineNumber: 1,
        columnNumber: 6
      }, this), \\"?\\"]
    }, undefined, true, {
      fileName: \\"<source.js>\\",
      lineNumber: 1,
      columnNumber: 1
    }, this), \\"\\\\n\\", _jsxDEV(\\"div\\", {
      children: _jsxDEV(_components.h1, {
        children: \\"hello!\\"
      }, undefined, false, {
        fileName: \\"<source.js>\\",
        lineNumber: 4,
        columnNumber: 3
      }, this)
    }, undefined, false, {
      fileName: \\"<source.js>\\",
      lineNumber: 3,
      columnNumber: 1
    }, this), \\"\\\\n\\", _jsxDEV(\\"main\\", {
      children: _jsxDEV(\\"div\\", {
        children: _jsxDEV(_components.h1, {
          children: \\"how are you?\\"
        }, undefined, false, {
          fileName: \\"<source.js>\\",
          lineNumber: 10,
          columnNumber: 5
        }, this)
      }, undefined, false, {
        fileName: \\"<source.js>\\",
        lineNumber: 8,
        columnNumber: 3
      }, this)
    }, undefined, false, {
      fileName: \\"<source.js>\\",
      lineNumber: 7,
      columnNumber: 1
    }, this)]
  }, undefined, true, {
    fileName: \\"<source.js>\\",
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
      fileName: \\"<source.js>\\"
    }, this)
  }, undefined, false, {
    fileName: \\"<source.js>\\"
  }, this) : _createMdxContent(props);
}
"
`;

exports[`transforms MDX code correctly via babel: rendered 1`] = `
"<div><em>hi</em>?</div>
<div><h1>hello!</h1></div>
<main><div><h1>how are you?</h1></div></main>"
`;
