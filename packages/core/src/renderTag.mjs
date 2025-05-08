import createHtmlElement from 'create-html-element';
import { htmlEscape } from 'escape-goat';
import { html as htmlSpace, svg as svgSpace, find as findAttribute } from 'property-information';
import { htmlElementAttributes } from 'html-element-attributes';
import { isString, isObject, isUndefinedOrNull } from '@twipped/utils/types';
import { merge } from '@twipped/utils';
import renderStyle from './renderStyle.mjs';

const IS_DEV = process.env.NODE_ENV !== 'production';

export default function renderTag (type, props, html, withContext) {

  const attributes = {};
  for (const k of Object.keys(props)) {
    let v = props[k];
    if (isUndefinedOrNull(props[k])) continue;
    if (k === 'children') continue;
    if (k === 'style' && isObject(v)) {
      v = renderStyle(props[k]);
    }

    const { attribute, value } = validateAttribute(type, k, v, withContext);
    attributes[attribute] = value;
  }

  return createHtmlElement({
    name: type,
    attributes,
    html,
  });
}

const schemas = {
  SVG: merge({}, svgSpace, htmlSpace),
  svg: svgSpace,
  html: htmlSpace,
  xml: htmlSpace,
};

function validateAttribute (tag, attribute, value, withContext) {
  let schema = schemas[withContext.space];
  if (tag === 'svg') {
    schema = schemas.SVG;
  }

  if (!schema) {
    withContext.warn(`Unknown tag schema space, "${withContext.space}"`);
    return false;
  }

  const definition = findAttribute(schema, attribute);

  const okayForTag = (
    definition.attribute.startsWith('data-')
    || definition.attribute.startsWith('aria-')
    || definition.attribute === 'role' // aria extension
    || definition.attribute === 'property' // RDFa extension
    || withContext.space !== 'html'
    || htmlElementAttributes[tag]?.includes?.(definition.attribute)
    || htmlElementAttributes['*']?.includes?.(definition.attribute)
  );

  if (IS_DEV) {
    if (!definition.attribute) {
      withContext.warn(`"${attribute}" is not a recognized ${withContext.space} attribute.`);
    } else if (!okayForTag) {
      withContext.warn(`The "${attribute}" attribute is not typically used with <${tag}>.`);
    }
  }
  let formatted = htmlEscape(value);
  if (definition.boolean) {
    formatted = !!value;
  } else if (definition.booleanish) {
    formatted = value ? 'true' : 'false';
  } else if (definition.overloadedBoolean) {
    formatted = isString(value) ? htmlEscape(value) : value;
  } else if (typeof value === 'number') {
    formatted = String(value);
  }

  if (Array.isArray(value)) {
    formatted = value.flat(Infinity).map((s) => (s || s === 0) && String(s).trim()).filter(Boolean);
    if (definition.spaceSeparated) {
      formatted = formatted.join(' ');
    } else if (definition.commaSeparated || definition.commaOrSpaceSeparated) {
      formatted = formatted.join(',');
    }
  }

  if (value === null || value === undefined) {
    formatted = false;
  }

  // empty classnames should be excluded
  if (definition.attribute === 'class' && !formatted) {
    formatted = false;
  }

  return {
    attribute: definition.attribute,
    value: formatted,
  };
}
