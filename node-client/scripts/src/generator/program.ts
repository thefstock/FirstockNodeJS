import * as path from 'path';

import { CLI, Shim } from 'clime-ts-node';

const cli = new CLI('generate', path.join(__dirname, 'commands'));
const shim = new Shim(cli);
shim.execute(process.argv);
