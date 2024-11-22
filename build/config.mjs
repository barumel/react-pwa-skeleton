import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { sassPlugin } from 'esbuild-sass-plugin';
import { v4 } from 'uuid';
import lodash from 'lodash';

const { last } = lodash;
const indexFilename = `index-${last(v4().split('-'))}`;

const config = {
  loader: {
    '.js': 'jsx',
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.woff2': 'dataurl',
    '.woff': 'dataurl',
    '.ttf': 'dataurl',
    '.svg': 'dataurl',
    '.eot': 'dataurl',
    '.OTF': 'dataurl'
  },
  bundle: true,
  entryPoints: [{ in: 'src/index.js', out: indexFilename }],
  format: 'esm',
  // jsx: 'automatic',
  minify: true,
  outdir: './dist',
  plugins: [
    sassPlugin(),
    nodeModulesPolyfillPlugin({
      globals: {
        Buffer: true
      }
    })
  ],
  sourcemap: true,
  splitting: true,
  target: ['esnext'],
  treeShaking: true
};

export default config;
