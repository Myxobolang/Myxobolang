import type { Token as CommonToken } from '../common';
export enum TokenType {
    MACRO = 1,
    AS,
    ENDM,
    M,
    V,
}

export class MacroToken implements CommonToken<TokenType> {
    type: TokenType.MACRO = TokenType.MACRO;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'macro';
    }
    get kudoaBody(): string[] {
        return ['macro'];
    }
}

export class AsToken implements CommonToken<TokenType> {
    type: TokenType.AS = TokenType.AS;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'as';
    }
    get kudoaBody(): string[] {
        return ['as'];
    }
}

export class EndmToken implements CommonToken<TokenType> {
    type: TokenType.ENDM = TokenType.ENDM;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'endm';
    }
    get kudoaBody(): string[] {
        return ['endm'];
    }
}

export class MToken implements CommonToken<TokenType> {
    type: TokenType.M = TokenType.M;
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return ['m', this.value];
    }
}
export class VToken implements CommonToken<TokenType> {
    type: TokenType.V = TokenType.V;
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return ['v', this.value];
    }
}

export type Token = MacroToken | AsToken | EndmToken | MToken | VToken;
