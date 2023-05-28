const { get } = require('@twipped/utils');
const { isPrimitive, isObject } = require('@twipped/utils/types');
const { format: pretty } = require('pretty-format');

const { format } = require('util');

const interpolateVariables = (
  title,
  source,
  index
) =>
  title
    .replace(
      new RegExp(`\\$(${Object.keys(source).join('|')})[.\\w]*`, 'g'),
      (match) => {
        const keyPath = match.slice(1).split('.');
        const value = get(source, keyPath);

        return isPrimitive(value)
          ? String(value)
          : pretty(value, { maxDepth: 1, min: true });
      }
    )
    .replace('$#', `${index}`);

function formatTestTitle (title, row, index) {
  if (Array.isArray(row)) {
    return format(title.replace('$#', `${index}`), ...row);
  } else if (isObject(row)) {
    return interpolateVariables(title, row, index);
  }
}

exports.formatTestTitle = formatTestTitle;
