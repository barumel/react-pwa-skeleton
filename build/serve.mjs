import esbuild from 'esbuild';
import fs from 'fs-extra';

import config from './config.mjs';
import copyAndPreparePublic from './copyAndPreparePublic.mjs';
import client from '../src/client.js';

(async function server() {
  // Copy files from /public folder to /dist and adjust imports
  await copyAndPreparePublic({ config });

  const ctx = await esbuild.context({
    ...config,
    entryPoints: [{ in: 'src/index.js', out: `index-${client.buildId}` }],
    minify: false
  });
  const { host, port } = await ctx.serve({
    servedir: 'dist',
    fallback: './dist/index.html'
  });

  console.info(`\n Serve is running on http://localhost:${port}`);
}());
