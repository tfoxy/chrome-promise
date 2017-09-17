import { readFileSync } from 'fs';
import * as ts from 'typescript';

const CHROME_IDENTIFIER = ts.createIdentifier('chrome');
const CHROMEP_API_NAME = ts.createIdentifier('chromepApi');

const fileName = process.argv[2];
const sourceText = readFileSync(fileName).toString();
const sourceFile = ts.createSourceFile(
  fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS
);

const { chromepInterfaceMembers, chromepApiStatements } = iterateSourceFileStatements(sourceFile);

const outputHeader = `\
// Type definitions for chrome-promise
// Project: https://github.com/tfoxy/chrome-promise
// Definitions by: Tomás Fox <https://github.com/tfoxy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="filesystem" />
/// <reference types="chrome" />
`;
const outputFile = ts.createSourceFile(
  fileName, outputHeader, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS
);

const chromepClass = ts.createClassDeclaration(
  undefined,
  createModifiers(ts.SyntaxKind.ExportKeyword, ts.SyntaxKind.DefaultKeyword),
  'ChromePromise',
  undefined,
  [],
  [createConstructor()].concat(chromepInterfaceMembers),
);
const chromepApiModuleBlock = ts.createModuleBlock(chromepApiStatements);
const chromepApiNamespace = ts.createModuleDeclaration(
  undefined, createModifiers(ts.SyntaxKind.DeclareKeyword), CHROMEP_API_NAME, chromepApiModuleBlock, ts.NodeFlags.Namespace
);
outputFile.statements.push(chromepClass);
outputFile.statements.push(chromepApiNamespace);

// const printer = ts.createPrinter({
//     newLine: ts.NewLineKind.LineFeed,
// });
// const result = printer.printNode(ts.EmitHint.Unspecified, outputFile, outputFile);

const printer = ts.createPrinter();
const result = printer.printFile(outputFile);

// console.log(result.slice(0, 10000));
console.log(result);

// functions:

function iterateSourceFileStatements(sourceFile: ts.SourceFile) {
  const chromepInterfaceMembers: any[] = [];
  const chromepApiStatements: ts.Statement[] = [];
  sourceFile.statements.forEach((node: ts.Statement) => {
    if (node.kind === ts.SyntaxKind.ModuleDeclaration && node.flags === ts.NodeFlags.Namespace) {
      const mNode = node as ts.ModuleDeclaration;
      if (mNode.name.getText() !== 'chrome') return;
      const bodyNode = mNode.body as ts.ModuleDeclaration;
      if (!bodyNode.body) return;
      if (bodyNode.body.kind === ts.SyntaxKind.ModuleDeclaration) {
        // TODO handle types for nested namespaces (devtools, enterprise, input, networking, system)
        return;
      }
      const moduleBlock = bodyNode.body as ts.ModuleBlock;
      const apiName = bodyNode.name.getText();
      const interfaceName = `${apiName[0].toUpperCase()}${apiName.slice(1)}`;
      const apiTypes: Set<string> = new Set();
      const chromepApiInterfaceMembers: any[] = [];
      moduleBlock.statements.forEach((node: ts.Statement) => {
        if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
          const fn = node as ts.FunctionDeclaration;
          const lastParam = fn.parameters[fn.parameters.length - 1];
          if (lastParam && lastParam.name.getText() === 'callback') {
            const lastParamType = lastParam.type as ts.FunctionTypeNode;
            const promiseArgs: ts.TypeNode[] = [];
            const typeParams = lastParamType.parameters;
            if (typeParams && typeParams.length > 0) {
              if (typeParams.length > 1) {
                const promiseType = ts.createTupleTypeNode(
                  typeParams.map((p) => getTypeNode(p.type as ts.TypeNode, apiName, apiTypes)),
                );
                promiseArgs.push(promiseType);
              } else {
                let promiseType = typeParams[0].type;
                if (promiseType) {
                  promiseType = getTypeNode(promiseType, apiName, apiTypes);
                  promiseArgs.push(promiseType);
                }
              }
            } else {
              promiseArgs.push(ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword));
            }
            const fnType = ts.createTypeReferenceNode('Promise', promiseArgs);
            const params = fn.parameters.map((p) => {
              let pType = p.type;
              if (pType) pType = getTypeNode(pType, apiName, apiTypes);
              return ts.createParameter(
                p.decorators,
                p.modifiers,
                p.dotDotDotToken,
                p.name.getText(),
                p.questionToken,
                pType,
                p.initializer,
              )
            });
            params.pop();
            const fnName = fn.name ? fn.name.getText() : '';
            const method = ts.createMethodSignature(fn.typeParameters, params, fnType, fnName, fn.questionToken);
            const jsDoc: ts.JSDoc[] = (<any>fn).jsDoc;
            if (jsDoc && jsDoc.length > 0) {
              const comment = jsDoc[0].getText().slice(2, -2);
              ts.addSyntheticLeadingComment(method, ts.SyntaxKind.MultiLineCommentTrivia, comment, true);
            }
            chromepApiInterfaceMembers.push(method);
          }
        } else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
          apiTypes.add((node as ts.InterfaceDeclaration).name.getText());
        }
      });
      const chromepApiInterface = createInterfaceDeclaration(
        undefined, createModifiers(ts.SyntaxKind.ExportKeyword), interfaceName, undefined, [], chromepApiInterfaceMembers
      );
      const jsDoc: ts.JSDoc[] = (<any>mNode).jsDoc;
      if (jsDoc && jsDoc.length > 0) {
        const comment = jsDoc[0].getText().slice(2, -2);
        ts.addSyntheticLeadingComment(chromepApiInterface, ts.SyntaxKind.MultiLineCommentTrivia, comment, true);
      }
      chromepApiStatements.push(chromepApiInterface);
      chromepInterfaceMembers.push(ts.createPropertySignature(
        undefined, apiName, undefined, ts.createTypeReferenceNode(ts.createQualifiedName(CHROMEP_API_NAME, interfaceName), undefined), undefined
      ));
    }
  });
  return {
    chromepInterfaceMembers,
    chromepApiStatements,
  };
}

