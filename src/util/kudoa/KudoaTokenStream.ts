import type { KudoaObj } from './KudoaObj';
import type { KudoaRow } from './KudoaRow';

export class KudoaTokenStream implements KudoaObj {
    constructor(readonly lang: string, readonly rows: KudoaRow[]) {}

    toKudoa(): string {
        let body = '';
        for (let i = 0; i < this.rows.length; i++) {
            body += this.rows[i].toKudoa;
        }
        return `{[lang][${this.lang}]}${body}`;
    }
}
