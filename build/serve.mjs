import esbuild from 'esbuild';
import fs from 'fs-extra';

import defaultConfig from './config.mjs';
import copyAndPreparePublic from './copyAndPreparePublic.mjs';

const config = {
  ...defaultConfig,
  minify: false
};

(async function server() {
  // Remove current build folder
  fs.rmSync(config.outdir, { recursive: true, force: true });
  await copyAndPreparePublic({ config });

  const ctx = await esbuild.context(config);
  const { host, port } = await ctx.serve({
    servedir: 'dist',
    fallback: './dist/index.html'
  });

  console.info(`\n Serve is running on http://localhost:${port}`);
}());
