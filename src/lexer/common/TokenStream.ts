import type { Token } from './Token';

export abstract class TokenStream<T extends Token = Token> {
    private tokens: T[] = [];
    private index = 0;
    protected abstract language: string;

    get(index: number) {
        return this.tokens[index + this.index];
    }

    add(...tokens: T[]) {
        this.tokens.push(...tokens);
    }

    next() {
        return this.tokens[++this.index];
    }

    isEmpty() {
        return this.index >= this.tokens.length;
    }

    toKudoa() {
        let out = `${this.language}`;
        let lastRow = -1;
        for (let i = 0; i < this.tokens.length; i++) {
            const token = this.tokens[i];
            if (row != lastRow) {
                out += `{[row][${token.row}]}`;
                lastRow = row;
            }
            const tokenBody = token.kudoaBody;
            let temp = `[${tokenBody.length}]`;
            for (let j = 0; j < tokenBody.length; j++) {
                temp += `[${tokenBody[j]}]`;
            }
            out += `{[token][${token.col}]${temp}}`;
        }
        return out;
    }
}
