# Essex

Essex is a template engine for generating html using JSX and functional components, similar to React, but built for rendering in server-side environments or non-React frontends.

This is a multi-package monorepo for the Essex codebase.

### Packages In This Repository

- [`essex`](packages/core/): The main engine, containing the JSX element library and template renderer.
- [`import-essex`](packages/import): A node.js module loader for transforming JSX code at runtime.