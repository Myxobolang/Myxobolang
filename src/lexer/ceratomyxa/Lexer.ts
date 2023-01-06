import { Lexer as CommonLexer } from '../common';
import {
    ArrayToken,
    BreakToken,
    CharToken,
    CommaToken,
    DOToken,
    ElseToken,
    EndsToken,
    EQToken,
    FloatToken,
    FunctionToken,
    IfToken,
    IntToken,
    LBRToken,
    LSBRToken,
    IToken,
    MOToken,
    RBRToken,
    ReturnToken,
    RSBRToken,
    FToken,
    TokenType,
    ValToken,
    VarToken,
    VoidToken,
    VToken,
    WhileToken,
} from './Token';
import { TokenStream } from './TokenStream';
interface LexResult {
    result: number;
    leng: number;
    text: string;
    row: number;
    col: number;
}

interface CppLib {
    initLexer(fileName?: string, isStr?: true): External;
    deleteLexer(lexer: External): void;
    lex(lexer: External): LexResult;
}

const cppLib = (require('../../../build/Release/lexer.node') as any).ceratomyxaLexer as CppLib;

export class Lexer extends CommonLexer<TokenStream> {
    private lex(lexer: External, stream: TokenStream) {
        let result: LexResult;
        while ((result = cppLib.lex(lexer)).result != 0) {
            if (result.result == TokenType.BREAK) {
                stream.add(new BreakToken(result.row, result.col));
            } else if (result.result == TokenType.CHAR) {
                stream.add(new CharToken(result.row, result.col));
            } else if (result.result == TokenType.DO) {
                stream.add(new DOToken(result.row, result.col, result.text));
            } else if (result.result == TokenType.ELSE) {
                stream.add(new ElseToken(result.row, result.col));
            } else if (result.result == TokenType.EQ) {
                stream.add(new EQToken(result.row, result.col));
            } else if (result.result == TokenType.FLOAT) {
                stream.add(new FloatToken(result.row, result.col));
            } else if (result.result == TokenType.FUNCTION) {
                stream.add(new FunctionToken(result.row, result.col));
            } else if (result.result == TokenType.IF) {
                stream.add(new IfToken(result.row, result.col));
            } else if (result.result == TokenType.INT) {
                stream.add(new IntToken(result.row, result.col));
            } else if (result.result == TokenType.LBR) {
                stream.add(new LBRToken(result.row, result.col));
            } else if (result.result == TokenType.LSBR) {
                stream.add(new LSBRToken(result.row, result.col));
            } else if (result.result == TokenType.I) {
                stream.add(new IToken(result.row, result.col, result.text));
            } else if (result.result == TokenType.MO) {
                stream.add(new MOToken(result.row, result.col, result.text));
            } else if (result.result == TokenType.RBR) {
                stream.add(new RBRToken(result.row, result.col));
            } else if (result.result == TokenType.RETURN) {
                stream.add(new ReturnToken(result.row, result.col));
            } else if (result.result == TokenType.RSBR) {
                stream.add(new RSBRToken(result.row, result.col));
            } else if (result.result == TokenType.F) {
                stream.add(new FToken(result.row, result.col, result.text));
            } else if (result.result == TokenType.V) {
                stream.add(new VToken(result.row, result.col, result.text));
            } else if (result.result == TokenType.VAL) {
                stream.add(new ValToken(result.row, result.col));
            } else if (result.result == TokenType.VAR) {
                stream.add(new VarToken(result.row, result.col));
            } else if (result.result == TokenType.WHILE) {
                stream.add(new WhileToken(result.row, result.col));
            } else if (result.result == TokenType.ENDS) {
                stream.add(new EndsToken(result.row, result.col));
            } else if (result.result == TokenType.COMMA) {
                stream.add(new CommaToken(result.row, result.col));
            } else if (result.result == TokenType.VOID) {
                stream.add(new VoidToken(result.row, result.col));
            } else {
                stream.add(new ArrayToken(result.row, result.col));
            }
        }
    }
    lexInput(): TokenStream {
        const lexer = cppLib.initLexer();
        const out = new TokenStream();
        try {
            this.lex(lexer, out);
        } catch (e) {
            cppLib.deleteLexer(lexer);
            throw e;
        }
        return out;
    }
    lexFile(fileName: string): TokenStream {
        const lexer = cppLib.initLexer(fileName);
        const out = new TokenStream();
        try {
            this.lex(lexer, out);
        } catch (e) {
            cppLib.deleteLexer(lexer);
            throw e;
        }
        return out;
    }
    lexString(str: string): TokenStream {
        const lexer = cppLib.initLexer(str, true);
        const out = new TokenStream();
        try {
            this.lex(lexer, out);
        } catch (e) {
            cppLib.deleteLexer(lexer);
            throw e;
        }
        return out;
    }
}
