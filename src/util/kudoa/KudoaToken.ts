import type { KudoaObj } from './KudoaObj';

export class KudoaToken implements KudoaObj {
    constructor(readonly type: string, readonly col: number, readonly values: string[]) {}

    static changeChars(str: string): string {
        if (/^:?(row)|(lang)|(token)$/.test(str)) {
            str = `:${str}`;
        }
        return str
            .replace(/\r?\n/g, '\\n')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]');
    }

    toKudoa(): string {
        let body = '';
        for (let i = 0; i < this.values.length; i++) {
            body += `[${this.values[i]}]`;
        }
        return `{[token][${this.type}][${this.col}]${body}}`;
    }
}
