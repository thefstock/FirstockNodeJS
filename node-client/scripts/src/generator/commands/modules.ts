import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';

import { command, Command, metadata, option, Options } from 'clime-ts-node';

import { IModuleBlueprint } from '../interfaces';
import generateModule from '../generators/module.generator';

const rootPath = path.join(__dirname, '../../../../');

export class IModulesCommandOptions extends Options {
  @option({
    flag: 'i',
    required: true,
    description: 'The folder with the blueprint json files',
  })
  input: string;

  @option({
    flag: 'f',
    description: 'Force replace files if already exists',
  })
  force: boolean = false;

  readBlueprints(): string[] {
    if (this.input) {
      const folderPath = path.join(rootPath, this.input);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        return files
          .filter(file => {
            const stat = fs.statSync(path.join(folderPath, file));
            return stat.isFile() && file.endsWith(".blueprint.json");
          })
          .map(file => path.join(folderPath, file));
      }
      return null;
    }
    return null;
  }
}

@command({
  brief: 'generate multiple modules from a blueprints dir'
})
export default class extends Command {

  @metadata
  execute(
    options: IModulesCommandOptions,
  ) {
    const blueprints = options.readBlueprints();
    if (!blueprints) {
      console.log(chalk`{red [ERROR] } The {bold input} option must be provided`)
    }
    else {
      blueprints
        .forEach(blueprintPath => {
          console.log(chalk`{blue [PARSING]} ${blueprintPath}`)
          const blueprint: IModuleBlueprint = JSON.parse(fs.readFileSync(blueprintPath).toString('utf-8'));
          generateModule(rootPath, blueprint.module, blueprint, options.force);
        });
    }
  }
}
