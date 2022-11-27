import type { Token } from '../../lexer/common';

export interface SyntaxNode<T extends number = number, U extends Token<T> = Token<T>> {
    type: T;
    origin: U;
    children: SyntaxNode[];
    get dicaudaBody(): string[];
}
