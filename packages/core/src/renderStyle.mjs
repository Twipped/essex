import { isUndefinedOrNull } from '@twipped/utils';

export default function renderStyle (styles) {
  if (!isUndefinedOrNull(styles) && typeof styles !== 'object') {
    throw new Error(
      'The `style` prop expects a mapping from style properties to values, ' +
      "not a string. For example, style={{marginRight: spacing + 'em'}} when " +
      'using JSX.'
    );
  }

  const style = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const styleName in styles) {
    if (styles.hasOwnProperty(styleName)) {
      const value = styles[styleName];
      setValueForStyle(style, styleName, value);
    }
  }

  return Object.entries(style)
    .map(([ k, v ]) => (v.length ? `${hyphenateStyleName(k)}:${v}` : ''))
    .filter(Boolean).join(';');
}

// The below code is derived from react-dom

const __DEV__ = process.env.NODE_ENV !== 'production';


const uppercasePattern = /([A-Z])/g;
const msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 * @param {string} name
 * @returns {string}
 */
function hyphenateStyleName (name) {
  return name
    .replace(uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-');
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// List derived from Gecko source code:
// https://github.com/mozilla/gecko-dev/blob/4e638efc71/layout/style/test/property_database.js
export const shorthandToLonghand = {
  animation: [
    'animationDelay',
    'animationDirection',
    'animationDuration',
    'animationFillMode',
    'animationIterationCount',
    'animationName',
    'animationPlayState',
    'animationTimingFunction',
  ],
  background: [
    'backgroundAttachment',
    'backgroundClip',
    'backgroundColor',
    'backgroundImage',
    'backgroundOrigin',
    'backgroundPositionX',
    'backgroundPositionY',
    'backgroundRepeat',
    'backgroundSize',
  ],
  backgroundPosition: [ 'backgroundPositionX', 'backgroundPositionY' ],
  border: [
    'borderBottomColor',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderImageOutset',
    'borderImageRepeat',
    'borderImageSlice',
    'borderImageSource',
    'borderImageWidth',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderTopColor',
    'borderTopStyle',
    'borderTopWidth',
  ],
  borderBlockEnd: [
    'borderBlockEndColor',
    'borderBlockEndStyle',
    'borderBlockEndWidth',
  ],
  borderBlockStart: [
    'borderBlockStartColor',
    'borderBlockStartStyle',
    'borderBlockStartWidth',
  ],
  borderBottom: [ 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth' ],
  borderColor: [
    'borderBottomColor',
    'borderLeftColor',
    'borderRightColor',
    'borderTopColor',
  ],
  borderImage: [
    'borderImageOutset',
    'borderImageRepeat',
    'borderImageSlice',
    'borderImageSource',
    'borderImageWidth',
  ],
  borderInlineEnd: [
    'borderInlineEndColor',
    'borderInlineEndStyle',
    'borderInlineEndWidth',
  ],
  borderInlineStart: [
    'borderInlineStartColor',
    'borderInlineStartStyle',
    'borderInlineStartWidth',
  ],
  borderLeft: [ 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth' ],
  borderRadius: [
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
  ],
  borderRight: [ 'borderRightColor', 'borderRightStyle', 'borderRightWidth' ],
  borderStyle: [
    'borderBottomStyle',
    'borderLeftStyle',
    'borderRightStyle',
    'borderTopStyle',
  ],
  borderTop: [ 'borderTopColor', 'borderTopStyle', 'borderTopWidth' ],
  borderWidth: [
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
  ],
  columnRule: [ 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth' ],
  columns: [ 'columnCount', 'columnWidth' ],
  flex: [ 'flexBasis', 'flexGrow', 'flexShrink' ],
  flexFlow: [ 'flexDirection', 'flexWrap' ],
  font: [
    'fontFamily',
    'fontFeatureSettings',
    'fontKerning',
    'fontLanguageOverride',
    'fontSize',
    'fontSizeAdjust',
    'fontStretch',
    'fontStyle',
    'fontVariant',
    'fontVariantAlternates',
    'fontVariantCaps',
    'fontVariantEastAsian',
    'fontVariantLigatures',
    'fontVariantNumeric',
    'fontVariantPosition',
    'fontWeight',
    'lineHeight',
  ],
  fontVariant: [
    'fontVariantAlternates',
    'fontVariantCaps',
    'fontVariantEastAsian',
    'fontVariantLigatures',
    'fontVariantNumeric',
    'fontVariantPosition',
  ],
  gap: [ 'columnGap', 'rowGap' ],
  grid: [
    'gridAutoColumns',
    'gridAutoFlow',
    'gridAutoRows',
    'gridTemplateAreas',
    'gridTemplateColumns',
    'gridTemplateRows',
  ],
  gridArea: [ 'gridColumnEnd', 'gridColumnStart', 'gridRowEnd', 'gridRowStart' ],
  gridColumn: [ 'gridColumnEnd', 'gridColumnStart' ],
  gridColumnGap: [ 'columnGap' ],
  gridGap: [ 'columnGap', 'rowGap' ],
  gridRow: [ 'gridRowEnd', 'gridRowStart' ],
  gridRowGap: [ 'rowGap' ],
  gridTemplate: [
    'gridTemplateAreas',
    'gridTemplateColumns',
    'gridTemplateRows',
  ],
  listStyle: [ 'listStyleImage', 'listStylePosition', 'listStyleType' ],
  margin: [ 'marginBottom', 'marginLeft', 'marginRight', 'marginTop' ],
  marker: [ 'markerEnd', 'markerMid', 'markerStart' ],
  mask: [
    'maskClip',
    'maskComposite',
    'maskImage',
    'maskMode',
    'maskOrigin',
    'maskPositionX',
    'maskPositionY',
    'maskRepeat',
    'maskSize',
  ],
  maskPosition: [ 'maskPositionX', 'maskPositionY' ],
  outline: [ 'outlineColor', 'outlineStyle', 'outlineWidth' ],
  overflow: [ 'overflowX', 'overflowY' ],
  padding: [ 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop' ],
  placeContent: [ 'alignContent', 'justifyContent' ],
  placeItems: [ 'alignItems', 'justifyItems' ],
  placeSelf: [ 'alignSelf', 'justifySelf' ],
  textDecoration: [
    'textDecorationColor',
    'textDecorationLine',
    'textDecorationStyle',
  ],
  textEmphasis: [ 'textEmphasisColor', 'textEmphasisStyle' ],
  transition: [
    'transitionDelay',
    'transitionDuration',
    'transitionProperty',
    'transitionTimingFunction',
  ],
  wordWrap: [ 'overflowWrap' ],
};


/**
 * CSS properties which accept numbers but are not in units of "px".
 */
const unitlessNumbers = new Set([
  'animationIterationCount',
  'aspectRatio',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridArea',
  'gridRow',
  'gridRowEnd',
  'gridRowSpan',
  'gridRowStart',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnSpan',
  'gridColumnStart',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'scale',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity', // SVG-related properties
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'MozAnimationIterationCount', // Known Prefixed Properties
  'MozBoxFlex', // TODO: Remove these since they shouldn't be used in modern code
  'MozBoxFlexGroup',
  'MozLineClamp',
  'msAnimationIterationCount',
  'msFlex',
  'msZoom',
  'msFlexGrow',
  'msFlexNegative',
  'msFlexOrder',
  'msFlexPositive',
  'msFlexShrink',
  'msGridColumn',
  'msGridColumnSpan',
  'msGridRow',
  'msGridRowSpan',
  'WebkitAnimationIterationCount',
  'WebkitBoxFlex',
  'WebKitBoxFlexGroup',
  'WebkitBoxOrdinalGroup',
  'WebkitColumnCount',
  'WebkitColumns',
  'WebkitFlex',
  'WebkitFlexGrow',
  'WebkitFlexPositive',
  'WebkitFlexShrink',
  'WebkitLineClamp',
]);
function isUnitlessNumber (name) {
  return unitlessNumbers.has(name);
}

function setValueForStyle (style, styleName, value) {
  const isCustomProperty = styleName.indexOf('--') === 0;
  if (__DEV__) {
    if (!isCustomProperty) {
      warnValidStyle(styleName, value);
    }
  }

  if (value && typeof value === 'object') {
    return; // can't process objects
  }
  if (isUndefinedOrNull(value) || typeof value === 'boolean' || value === '') {
    if (isCustomProperty) {
      style[styleName] = '';
    } else if (styleName === 'float') {
      style.cssFloat = '';
    } else {
      style[styleName] = '';
    }
  } else if (isCustomProperty) {
    style[styleName] = value;
  } else if (
    typeof value === 'number' &&
    value !== 0 &&
    !isUnitlessNumber(styleName)
  ) {
    style[styleName] = `${value}px`; // Presumes implicit 'px' suffix for unitless numbers
  } else {
    style[styleName] = (`${value}`).trim();
  }
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// 'msTransform' is correct, but the other prefixes should be capitalized
const badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
const hyphenPattern = /-(.)/g;

// style values shouldn't contain a semicolon
const badStyleValueWithSemicolonPattern = /;\s*$/;

const warnedStyleNames = {};
const warnedStyleValues = {};
let warnedForNaNValue = false;
let warnedForInfinityValue = false;

function camelize (string) {
  return string.replace(hyphenPattern, (_, character) => character.toUpperCase());
}

function warnHyphenatedStyleName (name) {
  if (__DEV__) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    console.error(
      'Unsupported style property %s. Did you mean %s?',
      name,
      // As Andi Smith suggests
      // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
      // is converted to lowercase `ms`.
      camelize(name.replace(msPattern, 'ms-'))
    );
  }
}

function warnBadVendoredStyleName (name) {
  if (__DEV__) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    console.error(
      'Unsupported vendor-prefixed style property %s. Did you mean %s?',
      name,
      name.charAt(0).toUpperCase() + name.slice(1)
    );
  }
}

function warnStyleValueWithSemicolon (name, value) {
  if (__DEV__) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    console.error(
      "Style property values shouldn't contain a semicolon. " +
      'Try "%s: %s" instead.',
      name,
      value.replace(badStyleValueWithSemicolonPattern, '')
    );
  }
}

function warnStyleValueIsNaN (name, value) {
  if (__DEV__) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    console.error(
      '`NaN` is an invalid value for the `%s` css style property.',
      name
    );
  }
}

function warnStyleValueIsInfinity (name) {
  if (__DEV__) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;
    console.error(
      '`Infinity` is an invalid value for the `%s` css style property.',
      name
    );
  }
}

function warnValidStyle (name, value) {
  if (__DEV__) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value);
    }

    if (typeof value === 'number') {
      if (Number.isNaN(value)) {
        warnStyleValueIsNaN(name, value);
      } else if (!Number.isFinite(value)) {
        warnStyleValueIsInfinity(name, value);
      }
    }
  }
}
