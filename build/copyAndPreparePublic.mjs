import lodash from 'lodash';
import fs from 'fs-extra';
import { replaceInFile } from 'replace-in-file';

const { chain, get } = lodash;

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
  const indexFilename = chain(config)
    .get('entryPoints', [])
    .find((p) => get(p, 'in') === 'src/index.js')
    .get('out', 'index')
    .value();

  // Prepare header for index.html
  const content = `
      <link rel="stylesheet" href="/${indexFilename}.css" type="text/css">
      <script src="/${indexFilename}.js" type="module"></script>
    </head>
  `;

  await replaceInFile({
    files: `${config.outdir}/index.html`,
    from: '</head>',
    to: content
  });
}
