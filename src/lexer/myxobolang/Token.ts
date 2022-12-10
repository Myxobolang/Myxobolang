import type { Token as CommonToken } from '../common';
export enum TokenType {
    MOUZ = 1,
    VAR,
}

export class MOUZToken implements CommonToken<TokenType> {
    type: TokenType.MOUZ = TokenType.MOUZ;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '::';
    }
    get kudoaBody(): string[] {
        return ['mouz'];
    }
}

export class VARToken implements CommonToken<TokenType> {
    type: TokenType.VAR = TokenType.VAR;
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return ['var', this.value];
    }
}

export type Token = MOUZToken | VARToken;
