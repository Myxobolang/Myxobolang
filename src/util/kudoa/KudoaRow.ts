import type { KudoaObj } from './KudoaObj';
import type { KudoaToken } from './KudoaToken';

export class KudoaRow implements KudoaObj {
    constructor(readonly row: number, readonly tokens: KudoaToken[]) {}

    toKudoa(): string {
        let body = '';
        for (let i = 0; i < this.tokens.length; i++) {
            body += this.tokens[i].toKudoa();
        }
        return `{[row][${this.row}]}${body}`;
    }
}
