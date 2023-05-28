/* eslint-disable import/extensions */

let renderer;
module.exports = exports = async function (...args) {
  if (!renderer) {
    renderer = (await import('./renderer.mjs')).default;
  }
  return renderer(...args);
};
