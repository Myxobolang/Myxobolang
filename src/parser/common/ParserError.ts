import type { Token } from '../../lexer/common';

export class ParserError extends Error {
    constructor(public token: Token, public reason?: Error) {
        super(`Invalid "${token.raw}" at line ${token.row}, char ${token.col}\n`);
    }
}
