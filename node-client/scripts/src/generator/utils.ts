import { kebabCase, lowerCase, upperCase, camelCase, upperFirst } from 'lodash';
import format from 'string-format';
import * as ts from 'typescript';

const { factory } = ts;

/**
 * enable the string formatter
 */
export function createFormatter() {
  return format.create({
    kebabCase,
    lowerCase,
    upperCase,
    pascalCase: (s) => upperFirst(camelCase(s))
  });
}

/* -------------------------------------------------------------------------- */
/*                                FACTORY UTILS                               */
/* -------------------------------------------------------------------------- */
/**
 * Create a named import declaration
 * @param identifiers The identifier names
 */
export function createNamedImport(identifiers: string[], module: string) {
  const namedImports = factory.createNamedImports(
    identifiers.map(id => factory.createImportSpecifier(
      undefined,
      factory.createIdentifier(id)
    ))
  );
  const importClause = factory.createImportClause(false, undefined, namedImports);
  const specifier = factory.createStringLiteral(module, true);
  return factory.createImportDeclaration(
    undefined,
    undefined,
    importClause,
    specifier
  );
}

/**
 * Create a default import declaration
 * @param identifier The identifier name
 * @param module The module name
 */
export function createDefaultImport(identifier: string, module: string) {
  const id = factory.createIdentifier(identifier);
  const importClause = factory.createImportClause(false, id, undefined);
  const specifier = factory.createStringLiteral(module, true);
  return factory.createImportDeclaration(
    undefined,
    undefined,
    importClause,
    specifier
  );
}

/**
 * Generate typescript program from nodes.
 * @param filename The name of the file.
 * @param nodes The nodes in the program to generate
 */
export function generateProgram(filename: string, nodes: ts.NodeArray<ts.Node>) {
  const resultFile = ts.createSourceFile(
    filename, "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printList(ts.ListFormat.MultiLine, nodes, resultFile);
  return result;
}

/**
 * Create a new property
 * @param propertyName The name of the property
 * @param type The type reference
 * @param decorators decorators if any
 * @param modifiers modifiers if any
 */
export function createPropertyDeclaration(
  propertyName: string, type: string, decorators?: string[], modifiers?: ts.Modifier[]
) {
  // decorators
  const decoratorNodes = decorators && decorators.map(decorator => (
    factory.createDecorator(factory.createCallExpression(
      factory.createIdentifier(decorator),
      undefined,
      []
    ))
  ));

  return factory.createPropertyDeclaration(
    decoratorNodes,
    modifiers,
    factory.createIdentifier(propertyName),
    undefined,
    factory.createTypeReferenceNode(
      factory.createIdentifier(type),
      undefined
    ),
    undefined
  )
}

/**
 * convert comment list to multiline doc comment.
 */
export function createDocComments(comments: string[]) {
  const lines = comments.map(comment => ` * ${comment}\n`).join('')
  return `*\n${lines}`;
}

/**
 * create the index.ts file export statements for all other files in the module
 */
export function createIndexExports(filenames: string[]) {
  const createExport = (filename: string) => (
    factory.createExportDeclaration(
      undefined,
      undefined,
      false,
      undefined,
      factory.createStringLiteral(`./${filename}`)
    )
  );
  return generateProgram(
    "index.ts",
    factory.createNodeArray(filenames.map(createExport))
  );
}