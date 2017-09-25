import * as ts from 'typescript';

import { CHROME_IDENTIFIER, CHROMEP_API_NAME } from './constants';
import {
  copyComment,
  createInterfaceDeclaration,
  createModifiers,
} from './helpers';


export class InterfaceNodeParser {
  interfaces: any[];
  members: any[];
  interfaceNames: Set<string>;

  constructor(public apiName: string, public apiTypes: Map<string, ts.InterfaceDeclaration>) {
    this.interfaces = [];
    this.members = [];
    this.interfaceNames = new Set();
  }

  handleNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
      this.handleFunctionDeclaration(node as ts.FunctionDeclaration);
    } else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      this.handleInterfaceDeclaration(node as ts.InterfaceDeclaration);
    } else if (node.kind === ts.SyntaxKind.VariableStatement) {
      this.handleVariableStatement(node as ts.VariableStatement);
    } else if (node.kind === ts.SyntaxKind.MethodSignature) {
      this.handleFunctionDeclaration(node as ts.MethodSignature);
    }
  }

  handleFunctionDeclaration(fn: ts.FunctionDeclaration | ts.MethodSignature) {
    const lastParam = fn.parameters[fn.parameters.length - 1];
    if (lastParam && lastParam.name.getText() === 'callback') {
      const lastParamType = lastParam.type as ts.FunctionTypeNode;
      const promiseArgs: ts.TypeNode[] = [];
      const typeParams = lastParamType.parameters;
      if (typeParams && typeParams.length > 0) {
        if (typeParams.length > 1) {
          const promiseType = ts.createTupleTypeNode(
            typeParams.map((p) => this.getTypeNode(p.type as ts.TypeNode)),
          );
          promiseArgs.push(promiseType);
        } else {
          let promiseType = typeParams[0].type;
          if (promiseType) {
            promiseType = this.getTypeNode(promiseType);
            promiseArgs.push(promiseType);
          }
        }
      } else {
        promiseArgs.push(ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword));
      }
      const fnType = ts.createTypeReferenceNode('Promise', promiseArgs);
      const params = fn.parameters.map((p) => {
        let pType = p.type;
        if (pType) pType = this.getTypeNode(pType);
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
      copyComment(fn, method);
      this.members.push(method);
    }
  }

  handleInterfaceDeclaration(declaration: ts.InterfaceDeclaration) {
    this.apiTypes.set(declaration.name.getText(), declaration);
  }

  handleVariableStatement(statement: ts.VariableStatement) {
    const declaration = statement.declarationList.declarations[0];
    if (!declaration.type || declaration.type.kind !== ts.SyntaxKind.TypeReference) return;
    const typeName = (declaration.type as ts.TypeReferenceNode).typeName.getText();
    const interfaceDeclaration = this.apiTypes.get(typeName);
    if (!interfaceDeclaration) return;
    const newMember = ts.createPropertySignature(
      undefined,
      declaration.name.getText(),
      undefined,
      ts.createLiteralTypeNode(ts.createIdentifier(typeName)),
      undefined,
    );
    this.members.push(newMember);
    if (this.interfaceNames.has(typeName)) return;
    // const apiName = `${this.apiName}.${interfaceDeclaration.name.getText()}`;
    const nodeParser = new InterfaceNodeParser(this.apiName, this.apiTypes);
    interfaceDeclaration.members.forEach((node: ts.TypeElement) => {
      nodeParser.handleNode(node);
    });
    const heritageClauses: ts.HeritageClause[] = interfaceDeclaration.heritageClauses || [];
    const newHeritageClauses = heritageClauses.map((hc) => {
      return ts.createHeritageClause(hc.token, hc.types.map((type) => {
        return ts.createExpressionWithTypeArguments(
          type.typeArguments ? type.typeArguments.map(n => this.getTypeNode(n)) : [],
          ts.createIdentifier(type.expression.getText()),
        );
      }));
    });
    debugger;
    const newInterfaceDeclaration = createInterfaceDeclaration(
      interfaceDeclaration.decorators,
      interfaceDeclaration.modifiers,
      typeName,
      interfaceDeclaration.typeParameters,
      newHeritageClauses,
      nodeParser.interfaces.concat(nodeParser.members),
    )
    this.interfaces.push(newInterfaceDeclaration);
    this.interfaceNames.add(typeName);
  }

  getTypeNode(type: ts.TypeNode): ts.TypeNode {
    if (type.kind === ts.SyntaxKind.TypeReference) {
      const ref = type as ts.TypeReferenceNode;
      const val = ref.getText();
      let typeName;
      if (this.apiTypes.has(val)) {
        typeName = ts.createQualifiedName(ts.createQualifiedName(CHROME_IDENTIFIER, this.apiName), val);
      } else {
        typeName = ts.createIdentifier(val);
      }
      return ts.createTypeReferenceNode(typeName, ref.typeArguments);
    } else if (type.kind === ts.SyntaxKind.UnionType) {
      const types = (type as ts.UnionTypeNode).types;
      const newTypes = types.map((t) => this.getTypeNode(t));
      return ts.createUnionTypeNode(newTypes);
    } else if (type.kind === ts.SyntaxKind.ArrayType) {
      const elementType = (type as ts.ArrayTypeNode).elementType as ts.TypeReferenceNode;
      const newElementType = this.getTypeNode(elementType);
      return ts.createArrayTypeNode(newElementType);
    } else if (type.kind === ts.SyntaxKind.TupleType) {
      const types = (type as ts.TupleTypeNode).elementTypes;
      const newTypes = types.map(t => this.getTypeNode(t));
      return ts.createTupleTypeNode(newTypes);
    } else if (type.kind === ts.SyntaxKind.TypeLiteral) {
      const typeLiteral = type as ts.TypeLiteralNode;
      const members = typeLiteral.members;
      const newMembers = members.map(m => {
        if (m.kind === ts.SyntaxKind.IndexSignature) {
          const signature = m as ts.IndexSignatureDeclaration;
          const params = signature.parameters.map(this.getParameter, this);
          const sigType = this.getTypeNode(signature.type as ts.TypeNode);
          return ts.createIndexSignature(
            signature.decorators,
            signature.modifiers,
            params,
            sigType,
          );
        } else {
          return m;
        }
      });
      return ts.createTypeLiteralNode(ts.createNodeArray(newMembers));
    } else if (type.kind === ts.SyntaxKind.FunctionType) {
      const ft = type as ts.FunctionTypeNode;
      return ts.createFunctionTypeNode(
        ft.typeParameters,
        ft.parameters.map(this.getParameter, this),
        ft.type && this.getTypeNode(ft.type),
      )
    }
    return type;
  }

  getParameter(p: ts.ParameterDeclaration) {
    return ts.createParameter(
      p.decorators,
      p.modifiers,
      p.dotDotDotToken,
      p.name.getText(),
      p.questionToken,
      p.type && this.getTypeNode(p.type),
      p.initializer,
    );
  }
}


