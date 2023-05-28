/**
 * Why is this file MJS?
 * ===
 * `create-html-element`, `escape-goat`, 'property-information', and `html-element-attributes` are all
 * only available as ESModules, they do not provide commonjs exports. Rather than
 * try to fork them or pre-compile them myself, I decided that since `render()` is
 * async anyway, I might as well have this entire module be ESM and wrap it with
 * an async proxy function so I could get around the `import()` requirement.
 */

/* eslint-disable import/extensions */
import { isObject, isFunction, isPrimitive, isUndefinedOrNull, isString, sizeOf } from '@twipped/utils/types';
import pMap from '@twipped/utils/pMap';
import { htmlEscape } from 'escape-goat';
import { format } from 'pretty-format';
import renderTag from './renderTag.mjs';

import { Element } from './element.js';
import { CONTEXT, FRAGMENT, RAW } from './symbols.js';
import { Context } from './context.js';

export default async function render (element, withContext = new Context(), extendProps) {
  if (isFunction(element)) {
    return render(new Element({ type: element }), withContext, extendProps);
  }

  if (!(withContext instanceof Context)) {
    if (isObject(withContext)) {
      withContext = new Context(withContext);
    } else {
      return withContext.error(`essex.render() can only accept an essex Context or a plain object as its second argument.\nReceived ${format(withContext)}`);
    }
  }

  if (!element) {
    return withContext.error(`essex.render() may only accept an essex Element or a function as its first argument.\nReceived ${format(element)}`);
  }

  if (!element.type || (
    !isString(element.type)
    && !isFunction(element.type)
    && ![ CONTEXT, FRAGMENT, RAW ].includes(element.type)
  )) {
    return withContext.error(`essex.render() received an element of an unknown type: ${format(element.type)}`);
  }

  let {
    type,
    props,
    name,
    fileName,
    lineNumber,
    columnNumber,
  } = element;

  if (type instanceof Element) {
    return render(type, withContext, props);
  }

  if (extendProps) props = { ...props, extendProps };

  withContext = withContext.shard({
    name,
    fileName,
    lineNumber,
    columnNumber,
  });

  if (isFunction(type)) {
    const branch = await invoke(type, props, withContext);
    if (Array.isArray(branch)) {
      return render(new Element(FRAGMENT, { children: branch }));
    }

    if (branch === null || isString(branch)) return branch;

    if (branch instanceof Element) {
      return render(branch, withContext);
    }

    return withContext.error(`The "${name}" component returned an unsupported value: ${format(branch)}`);
  }

  if (type === CONTEXT) {
    const { scope, value } = props;
    if (!scope) {
      return withContext.error('Received a context provider without a scope.');
    }
    if (Object.hasOwn(Context, scope)) {
      return withContext.error(`Attempted to define a context scope that collides with the Context prototype: ${format(scope)}`);
    }
    withContext[scope] = value;
  }

  if (type === RAW) {
    return props.children;
  }

  const leaves = await renderChildren(props.children, withContext);

  if (typeof type === 'string') {
    return renderTag(type, props, leaves, withContext);
  }

  if (!leaves.length) return '';

  if (type === FRAGMENT || type === CONTEXT) {
    return leaves;
  }

  return withContext.error(`Unknown tag type: "${format(type)}"`);
}


async function renderChildren (children, withContext) {
  if (!sizeOf(children) && children !== 0) return '';

  if (!Array.isArray(children)) children = [ children ];
  else if (!children?.length) return '';

  const leaves = await pMap(children.flat(Infinity), (child) => renderChild(child, withContext));

  return leaves.flat(Infinity).filter(Boolean).join('');
}


async function renderChild (child, withContext) {
  if (isUndefinedOrNull(child) || child === false) return '';

  if (child instanceof Element) {
    return render(child, withContext);
  }

  if (isPrimitive(child)) {
    return htmlEscape(String(child));
  }

  if (isFunction(child)) {
    return render(new Element({ type: child }), withContext);
  }

  return withContext.error(`Received an element child of unknown format: ${format(child)}`);
}

function invoke (fn, props, withContext) {
  try {
    return fn.call(withContext, props);
  } catch (error) {
    const e = {}; Error.captureStackTrace(e);
    const cstack = withContext.getCallStack();
    const control = `${e.stack}\n`.split('\n');
    const stack = `${error.stack}\n`.split("\n");

    const filter = new Set(control);
    const filtered = stack.filter((l) => !filter.has(l)).slice(0, -1).join('\n');

    error._originalStack = error.stack;
    error.stack = `${filtered}\n${cstack}`;

    throw error;
  }
}
