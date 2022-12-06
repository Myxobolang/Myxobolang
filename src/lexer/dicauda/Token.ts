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

export class LSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '{';
    }
    get kudoaBody(): string[] {
        return ['lsbr'];
    }
    type = TokenType.LSBR;
}

export class RSBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '}';
    }
    get kudoaBody(): string[] {
        return ['rsbr'];
    }
    type = TokenType.RSBR;
}

export class LCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '[';
    }
    get kudoaBody(): string[] {
        return ['lcbr'];
    }
    type = TokenType.LCBR;
}

export class RCBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ']';
    }
    get kudoaBody(): string[] {
        return ['rcbr'];
    }
    type = TokenType.RCBR;
}

export class LToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '<';
    }
    get kudoaBody(): string[] {
        return ['l'];
    }
    type = TokenType.L;
}

export class GToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '>';
    }
    get kudoaBody(): string[] {
        return ['g'];
    }
    type = TokenType.G;
}

export class LBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '(';
    }
    get kudoaBody(): string[] {
        return ['lbr'];
    }
    type = TokenType.LBR;
}

export class RBRToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ')';
    }
    get kudoaBody(): string[] {
        return ['rbr'];
    }
    type = TokenType.RBR;
}

export class LangToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'lang';
    }
    get kudoaBody(): string[] {
        return ['lang'];
    }
    type = TokenType.LANG;
}

export class RowToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'row';
    }
    get kudoaBody(): string[] {
        return ['row'];
    }
    type = TokenType.ROW;
}

export class TokenToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'token';
    }
    get kudoaBody(): string[] {
        return ['token'];
    }
    type = TokenType.TOKEN;
}

export class NodeToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'node';
    }
    get kudoaBody(): string[] {
        return ['node'];
    }
    type = TokenType.NODE;
}

export class StrToken implements CommonToken<TokenType> {
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return ['str', this.value];
    }
    type = TokenType.STR;
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
