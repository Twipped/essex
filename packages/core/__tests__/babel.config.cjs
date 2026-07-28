module.exports = exports = {
  sourceMaps: 'inline',
  presets: [
    [
      '@babel/preset-env', {
        modules: false,
        exclude: [ 'transform-typeof-symbol' ],
        targets: 'maintained node versions',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: 'essex',
        development: true,
        developmentSourceSelf: true,
      },
    ],
  ],
  plugins: [
    './babel-plugin-mdx.mjs',
  ],
};
