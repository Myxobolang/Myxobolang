import type { Token, TokenType } from '../../lexer/kudoa';
import type { SyntaxNode } from '../common';

export enum NodeType {
    KUDOA,
    LANG,
    ROWS,
    ROW,
    TOKENS,
    TOKEN,
    TOKEN_BODIES,
    TOKEN_BODY,
    BASE_TOKEN,
}

type BaseNode = SyntaxNode<Node, NodeType, TokenType, Token>;

export class KudoaNode implements BaseNode {
    type = NodeType.KUDOA;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as LangNode).origin;
        this.children.push(args[0] as LangNode);
        this.children.push(...this.flatRows(args[1] as RowsNode));
    }
    private flatRows(node: RowsNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatRows(node.children[1])];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export class LangNode implements BaseNode {
    type = NodeType.LANG;
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
}

export class RowsNode implements BaseNode {
    type = NodeType.ROWS;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as RowNode).origin;
        this.children.push(args[0] as RowNode);
        if (args.length == 2) {
            this.children.push(args[1] as RowNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export class RowNode implements BaseNode {
    type = NodeType.ROW;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[2] as BaseTokenNode).origin;
        for (let i = 0; i < 8; i++) {
            this.children.push(args[i] as BaseTokenNode);
        }
        if (args.length == 9) {
            this.children.push(...this.flatTokens(args[8] as TokensNode));
        }
    }
    private flatTokens(node: TokensNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatTokens(node.children[1])];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export class TokensNode implements BaseNode {
    type = NodeType.TOKENS;
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
}

export class TokenNode implements BaseNode {
    type = NodeType.TOKEN;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[2] as BaseTokenNode).origin;
        this.children.push(args[0] as BaseTokenNode);
        this.children.push(args[1] as BaseTokenNode);
        this.children.push(args[2] as BaseTokenNode);
        this.children.push(args[3] as BaseTokenNode);
        this.children.push(...this.flatBody(args[4] as TokenBodiesNode));
        this.children.push(args[5] as BaseTokenNode);
    }
    private flatBody(node: TokenBodiesNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatBody(node.children[1])];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export class TokenBodiesNode implements BaseNode {
    type = NodeType.TOKEN_BODIES;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenBodyNode).origin;
        this.children.push(args[0] as TokenBodyNode);
        if (args.length == 2) {
            this.children.push(args[1] as TokenBodiesNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export class TokenBodyNode implements BaseNode {
    type = NodeType.TOKEN_BODY;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[1] as BaseNode).origin;
        this.children.push(args[0] as BaseTokenNode);
        this.children.push(args[1] as BaseTokenNode);
        this.children.push(args[2] as BaseTokenNode);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export class BaseTokenNode implements BaseNode {
    type = NodeType.BASE_TOKEN;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
}

export type Node =
    | KudoaNode
    | LangNode
    | RowsNode
    | RowNode
    | TokensNode
    | TokenNode
    | TokenBodiesNode
    | TokenBodyNode
    | BaseTokenNode;
