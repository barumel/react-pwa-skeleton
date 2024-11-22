import fs from 'fs-extra';
import path from 'path';
import lodash from 'lodash';
import { v4 } from 'uuid';
import moment from 'moment';

const { last } = lodash;
const pkg = fs.readJsonSync(path.join(process.cwd(), 'package.json'));

const client = {
  buildId: `${last(v4().split('-'))}`,
  version: pkg.version,
  timestamp: moment().format()
};

fs.outputFileSync(path.join(process.cwd(), 'src', 'client.js'), `export default ${JSON.stringify(client, null, 2)}`, 'utf-8');
