import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import chalk from 'chalk';
import { command, Command, metadata, option, Options } from 'clime-ts-node';
import { sortBy } from 'lodash';

import { IModelSpec } from '../interfaces';
import { createModel, IModelContext } from '../factories/model.factory';
import { createDocComments, createFormatter, createNamedImport, generateProgram } from '../utils';

const rootPath = path.join(__dirname, '../../../../');

export class IModulesCommandOptions extends Options {
  @option({
    flag: 'i',
    required: true,
    description: 'The .spec.json file for models',
  })
  input: string;

  @option({
    flag: 'o',
    required: true,
    description: 'The output .ts file path',
  })
  output: string;

  @option({
    flag: 'f',
    description: 'Force replace files if already exists',
  })
  force: boolean = false;

  get outputPath(): string {
    return path.join(rootPath, this.output);
  }

  readSpec(): Record<string, Record<string, IModelSpec>> {
    if (this.input) {
      const filepath = path.join(rootPath, this.input);
      if (fs.existsSync(filepath)) {
        return JSON.parse(fs.readFileSync(filepath).toString('utf-8'));
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
    const fmt = createFormatter();
    const specs: Record<string, Record<string, IModelSpec>> = options.readSpec();
    if (!options.input) {
      console.log(chalk`{red [ERROR] } The {bold input} option must be provided`);
    }
    else if (!specs) {
      console.log(chalk`{red [ERROR] } Couldn't parse the file ${options.input}`);
    }
    else if (!options.output) {
      console.log(chalk`{red [ERROR] } The {bold output} option must be provided`);
    }
    else if (fs.existsSync(options.outputPath) && !options.force) {
      console.log(chalk`{red [ERROR] } The output file already exists`);
    }
    else {
      const context: IModelContext = {
        usedFields: new Set(),
        usedValidators: new Set()
      }
      if (fs.existsSync(options.outputPath) && options.force) {
        // remove file
        fs.rmSync(options.outputPath);
      }
      const models = Object
        .entries(specs)
        .flatMap(([name, spec]) => (
          [
            ts.addSyntheticLeadingComment(
              createModel(name, spec, context),
              ts.SyntaxKind.MultiLineCommentTrivia,
              createDocComments([
                fmt('The {name!lowerCase} model', { name })
              ]),
              true
            ),
            ts.factory.createIdentifier('\n')
          ]
        ));
      const commonModule = path.relative(path.dirname(options.outputPath), path.join(rootPath, 'src/lib/common'));
      // import statements
      const importStatements = [
        createNamedImport(sortBy(Array.from(context.usedValidators)), 'class-validator'),
        ts.factory.createIdentifier("\n"),
        createNamedImport(sortBy(Array.from(context.usedFields)), commonModule),
      ];
      // create node array
      const nodeArr = ts.factory.createNodeArray([
        ts.factory.createJSDocComment(
          '@module\ncommon models used across the project\n'
        ),
        ts.factory.createIdentifier('\n'),
        ...importStatements,
        ts.factory.createIdentifier('\n'),
        ...models
      ]);
      // generate code
      console.log(chalk`{green [GENERATING]} ${options.outputPath}`)
      const content = generateProgram(options.output, nodeArr);
      // generate folder if not already exists
      if (!fs.existsSync(path.dirname(options.outputPath))) {
        fs.mkdirSync(path.dirname(options.outputPath), { recursive: true })
      }
      fs.writeFileSync(options.outputPath, content);
    }
  }
}
