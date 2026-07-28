import { defineConfig } from 'eslint/config';

import { node } from '@twipped/eslint-config';

export default defineConfig([
  ...node,
  {
    ignores: ['**/__snapshots__/**']
  }
]);
