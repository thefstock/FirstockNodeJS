import * as ts from 'typescript';
import { snakeCase, toUpper, camelCase, sortBy } from 'lodash';
import { IModuleBlueprint } from '../interfaces';
import {
  createDefaultImport,
  createNamedImport,
  createFormatter,
  generateProgram,
  createPropertyDeclaration,
  createDocComments
} from '../utils';

const fmt = createFormatter();

/**
 * Generate service code
 * @param module The module name
 */
function createService(module: string, blueprint?: IModuleBlueprint): string {
  // get models and methods from blueprint
  const { models = [], methods = [] } = blueprint ? compileBlueprint(blueprint) : {};
  // IMPORT STATEMENTS
  const importStatements = [
    createNamedImport(['Inject', 'Service'], 'typedi'),
    ts.factory.createIdentifier("\n"),
    createNamedImport(['Context', 'DataSource', 'PlainObject'], '../../utils'),
    ts.factory.createIdentifier("\n"),
    createDefaultImport("endpoints", fmt('./{module!kebabCase}.endpoints', { module })),
  ];
  (models.length > 0) && importStatements.push(createNamedImport(sortBy(models), './models'));
  // The service class
  const serviceClass = ts.addSyntheticLeadingComment(
    createServiceClass(module, methods),
    ts.SyntaxKind.MultiLineCommentTrivia,
    createDocComments([
      fmt('The data source service for {module!lowerCase} module.', { module })
    ])
  )

  // create the node array
  const nodeArr = ts.factory.createNodeArray([
    ...importStatements,
    ts.factory.createIdentifier("\n"),
    serviceClass
  ]);

  const filename = fmt('{module!kebabCase}.service.ts', { module });
  return generateProgram(filename, nodeArr);
}

function compileBlueprint(blueprint: IModuleBlueprint) {
  return Object
    .entries(blueprint.methods || {})
    .reduce(
      ({ models, methods }, [method, _]) => {
        const requestModelName = fmt(`{method!pascalCase}RequestModel`, { method });
        const responseModelName = fmt(`{method!pascalCase}ResponseModel`, { method });
        models = models.concat([requestModelName, responseModelName]);
        methods.push(method);
        return { models, methods };
      },
      { models: [] as string[], methods: [] as string[] }
    );
}

/**
 * Create the service class
 * @param module The module name
 */
function createServiceClass(module: string, methods: string[] = []) {
  const className = fmt('{module!pascalCase}Service', { module });
  // the Service decorator
  const serviceDecorator = ts.factory.createDecorator(
    ts.factory.createCallExpression(
      ts.factory.createIdentifier('Service'),
      undefined,
      []
    )
  );
  // the DataSource inheritance
  const heritage = ts.factory.createHeritageClause(
    ts.SyntaxKind.ExtendsKeyword,
    [
      ts.factory.createExpressionWithTypeArguments(
        ts.factory.createIdentifier('DataSource'),
        undefined
      )
    ]
  );
  // _context property
  const contextProperty = ts.addSyntheticLeadingComment(
    createPropertyDeclaration('_context', 'Context', ['Inject']),
    ts.SyntaxKind.MultiLineCommentTrivia,
    createDocComments([
      "The client context"
    ]),
    true
  );
  // context get accessor
  const contextAccessor = ts.factory.createGetAccessorDeclaration(
    undefined,
    undefined,
    ts.factory.createIdentifier('context'),
    [],
    undefined,
    ts.factory.createBlock([
      ts.factory.createReturnStatement(
        ts.factory.createPropertyAccessExpression(
          ts.factory.createThis(),
          ts.factory.createIdentifier("_context")
        )
      )
    ], false)
  );
  // combine everything to the class
  return ts.factory.createClassDeclaration(
    [serviceDecorator],
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(className),
    undefined,
    [heritage],
    [
      contextProperty,
      contextAccessor,
      ...methods.map((method) => (
        ts.addSyntheticLeadingComment(
          createMethod(method),
          ts.SyntaxKind.MultiLineCommentTrivia,
          createDocComments([
            fmt('The {method!lowerCase} method for the {module!lowerCase} module', { method, module }),
            fmt('@param data The payload for {method!lowerCase} request', { method })
          ])
        )
      ))
    ]
  )
}

/**
 * create a request method for service
 * @param method The method name
 */
function createMethod(method: string) {
  // the model names
  const requestModelName = fmt(`{method!pascalCase}RequestModel`, { method });
  const responseModelName = fmt(`{method!pascalCase}ResponseModel`, { method });
  const requestEndpointName = toUpper(snakeCase(method));
  const methodName = camelCase(method);
  // the data parameter
  const dataParameter = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    ts.factory.createIdentifier('data'),
    undefined,
    ts.factory.createTypeReferenceNode(
      ts.factory.createIdentifier('PlainObject'),
      [
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier(requestModelName)
        )
      ]
    )
  );
  // the return type
  const returnType = ts.factory.createTypeReferenceNode(
    ts.factory.createIdentifier('Promise'),
    [
      ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier(responseModelName)
      )
    ]
  );
  // INSIDE THE BLOCK STATEMENT
  // The endpoints variable
  const endpointsVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier('endpoint'),
          undefined,
          undefined,
          ts.factory.createPropertyAccessExpression(
            ts.factory.createIdentifier("endpoints"),
            ts.factory.createIdentifier(requestEndpointName),
          )
        )
      ],
      ts.NodeFlags.Const
    ),
  );
  // the argument to send call
  const sendCallArgument = ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createShorthandPropertyAssignment(
        ts.factory.createIdentifier("data"),
        undefined
      ),
      ts.factory.createShorthandPropertyAssignment(
        ts.factory.createIdentifier("endpoint"),
        undefined
      ),
      ts.factory.createPropertyAssignment(
        ts.factory.createIdentifier("requestClass"),
        ts.factory.createIdentifier(requestModelName)
      ),
      ts.factory.createPropertyAssignment(
        ts.factory.createIdentifier("responseClass"),
        ts.factory.createIdentifier(responseModelName)
      )
    ],
    true
  );
  // the send call
  const sendCall = ts.factory.createCallExpression(
    ts.factory.createPropertyAccessExpression(
      ts.factory.createThis(),
      ts.factory.createIdentifier("send")
    ),
    undefined,
    [sendCallArgument]
  );
  // The method block
  const block = ts.factory.createBlock([
    endpointsVar,
    ts.factory.createReturnStatement(sendCall)
  ], true)
  // the method
  return ts.factory.createMethodDeclaration(
    undefined,
    [ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    ts.factory.createIdentifier(methodName),
    undefined,
    undefined,
    [dataParameter],
    returnType,
    block
  );
}

export default createService;