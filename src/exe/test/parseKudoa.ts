import { Lexer } from '../../lexer/kudoa';
import { Parser } from '../../parser/kudoa';

const lexer = new Lexer();

const str = lexer.lexInput();

const parser = new Parser();

const ast = parser.parse(str);

console.log(ast.toDicauda());
