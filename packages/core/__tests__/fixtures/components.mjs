var _jsxFileName = "/Users/twipped/Projects/jayessex/packages/core/__tests__/fixtures/components.jsx";
import { ContextProvider } from 'essex';
import { jsxDEV as _jsxDEV } from "essex/jsx-dev-runtime";
import { Fragment as _Fragment } from "essex/jsx-dev-runtime";
export function Span({
  children
}) {
  return _jsxDEV("span", {
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 10
  }, this);
}
export function span() {
  return _jsxDEV(Span, {
    children: "Hello"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 10
  }, this);
}
export function spanFragment() {
  return _jsxDEV(Span, {
    children: _jsxDEV(_Fragment, {
      children: "Hello"
    }, void 0, false)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 10
  }, this);
}
export async function ContextReceiver() {
  return _jsxDEV(Span, {
    children: this.FOO
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 10
  }, this);
}
export function ContextWrapper() {
  return _jsxDEV(ContextProvider, {
    scope: "FOO",
    value: "VALUE",
    children: _jsxDEV("div", {
      children: _jsxDEV(ContextReceiver, {}, void 0, false, {
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
export function Throws({
  message = 'oh no!'
}) {
  throw new Error(message);
}
export function DeepThrow() {
  return _jsxDEV(Span, {
    children: _jsxDEV("div", {
      children: _jsxDEV(Throws, {}, void 0, false, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb250ZXh0UHJvdmlkZXIiLCJqc3hERVYiLCJfanN4REVWIiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJTcGFuIiwiY2hpbGRyZW4iLCJmaWxlTmFtZSIsIl9qc3hGaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJzcGFuIiwic3BhbkZyYWdtZW50IiwiQ29udGV4dFJlY2VpdmVyIiwiRk9PIiwiQ29udGV4dFdyYXBwZXIiLCJzY29wZSIsInZhbHVlIiwiVGhyb3dzIiwibWVzc2FnZSIsIkVycm9yIiwiRGVlcFRocm93Il0sInNvdXJjZXMiOlsiY29tcG9uZW50cy5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb250ZXh0UHJvdmlkZXIgfSBmcm9tICdlc3NleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBTcGFuICh7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIDxzcGFuPntjaGlsZHJlbn08L3NwYW4+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BhbiAoKSB7XG4gIHJldHVybiA8U3Bhbj5IZWxsbzwvU3Bhbj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFuRnJhZ21lbnQgKCkge1xuICByZXR1cm4gPFNwYW4+PD5IZWxsbzwvPjwvU3Bhbj47XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBDb250ZXh0UmVjZWl2ZXIgKCkge1xuICByZXR1cm4gPFNwYW4+e3RoaXMuRk9PfTwvU3Bhbj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250ZXh0V3JhcHBlciAoKSB7XG4gIHJldHVybiAoXG4gICAgPENvbnRleHRQcm92aWRlciBzY29wZT1cIkZPT1wiIHZhbHVlPVwiVkFMVUVcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxDb250ZXh0UmVjZWl2ZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvQ29udGV4dFByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVGhyb3dzICh7IG1lc3NhZ2UgPSAnb2ggbm8hJyB9KSB7XG4gIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERlZXBUaHJvdyAoKSB7XG4gIHJldHVybiA8U3Bhbj48ZGl2PjxUaHJvd3MgLz48L2Rpdj48L1NwYW4+O1xufVxuIl0sIm1hcHBpbmdzIjoiO0FBQ0EsU0FBU0EsZUFBZSxRQUFRLE9BQU87QUFBQyxTQUFBQyxNQUFBLElBQUFDLE9BQUE7QUFBQSxTQUFBQyxRQUFBLElBQUFDLFNBQUE7QUFFeEMsT0FBTyxTQUFTQyxJQUFJQSxDQUFFO0VBQUVDO0FBQVMsQ0FBQyxFQUFFO0VBQ2xDLE9BQU9KLE9BQUE7SUFBQUksUUFBQSxFQUFPQTtFQUFRO0lBQUFDLFFBQUEsRUFBQUMsWUFBQTtJQUFBQyxVQUFBO0lBQUFDLFlBQUE7RUFBQSxPQUFPLENBQUM7QUFDaEM7QUFFQSxPQUFPLFNBQVNDLElBQUlBLENBQUEsRUFBSTtFQUN0QixPQUFPVCxPQUFBLENBQUNHLElBQUk7SUFBQUMsUUFBQSxFQUFDO0VBQUs7SUFBQUMsUUFBQSxFQUFBQyxZQUFBO0lBQUFDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQU0sQ0FBQztBQUMzQjtBQUVBLE9BQU8sU0FBU0UsWUFBWUEsQ0FBQSxFQUFJO0VBQzlCLE9BQU9WLE9BQUEsQ0FBQ0csSUFBSTtJQUFBQyxRQUFBLEVBQUNKLE9BQUEsQ0FBQUUsU0FBQTtNQUFBRSxRQUFBLEVBQUU7SUFBSyxnQkFBRTtFQUFDO0lBQUFDLFFBQUEsRUFBQUMsWUFBQTtJQUFBQyxVQUFBO0lBQUFDLFlBQUE7RUFBQSxPQUFNLENBQUM7QUFDaEM7QUFFQSxPQUFPLGVBQWVHLGVBQWVBLENBQUEsRUFBSTtFQUN2QyxPQUFPWCxPQUFBLENBQUNHLElBQUk7SUFBQUMsUUFBQSxFQUFFLElBQUksQ0FBQ1E7RUFBRztJQUFBUCxRQUFBLEVBQUFDLFlBQUE7SUFBQUMsVUFBQTtJQUFBQyxZQUFBO0VBQUEsT0FBTyxDQUFDO0FBQ2hDO0FBRUEsT0FBTyxTQUFTSyxjQUFjQSxDQUFBLEVBQUk7RUFDaEMsT0FDRWIsT0FBQSxDQUFDRixlQUFlO0lBQUNnQixLQUFLLEVBQUMsS0FBSztJQUFDQyxLQUFLLEVBQUMsT0FBTztJQUFBWCxRQUFBLEVBQ3hDSixPQUFBO01BQUFJLFFBQUEsRUFDRUosT0FBQSxDQUFDVyxlQUFlO1FBQUFOLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQSxPQUFFO0lBQUM7TUFBQUgsUUFBQSxFQUFBQyxZQUFBO01BQUFDLFVBQUE7TUFBQUMsWUFBQTtJQUFBLE9BQ2hCO0VBQUM7SUFBQUgsUUFBQSxFQUFBQyxZQUFBO0lBQUFDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQ1MsQ0FBQztBQUV0QjtBQUVBLE9BQU8sU0FBU1EsTUFBTUEsQ0FBRTtFQUFFQyxPQUFPLEdBQUc7QUFBUyxDQUFDLEVBQUU7RUFDOUMsTUFBTSxJQUFJQyxLQUFLLENBQUNELE9BQU8sQ0FBQztBQUMxQjtBQUVBLE9BQU8sU0FBU0UsU0FBU0EsQ0FBQSxFQUFJO0VBQzNCLE9BQU9uQixPQUFBLENBQUNHLElBQUk7SUFBQUMsUUFBQSxFQUFDSixPQUFBO01BQUFJLFFBQUEsRUFBS0osT0FBQSxDQUFDZ0IsTUFBTTtRQUFBWCxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUEsT0FBRTtJQUFDO01BQUFILFFBQUEsRUFBQUMsWUFBQTtNQUFBQyxVQUFBO01BQUFDLFlBQUE7SUFBQSxPQUFLO0VBQUM7SUFBQUgsUUFBQSxFQUFBQyxZQUFBO0lBQUFDLFVBQUE7SUFBQUMsWUFBQTtFQUFBLE9BQU0sQ0FBQztBQUMzQyJ9