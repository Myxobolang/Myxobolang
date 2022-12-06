export class LexerError extends Error {
    constructor(public text: string, public row: number, public col: number, public reason: Error) {
        super(`Invalid "${text}" at line ${row + 1}, char ${col + 1}\n(${reason.message})`);
    }
}
