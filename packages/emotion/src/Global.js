
function Global ({ styles }) {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(styles)) styles = [ styles ];
  this.emotion.attachGlobal(styles);
  return null;
}

module.exports = exports = Global;
