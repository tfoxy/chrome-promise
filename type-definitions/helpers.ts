import * as ts from 'typescript';

export function copyComment(sourceNode: ts.Node, targetNode: any) {
  const jsDoc: ts.JSDoc[] = (<any>sourceNode).jsDoc;
  if (jsDoc && jsDoc.length > 0) {
    const comment = jsDoc[0].getText().slice(2, -2);
    ts.addSyntheticLeadingComment(targetNode, ts.SyntaxKind.MultiLineCommentTrivia, comment, true);
  }
}

export function createInterfaceDeclaration(decorators: ts.Decorator[] | undefined, modifiers: ts.Modifier[] | undefined, name: string | ts.Identifier | undefined, typeParameters: ts.TypeParameterDeclaration[] | undefined, heritageClauses: ts.HeritageClause[], members: ts.ClassElement[]): ts.InterfaceDeclaration {
  const node = ts.createClassDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members) as any;
  node.kind = ts.SyntaxKind.InterfaceDeclaration;
  return node;
}

export function createModifiers(...kinds: ts.SyntaxKind[]) {
  return ts.createNodeArray(kinds.map(k => ts.createNode(k))) as ts.Modifier[];
}

export function printNode(node: ts.Node) {
  const resultFile = ts.createSourceFile("someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });
  return printer.printNode(ts.EmitHint.Unspecified, node, resultFile);
}
