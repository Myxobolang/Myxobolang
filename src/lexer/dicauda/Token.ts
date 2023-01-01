import { token } from '../../util';
import type { Token as CommonToken } from '../common';

export enum TokenType {
    LSBR = 1,
    RSBR,
    LCBR,
    RCBR,
    L,
    G,
    LBR,
    RBR,
    LANG,
    ROW,
    TOKEN,
    NODE,
    STR,
}

@token('Dicauda', TokenType.LSBR)
export class LSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '{';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.LSBR = TokenType.LSBR;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.RSBR)
export class RSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '}';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.RSBR = TokenType.RSBR;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.LCBR)
export class LCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '[';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.LCBR = TokenType.LCBR;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.RCBR)
export class RCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ']';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.RCBR = TokenType.RCBR;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.L)
export class LToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '<';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.L = TokenType.L;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.G)
export class GToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '>';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.G = TokenType.G;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.LBR)
export class LBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '(';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.LBR = TokenType.LBR;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.RBR)
export class RBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ')';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.RBR = TokenType.RBR;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.LANG)
export class LangToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'lang';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.LANG = TokenType.LANG;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.ROW)
export class RowToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'row';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.ROW = TokenType.ROW;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.TOKEN)
export class TokenToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'token';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.TOKEN = TokenType.TOKEN;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.NODE)
export class NodeToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'node';
    }
    get kudoaBody(): string[] {
        return [];
    }
    type: TokenType.NODE = TokenType.NODE;

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Dicauda', TokenType.STR)
export class StrToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return [this.value];
    }
    type: TokenType.STR = TokenType.STR;

    fromKudoa(kudoaBody: string[]): void {
        this.value = kudoaBody[0];
    }
}

export type Token =
    | LSBRToken
    | RSBRToken
    | LCBRToken
    | RCBRToken
    | LToken
    | GToken
    | LBRToken
    | RBRToken
    | LangToken
    | RowToken
    | TokenToken
    | NodeToken
    | StrToken;
