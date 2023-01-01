import { tokenStream } from '../../util';
import { TokenStream as CommonTokenStream } from '../common';
import type { Token } from './Token';

@tokenStream('Myxobolang')
export class TokenStream extends CommonTokenStream<Token> {
    readonly language = 'Myxobolang';
}
