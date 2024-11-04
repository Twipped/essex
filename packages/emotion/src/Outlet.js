const { jsx, RawHtml } = require('essex');

function Outlet () {
  const { css, nonce } = this.emotion.flatten();
  if (!css) return null;

  return jsx('style', {
    type: 'text/css',
    nonce,
    children: jsx(RawHtml, { children: css }),
  });
}


module.exports = exports = Outlet;
