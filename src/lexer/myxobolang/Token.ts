import { token } from '../../util';
import type { Token as CommonToken } from '../common';
export enum TokenType {
    MOUZ = 1,
    VAR,
}

@token('Myxobolang', TokenType.MOUZ)
export class MOUZToken implements CommonToken<TokenType> {
    type: TokenType.MOUZ = TokenType.MOUZ;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '::';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Myxobolang', TokenType.VAR)
export class VARToken implements CommonToken<TokenType> {
    type: TokenType.VAR = TokenType.VAR;
    constructor(public row: number, public col: number, public value: string) {}
    get raw(): string {
        return this.value;
    }
    get kudoaBody(): string[] {
        return [this.value];
    }
    fromKudoa(kudoaBody: string[]): void {
        this.value = kudoaBody[0];
    }
}

export type Token = MOUZToken | VARToken;
