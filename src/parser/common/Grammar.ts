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

export abstract class Grammar<G extends number = number> {
    abstract readonly type: GrammarType;
    constructor(readonly name: G) {}
}

export enum NameType {
    TOKEN,
    GRAMMAR,
}

interface TokenName<T extends number = number> {
    type: NameType.TOKEN;
    value: T;
}

interface GrammarName<G extends number = number> {
    type: NameType.GRAMMAR;
    value: G;
}

export type Name<G extends number = number, T extends number = number> = TokenName<T> | GrammarName<G>;

export class SimpleGrammar<G extends number = number, T extends number = number> extends Grammar<G> {
    readonly type = GrammarType.SIMPLE;
    constructor(name: G, readonly to: Name<G, T>[]) {
        super(name);
    }
}

export class CustomGrammar<
    G extends number = number,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>,
    S extends TokenStream<O> = TokenStream<O>
> extends Grammar<G> {
    readonly type = GrammarType.CUSTOM;
    constructor(name: G, readonly parse: (from: S) => SyntaxNode<N, T, O>) {
        super(name);
    }
}

export type AllGrammar<
    G extends number = number,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>,
    S extends TokenStream<O> = TokenStream<O>
> = SimpleGrammar<G, T> | CustomGrammar<G, N, T, O, S>;
