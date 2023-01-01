import type { Token as CommonToken } from '../common';
import { token } from '../../util';

export enum TokenType {
    LSBR = 1,
    RSBR,
    LCBR,
    RCBR,
    LANG,
    ROW,
    TOKEN,
    STR,
}

@token('Kudoa', TokenType.LSBR)
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

@token('Kudoa', TokenType.RSBR)
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

@token('Kudoa', TokenType.LCBR)
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

@token('Kudoa', TokenType.RCBR)
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

@token('Kudoa', TokenType.LANG)
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

@token('Kudoa', TokenType.ROW)
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

@token('Kudoa', TokenType.TOKEN)
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

@token('Kudoa', TokenType.STR)
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

export type Token = LSBRToken | RSBRToken | LCBRToken | RCBRToken | LangToken | RowToken | TokenToken | StrToken;
