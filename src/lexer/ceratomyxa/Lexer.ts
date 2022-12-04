import { Lexer as CommonLexer, LexerError } from '../common';
import { MacroToken, MToken, VToken, TokenType, AsToken, EndmToken } from './Token';
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

const cppLib = (require('../../../build/Release/lexer.node') as any).ceratomyxaLexer as CppLib;

export class Lexer extends CommonLexer<TokenStream> {
    private lex(lexer: External, stream: TokenStream) {
        let result: LexResult;
        while ((result = cppLib.lex(lexer)).result != 0) {
            if (result.result == TokenType.MACRO) {
                stream.add(new MacroToken(result.row, result.col));
            } else if (result.result == TokenType.AS) {
                stream.add(new AsToken(result.row, result.col));
            } else if (result.result == TokenType.ENDM) {
                stream.add(new EndmToken(result.row, result.col));
            } else if (result.result == TokenType.M) {
                stream.add(new MToken(result.row, result.col, result.text));
            } else if (result.result == TokenType.V) {
                stream.add(new VToken(result.row, result.col, result.text));
            } else {
                throw new LexerError(result.text, result.row, result.col, new Error());
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
