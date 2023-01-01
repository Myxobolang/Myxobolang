import type { Token } from './Token';

export abstract class TokenStream<T extends Token = Token> {
    private tokens: T[] = [];
    private index = 0;
    private stack: number[] = [];
    abstract readonly language: string;

    get(index: number) {
        return this.tokens[index + this.index];
    }

    add(...tokens: T[]) {
        this.tokens.push(...tokens);
    }

    next() {
        return this.tokens[this.index++];
    }

    prev() {
        return this.tokens[this.index++];
    }

    push() {
        const out = this.stack.length;
        this.stack.push(this.index);
        return out;
    }

    pop(index: number) {
        this.index = this.stack[index];
        this.stack = this.stack.slice(0, index);
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
            let temp = '';
            for (let j = 0; j < tokenBody.length; j++) {
                temp += `[${TokenStream.genString(tokenBody[j])}]`;
            }
            out += `{[token][${token.col}][${token.type}]${temp}}`;
        }
        return out;
    }

    toRaw() {
        let out = '';
        let currentRow = '';
        let currentRowId = 0;

        this.tokens.forEach((token) => {
            for (; currentRowId < token.row; currentRowId++) {
                out += currentRow;
                out += '\n';
                currentRow = '';
            }
            const currentCol = currentRow.length;
            for (let i = currentCol; i < token.col; i++) {
                currentRow += ' ';
            }
            currentRow += token.raw;
        });
        out += currentRow;
        out += '\n';
        return out;
    }

    toString() {
        return this.toKudoa();
    }

    private static genString(str: string) {
        if (/^((lang)|(row)|(token))$/.test(str) || str.charAt(0) == ':') {
            str = `:${str}`;
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

export interface TokenStreamConstructor<T extends Token = Token> {
    new (): TokenStream<T>;
}
