import { TokenType } from '../../lexer/ceratomyxa';
import { NameType, SimpleGrammar } from '../common';

export enum GrammarType {
    CERATOMYXA,
    TOKENS,
    TOKEN,
    MACRO_DEF,
    MACRO_BODY,
}

export class CeratomyxaGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.CERATOMYXA, [
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
                value: GrammarType.TOKEN,
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
                type: NameType.GRAMMAR,
                value: GrammarType.TOKEN,
            },
        ]);
    }
}

export class TokenGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.MACRO_DEF,
            },
        ]);
    }
}

export class TokenGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN, [
            {
                type: NameType.TOKEN,
                value: TokenType.M,
            },
        ]);
    }
}

export class TokenGrammar3 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN, [
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
        ]);
    }
}

export class MacroDefGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.MACRO_DEF, [
            {
                type: NameType.TOKEN,
                value: TokenType.MACRO,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.M,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.AS,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.MACRO_BODY,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDM,
            },
        ]);
    }
}

export class MacroBodyGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.MACRO_BODY, [
            {
                type: NameType.TOKEN,
                value: TokenType.M,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.MACRO_BODY,
            },
        ]);
    }
}

export class MacroBodyGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.MACRO_BODY, [
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.MACRO_BODY,
            },
        ]);
    }
}

export class MacroBodyGrammar3 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.MACRO_BODY, [
            {
                type: NameType.TOKEN,
                value: TokenType.M,
            },
        ]);
    }
}

export class MacroBodyGrammar4 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.MACRO_BODY, [
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
        ]);
    }
}

export type Grammar =
    | CeratomyxaGrammar
    | TokensGrammar1
    | TokensGrammar2
    | TokenGrammar1
    | TokenGrammar2
    | TokenGrammar3
    | MacroDefGrammar
    | MacroBodyGrammar1
    | MacroBodyGrammar2
    | MacroBodyGrammar3
    | MacroBodyGrammar4;
