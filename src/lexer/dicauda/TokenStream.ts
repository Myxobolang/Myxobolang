import { TokenStream as CommonTokenStream } from '../common';
import type { Token } from './Token';

export class TokenStream extends CommonTokenStream<Token> {
    protected language = 'Dicauda';
}
