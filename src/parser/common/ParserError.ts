import type { Token } from '../../lexer/common';

export class ParserError extends Error {
    constructor(public token: Token, public reason?: Error) {
        let message = `Invalid "${token.raw}" at line ${token.row}, char ${token.col}`;
        if (reason != null) {
            message += `\n(${reason})`;
        }
        super(message);
    }
}
