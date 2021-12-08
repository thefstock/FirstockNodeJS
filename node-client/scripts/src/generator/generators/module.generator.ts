import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';

import { ENDPOINTS_FILE, MODELS_DIR, MODEL_FILE, MODULE_DIR, SERVICE_FILE } from '../paths';
import { IModuleBlueprint } from '../interfaces';
import { createFormatter, createIndexExports } from '../utils';
import createService from '../factories/service.factory';
import createModels from '../factories/model.factory';
import createEndpoints from '../factories/endpoints.factory';

function generateModule(rootPath: string, name: string, blueprint?: IModuleBlueprint, force: boolean = false) {
  // create the formatter
  const fmt = createFormatter();
  const modulePath = path.join(rootPath, fmt(MODULE_DIR, { module: name }));

  if (fs.existsSync(modulePath) && !force) {
    console.log(chalk`{red [ERROR]} Module already exists`);
  }
  else {
    const modelsDirPath = path.join(modulePath, fmt(MODELS_DIR, { module: name }));
    const serviceFilePath = path.join(modulePath, fmt(SERVICE_FILE, { module: name }));
    const endpointsFilePath = path.join(modulePath, fmt(ENDPOINTS_FILE, { module: name }));
    if (force && fs.existsSync(modulePath)) {
      // remove folder
      console.log(chalk`{red [REMOVING]} ${modulePath} and all its contents`);
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

export default generateModule;