import * as ts from 'typescript';
import { snakeCase, toUpper } from 'lodash';

import { IModuleBlueprint } from "../interfaces";
import { createFormatter, generateProgram } from '../utils';

const fmt = createFormatter();

function createEndpoints(module: string, blueprint?: IModuleBlueprint) {
  /**
   * get endpoints from blueprint
   */
  const endpoints = Object
    .entries(blueprint?.methods ?? {})
    .map(([method, { endpoint }]) => ({
      name: toUpper(snakeCase(method)),
      value: endpoint
    }));
  // the variable value
  const endpointsValue = ts.factory.createObjectLiteralExpression(
    endpoints.map(createEndpoint),
    true
  );
  // the endpoints variable statement
  const variableStatement = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList([
      ts.factory.createVariableDeclaration(
        ts.factory.createIdentifier('endpoints'),
        undefined,
        undefined,
        endpointsValue
      )
    ], ts.NodeFlags.Const)
  );
  // the export statement
  const exportStatement = ts.factory.createExportAssignment(
    undefined,
    undefined,
    undefined,
    ts.factory.createIdentifier("endpoints")
  );
  // The doc comment for the module
  const docComment = ts.factory.createJSDocComment(
    fmt("@module\nThe endpoints for {module!lowerCase} module\n", { module })
  );
  // the node array
  const nodeArr = ts.factory.createNodeArray([
    docComment,
    ts.factory.createIdentifier('\n'),
    variableStatement,
    ts.factory.createIdentifier('\n'),
    exportStatement
  ]);
  // generate the code
  const filename = fmt('{module!kebabCase}.endpoints.ts', { module });
  return generateProgram(filename, nodeArr);
}

/**
 * Create an endpoint
 * @param name The key for the endpoint
 * @param value The value for the endpoint
 */
function createEndpoint({ name, value }) {
  return ts.factory.createPropertyAssignment(
    ts.factory.createIdentifier(name),
    ts.factory.createStringLiteral(value)
  )
}

export default createEndpoints;