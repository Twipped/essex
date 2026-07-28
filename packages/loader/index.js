import { extname } from 'node:path';
import process from 'node:process';

import cachedTransform, { cacheKeyFromSource } from './cache.js';
import transform from './transform.js';

const VALID_EXTENSIONS = [ '.js', '.jsx', '.cjs', '.mjs' ];

export const load = async (url, _context, nextLoad) => {
  if (url.includes('node_modules') || url.startsWith('node:')) {
    return nextLoad(url);
  }

  const u = new URL(url);
  const ext = extname(u.pathname);
  if (!VALID_EXTENSIONS.includes(ext)) {
    return nextLoad(url);
  }

  const result = await nextLoad(url);

  if (!result.source) {
    return result;
  }

  const source = result.source.toString();

  const useCache = (
    process.env.IMPORT_ESSEX_CACHE !== '0'
    && process.env.IMPORT_ESSEX_CACHE !== 'false'
  );

  const cacheKey = cacheKeyFromSource(source);

  try {
    const transformedSource = await cachedTransform(
      () => transform(source, url),
      {
        enabled: useCache,
        key: cacheKey,
      }
    );

    return {
      source: transformedSource,
      format: 'module',
      shortCircuit: true,
    };
  } catch {
    return nextLoad(url);
  }
};
