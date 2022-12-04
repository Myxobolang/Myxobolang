import type { Token } from '../../lexer/common';

export interface SyntaxNode<T extends number = number, U extends Token<T> = Token<T>> {
    type: T;
    origin: U;
    children: SyntaxNode[];
    get dicaudaBody(): string[];
}

export interface SyntaxNodeConstructor<T extends number = number, U extends Token<T> = Token<T>> {
    new (...args: (Token<T> | SyntaxNode<T, U>)[]): SyntaxNode<T, U>;
}
