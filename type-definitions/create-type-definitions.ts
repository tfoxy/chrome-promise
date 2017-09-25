import { readFileSync } from 'fs';
import * as ts from 'typescript';

import { CHROMEP_API_NAME } from './constants';
import { createModifiers } from './helpers';
import { SourceFileParser } from './classes';

const fileName = process.argv[2];
const sourceText = readFileSync(fileName).toString();
const sourceFile = ts.createSourceFile(
  fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS
);

const parser = new SourceFileParser();
parser.parse(sourceFile);
const { chromepMembers, chromepApiStatements } = parser;

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
  [createConstructor()].concat(chromepMembers),
);
// const chromepApiModuleBlock = ts.createModuleBlock(chromepApiStatements);
// const chromepApiNamespace = ts.createModuleDeclaration(
//   undefined, createModifiers(ts.SyntaxKind.DeclareKeyword), CHROMEP_API_NAME, chromepApiModuleBlock, ts.NodeFlags.Namespace
// );
outputFile.statements.push(chromepClass);
// outputFile.statements.push(chromepApiNamespace);
outputFile.statements.push(...chromepApiStatements);

// const printer = ts.createPrinter({
//     newLine: ts.NewLineKind.LineFeed,
// });
// const result = printer.printNode(ts.EmitHint.Unspecified, outputFile, outputFile);

const printer = ts.createPrinter();
const result = printer.printFile(outputFile);

// console.log(result.slice(0, 10000));
console.log(result);


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
