
const { fragment, rawHtml } = require('../quicks');

function Html ({ children }) {
  return (
    fragment([
      rawHtml('<!DOCTYPE html>'),
      children,
    ])
  );
}
module.exports = exports = Html;
