import { Lexer } from '../../lexer/myxobolang';
import { Parser } from '../../parser/myxobolang';

const lexer = new Lexer();

const str = lexer.lexInput();

const parser = new Parser();

const ast = parser.parse(str);

console.log(ast.toDicauda());
