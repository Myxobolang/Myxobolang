import type { Token as CommonToken } from '../common';

export enum TokenType {
    LSBR = 1,
    RSBR,
    LCBR,
    RCBR,
    LANG,
    ROW,
    TOKEN,
    STR,
}

interface LSBRToken extends CommonToken<TokenType> {
    type: TokenType.LSBR;
}

interface RSBRToken extends CommonToken<TokenType> {
    type: TokenType.RSBR;
}

interface LCBRToken extends CommonToken<TokenType> {
    type: TokenType.LCBR;
}

interface RCBRToken extends CommonToken<TokenType> {
    type: TokenType.RCBR;
}

interface LangToken extends CommonToken<TokenType> {
    type: TokenType.LANG;
}

interface RowToken extends CommonToken<TokenType> {
    type: TokenType.ROW;
}

interface TokenToken extends CommonToken<TokenType> {
    type: TokenType.TOKEN;
}

interface StrToken extends CommonToken<TokenType> {
    type: TokenType.STR;
    value: string;
}

export type Token = LSBRToken | RSBRToken | LCBRToken | RCBRToken | LangToken | RowToken | TokenToken | StrToken;
