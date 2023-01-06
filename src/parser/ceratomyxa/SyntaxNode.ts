import type { Token, TokenType } from '../../lexer/ceratomyxa';
import { syntaxNode } from '../../util';
import type { SyntaxNode } from '../common';

export enum NodeType {
    CERATOMYXA,
    GLOBALS,
    GLOBAL,
    FUNCTION_DECL,
    FUNCTION,
    PARAM_LIST,
    PARAM,
    BLOCK,
    SENTENCES,
    SENTENCE,
    VAR,
    VAL,
    SET_VAR,
    CAL,
    IF_ELSE,
    IF,
    WHILE,
    BREAK,
    RETURN,
    RETURN_EMPTY,
    TYPE,
    ARRAY,
    MO,
    DO,
    FUNCTION_USE,
    USE_PARAM,
    TOKEN,
}

type BaseNode = SyntaxNode<Node, NodeType, TokenType, Token>;

@syntaxNode('Ceratomyxa', NodeType.CERATOMYXA)
export class CeratomyxaNode implements BaseNode {
    type: NodeType.CERATOMYXA = NodeType.CERATOMYXA;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(...this.flatGlobals(args[0] as GlobalsNode));
    }
    private flatGlobals(node: GlobalsNode): Node[] {
        if (node.children.length == 1) {
            return [(node.children[0] as GlobalNode).children[0]];
        } else {
            return [(node.children[0] as GlobalNode).children[0], ...this.flatGlobals(node.children[1] as GlobalsNode)];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.GLOBALS)
export class GlobalsNode implements BaseNode {
    type: NodeType.GLOBALS = NodeType.GLOBALS;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
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

@syntaxNode('Ceratomyxa', NodeType.GLOBAL)
export class GlobalNode implements BaseNode {
    type: NodeType.GLOBAL = NodeType.GLOBAL;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.FUNCTION_DECL)
export class FunctionDeclNode implements BaseNode {
    type: NodeType.FUNCTION_DECL = NodeType.FUNCTION_DECL;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
        this.children.push(args[3] as Node);
        this.children.push(...this.flatParamList(args[4] as ParamListNode));
        this.children.push(args[5] as Node);
        this.children.push(args[6] as Node);
    }
    private flatParamList(list: ParamListNode): Node[] {
        if (list.children.length == 1) {
            return [list.children[0]];
        } else {
            return [list.children[0], ...this.flatParamList(list.children[1] as ParamListNode)];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.FUNCTION)
export class FunctionNode implements BaseNode {
    type: NodeType.FUNCTION = NodeType.FUNCTION;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
        this.children.push(args[3] as Node);
        this.children.push(...this.flatParamList(args[4] as ParamListNode));
        this.children.push(args[5] as Node);
        this.children.push(args[6] as Node);
        this.children.push(args[7] as Node);
        this.children.push(args[8] as Node);
    }
    private flatParamList(list: ParamListNode): Node[] {
        if (list.children.length == 1) {
            return [list.children[0]];
        } else {
            return [list.children[0], ...this.flatParamList(list.children[1] as ParamListNode)];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.PARAM_LIST)
export class ParamListNode implements BaseNode {
    type: NodeType.PARAM_LIST = NodeType.PARAM_LIST;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
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

@syntaxNode('Ceratomyxa', NodeType.PARAM)
export class ParamNode implements BaseNode {
    type: NodeType.PARAM = NodeType.PARAM;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        if (args.length >= 2) {
            this.children.push(args[1] as Node);
        }
        if (args.length == 3) {
            this.children.push(args[2] as Node);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.BLOCK)
export class BlockNode implements BaseNode {
    type: NodeType.BLOCK = NodeType.BLOCK;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children = this.flatSentences(args[0] as SentencesNode);
    }
    private flatSentences(node: SentencesNode): Node[] {
        if (node.children.length == 1) {
            return [(node.children[0] as SentenceNode).children[0]];
        } else {
            return [
                (node.children[0] as SentenceNode).children[0],
                ...this.flatSentences(node.children[1] as SentencesNode),
            ];
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.SENTENCES)
export class SentencesNode implements BaseNode {
    type: NodeType.SENTENCES = NodeType.SENTENCES;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
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

@syntaxNode('Ceratomyxa', NodeType.SENTENCE)
export class SentenceNode implements BaseNode {
    type: NodeType.SENTENCE = NodeType.SENTENCE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.VAR)
export class VarNode implements BaseNode {
    type: NodeType.VAR = NodeType.VAR;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
        this.children.push(args[3] as Node);
        this.children.push(args[4] as Node);
        this.children.push(args[5] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.VAL)
export class ValNode implements BaseNode {
    type: NodeType.VAL = NodeType.VAL;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
        this.children.push(args[3] as Node);
        this.children.push(args[4] as Node);
        this.children.push(args[5] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.SET_VAR)
export class SetVarNode implements BaseNode {
    type: NodeType.SET_VAR = NodeType.SET_VAR;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
        this.children.push(args[2] as Node);
        this.children.push(args[3] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.CAL)
export class CalNode implements BaseNode {
    type: NodeType.CAL = NodeType.CAL;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children = [...(args as Node[])];
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.IF_ELSE)
export class IfElseNode implements BaseNode {
    type: NodeType.IF_ELSE = NodeType.IF_ELSE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        for (let i = 0; i < 11; i++) {
            this.children.push(args[i] as Node);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.IF)
export class IfNode implements BaseNode {
    type: NodeType.IF = NodeType.IF;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        for (let i = 0; i < 7; i++) {
            this.children.push(args[i] as Node);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.WHILE)
export class WhileNode implements BaseNode {
    type: NodeType.WHILE = NodeType.WHILE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        for (let i = 0; i < 7; i++) {
            this.children.push(args[i] as Node);
        }
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.BREAK)
export class BreakNode implements BaseNode {
    type: NodeType.BREAK = NodeType.BREAK;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.RETURN)
export class ReturnNode implements BaseNode {
    type: NodeType.RETURN = NodeType.RETURN;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
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

@syntaxNode('Ceratomyxa', NodeType.RETURN_EMPTY)
export class ReturnEmptyNode implements BaseNode {
    type: NodeType.RETURN_EMPTY = NodeType.RETURN_EMPTY;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.TYPE)
export class TypeNode implements BaseNode {
    type: NodeType.TYPE = NodeType.TYPE;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
        this.children.push(args[0] as Node);
        if (this.children.length == 2) {
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

@syntaxNode('Ceratomyxa', NodeType.ARRAY)
export class ArrayNode implements BaseNode {
    type: NodeType.ARRAY = NodeType.ARRAY;
    constructor(...args: (Token | Node)[]) {
        this.origin = (args[0] as TokenNode).origin;
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

@syntaxNode('Ceratomyxa', NodeType.MO)
export class MoNode implements BaseNode {
    type: NodeType.MO = NodeType.MO;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
        this.children.push(args[0] as Node);
        this.children.push(args[1] as Node);
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.DO)
export class DoNode implements BaseNode {
    type: NodeType.DO = NodeType.DO;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
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

@syntaxNode('Ceratomyxa', NodeType.FUNCTION_USE)
export class FunctionUseNode implements BaseNode {
    type: NodeType.FUNCTION_USE = NodeType.FUNCTION_USE;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
        this.children = [...(args as Node[])];
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.USE_PARAM)
export class UseParamNode implements BaseNode {
    type: NodeType.USE_PARAM = NodeType.USE_PARAM;
    constructor(...args: (Token | Node)[]) {
        this.origin = args[0] as Token;
        this.children = [...(args as Node[])];
    }
    origin: Token;
    children: Node[] = [];
    get dicaudaBody(): string[] {
        return [];
    }
    fromDicaudaBody(dicaudaBody: string[]): void {}
}

@syntaxNode('Ceratomyxa', NodeType.TOKEN)
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

export type Node =
    | CeratomyxaNode
    | GlobalsNode
    | GlobalNode
    | FunctionDeclNode
    | FunctionNode
    | ParamListNode
    | ParamNode
    | BlockNode
    | SentencesNode
    | SentenceNode
    | VarNode
    | ValNode
    | SetVarNode
    | CalNode
    | IfElseNode
    | IfNode
    | WhileNode
    | BreakNode
    | ReturnNode
    | ReturnEmptyNode
    | TypeNode
    | MoNode
    | DoNode
    | FunctionUseNode
    | UseParamNode
    | TokenNode
    | ArrayNode;
