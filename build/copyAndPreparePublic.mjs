import fs from 'fs-extra';
import { replaceInFile } from 'replace-in-file';

import client from '../src/client.js';

/**
 * Copy the contents of the public folder (which contains the index.html file) to the build folder
 * and replace the <head> tag in index.html with the necessary import statements
 *
 * @param   {Object}  config   Build config
 *
 * @return  void
 */
export default async function copyAndPreparePublic({ config }) {
  // Copy content of the public folder to dist
  fs.copySync('./public', config.outdir, { recursive: true });

  // Prepare header for index.html
  const content = `
      <link rel="stylesheet" href="/index-${client.buildId}.css" type="text/css">
      <script src="/index-${client.buildId}.js" type="module"></script>
    </head>
  `;

  await replaceInFile({
    files: `${config.outdir}/index.html`,
    from: '</head>',
    to: content
  });
}
