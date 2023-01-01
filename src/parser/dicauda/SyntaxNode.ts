import type { SyntaxNode } from '../common';
import type { TokenType, Token } from '../../lexer/dicauda';
import { syntaxNode } from '../../util';

export enum NodeType {
    DICAUDA,
    LANG,
    NODES,
    NODE,
    NODE_NODE,
    NODE_BODIES,
    NODE_BODY,
    NODE_TOKEN,
    TOKEN_BODIES,
    TOKEN_BODY,
    BASE_TOKEN,
}

type BaseNode = SyntaxNode<Node, NodeType, TokenType, Token>;

@syntaxNode('Dicauda', NodeType.DICAUDA)
export class DicaudaNode implements BaseNode {
    type: NodeType.DICAUDA = NodeType.DICAUDA;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as LangNode).origin;
        this.children.push(args[0] as LangNode);
        this.children.push(...this.flatNodes(args[1] as NodesNode));
    }
    origin: Token;
    children: Node[] = [];
    private flatNodes(node: NodesNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatNodes(node.children[1] as NodesNode)];
        }
    }
    get dicaudaBody(): string[] {
        throw new Error('Method not implemented.');
    }
    fromDicaudaBody(dicaudaBody: string[]): void {
        throw new Error('Method not implemented.');
    }
}

@syntaxNode('Dicauda', NodeType.LANG)
export class LangNode implements BaseNode {
    type: NodeType.LANG = NodeType.LANG;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[2] as BaseTokenNode).origin;
        for (let i = 0; i < 8; i++) {
            this.children.push(args[i] as BaseTokenNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.NODES)
export class NodesNode implements BaseNode {
    type: NodeType.NODES = NodeType.NODES;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as NodeNode).origin;
        this.children.push(args[0] as NodeNode);
        if (args.length == 2) {
            this.children.push(args[1] as NodeNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        throw new Error('Method not implemented.');
    }
    fromDicaudaBody(dicaudaBody: string[]): void {
        throw new Error('Method not implemented.');
    }
}

@syntaxNode('Dicauda', NodeType.NODE)
export class NodeNode implements BaseNode {
    type: NodeType.NODE = NodeType.NODE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as NodeNodeNode).origin;
        this.children.push(args[0] as NodeNodeNode);
        this.children.push(args[1] as NodeTokenNode);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.NODE_NODE)
export class NodeNodeNode implements BaseNode {
    type: NodeType.NODE_NODE = NodeType.NODE_NODE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[2] as BaseTokenNode).origin;
        this.children.push(args[0] as BaseTokenNode);
        this.children.push(args[1] as BaseTokenNode);
        this.children.push(args[2] as BaseTokenNode);
        this.children.push(args[3] as BaseTokenNode);
        this.children.push(...this.flatBody(args[4] as NodeBodiesNode));
        this.children.push(args[5] as BaseTokenNode);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    private flatBody(node: NodeBodiesNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatBody(node.children[1] as NodeBodiesNode)];
        }
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.NODE_BODIES)
export class NodeBodiesNode implements BaseNode {
    type: NodeType.NODE_BODIES = NodeType.NODE_BODIES;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenBodyNode).origin;
        this.children.push(args[0] as TokenBodyNode);
        if (args.length == 2) {
            this.children.push(args[1] as TokenBodyNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.NODE_BODY)
export class NodeBodyNode implements BaseNode {
    type: NodeType.NODE_BODY = NodeType.NODE_BODY;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[1] as BaseTokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.NODE_TOKEN)
export class NodeTokenNode implements BaseNode {
    type: NodeType.NODE_TOKEN = NodeType.NODE_TOKEN;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[2] as BaseTokenNode).origin;
        this.children.push(args[0] as BaseTokenNode);
        this.children.push(args[1] as BaseTokenNode);
        this.children.push(args[2] as BaseTokenNode);
        this.children.push(args[3] as BaseTokenNode);
        this.children.push(...this.flatBody(args[4] as TokenBodiesNode));
        this.children.push(args[5] as BaseTokenNode);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    private flatBody(node: TokenBodiesNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatBody(node.children[1] as TokenBodiesNode)];
        }
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.TOKEN_BODIES)
export class TokenBodiesNode implements BaseNode {
    type: NodeType.TOKEN_BODIES = NodeType.TOKEN_BODIES;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenBodyNode).origin;
        this.children.push(args[0] as TokenBodyNode);
        if (args.length == 2) {
            this.children.push(args[1] as TokenBodyNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.TOKEN_BODY)
export class TokenBodyNode implements BaseNode {
    type: NodeType.TOKEN_BODY = NodeType.TOKEN_BODY;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[1] as BaseTokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Dicauda', NodeType.BASE_TOKEN)
export class BaseTokenNode implements BaseNode {
    type: NodeType.BASE_TOKEN = NodeType.BASE_TOKEN;
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

export type Node =
    | DicaudaNode
    | LangNode
    | NodesNode
    | NodeNode
    | NodeNodeNode
    | NodeBodiesNode
    | NodeBodyNode
    | NodeTokenNode
    | TokenBodiesNode
    | TokenBodyNode
    | BaseTokenNode;
