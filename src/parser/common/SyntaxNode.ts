import type { Token } from '../../lexer/common';

export interface SyntaxNode<
    D extends SyntaxNode<D, N, T, O>,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>
> {
    type: N;
    origin: O;
    children: D[];
    get dicaudaBody(): string[];
    fromDicaudaBody(dicaudaBody: string[]): void;
}

export interface SyntaxNodeConstructor<
    D extends SyntaxNode<D, N, T, O>,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>
> {
    new (...args: (O | D)[]): D;
}
