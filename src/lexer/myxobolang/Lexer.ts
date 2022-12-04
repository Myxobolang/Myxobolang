import { Lexer as CommonLexer, LexerError } from '../common';
import { MOUZToken, TokenType, VARToken } from './Token';
import { TokenStream } from './TokenStream';
interface LexResult {
    result: number;
    leng: number;
    text: string;
    row: number;
    col: number;
}

interface CppLib {
    initLexer(fileName?: string): External;
    deleteLexer(lexer: External): void;
    lex(lexer: External): LexResult;
}

const cppLib = (require('../../../build/Release/lexer.node') as any).myxobolangLexer as CppLib;

export class Lexer extends CommonLexer<TokenStream> {
    private lex(lexer: External, stream: TokenStream) {
        let result: LexResult;
        while ((result = cppLib.lex(lexer)).result != 0) {
            if (result.result == TokenType.MOUZ) {
                stream.add(new MOUZToken(result.row, result.col));
            } else {
                stream.add(new VARToken(result.row, result.col, result.text));
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
}
