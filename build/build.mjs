import esbuild from 'esbuild';
import fs from 'fs-extra';

import config from './config.mjs';
import copyAndPreparePublic from './copyAndPreparePublic.mjs';
import client from '../src/client.js';

(async function build() {
  await esbuild.build({
    ...config,
    entryPoints: [{ in: 'src/index.js', out: `index-${client.buildId}` }]
  });
  await copyAndPreparePublic({ config });
}());
