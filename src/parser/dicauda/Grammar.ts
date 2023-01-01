export enum GrammarType {
    DICAUDA,
    LANG,
    NODES,
    NODE,
    NODE_NODE,
    NODE_TOKEN,
    NODE_BODIES,
    NODE_BODY,
    TOKEN_BODIES,
    TOKEN_BODY,
}

import { NameType, SimpleGrammar } from '../common';
import { TokenType } from '../../lexer/dicauda';

export class DicaudaGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.DICAUDA, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.LANG,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODES,
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

export class NodesGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODES,
            },
        ]);
    }
}

export class NodesGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE,
            },
        ]);
    }
}

export class NodeGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE_NODE,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE_TOKEN,
            },
        ]);
    }
}

export class NodeNodeGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODE_NODE, [
            {
                type: NameType.TOKEN,
                value: TokenType.L,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.NODE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE_BODIES,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.G,
            },
        ]);
    }
}

export class NodeBodiesGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODE_BODIES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE_BODY,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE_BODIES,
            },
        ]);
    }
}

export class NodeBodiesGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODE_BODIES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.NODE_BODY,
            },
        ]);
    }
}

export class NodeBodyGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODE_BODY, [
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.STR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
        ]);
    }
}

export class NodeTokenGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.NODE_TOKEN, [
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
    | DicaudaGrammar
    | LangGrammar
    | NodesGrammar1
    | NodesGrammar2
    | NodeGrammar
    | NodeNodeGrammar
    | NodeBodiesGrammar1
    | NodeBodiesGrammar2
    | NodeBodyGrammar
    | NodeTokenGrammar
    | TokenBodiesGrammar1
    | TokenBodiesGrammar2
    | TokenBodyGrammar;
