import { token } from '../../util';
import type { Token as CommonToken } from '../common';
export enum TokenType {
    VAR = 1,
    VAL,
    FUNCTION,
    RETURN,
    IF,
    ELSE,
    WHILE,
    BREAK,
    INT,
    FLOAT,
    CHAR,
    LSBR,
    RSBR,
    LBR,
    RBR,
    I,
    F,
    EQ,
    V,
    MO,
    DO,
    ENDS,
    COMMA,
    VOID,
    ARRAY,
}

@token('Ceratomyxa', TokenType.VAR)
export class VarToken implements CommonToken<TokenType> {
    type: TokenType.VAR = TokenType.VAR;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'var';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.VAL)
export class ValToken implements CommonToken<TokenType> {
    type: TokenType.VAL = TokenType.VAL;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'val';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.FUNCTION)
export class FunctionToken implements CommonToken<TokenType> {
    type: TokenType.FUNCTION = TokenType.FUNCTION;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'function';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.RETURN)
export class ReturnToken implements CommonToken<TokenType> {
    type: TokenType.RETURN = TokenType.RETURN;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'return';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.IF)
export class IfToken implements CommonToken<TokenType> {
    type: TokenType.IF = TokenType.IF;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'if';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.ELSE)
export class ElseToken implements CommonToken<TokenType> {
    type: TokenType.ELSE = TokenType.ELSE;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'else';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.WHILE)
export class WhileToken implements CommonToken<TokenType> {
    type: TokenType.WHILE = TokenType.WHILE;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'while';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.BREAK)
export class BreakToken implements CommonToken<TokenType> {
    type: TokenType.BREAK = TokenType.BREAK;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'break';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.INT)
export class IntToken implements CommonToken<TokenType> {
    type: TokenType.INT = TokenType.INT;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'int';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.FLOAT)
export class FloatToken implements CommonToken<TokenType> {
    type: TokenType.FLOAT = TokenType.FLOAT;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'float';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.CHAR)
export class CharToken implements CommonToken<TokenType> {
    type: TokenType.CHAR = TokenType.CHAR;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'char';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.LSBR)
export class LSBRToken implements CommonToken<TokenType> {
    type: TokenType.LSBR = TokenType.LSBR;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '{';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.RSBR)
export class RSBRToken implements CommonToken<TokenType> {
    type: TokenType.RSBR = TokenType.RSBR;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '}';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.LBR)
export class LBRToken implements CommonToken<TokenType> {
    type: TokenType.LBR = TokenType.LBR;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '(';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.RBR)
export class RBRToken implements CommonToken<TokenType> {
    type: TokenType.RBR = TokenType.RBR;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ')';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.I)
export class IToken implements CommonToken<TokenType> {
    type: TokenType.I = TokenType.I;
    value: number;
    constructor(public row: number, public col: number, raw: string) {
        const temp = /i_([0-9]+)/.exec(raw);
        if (temp == null) {
            throw new Error('Unknown error');
        }
        this.value = parseInt(temp[1]);
    }
    get raw(): string {
        return `i_${this.value}`;
    }
    get kudoaBody(): string[] {
        return [this.value.toString()];
    }
    fromKudoa(kudoaBody: string[]): void {
        this.value = parseInt(kudoaBody[0]);
    }
}

@token('Ceratomyxa', TokenType.F)
export class FToken implements CommonToken<TokenType> {
    type: TokenType.F = TokenType.F;
    value: number;
    constructor(public row: number, public col: number, raw: string) {
        const temp = /f_([0-9]+)/.exec(raw);
        if (temp == null) {
            throw new Error('Unknown error');
        }
        this.value = parseFloat(temp[1]);
    }
    get raw(): string {
        return `f_${this.value}`;
    }
    get kudoaBody(): string[] {
        return [this.value.toString()];
    }
    fromKudoa(kudoaBody: string[]): void {
        this.value = parseFloat(kudoaBody[0]);
    }
}

@token('Ceratomyxa', TokenType.EQ)
export class EQToken implements CommonToken<TokenType> {
    type: TokenType.EQ = TokenType.EQ;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return '=';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.V)
export class VToken implements CommonToken<TokenType> {
    type: TokenType.V = TokenType.V;
    value: string;
    constructor(public row: number, public col: number, raw: string) {
        const temp = /^v_(([A-Za-z0-9\+/]|_)*)$/.exec(raw);
        if (temp == null) {
            throw new Error('Unknown error');
        }
        this.value = temp[1];
    }
    get raw(): string {
        return `v_${this.value}`;
    }
    get kudoaBody(): string[] {
        return [this.value];
    }
    fromKudoa(kudoaBody: string[]): void {
        this.value = kudoaBody[0];
    }
}

@token('Ceratomyxa', TokenType.MO)
export class MOToken implements CommonToken<TokenType> {
    type: TokenType.MO = TokenType.MO;
    priority: number;
    value: string;
    constructor(public row: number, public col: number, raw: string) {
        const temp = /^mo([0-9]+)_(([A-Za-z0-9\+/]|_)*)$/.exec(raw);
        if (temp == null) {
            throw new Error('Unknown error');
        }
        this.priority = parseInt(temp[1]);
        this.value = temp[2];
    }
    get raw(): string {
        return `mo${this.priority}_${this.value}`;
    }
    get kudoaBody(): string[] {
        return [this.priority.toString(), this.value];
    }
    fromKudoa(kudoaBody: string[]): void {
        this.priority = parseInt(kudoaBody[0]);
        this.value = kudoaBody[1];
    }
}

@token('Ceratomyxa', TokenType.DO)
export class DOToken implements CommonToken<TokenType> {
    type: TokenType.DO = TokenType.DO;
    priority: number;
    value: string;
    constructor(public row: number, public col: number, raw: string) {
        const temp = /^do([0-9]+)_(([A-Za-z0-9\+/]|_)*)$/.exec(raw);
        if (temp == null) {
            throw new Error('Unknown error');
        }
        this.priority = parseInt(temp[1]);
        this.value = temp[2];
    }
    get raw(): string {
        return `do${this.priority}_${this.value}`;
    }
    get kudoaBody(): string[] {
        return [this.priority.toString(), this.value];
    }
    fromKudoa(kudoaBody: string[]): void {
        this.priority = parseInt(kudoaBody[0]);
        this.value = kudoaBody[1];
    }
}

@token('Ceratomyxa', TokenType.ENDS)
export class EndsToken implements CommonToken<TokenType> {
    type: TokenType.ENDS = TokenType.ENDS;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ';';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.COMMA)
export class CommaToken implements CommonToken<TokenType> {
    type: TokenType.COMMA = TokenType.COMMA;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return ',';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.VOID)
export class VoidToken implements CommonToken<TokenType> {
    type: TokenType.VOID = TokenType.VOID;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'void';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

@token('Ceratomyxa', TokenType.ARRAY)
export class ArrayToken implements CommonToken<TokenType> {
    type: TokenType.VOID = TokenType.VOID;
    constructor(public row: number, public col: number) {}
    get raw(): string {
        return 'array';
    }
    get kudoaBody(): string[] {
        return [];
    }
    fromKudoa(kudoaBody: string[]): void {}
}

export type Token =
    | VarToken
    | ValToken
    | FunctionToken
    | ReturnToken
    | IfToken
    | ElseToken
    | WhileToken
    | BreakToken
    | IntToken
    | FloatToken
    | CharToken
    | LSBRToken
    | RSBRToken
    | LBRToken
    | RBRToken
    | IToken
    | FToken
    | EQToken
    | VToken
    | MOToken
    | DOToken
    | EndsToken
    | CommaToken
    | VoidToken;
