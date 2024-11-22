import esbuild from 'esbuild';

import config from './config.mjs';
import copyAndPreparePublic from './copyAndPreparePublic.mjs';
import { buildId } from '../src/client.js';

(async function build() {
  await esbuild.build({
    ...config,
    entryPoints: [{ in: 'src/service-worker.js', out: `service-worker-${buildId}` }],
    splitting: false
  });
  await copyAndPreparePublic({ config });
}());
