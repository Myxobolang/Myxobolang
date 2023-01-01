import { Lexer } from '../../lexer/kudoa';
import { Parser } from '../../parser/kudoa';
import { Compiler } from '../../compiler/kudoa';
import '../../lexer';

const lexer = new Lexer();

const str = lexer.lexInput();

const parser = new Parser();

const ast = parser.parse(str);

const compiler = new Compiler();

const final = compiler.compile(ast);

console.log(final.toRaw());
