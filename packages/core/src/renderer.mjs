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
import { CONTEXT, DEFER, EXCLUDE, FRAGMENT, PRIORITY, RAW } from './symbols.js';
import { Context } from './context.js';
import { Envelope } from './utils.js';

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

  const isSymbolTag = [ CONTEXT, FRAGMENT, RAW ].includes(element.type);

  if (!element.type || (
    !isString(element.type)
    && !isFunction(element.type)
    && !isSymbolTag
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
  // console.log({ name: withContext.name, depth: withContext.depth });

  if (type instanceof Element) {
    return render(type, withContext, props);
  }

  const shouldExclude = type[EXCLUDE] || props?.[EXCLUDE];
  if (extendProps) props = { ...props, extendProps };

  // console.log({ name, shouldExclude, props });
  withContext = withContext.shard({
    name,
    isSymbolTag,
    shouldExclude,
    fileName,
    lineNumber,
    columnNumber,
  });

  if (isFunction(type)) {
    if (type[DEFER]) {
      return renderDeferredComponent({ type, name, props, withContext });
    }
    return renderComponent({ type, name, props, withContext });
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

async function renderComponent ({ type, name, props, withContext }) {
  const branch = await invoke(type, props, withContext);
  if (Array.isArray(branch)) {
    return render(new Element({ type: FRAGMENT, props: { children: branch } }), withContext);
  }

  if (branch === null || isString(branch)) return branch;

  if (branch instanceof Element) {
    return render(branch, withContext);
  }

  return withContext.error(`The "${name}" component returned an unsupported value: ${format(branch)}`);
}

async function renderDeferredComponent ({ type, name, props: { children, ...props }, withContext }) {
  const prerendered = await renderChildren(children, withContext);
  const newChildren = new Element({ type: RAW, props: { children: prerendered } });

  return renderComponent({ type, name, props: { children: newChildren, ...props }, withContext });
}

async function renderChildren (children, withContext) {
  if (!sizeOf(children) && children !== 0) return '';

  if (!Array.isArray(children)) children = [ children ];
  else if (!children?.length) return '';

  children = children.flat(Infinity);

  const groups = new Map();
  let leaves = [];
  // separate children into execution groups by priority and
  // push promises of each child's result into a collection
  // that matches the sibling order.
  for (const child of children) {
    const priority = Number(child[PRIORITY] || child.props?.[PRIORITY] || 0);
    const e = new Envelope();
    const r = async () => e.resolve(await renderChild(child, withContext));
    const group = groups.get(priority) || (() => {
      const g = [];
      groups.set(priority, g);
      return g;
    })();
    group.push(r);
    leaves.push(e.promise);
  }
  // now execute each priority group in order, highest priority first
  const groupKeys = Array.from(groups.keys()).sort().reverse();
  for (const k of groupKeys) {
    await pMap(groups.get(k), (r) => r());
  }


  // const pending = new Envelope();
  // let chain = pending.promise;
  // let leaves = [];
  // const immediate = [];
  // const deferred = [];
  // for (const child of children) {
  //   const isDeferredSibling = child[DEFER] || child.props?.[DEFER];
  //   if (isDeferredSibling) {
  //     chain = chain.then(() => renderChild(child, withContext));
  //     leaves.push(chain);
  //     deferred.push(chain);
  //     continue;
  //   }

  //   const p = renderChild(child, withContext);
  //   leaves.push(p);
  //   immediate.push(p);
  // }
  // if (deferred.length) {
  //   await Promise.all(immediate);
  //   pending.resolve();
  // }

  // all children should now be resolved.
  leaves = await Promise.all(leaves);

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
    const cstack = withContext.getThrowStack();
    const control = `${e.stack}\n`.split('\n');
    const stack = `${error.stack}\n`.split("\n");

    const filter = new Set(control);
    const filtered = stack.filter((l) => !filter.has(l)).slice(0, -1).join('\n');

    error._originalStack = error.stack;
    error.stack = `${filtered}\n${cstack}`;

    throw error;
  }
}
