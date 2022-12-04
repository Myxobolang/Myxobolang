import type { Token, TokenStream } from '../../lexer/common';
import type { SyntaxNode } from './SyntaxNode';

export class GrammarError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export enum GrammarType {
    SIMPLE,
    CUSTOM,
}

export abstract class Grammar<T extends number = number> {
    abstract readonly type: GrammarType;
    constructor(readonly name: T) {}
}

export enum NameType {
    TOKEN,
    GRAMMAR,
}

export interface Name {
    type: NameType;
    value: number;
}

export class SimpleGrammar<T extends number = number> extends Grammar<T> {
    readonly type = GrammarType.SIMPLE;
    constructor(name: T, readonly to: Name[]) {
        super(name);
    }
}

export class CustomGrammar<
    T extends number = number,
    R extends TokenStream<Token<T>> = TokenStream<Token<T>>
> extends Grammar<T> {
    readonly type = GrammarType.CUSTOM;
    constructor(name: T, readonly parse: (from: R) => SyntaxNode) {
        super(name);
    }
}

export type AllGrammar<T extends number = number> = SimpleGrammar<T> | CustomGrammar<T>;
