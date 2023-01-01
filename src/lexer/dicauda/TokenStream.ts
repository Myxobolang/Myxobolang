import { tokenStream } from '../../util';
import { TokenStream as CommonTokenStream } from '../common';
import type { Token } from './Token';

@tokenStream('Dicauda')
export class TokenStream extends CommonTokenStream<Token> {
    readonly language = 'Dicauda';
}
