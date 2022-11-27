import type { Token as CommonToken } from '../common';
export enum Tokentype {
    MOUZ = 1,
    VAR,
}

export class MOUZToken implements CommonToken<Tokentype> {
    type = Tokentype.MOUZ;
    constructor(public row: number, public col: number) {}
    get kudoaBody(): string[] {
        return ['mouz'];
    }
}

export class VARToken implements CommonToken<Tokentype> {
    type = Tokentype.VAR;
    constructor(public row: number, public col: number, public value: string) {}
    get kudoaBody(): string[] {
        return ['var', this.value];
    }
}

export type Token = MOUZToken | VARToken;
