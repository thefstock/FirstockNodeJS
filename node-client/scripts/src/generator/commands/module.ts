import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';

import { command, Command, param, option, Options } from 'clime-ts-node';

import { IModuleBlueprint } from '../interfaces';
import generateModule from '../generators/module.generator';

const rootPath = path.join(__dirname, '../../../../');

export class IModuleCommandOptions extends Options {
  @option({
    flag: 'b',
    description: 'The path to a blueprint json',
  })
  blueprint: string;

  @option({
    flag: 'f',
    description: 'Force replace files if already exists',
  })
  force: boolean = false;

  readBlueprint(): IModuleBlueprint {
    if (this.blueprint) {
      const filepath = path.join(rootPath, this.blueprint);
      if (fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath);
        return JSON.parse(data.toString('utf-8'));
      }
    }
    return null;
  }
}

@command({
  brief: 'generate a module'
})
export default class extends Command {
  execute(
    @param({ required: false, description: 'name of the module' })
    name: string,
    options: IModuleCommandOptions,
  ) {
    const blueprint = options.readBlueprint();
    if (!name && !blueprint) {
      console.log(chalk`{red [ERROR] } Either {bold name} or {bold blueprint} must be provided`)
    }
    else {
      name = name ?? blueprint.module;
      generateModule(rootPath, name, blueprint);
    }
  }
}
