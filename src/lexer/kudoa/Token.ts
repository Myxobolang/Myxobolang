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
    get kudoaBody(): string[] {
        return ['lsbr'];
    }
    type = TokenType.LSBR;
}

export class RSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['rsbr'];
    }
    type = TokenType.RSBR;
}

export class LCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['lcbr'];
    }
    type = TokenType.LCBR;
}

export class RCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['rcbr'];
    }
    type = TokenType.RCBR;
}

export class LangToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['lang'];
    }
    type = TokenType.LANG;
}

export class RowToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['row'];
    }
    type = TokenType.ROW;
}

export class TokenToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['token'];
    }
    type = TokenType.TOKEN;
}

export class StrToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number, public value: string) {}
    get kudoaBody(): string[] {
        return ['str', this.value];
    }
    type = TokenType.STR;
}

export type Token = LSBRToken | RSBRToken | LCBRToken | RCBRToken | LangToken | RowToken | TokenToken | StrToken;
