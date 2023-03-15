import createHtmlElement from 'create-html-element';
import { htmlEscape } from 'escape-goat';
import { html as htmlSpace, svg as svgSpace, find as findAttribute } from 'property-information';
import { htmlElementAttributes } from 'html-element-attributes';
import { isString, isObject } from '@twipped/utils/types';

export default function renderTag (type, props, html, withContext) {

  const attributes = {};
  for (const k of Object.keys(props)) {
    if (k === 'children') continue;
    if (k === 'style' && isObject(props[k])) {
      withContext.warn(`essex cannot currently handle serialization of css styles. The style attribute has been omitted.`);
      continue;
    }

    const { attribute, value } = validateAttribute(type, k, props[k], withContext);

    attributes[attribute] = value;
  }

  return createHtmlElement({
    name: type,
    attributes,
    html,
  });
}

function validateAttribute (tag, attribute, value, withContext) {
  const schema = {
    svg: svgSpace,
    html: htmlSpace,
    xml: htmlSpace,
  }[withContext.space];

  if (!schema) {
    withContext.warn(`Unknown tag schema space, "${withContext.space}"`);
    return false;
  }

  const definition = findAttribute(schema, attribute);

  const okayForTag = (
    definition.attribute.startsWith('data-')
    || definition.attribute.startsWith('aria-')
    || htmlElementAttributes[tag].includes(definition.attribute)
    || htmlElementAttributes['*'].includes(definition.attribute)
  );

  if (!definition.space) {
    withContext.warn(`"${attribute}" is not a recognized ${withContext.space} attribute.`);
  } else if (!okayForTag) {
    withContext.warn(`The "${attribute}" attribute is not typically used with <${tag}>.`);
  }

  let formatted = htmlEscape(value);
  if (definition.boolean) {
    formatted = !!value;
  } else if (definition.booleanish) {
    formatted = value ? 'true' : 'false';
  } else if (definition.overloadedBoolean) {
    formatted = isString(value) ? htmlEscape(value) : value;
  }

  if (Array.isArray(value)) {
    if (definition.spaceSeparated) {
      formatted = value.flat(Infinity).join(' ');
    } else if (definition.commaSeparated || definition.commaOrSpaceSeparated) {
      formatted = value.flat(Infinity).join(',');
    }
  }

  if (value === null || value === undefined) {
    formatted = false;
  }

  return {
    attribute: definition.attribute,
    value: formatted,
  };
}
