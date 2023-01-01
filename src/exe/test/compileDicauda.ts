import { Lexer } from '../../lexer/dicauda';
import { Parser } from '../../parser/dicauda';
import { Compiler } from '../../compiler/dicauda';
import '../../lexer';
import '../../parser';

const lexer = new Lexer();

const str = lexer.lexInput();

const parser = new Parser();

const ast = parser.parse(str);

const compiler = new Compiler();

const final = compiler.compile(ast);

console.log(final.toRaw());
