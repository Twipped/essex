// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`transforms JSX code correctly via babel 1`] = `
"/*@jsxRuntime automatic @jsxImportSource ..*/
import {Fragment as _Fragment, jsxDEV as _jsxDEV} from \\"../jsx-dev-runtime\\";
function _createMdxContent(props) {
  const _components = Object.assign({
    em: \\"em\\",
    h1: \\"h1\\"
  }, props.components);
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
        children: \\"hello?\\"
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
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsxDEV(MDXLayout, Object.assign({}, props, {
    children: _jsxDEV(_createMdxContent, props, undefined, false, {
      fileName: \\"<source.js>\\"
    }, this)
  }), undefined, false, {
    fileName: \\"<source.js>\\"
  }, this) : _createMdxContent(props);
}
export default MDXContent;
"
`;

exports[`transforms MDX code correctly via babel 1`] = `
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
        children: \\"hello?\\"
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
