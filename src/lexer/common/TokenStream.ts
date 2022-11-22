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
        return null;
    }
}
