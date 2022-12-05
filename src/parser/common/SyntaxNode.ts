import type { Token } from '../../lexer/common';

export interface SyntaxNode<N extends number = number, T extends number = number, O extends Token<T> = Token<T>> {
    type: N;
    origin: O;
    children: SyntaxNode<N, T, O>[];
    get dicaudaBody(): string[];
}

export interface SyntaxNodeConstructor<
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>
> {
    new (...args: (O | SyntaxNode<N, T, O>)[]): SyntaxNode<N, T, O>;
}
