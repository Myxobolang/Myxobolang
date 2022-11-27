import type { Token as CommonToken } from '../common';
export enum Tokentype {
    MACRO = 1,
    M,
    V,
}

export class MacroToken implements CommonToken<Tokentype> {
    type = Tokentype.MACRO;
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['macro'];
    }
}

export class MToken implements CommonToken<Tokentype> {
    type = Tokentype.M;
    constructor(public row: number, public col: number, public value: string) {}
    get kudoaBody(): string[] {
        return ['m', this.value];
    }
}
export class VToken implements CommonToken<Tokentype> {
    type = Tokentype.V;
    constructor(public row: number, public col: number, public value: string) {}
    get kudoaBody(): string[] {
        return ['v', this.value];
    }
}

export type Token = MacroToken | MToken | VToken;
