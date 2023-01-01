import type { Token } from '../../lexer/common';
import { TokenType } from '../../lexer/dicauda';
import type { SyntaxNode, SyntaxTree as CommonTree } from '../../parser/common';
import { NodeType, SyntaxTree } from '../../parser/dicauda';
import type { Node, NodeTokenNode } from '../../parser/dicauda/SyntaxNode';
import { getSyntaxNode, getSyntaxTree, getToken } from '../../util';
import type { Compiler as BaseCompiler } from '../common';

class NodeStack {
    private index = 1;
    constructor(public nodes: Node[]) {}
    pop() {
        return this.nodes[this.index++];
    }
}

export class Compiler implements BaseCompiler<SyntaxTree, CommonTree<any>> {
    compile(ast: SyntaxTree) {
        const root = ast.root;
        const langNode = root.children[0];
        if (root.type != NodeType.DICAUDA || langNode.type != NodeType.LANG) {
            throw new Error('Unknown error');
        }

        if (langNode.children[5].origin.type != TokenType.STR) {
            throw new Error('Unknown error');
        }

        const language = langNode.children[5].origin.value;

        const stack = new NodeStack(root.children);
        const rootNode = stack.pop();

        const outRoot = this.genNodeFrom(rootNode, stack, language);

        const tree = { language: language, root: outRoot } as any;

        Reflect.setPrototypeOf(tree, getSyntaxTree(language).prototype);

        return tree;
    }
    genNodeFrom(node: Node, stack: NodeStack, language: string) {
        if (node.type != NodeType.NODE) {
            throw new Error('Unknown error');
        }

        const nodeNode = node.children[0];
        const nodeToken = node.children[1];

        if (nodeNode.type != NodeType.NODE_NODE || nodeToken.type != NodeType.NODE_TOKEN) {
            throw new Error('Unknown error');
        }

        const childrenLengthToken = nodeNode.children[4].origin;
        const typeToken = nodeNode.children[5].origin;
        if (childrenLengthToken.type != TokenType.STR || typeToken.type != TokenType.STR) {
            throw new Error('Unknown error');
        }

        const dicaudaBody: string[] = [];

        for (let i = 6; i < nodeNode.children.length - 1; i++) {
            const bodyToken = nodeNode.children[i].origin;
            if (bodyToken.type != TokenType.STR) {
                throw new Error('Unknown error');
            }

            dicaudaBody.push(bodyToken.value);
        }

        const childrenLength = parseInt(childrenLengthToken.value);
        const nodeType = parseInt(typeToken.value);

        const nodeOrigin = this.genToken(nodeToken, language);

        const out = { type: nodeType, origin: nodeOrigin, children: [] as any[] } as SyntaxNode<any>;

        for (let i = 0; i < childrenLength; i++) {
            const tempNode = stack.pop();
            const tempOut = this.genNodeFrom(tempNode, stack, language);
            out.children.push(tempOut);
        }

        Reflect.setPrototypeOf(out, getSyntaxNode(language, nodeType).prototype);

        out.fromDicaudaBody(dicaudaBody);
        return out;
    }
    genToken(nodeToken: NodeTokenNode, language: string) {
        const rowToken = nodeToken.children[4].origin;
        const colToken = nodeToken.children[5].origin;
        const typeToken = nodeToken.children[6].origin;

        if (rowToken.type != TokenType.STR || colToken.type != TokenType.STR || typeToken.type != TokenType.STR) {
            throw new Error('Unknown error');
        }

        const row = parseInt(rowToken.value);
        const col = parseInt(colToken.value);
        const type = parseInt(typeToken.value);

        const token = { type: type, row: row, col: col } as Token;
        Reflect.setPrototypeOf(token, getToken(language, type).prototype);

        const kudoaBody: string[] = [];

        for (let i = 7; i < nodeToken.children.length - 1; i++) {
            const bodyToken = nodeToken.children[i].origin;
            if (bodyToken.type != TokenType.STR) {
                throw new Error('Unknown error');
            }
            kudoaBody.push(bodyToken.value);
        }

        token.fromKudoa(kudoaBody);
        return token;
    }
}
