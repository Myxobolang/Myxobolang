import type { FunctionNode } from '../../parser/ceratomyxa/SyntaxNode';

export enum BaseType {
    INT,
    FLOAT,
    CHAR,
    VOID,
}

export class SimpleType {
    constructor(readonly base: BaseType) {}
    get isPtr() {
        return false;
    }
    is(other: Type): boolean {
        if (other instanceof PtrType) {
            return false;
        }
        return this.base == other.base;
    }
    toLL() {
        if (this.base == BaseType.INT) {
            return 'i32';
        } else if (this.base == BaseType.FLOAT) {
            return 'float';
        } else if (this.base == BaseType.CHAR) {
            return 'i8';
        } else {
            return 'void';
        }
    }
}

export class PtrType {
    constructor(readonly base: SimpleType | PtrType) {}
    get isPtr() {
        return true;
    }
    is(other: Type): boolean {
        if (other instanceof SimpleType) {
            return false;
        }
        return this.base.is(other.base);
    }
    toLL(): string {
        return `${this.base.toLL()}*`;
    }
}

export type Type = SimpleType | PtrType;

export interface ValSymbol {
    type: Type;
    name: string;
    value: number;
}

export interface VarSymbol {
    type: Type;
    name: string;
}

export interface FunctionSymbol {
    returnType: Type;
    paramTypes: Type[];
    name: string;
    body?: FunctionNode;
}

export class SymbolTable {
    readonly vals = new Map<string, ValSymbol>();
    readonly vars = new Map<string, VarSymbol>();
    readonly functions = new Map<string, FunctionSymbol>();
}
