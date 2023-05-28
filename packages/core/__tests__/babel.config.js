module.exports = exports = {
  sourceMaps: 'inline',
  "presets": [
    [
      "@babel/preset-env", {
        "useBuiltIns": "entry",
        "corejs": 3,
        "modules": 'cjs',
        "exclude": [ "transform-typeof-symbol" ],
        "targets": "maintained node versions",
      },
    ],
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "../..",
        "development": true,
      },
    ],
  ],
  plugins: [
    './babel-plugin-mdx.mjs',
  ],
};
