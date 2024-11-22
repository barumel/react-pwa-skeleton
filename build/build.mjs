import esbuild from 'esbuild';

import config from './config.mjs';
import copyAndPreparePublic from './copyAndPreparePublic.mjs';
import { buildId } from '../src/client';

(async function build() {
  await esbuild.build({
    ...config,
    entryPoints: [{ in: 'src/index.js', out: `index-${buildId}` }]
  });
  await copyAndPreparePublic({ config });
}());
