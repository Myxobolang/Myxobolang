import type { Token, TokenType } from '../../lexer/myxobolang';
import { syntaxNode } from '../../util';
import type { SyntaxNode } from '../common';

export enum NodeType {
    MYXOBOLANG,
    TOKENS,
    NAMESPACE,
    TOKEN,
}

type BaseNode = SyntaxNode<Node, NodeType, TokenType, Token>;

@syntaxNode('Myxobolang', NodeType.MYXOBOLANG)
export class MyxobolangNode implements BaseNode {
    type: NodeType.MYXOBOLANG = NodeType.MYXOBOLANG;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as Node).origin;
        this.children.push(...this.flatTokens(args[0] as TokensNode));
    }
    private flatTokens(node: TokensNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatTokens(node.children[1] as TokensNode)];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Myxobolang', NodeType.TOKENS)
export class TokensNode implements BaseNode {
    type: NodeType.TOKENS = NodeType.TOKENS;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as Node).origin;
        this.children.push(args[0] as Node);
        if (args.length == 2) {
            this.children.push(args[1] as Node);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Myxobolang', NodeType.NAMESPACE)
export class NamespaceNode implements BaseNode {
    type: NodeType.NAMESPACE = NodeType.NAMESPACE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        for (let i = 0; i < 4; i++) {
            this.children.push(args[i] as TokenNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Myxobolang', NodeType.TOKEN)
export class TokenNode implements BaseNode {
    type: NodeType.TOKEN = NodeType.TOKEN;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

export type Node = MyxobolangNode | TokensNode | NamespaceNode | TokenNode;
