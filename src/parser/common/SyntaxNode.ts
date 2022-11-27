import type { Token } from '../../lexer/common';

export interface SyntaxNode<T extends number = number> {
    type: T;
    origin: Token;
    children: SyntaxNode[];
    get dicaudaBody(): string[];
}
