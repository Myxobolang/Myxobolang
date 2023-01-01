import type { Token, TokenStream } from '../lexer/common';

class LexerData {
    tokens = new Map<number, any>();
    stream: any = undefined;
}

const lexerMap = new Map<string, LexerData>();

export function token(language: string, tokenId: number): ClassDecorator {
    return (target) => {
        let temp: LexerData | undefined;
        if ((temp = lexerMap.get(language)) == null) {
            temp = new LexerData();
            lexerMap.set(language, temp);
        }
        temp.tokens.set(tokenId, target);
    };
}

export function tokenStream(language: string): ClassDecorator {
    return (target) => {
        let temp: LexerData | undefined;
        if ((temp = lexerMap.get(language)) == null) {
            temp = new LexerData();
            lexerMap.set(language, temp);
        }
        temp.stream = target;
    };
}

export function getToken(language: string, tokenId: number): new (...args: any[]) => Token {
    const temp = lexerMap.get(language);
    if (temp == null) {
        throw new Error(`language ${language} does not exist`);
    }
    if (!temp.tokens.has(tokenId)) {
        throw new Error(`language ${language} does not have token ${tokenId}`);
    }
    return temp.tokens.get(tokenId);
}

export function getTokenStream(language: string): new () => TokenStream {
    const temp = lexerMap.get(language);
    if (temp == null) {
        throw new Error(`language ${language} does not exist`);
    }
    return temp.stream;
}
