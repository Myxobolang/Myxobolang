import { Lexer } from '../../lexer/ceratomyxa';

const lexer = new Lexer();

const str = lexer.lexInput();

console.log(str.toKudoa());
