import { NameType, SimpleGrammar } from '../common';
import { TokenType } from '../../lexer/myxobolang';

export enum GrammarType {
    MYXOBOLANG,
    TOKENS,
    NAMESPACE,
}

export class MyxobolangGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.MYXOBOLANG, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKENS,
            },
        ]);
    }
}

export class TokensGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKENS, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NAMESPACE,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKENS,
            },
        ]);
    }
}

export class TokensGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKENS, [
            {
                type: NameType.TOKEN,
                value: TokenType.VAR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKENS,
            },
        ]);
    }
}

export class TokensGrammar3 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKENS, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NAMESPACE,
            },
        ]);
    }
}

export class TokensGrammar4 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKENS, [
            {
                type: NameType.TOKEN,
                value: TokenType.VAR,
            },
        ]);
    }
}

export class NamespaceGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NAMESPACE, [
            {
                type: NameType.TOKEN,
                value: TokenType.MOUZ,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.VAR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.MOUZ,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.VAR,
            },
        ]);
    }
}

export type Grammar =
    | MyxobolangGrammar
    | TokensGrammar1
    | TokensGrammar2
    | TokensGrammar3
    | TokensGrammar4
    | NamespaceGrammar;
