// Only load these if compiled source is not already cached
let babel, reactPreset;

const transform = async (source, filename) => {
  if (!babel) {
    babel = await import('@babel/core');
    reactPreset = await import('@babel/preset-react');
  }

  const presets = [
    [
      reactPreset.default,
      {
        runtime: 'automatic',
        importSource: 'essex',
        development: true,
        pure: false,
        useBuiltIns: true,
        useSpread: true,
      },
    ],
  ];

  const result = await babel.transformAsync(source, {
    presets,
    filename,
    sourceMaps: 'inline',
    babelrc: false,
    configFile: false,
  });

  return result.code;
};

export default transform;
