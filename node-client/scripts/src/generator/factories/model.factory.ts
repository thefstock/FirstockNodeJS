import { sortBy } from 'lodash';
import * as ts from 'typescript';
// import { snakeCase, toUpper, camelCase, sortBy } from 'lodash';
import {
  createNamedImport,
  createFormatter,
  generateProgram,
  createDocComments,
} from '../utils';

import { IMethodSpec, IModelSpec } from '../interfaces';


const fmt = createFormatter();

/**
 * Create request and response models fro a method
 * @param method The method name
 */
function createModels(method: string, spec: IMethodSpec) {
  const requestModelName = fmt(`{method!pascalCase}RequestModel`, { method });
  const responseModelName = fmt(`{method!pascalCase}ResponseModel`, { method });

  // store state of used field decorators
  const usedDecorators = new Set<string>();

  // the models
  const requestModel = ts.addSyntheticLeadingComment(
    createModel(requestModelName, spec.payload ?? {}, usedDecorators),
    ts.SyntaxKind.MultiLineCommentTrivia,
    createDocComments([
      fmt('The request model for {method!lowerCase}', { method })
    ]),
    true
  );
  const responseModel = ts.addSyntheticLeadingComment(
    createModel(responseModelName, spec.response ?? {}, usedDecorators),
    ts.SyntaxKind.MultiLineCommentTrivia,
    createDocComments([
      fmt('The response model for {method!lowerCase}', { method })
    ]),
    true
  );

  // the import statement
  const importStatements = [
    createNamedImport(['IsOptional'], 'class-validator'),
    ts.factory.createIdentifier("\n"),
    createNamedImport(sortBy(Array.from(usedDecorators)), '../../../common'),
  ];

  const nodeArr = ts.factory.createNodeArray([
    ts.factory.createJSDocComment(
      fmt('@module\nThe request and response models for {method:lowerCase}\n', { method })
    ),
    ...importStatements,
    ts.factory.createIdentifier("\n"),
    requestModel,
    ts.factory.createIdentifier("\n"),
    responseModel
  ]);

  const filename = fmt('{method!kebabCase}.model.ts', { method });
  return generateProgram(filename, nodeArr);
}

/**
 * Create a model
 * @param name the name of the model
 */
function createModel(name: string, fields: Record<string, IModelSpec> = {}, usedDecorators: Set<string> = new Set()) {
  // generate each field
  const members = Object
    .entries(fields)
    .map(([name, spec]) => {
      return createFieldProperty(name, spec, usedDecorators);
    });
  // create the class
  return ts.factory.createClassDeclaration(
    undefined,
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(name),
    undefined,
    undefined,
    members
  )
}

/**
 * Create the field property for model
 * @param name The name of the property
 * @param spec The field spec
 */
function createFieldProperty(name: string, spec: IModelSpec, usedDecorators: Set<string>) {
  const primitiveMap = {
    "string": "StringField",
    "number": "NumberField",
    "bool": "BoolField"
  };
  // start matching
  const decorators = [];
  // decorator for the types
  const type = getFieldType(spec.type);
  if (type === "enum") {
    usedDecorators.add('EnumField');
    usedDecorators.add(spec.type);
    decorators.push(
      ts.factory.createDecorator(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('EnumField'),
          null,
          [
            ts.factory.createIdentifier(spec.type)
          ]
        )
      )
    )
  }
  else if (type in primitiveMap) {
    const fieldType = primitiveMap[type];
    usedDecorators.add(fieldType);
    decorators.push(
      ts.factory.createDecorator(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier(fieldType),
          null,
          [
            ts.factory.createObjectLiteralExpression([
              ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier("isArray"),
                spec.isArray ? ts.factory.createTrue() : ts.factory.createFalse()
              )
            ])
          ]
        )
      )
    )
  }
  else if (type === "date" || type === "datetime") {
    usedDecorators.add('DateField');
    decorators.push(
      ts.factory.createDecorator(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('DateField'),
          null,
          type === "datetime" ? [ts.factory.createStringLiteral("DD-MM-YYYY hh:mm:ss")] : []
        )
      )
    )
  }
  else {
    usedDecorators.add('Nested');
    decorators.push(
      ts.factory.createDecorator(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('Nested'),
          null,
          [
            ts.factory.createIdentifier(spec.type),
            ts.factory.createObjectLiteralExpression([
              ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier("isArray"),
                spec.isArray ? ts.factory.createTrue() : ts.factory.createFalse()
              )
            ])
          ]
        )
      )
    )
  }
  // add optional flag if specified
  if (spec.isOptional) {
    decorators.push(
      ts.factory.createDecorator(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('IsOptional'),
          undefined,
          []
        )
      )
    );
  }
  // create property
  const property = ts.factory.createPropertyDeclaration(
    decorators,
    undefined,
    ts.factory.createIdentifier(name),
    spec.isOptional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
    getTypeSymbol(type, spec),
    undefined
  );
  // add the description as doc comment and return 
  return ts.addSyntheticLeadingComment(
    property,
    ts.SyntaxKind.MultiLineCommentTrivia,
    createDocComments([spec.description ?? fmt('The {name!lowerCase} property', { name })])
  )
}

type FieldTypeGroup = "enum" | "string" | "number" | "bool" | "date" | "datetime" | "custom";

function getTypeSymbol(type: FieldTypeGroup, spec: IModelSpec) {
  let typeNode: ts.TypeNode;
  if (type === "enum" || type === "custom") {
    typeNode = ts.factory.createTypeReferenceNode(
      ts.factory.createIdentifier(spec.type)
    );
  } else if (type === "date" || type === "datetime") {
    typeNode = ts.factory.createTypeReferenceNode(
      ts.factory.createIdentifier('Date')
    );
  } else {
    const symbolMap: Record<"string" | "number" | "bool", ts.KeywordTypeSyntaxKind> = {
      "string": ts.SyntaxKind.StringKeyword,
      "number": ts.SyntaxKind.NumberKeyword,
      "bool": ts.SyntaxKind.BooleanKeyword
    };
    typeNode = ts.factory.createKeywordTypeNode(symbolMap[type])
  }
  if (spec.isArray) {
    return ts.factory.createArrayTypeNode(typeNode);
  }
  return typeNode;
}

/**
 * Get proper field type from the matching spec
 * @param type The passed type
 */
function getFieldType(type: string): FieldTypeGroup {
  // if type is in this list, it will be a enum field
  const ENUM_FIELDS = [
    "RequestSourceType",
    "ResponseStatus",
    "PriceType",
    "TransactionType",
    "RetentionType",
    "AlertValidity",
    "AlertType"
  ];
  // patterns to match some primitive types
  const stringTypePattern = /^str(ing)?$/i;
  const numberTypePattern = /^(number|float|int|double|decimal)$/i;
  const boolTypePattern = /^bool(ean)?$/i;
  const dateTypePattern = /^date$/i;
  const dateTimeTypePattern = /^date(-)?time$/i;

  if (ENUM_FIELDS.includes(type)) {
    return "enum";
  }
  else if (boolTypePattern.test(type)) {
    return "bool";
  }
  else if (numberTypePattern.test(type)) {
    return "number";
  }
  else if (stringTypePattern.test(type)) {
    return "string";
  }
  else if (dateTypePattern.test(type)) {
    return "date";
  }
  else if (dateTimeTypePattern.test(type)) {
    return "datetime";
  }
  else {
    return "custom";
  }
}

export default createModels;