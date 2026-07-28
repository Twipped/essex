function Global ({ styles }) {
  if (!Array.isArray(styles)) styles = [ styles ];
  this.emotion.attachGlobal(styles);
  return null;
}

module.exports = exports = Global;
