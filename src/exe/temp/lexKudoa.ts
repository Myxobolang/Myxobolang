import { Lexer } from '../../lexer/kudoa';

const lexer = new Lexer();

const str = lexer.lexInput();

console.log(str.toKudoa());
