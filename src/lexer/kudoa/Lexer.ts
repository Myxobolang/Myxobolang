import { Lexer as CommonLexer, LexerError } from '../common';
import { StrLexer } from './StrLexer';
import {
    LangToken,
    LCBRToken,
    LSBRToken,
    RCBRToken,
    RowToken,
    RSBRToken,
    StrToken,
    TokenToken,
    TokenType,
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
    initLexer(fileName?: string): External;
    deleteLexer(lexer: External): void;
    lex(lexer: External): LexResult;
}

const cppLib = require('../build/Release/lexer.node') as CppLib;

export class Lexer extends CommonLexer<TokenStream> {
    private lex(lexer: External, stream: TokenStream) {
        let result: LexResult;
        while ((result = cppLib.lex(lexer)).result != 0) {
            if (result.result == TokenType.LSBR) {
                stream.add(new LSBRToken(result.row, result.col));
            } else if (result.result == TokenType.RSBR) {
                stream.add(new RSBRToken(result.row, result.col));
            } else if (result.result == TokenType.LCBR) {
                stream.add(new LCBRToken(result.row, result.col));
            } else if (result.result == TokenType.RCBR) {
                stream.add(new RCBRToken(result.row, result.col));
            } else if (result.result == TokenType.LANG) {
                stream.add(new LangToken(result.row, result.col));
            } else if (result.result == TokenType.ROW) {
                stream.add(new RowToken(result.row, result.col));
            } else if (result.result == TokenType.TOKEN) {
                stream.add(new TokenToken(result.row, result.col));
            } else if (result.result == TokenType.STR) {
                try {
                    const text = StrLexer.lex(result.text);
                    stream.add(new StrToken(result.row, result.col, text));
                } catch (e) {
                    if (e instanceof Error) {
                        throw new LexerError(result.text, result.row, result.col, e);
                    }
                    throw new Error('Unknown error');
                }
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
