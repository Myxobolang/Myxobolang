import { Lexer } from '../../lexer/ceratomyxa';
import { Parser } from '../../parser/ceratomyxa';

const lexer = new Lexer();

const str = lexer.lexInput();

const parser = new Parser();

const ast = parser.parse(str);

console.log(ast.toDicauda());
