import { token } from '../../util';
import type { Token as CommonToken } from '../common';
export enum TokenType {
    MACRO = 1,
    AS,
    ENDM,
    M,
    V,
}

@token('Ceratomyxa', TokenType.MACRO)
export class MacroToken implements CommonToken<TokenType> {
    type: TokenType.MACRO = TokenType.MACRO;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'macro';
    }
    get kudoaBody(): string[] {
        return [];
    }

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.AS)
export class AsToken implements CommonToken<TokenType> {
    type: TokenType.AS = TokenType.AS;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'as';
    }
    get kudoaBody(): string[] {
        return [];
    }

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.ENDM)
export class EndmToken implements CommonToken<TokenType> {
    type: TokenType.ENDM = TokenType.ENDM;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'endm';
    }
    get kudoaBody(): string[] {
        return [];
    }

    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.M)
export class MToken implements CommonToken<TokenType> {
    type: TokenType.M = TokenType.M;
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

@token('Ceratomyxa', TokenType.V)
export class VToken implements CommonToken<TokenType> {
    type: TokenType.V = TokenType.V;
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

export type Token = MacroToken | AsToken | EndmToken | MToken | VToken;