function createInterfaceDeclaration(decorators: ts.Decorator[] | undefined, modifiers: ts.Modifier[] | undefined, name: string | ts.Identifier | undefined, typeParameters: ts.TypeParameterDeclaration[] | undefined, heritageClauses: ts.HeritageClause[], members: ts.ClassElement[]): ts.InterfaceDeclaration {
  const node = ts.createClassDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members) as any;
  node.kind = ts.SyntaxKind.InterfaceDeclaration;
  return node;
}

function createModifiers(...kinds: ts.SyntaxKind[]) {
  return ts.createNodeArray(kinds.map(k => ts.createNode(k))) as ts.Modifier[];
}

function printNode(node: ts.Node) {
  const resultFile = ts.createSourceFile("someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });
  return printer.printNode(ts.EmitHint.Unspecified, node, resultFile);
}

function getTypeNode(type: ts.TypeNode, apiName: string, apiTypes: Set<string>) {
  if (type.kind === ts.SyntaxKind.TypeReference) {
    const promiseTypeRef = type as ts.TypeReferenceNode;
    const val = promiseTypeRef.getText();
    if (apiTypes.has(val)) {
      promiseTypeRef.typeName = ts.createQualifiedName(ts.createQualifiedName(CHROME_IDENTIFIER, apiName), val);
    } else {
      promiseTypeRef.typeName = ts.createIdentifier(val);
    }
  } else if (type.kind === ts.SyntaxKind.UnionType) {
    const types = (type as ts.UnionTypeNode).types;
    types.forEach((t) => getTypeNode(t, apiName, apiTypes));
  } else if (type.kind === ts.SyntaxKind.ArrayType) {
    const elementType = (type as ts.ArrayTypeNode).elementType as ts.TypeReferenceNode;
    getTypeNode(elementType, apiName, apiTypes);
  } else if (type.kind === ts.SyntaxKind.TupleType) {
    const types = (type as ts.TupleTypeNode).elementTypes;
    types.forEach(t => getTypeNode(t, apiName, apiTypes));
  }
  return type;
}

function createConstructor() {
  const optionsType = ts.createTypeLiteralNode([
    ts.createPropertySignature(undefined, 'chrome', createQuestionToken(), ts.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword), undefined),
    ts.createPropertySignature(undefined, 'Promise', createQuestionToken(), ts.createLiteralTypeNode(ts.createIdentifier('Function')), undefined),
  ]);
  return ts.createConstructor(
    undefined,
    undefined,
    [ts.createParameter(undefined, undefined, undefined, 'options', createQuestionToken(), optionsType, undefined)],
    undefined,
  );
}

function createQuestionToken() {
  return ts.createToken(ts.SyntaxKind.QuestionToken);
}
