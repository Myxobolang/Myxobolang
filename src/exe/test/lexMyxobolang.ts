import { Lexer } from '../../lexer/myxobolang';

const lexer = new Lexer();

const str = lexer.lexInput();

console.log(str.toKudoa());
