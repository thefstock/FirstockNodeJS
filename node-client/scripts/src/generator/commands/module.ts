import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';
import { command, Command, param, option, Options } from 'clime-ts-node';

import { ENDPOINTS_FILE, MODELS_DIR, MODEL_FILE, MODULE_DIR, SERVICE_FILE } from '../paths';
import { IModuleBlueprint } from '../interfaces';
import { createFormatter, createIndexExports } from '../utils';
import createService from '../factories/service.factory';
import createModels from '../factories/model.factory';
import createEndpoints from '../factories/endpoints.factory';
// import endpointsTemplate from '../templates/endpoints.template';
// import serviceTemplate from '../templates/service.template';

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
  force?: boolean;

  readBlueprint(): IModuleBlueprint {
    const filepath = path.join(rootPath, this.blueprint);
    if (fs.existsSync(filepath)) {
      const data = fs.readFileSync(filepath);
      return JSON.parse(data.toString('utf-8'));
    }
    return null;
  }
}

@command({
  brief: 'generate a module'
})
export default class extends Command {
  execute(
    @param({ required: true, description: 'name of the module' })
    name: string,
    options: IModuleCommandOptions,
  ) {
    const fmt = createFormatter();
    const modulePath = path.join(rootPath, fmt(MODULE_DIR, { module: name }));
    if (fs.existsSync(modulePath) && !options.force) {
      console.log(chalk`{red [ERROR]} Module already exists`);
    }
    else {
      const modelsDirPath = path.join(modulePath, fmt(MODELS_DIR, { module: name }));
      const serviceFilePath = path.join(modulePath, fmt(SERVICE_FILE, { module: name }));
      const endpointsFilePath = path.join(modulePath, fmt(ENDPOINTS_FILE, { module: name }));

      const blueprint = options.readBlueprint();

      if (options.force && fs.existsSync(modulePath)) {
        // remove folder
        fs.rmSync(modulePath, { recursive: true, force: true });
      }

      console.log(chalk`{green [GENERATING]} ${modulePath}`);
      fs.mkdirSync(modulePath, { recursive: true });
      console.log(chalk`{green [GENERATING]} ${modelsDirPath}`);
      fs.mkdirSync(modelsDirPath, { recursive: true });
        // SERVICE FILE
      console.log(chalk`{green [GENERATING]} ${serviceFilePath}`);
      const serviceFileContent = createService(name, blueprint);
      fs.writeFileSync(serviceFilePath, serviceFileContent);
      // ENDPOINTS FILE
      console.log(chalk`{green [GENERATING]} ${endpointsFilePath}`);
      const endpointsFileContent = createEndpoints(name, blueprint);
      fs.writeFileSync(endpointsFilePath, endpointsFileContent);
      // if there is a blueprint generate the model files
      if (blueprint) {
        console.log(chalk`{blue GENERATING MODELS}`);
        const modelFiles = [];
        Object.entries(blueprint.methods)
          .forEach(([method, spec]) => {
            const modelFileName = fmt(MODEL_FILE, { method });
            const modelFilePath = path.join(modelsDirPath, modelFileName);
            modelFiles.push(path.basename(modelFileName, ".ts"));
            console.log(chalk`{green [GENERATING]} ${modelFilePath}`);
            const modelFileContents = createModels(method, spec);
            fs.writeFileSync(modelFilePath, modelFileContents);
          });
        // create the index file
        const indexFilePath = path.join(modelsDirPath, 'index.ts');
        console.log(chalk`{green [GENERATING]} ${indexFilePath}`);
        const indexFileContent = createIndexExports(modelFiles);
        fs.writeFileSync(indexFilePath, indexFileContent);
      }
    }
  }
}
