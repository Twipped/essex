module.exports = exports = {
  sourceMaps: 'inline',
  "presets": [
    [
      "@babel/preset-env", {
        "useBuiltIns": "entry",
        "corejs": 3,
        "modules": false,
        "exclude": [ "transform-typeof-symbol" ],
        "targets": "maintained node versions",
      },
    ],
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "essex",
        "development": true,
      },
    ],
  ],
  plugins: [
    './babel-plugin-mdx.mjs',
  ],
};
