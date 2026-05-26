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
function _regeneratorRuntime() { \\"use strict\\"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = \\"function\\" == typeof r && r.constructor; return !!e && (e === t || \\"GeneratorFunction\\" === (e.displayName || e.name)); } var o = { \\"throw\\": 1, \\"return\\": 2, \\"break\\": 3, \\"continue\\": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, \\"catch\\": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e[\\"function\\" == typeof Symbol && Symbol.iterator || \\"@@iterator\\"], r = 0; if (t) return t.call(e); if (\\"function\\" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(typeof e + \\" is not iterable\\"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n(\\"next\\", t, i, f); }, function (t) { n(\\"throw\\", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n(\\"throw\\", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, \\"function\\" == typeof Symbol && Symbol.asyncIterator || \\"@asyncIterator\\", function () { return this; })), _regeneratorDefine2(this, \\"_invoke\\", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = \\"function\\" == typeof Symbol ? Symbol : {}, n = r.iterator || \\"@@iterator\\", o = r.toStringTag || \\"@@toStringTag\\"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, \\"_invoke\\", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError(\\"Generator is already running\\"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = \\"next\\"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError(\\"iterator result is not an object\\"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i[\\"return\\"]) && t.call(i), c < 2 && (u = TypeError(\\"The iterator does not provide a '\\" + o + \\"' method\\"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, \\"GeneratorFunction\\")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, \\"constructor\\", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, \\"constructor\\", GeneratorFunction), GeneratorFunction.displayName = \\"GeneratorFunction\\", _regeneratorDefine2(GeneratorFunctionPrototype, o, \\"GeneratorFunction\\"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, \\"Generator\\"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, \\"toString\\", function () { return \\"[object Generator]\\"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, \\"\\", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o(\\"next\\", 0), o(\\"throw\\", 1), o(\\"return\\", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \\"next\\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \\"throw\\", n); } _next(void 0); }); }; }
function Span(_ref) {
  var children = _ref.children;
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
function ContextReceiver() {
  return _ContextReceiver.apply(this, arguments);
}
function _ContextReceiver() {
  _ContextReceiver = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt(\\"return\\", (0, _jsxDevRuntime.jsxDEV)(Span, {
            children: this.FOO
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 17,
            columnNumber: 10
          }, this));
        case 1:
        case \\"end\\":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _ContextReceiver.apply(this, arguments);
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
function Throws(_ref2) {
  var _ref2$message = _ref2.message,
    message = _ref2$message === void 0 ? 'oh no!' : _ref2$message;
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
