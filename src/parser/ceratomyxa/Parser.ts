import { Parser as BaseParser } from '../common';
import {
    NodeType,
    Node,
    CeratomyxaNode,
    TokensNode,
    TokenNode,
    MacroDefNode,
    MacroBodyNode,
    BaseTokenNode,
} from './SyntaxNode';
import {
    CeratomyxaGrammar,
    GrammarType,
    MacroBodyGrammar1,
    MacroBodyGrammar2,
    MacroBodyGrammar3,
    MacroBodyGrammar4,
    MacroDefGrammar,
    TokenGrammar1,
    TokenGrammar2,
    TokenGrammar3,
    TokensGrammar1,
    TokensGrammar2,
} from './Grammar';
import type { Token, TokenStream, TokenType } from '../../lexer/ceratomyxa';
import { SyntaxTree } from './SyntaxTree';

export class Parser extends BaseParser<Node, GrammarType, NodeType, TokenType, Token, TokenStream, SyntaxTree> {
    constructor() {
        super(SyntaxTree);
        this.register(new CeratomyxaGrammar(), CeratomyxaNode);
        this.register(new TokensGrammar1(), TokensNode);
        this.register(new TokensGrammar2(), TokensNode);
        this.register(new TokenGrammar1(), TokenNode);
        this.register(new TokenGrammar2(), TokenNode);
        this.register(new TokenGrammar3(), TokenNode);
        this.register(new MacroDefGrammar(), MacroDefNode);
        this.register(new MacroBodyGrammar1(), MacroBodyNode);
        this.register(new MacroBodyGrammar2(), MacroBodyNode);
        this.register(new MacroBodyGrammar3(), MacroBodyNode);
        this.register(new MacroBodyGrammar4(), MacroBodyNode);
        this.finish(GrammarType.CERATOMYXA, BaseTokenNode);
    }
}
