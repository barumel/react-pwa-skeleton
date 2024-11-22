import esbuild from 'esbuild';

import config from './config.mjs';
import copyAndPreparePublic from './copyAndPreparePublic.mjs';

(async function build() {
  await esbuild.build(config);
  await copyAndPreparePublic({ config });
}());
