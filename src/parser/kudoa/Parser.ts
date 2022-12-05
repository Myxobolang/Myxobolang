import { Parser as BaseParser } from '../common';
import {
    BaseTokenNode,
    KudoaNode,
    LangNode,
    Node,
    NodeType,
    RowNode,
    RowsNode,
    TokenBodiesNode,
    TokenBodyNode,
    TokenNode,
    TokensNode,
} from './SyntaxNode';
import {
    GrammarType,
    KudoaGrammar,
    LangGrammar,
    RowGrammar1,
    RowGrammar2,
    RowsGrammar1,
    RowsGrammar2,
    TokenBodiesGrammar1,
    TokenBodiesGrammar2,
    TokenBodyGrammar,
    TokenGrammar,
    TokensGrammar1,
    TokensGrammar2,
} from './Grammar';
import type { Token, TokenStream, TokenType } from '../../lexer/kudoa';
import { SyntaxTree } from './SyntaxTree';

export class Parser extends BaseParser<Node, GrammarType, NodeType, TokenType, Token, TokenStream, SyntaxTree> {
    constructor() {
        super(SyntaxTree);
        this.register(new KudoaGrammar(), KudoaNode);
        this.register(new LangGrammar(), LangNode);
        this.register(new RowsGrammar1(), RowsNode);
        this.register(new RowsGrammar2(), RowsNode);
        this.register(new RowGrammar1(), RowNode);
        this.register(new RowGrammar2(), RowNode);
        this.register(new TokensGrammar1(), TokensNode);
        this.register(new TokensGrammar2(), TokensNode);
        this.register(new TokenGrammar(), TokenNode);
        this.register(new TokenBodiesGrammar1(), TokenBodiesNode);
        this.register(new TokenBodiesGrammar2(), TokenBodiesNode);
        this.register(new TokenBodyGrammar(), TokenBodyNode);
        this.finish(GrammarType.KUDOA, BaseTokenNode);
    }
}
