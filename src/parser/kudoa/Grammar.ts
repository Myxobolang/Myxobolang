import { NameType, SimpleGrammar } from '../common';
import { TokenType } from '../../lexer/kudoa';

export enum GrammarType {
    KUDOA,
    LANG,
    ROWS,
    ROW,
    TOKENS,
    TOKEN,
    TOKEN_BODIES,
    TOKEN_BODY,
}

export class KudoaGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.KUDOA, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.LANG,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.ROWS,
            },
        ]);
    }
}

export class LangGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.LANG, [
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LANG,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.STR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
        ]);
    }
}

export class RowsGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.ROWS, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.ROW,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.ROWS,
            },
        ]);
    }
}

export class RowsGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.ROWS, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.ROW,
            },
        ]);
    }
}

export class RowGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.ROW, [
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ROW,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.STR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKENS,
            },
        ]);
    }
}

export class RowGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.ROW, [
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ROW,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.STR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
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

export class TokenGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN, [
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.TOKEN,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKEN_BODIES,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
        ]);
    }
}

export class TokenBodiesGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN_BODIES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKEN_BODY,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKEN_BODIES,
            },
        ]);
    }
}

export class TokenBodiesGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN_BODIES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TOKEN_BODY,
            },
        ]);
    }
}

export class TokenBodyGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TOKEN_BODY, [
            {
                type: NameType.TOKEN,
                value: TokenType.LCBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.STR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RCBR,
            },
        ]);
    }
}

export type Grammar =
    | KudoaGrammar
    | LangGrammar
    | RowsGrammar1
    | RowsGrammar2
    | RowGrammar1
    | RowGrammar2
    | TokensGrammar1
    | TokensGrammar2
    | TokenGrammar
    | TokenBodiesGrammar1
    | TokenBodiesGrammar2
    | TokenBodyGrammar;
