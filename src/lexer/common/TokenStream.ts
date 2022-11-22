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
        let out = `{[lang][${this.language}]}`;
        let lastRow = -1;
        for (let i = 0; i < this.tokens.length; i++) {
            const token = this.tokens[i];
            if (token.row != lastRow) {
                out += `{[row][${token.row}]}`;
                lastRow = token.row;
            }
            const tokenBody = token.kudoaBody;
            let temp = `[${tokenBody.length}]`;
            for (let j = 0; j < tokenBody.length; j++) {
                temp += `[${TokenStream.genString(tokenBody[j])}]`;
            }
            out += `{[token][${token.col}]${temp}}`;
        }
        return out;
    }

    private static genString(str: string) {
        if (/^(lang)|(row)|(token)$/.test(str) || str.charAt(0) == ':') {
            return `:${str}`;
        }
        return str
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]');
    }
}
