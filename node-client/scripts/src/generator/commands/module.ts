import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';
import { command, Command, param, option, Options } from 'clime-ts-node';

import { ENDPOINTS_FILE, MODELS_DIR, MODEL_FILE, MODULE_DIR, SERVICE_FILE } from '../paths';
import { IModuleBlueprint } from '../interfaces';
import { createFormatter } from '../utils';
import createService from '../factories/service.factory';
import createModels from '../factories/model.factory';
import endpointsTemplate from '../templates/endpoints.template';
// import serviceTemplate from '../templates/service.template';

const rootPath = path.join(__dirname, '../../../../');

export class IModuleCommandOptions extends Options {
  @option({
    flag: 'b',
    description: 'The path to a blueprint json',
  })
  blueprint: string;

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
    if (fs.existsSync(modulePath)) {
      console.log(chalk`{red [ERROR]} Module already exists`);
    }
    else {
      const modelsDirPath = path.join(rootPath, fmt(MODELS_DIR, { module: name }));
      const serviceFilePath = path.join(rootPath, fmt(SERVICE_FILE, { module: name }));
      const endpointsFilePath = path.join(rootPath, fmt(ENDPOINTS_FILE, { module: name }));

      const blueprint = options.readBlueprint();

      console.log(chalk`{green [GENERATING]} ${modulePath}`);
      // fs.mkdirSync(modulePath, { recursive: true });
      console.log(chalk`{green [GENERATING]} ${modelsDirPath}`);
      fs.mkdirSync(modelsDirPath, { recursive: true });
      console.log(chalk`{green [GENERATING]} ${serviceFilePath}`);
      const serviceFileContent = createService(name, blueprint);
      // const serviceFileContent = fmt(serviceTemplate, { module: name });
      fs.writeFileSync(serviceFilePath, serviceFileContent);
      console.log(chalk`{green [GENERATING]} ${endpointsFilePath}`);
      const endpointsFileContent = fmt(endpointsTemplate, { module: name });
      fs.writeFileSync(endpointsFilePath, endpointsFileContent);
      // if there is a blueprint generate the model files
      if (blueprint) {
        console.log(chalk`{blue GENERATING MODELS}`);
        Object.entries(blueprint.methods)
          .forEach(([method, spec]) => {
            const modelFilePath = path.join(rootPath, fmt(MODEL_FILE, { method, module: name }));
            console.log(chalk`{green [GENERATING]} ${modelFilePath}`);
            const modelFileContents = createModels(method, spec);
            fs.writeFileSync(modelFilePath, modelFileContents);
          });
      }
    }
  }
}
