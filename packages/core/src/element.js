const { getComponentName } = require('./utils');

class Element {
  /**
   * Unrendered JSXElement
   *
   * @param {Object} config
   * @param {string|Function} config.type The name or component of the element. (Like `div`, `a`, etc.)
   * @param {Object} config.props The properties/attributes assigned to the element.
   * @param {string} config.key Element key. Used only for debugging
   * @param {string} [config.fileName] Source file of the element.
   * @param {number} [config.lineNumber] Line number in the source file where the element occurs.
   * @param {number} [config.columnNumber] Column number in the source file where the element occurs.
   */
  constructor (config) {
    Object.assign(this, config);
  }

  get name () {
    return (
      this.displayName
      || getComponentName(this.type, this)
    );
  }


}

function cloneElement (element, config, newChildren) {
  if (!(element instanceof Element)) {
    throw new Error('essex.cloneElement must be provided an essex Element object or descendant, but you passed ' + element);
  }
  const { type, props: { ...props }, fileName, lineNumber, columNumber } = element;

  if (typeof newChildren !== 'undefined') {
    props.children = newChildren;
  }

  return Reflect.construct(element.constructor, [ {
    type,
    props,
    fileName,
    lineNumber,
    columNumber,
    ...config,
  } ]);
}

exports.Element = Element;
exports.cloneElement = cloneElement;