export class ApiParser {
  apiNamespace: ts.ModuleDeclaration;
  chromepMember: ts.PropertySignature;

  parse(moduleDeclaration: ts.ModuleDeclaration) {
    const apiName: string = moduleDeclaration.name.getText();
    const interfaceName = `${apiName[0].toUpperCase()}${apiName.slice(1)}`;
    const apiTypes: Map<string, ts.InterfaceDeclaration> = new Map();
    const nodeParser = new InterfaceNodeParser(apiName, apiTypes);
    const moduleBlock = moduleDeclaration.body as ts.ModuleBlock;
    moduleBlock.statements.forEach((node: ts.Statement) => {
      nodeParser.handleNode(node);
    });
    const apiInterface = createInterfaceDeclaration(
      undefined,
      createModifiers(ts.SyntaxKind.ExportKeyword),
      interfaceName,
      undefined,
      [],
      nodeParser.members,
    );
    copyComment(moduleDeclaration, apiInterface);
    const newModuleBlock = ts.createModuleBlock(
      nodeParser.interfaces.concat(apiInterface),
    );
    const innerApiNamespace = ts.createModuleDeclaration(
      undefined,
      undefined,
      ts.createIdentifier(apiName),
      newModuleBlock,
      ts.NodeFlags.Namespace + ts.NodeFlags.NestedNamespace,
    ) as ts.NamespaceDeclaration;
    this.apiNamespace = ts.createModuleDeclaration(
      undefined,
      [ts.createToken(ts.SyntaxKind.DeclareKeyword)],
      CHROMEP_API_NAME,
      innerApiNamespace,
      ts.NodeFlags.Namespace,
    );
    this.chromepMember = ts.createPropertySignature(
      undefined,
      apiName,
      undefined,
      ts.createTypeReferenceNode(ts.createQualifiedName(ts.createQualifiedName(CHROMEP_API_NAME, apiName), interfaceName), undefined),
      undefined,
    )
  }
}


export class SourceFileParser {
  chromepMembers: any[] = [];
  chromepApiStatements: ts.Statement[] = [];

  parse(sourceFile: ts.SourceFile) {
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
        this.handleModuleDeclaration(bodyNode);
      }
    });
  }

  handleModuleDeclaration(moduleDeclaration: ts.ModuleDeclaration) {
    const parser = new ApiParser();
    parser.parse(moduleDeclaration);
    this.chromepApiStatements.push(parser.apiNamespace);
    this.chromepMembers.push(parser.chromepMember);
  }
}
