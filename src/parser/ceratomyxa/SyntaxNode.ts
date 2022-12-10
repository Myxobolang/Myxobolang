import type { SyntaxNode } from '../common';
import type { TokenType, Token } from '../../lexer/ceratomyxa';

export enum NodeType {
    CERATOMYXA,
    TOKENS,
    TOKEN,
    MACRO_DEF,
    MACRO_BODY,
    BASE_TOKEN,
}

type BaseNode = SyntaxNode<Node, NodeType, TokenType, Token>;

export class CeratomyxaNode implements BaseNode {
    type: NodeType.CERATOMYXA = NodeType.CERATOMYXA;
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
        return ['ceratomyxa'];
    }
}

export class TokensNode implements BaseNode {
    type: NodeType.TOKENS = NodeType.TOKENS;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as Node).origin;
        this.children.push((args[0] as TokenNode).children[0]);
        if (this.children.length == 2) {
            this.children.push(args[1] as TokensNode);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return ['tokens'];
    }
}

export class TokenNode implements BaseNode {
    type: NodeType.TOKEN = NodeType.TOKEN;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as Node).origin;
        this.children.push(args[0] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return ['token'];
    }
}

export class MacroDefNode implements BaseNode {
    type: NodeType.MACRO_DEF = NodeType.MACRO_DEF;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as BaseTokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
        this.children.push(...this.flatBody(args[3] as MacroBodyNode));
        this.children.push(args[4] as Node);
    }
    private flatBody(node: MacroBodyNode): Node[] {
        if (node.children.length == 1) {
            return [node.children[0]];
        } else {
            return [node.children[0], ...this.flatBody(node.children[1] as MacroBodyNode)];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return ['macroDef'];
    }
}

export class MacroBodyNode implements BaseNode {
    type: NodeType.MACRO_BODY = NodeType.MACRO_BODY;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as Node).origin;
        this.children.push(args[0] as Node);
        if (this.children.length == 2) {
            this.children.push(args[1] as Node);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return ['macroBody'];
    }
}

export class BaseTokenNode implements BaseNode {
    type: NodeType.BASE_TOKEN = NodeType.BASE_TOKEN;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return ['baseToken'];
    }
}

export type Node = CeratomyxaNode | TokensNode | TokenNode | MacroDefNode | MacroBodyNode | BaseTokenNode;
