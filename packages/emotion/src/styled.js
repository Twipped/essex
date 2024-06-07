const { jsx, utils: { getComponentName } } = require('essex');

const ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;

module.exports = exports = function styled (tag, options = {}) {
  const doNotForward = new Set(options.doNotForward || []);
  return function createStyled (...args) {
    const styles = [];
    if (!args[0] || args[0].raw === undefined) {
      styles.push(...args);
    } else {
      if (process.env.NODE_ENV !== 'production' && args[0][0] === undefined) {
        throw new Error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles.push(args[0][0]);
      for (let i = 1; i < args.length; i++) {
        if (process.env.NODE_ENV !== 'production' && args[0][i] === undefined) {
          throw new Error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles.push(args[i], args[0][i]);
      }
    }

    if (options.label) {
      styles.push(`label:${options.label};`);
    }

    function Styled (props) {
      if (!this.emotion) {
        throw new Error('Could not find the Emotion context provider.');
      }

      const classes = this.emotion.attach(styles);

      if (doNotForward.size) {
        // eslint-disable-next-line no-param-reassign
        props = Object.entries(props).reduce(
          // eslint-disable-next-line no-return-assign
          (o, [ key, value ]) => {
            if (doNotForward.has(key)) return o;
            o[key] = value;
            return o;
          },
          {}
        );
      }

      return jsx(tag, {
        ...props,
        class: [
          ...classes,
          props.class,
          props.className,
        ],
      });
    }
    Styled.displayName = options.name || `Styled(${getComponentName(tag)})`;

    return Styled;
  };
};
