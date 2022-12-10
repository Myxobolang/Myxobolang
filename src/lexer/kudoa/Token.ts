import type { Token as CommonToken } from '../common';

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

export class LSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '{';
    }
    get kudoaBody(): string[] {
        return ['lsbr'];
    }
    type: TokenType.LSBR = TokenType.LSBR;
}

export class RSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '}';
    }
    get kudoaBody(): string[] {
        return ['rsbr'];
    }
    type: TokenType.RSBR = TokenType.RSBR;
}

export class LCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '[';
    }
    get kudoaBody(): string[] {
        return ['lcbr'];
    }
    type: TokenType.LCBR = TokenType.LCBR;
}

export class RCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ']';
    }
    get kudoaBody(): string[] {
        return ['rcbr'];
    }
    type: TokenType.RCBR = TokenType.RCBR;
}

export class LangToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'lang';
    }
    get kudoaBody(): string[] {
        return ['lang'];
    }
    type: TokenType.LANG = TokenType.LANG;
}

export class RowToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'row';
    }
    get kudoaBody(): string[] {
        return ['row'];
    }
    type: TokenType.ROW = TokenType.ROW;
}

export class TokenToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'token';
    }
    get kudoaBody(): string[] {
        return ['token'];
    }
    type: TokenType.TOKEN = TokenType.TOKEN;
}

export class StrToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return ['str', this.value];
    }
    type: TokenType.STR = TokenType.STR;
}

type Exact<T> = { [key in keyof T]: T[key] };

export type Token = LSBRToken | RSBRToken | LCBRToken | RCBRToken | LangToken | RowToken | TokenToken | StrToken;
