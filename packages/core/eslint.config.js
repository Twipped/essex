import { node } from '@twipped/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...node,
  {
    ignores: [
      '**/__snapshots__/**',
      '__tests__/fixtures',
      '__tests__/__snapshots__',
      '/jsx-dev-runtime.js',
      '/jsx-runtime.js',
    ],
  },
  {
    files: [ '**/*.js' ],

    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      'import/no-commonjs': 'off',
    },
  },
  {
    files: [ '**/*.mjs' ],

    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      'import/no-commonjs': 'error',
    },
  },
]);
