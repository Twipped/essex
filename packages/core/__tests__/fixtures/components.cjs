"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextReceiver = ContextReceiver;
exports.ContextWrapper = ContextWrapper;
exports.DeepThrow = DeepThrow;
exports.Span = Span;
exports.Throws = Throws;
exports.span = span;
exports.spanFragment = spanFragment;
var _context = require("../../src/context");
var _jsxDevRuntime = require("../../jsx-dev-runtime");
var _jsxFileName = "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/components.jsx";
function Span({
  children
}) {
  return (0, _jsxDevRuntime.jsxDEV)("span", {
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 10
  }, this);
}
function span() {
  return (0, _jsxDevRuntime.jsxDEV)(Span, {
    children: "Hello"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 10
  }, this);
}
function spanFragment() {
  return (0, _jsxDevRuntime.jsxDEV)(Span, {
    children: (0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
      children: "Hello"
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
  return (0, _jsxDevRuntime.jsxDEV)(_context.ContextProvider, {
    scope: "FOO",
    value: "VALUE",
    children: (0, _jsxDevRuntime.jsxDEV)("div", {
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
    children: (0, _jsxDevRuntime.jsxDEV)("div", {
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
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29udGV4dCIsInJlcXVpcmUiLCJfanN4RGV2UnVudGltZSIsIl9qc3hGaWxlTmFtZSIsIlNwYW4iLCJjaGlsZHJlbiIsImpzeERFViIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsInNwYW4iLCJzcGFuRnJhZ21lbnQiLCJGcmFnbWVudCIsIkNvbnRleHRSZWNlaXZlciIsIkZPTyIsIkNvbnRleHRXcmFwcGVyIiwiQ29udGV4dFByb3ZpZGVyIiwic2NvcGUiLCJ2YWx1ZSIsIlRocm93cyIsIm1lc3NhZ2UiLCJFcnJvciIsIkRlZXBUaHJvdyJdLCJzb3VyY2VzIjpbImNvbXBvbmVudHMuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vc3JjL2NvbnRleHQnO1xuXG5leHBvcnQgZnVuY3Rpb24gU3BhbiAoeyBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiA8c3Bhbj57Y2hpbGRyZW59PC9zcGFuPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwYW4gKCkge1xuICByZXR1cm4gPFNwYW4+SGVsbG88L1NwYW4+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BhbkZyYWdtZW50ICgpIHtcbiAgcmV0dXJuIDxTcGFuPjw+SGVsbG88Lz48L1NwYW4+O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ29udGV4dFJlY2VpdmVyICgpIHtcbiAgcmV0dXJuIDxTcGFuPnt0aGlzLkZPT308L1NwYW4+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29udGV4dFdyYXBwZXIgKCkge1xuICByZXR1cm4gKFxuICAgIDxDb250ZXh0UHJvdmlkZXIgc2NvcGU9XCJGT09cIiB2YWx1ZT1cIlZBTFVFXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8Q29udGV4dFJlY2VpdmVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L0NvbnRleHRQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRocm93cyAoeyBtZXNzYWdlID0gJ29oIG5vIScgfSkge1xuICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEZWVwVGhyb3cgKCkge1xuICByZXR1cm4gPFNwYW4+PGRpdj48VGhyb3dzIC8+PC9kaXY+PC9TcGFuPjtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBQUEsUUFBQSxHQUFBQyxPQUFBO0FBQW9ELElBQUFDLGNBQUEsR0FBQUQsT0FBQTtBQUFBLElBQUFFLFlBQUE7QUFFN0MsU0FBU0MsSUFBSUEsQ0FBRTtFQUFFQztBQUFTLENBQUMsRUFBRTtFQUNsQyxPQUFPLElBQUFILGNBQUEsQ0FBQUksTUFBQTtJQUFBRCxRQUFBLEVBQU9BO0VBQVE7SUFBQUUsUUFBQSxFQUFBSixZQUFBO0lBQUFLLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQU8sQ0FBQztBQUNoQztBQUVPLFNBQVNDLElBQUlBLENBQUEsRUFBSTtFQUN0QixPQUFPLElBQUFSLGNBQUEsQ0FBQUksTUFBQSxFQUFDRixJQUFJO0lBQUFDLFFBQUEsRUFBQztFQUFLO0lBQUFFLFFBQUEsRUFBQUosWUFBQTtJQUFBSyxVQUFBO0lBQUFDLFlBQUE7RUFBQSxPQUFNLENBQUM7QUFDM0I7QUFFTyxTQUFTRSxZQUFZQSxDQUFBLEVBQUk7RUFDOUIsT0FBTyxJQUFBVCxjQUFBLENBQUFJLE1BQUEsRUFBQ0YsSUFBSTtJQUFBQyxRQUFBLEVBQUMsSUFBQUgsY0FBQSxDQUFBSSxNQUFBLEVBQUFKLGNBQUEsQ0FBQVUsUUFBQTtNQUFBUCxRQUFBLEVBQUU7SUFBSyxnQkFBRTtFQUFDO0lBQUFFLFFBQUEsRUFBQUosWUFBQTtJQUFBSyxVQUFBO0lBQUFDLFlBQUE7RUFBQSxPQUFNLENBQUM7QUFDaEM7QUFFTyxlQUFlSSxlQUFlQSxDQUFBLEVBQUk7RUFDdkMsT0FBTyxJQUFBWCxjQUFBLENBQUFJLE1BQUEsRUFBQ0YsSUFBSTtJQUFBQyxRQUFBLEVBQUUsSUFBSSxDQUFDUztFQUFHO0lBQUFQLFFBQUEsRUFBQUosWUFBQTtJQUFBSyxVQUFBO0lBQUFDLFlBQUE7RUFBQSxPQUFPLENBQUM7QUFDaEM7QUFFTyxTQUFTTSxjQUFjQSxDQUFBLEVBQUk7RUFDaEMsT0FDRSxJQUFBYixjQUFBLENBQUFJLE1BQUEsRUFBQ04sUUFBQSxDQUFBZ0IsZUFBZTtJQUFDQyxLQUFLLEVBQUMsS0FBSztJQUFDQyxLQUFLLEVBQUMsT0FBTztJQUFBYixRQUFBLEVBQ3hDLElBQUFILGNBQUEsQ0FBQUksTUFBQTtNQUFBRCxRQUFBLEVBQ0UsSUFBQUgsY0FBQSxDQUFBSSxNQUFBLEVBQUNPLGVBQWU7UUFBQU4sUUFBQSxFQUFBSixZQUFBO1FBQUFLLFVBQUE7UUFBQUMsWUFBQTtNQUFBLE9BQUU7SUFBQztNQUFBRixRQUFBLEVBQUFKLFlBQUE7TUFBQUssVUFBQTtNQUFBQyxZQUFBO0lBQUEsT0FDaEI7RUFBQztJQUFBRixRQUFBLEVBQUFKLFlBQUE7SUFBQUssVUFBQTtJQUFBQyxZQUFBO0VBQUEsT0FDUyxDQUFDO0FBRXRCO0FBRU8sU0FBU1UsTUFBTUEsQ0FBRTtFQUFFQyxPQUFPLEdBQUc7QUFBUyxDQUFDLEVBQUU7RUFDOUMsTUFBTSxJQUFJQyxLQUFLLENBQUNELE9BQU8sQ0FBQztBQUMxQjtBQUVPLFNBQVNFLFNBQVNBLENBQUEsRUFBSTtFQUMzQixPQUFPLElBQUFwQixjQUFBLENBQUFJLE1BQUEsRUFBQ0YsSUFBSTtJQUFBQyxRQUFBLEVBQUMsSUFBQUgsY0FBQSxDQUFBSSxNQUFBO01BQUFELFFBQUEsRUFBSyxJQUFBSCxjQUFBLENBQUFJLE1BQUEsRUFBQ2EsTUFBTTtRQUFBWixRQUFBLEVBQUFKLFlBQUE7UUFBQUssVUFBQTtRQUFBQyxZQUFBO01BQUEsT0FBRTtJQUFDO01BQUFGLFFBQUEsRUFBQUosWUFBQTtNQUFBSyxVQUFBO01BQUFDLFlBQUE7SUFBQSxPQUFLO0VBQUM7SUFBQUYsUUFBQSxFQUFBSixZQUFBO0lBQUFLLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQU0sQ0FBQztBQUMzQyJ9