import { Parser as BaseParser } from '../common';
import {
    Node,
    NodeType,
    DicaudaNode,
    LangNode,
    NodesNode,
    NodeNode,
    NodeNodeNode,
    NodeBodiesNode,
    NodeBodyNode,
    NodeTokenNode,
    TokenBodiesNode,
    TokenBodyNode,
    BaseTokenNode,
} from './SyntaxNode';
import {
    GrammarType,
    DicaudaGrammar,
    LangGrammar,
    NodesGrammar1,
    NodesGrammar2,
    NodeGrammar,
    NodeNodeGrammar,
    NodeBodiesGrammar1,
    NodeBodiesGrammar2,
    NodeBodyGrammar,
    NodeTokenGrammar,
    TokenBodiesGrammar1,
    TokenBodiesGrammar2,
    TokenBodyGrammar,
} from './Grammar';
import { SyntaxTree } from './SyntaxTree';
import type { Token, TokenStream, TokenType } from '../../lexer/dicauda';

export class Parser extends BaseParser<Node, GrammarType, NodeType, TokenType, Token, TokenStream, SyntaxTree> {
    constructor() {
        super(SyntaxTree);
        this.register(new DicaudaGrammar(), DicaudaNode);
        this.register(new LangGrammar(), LangNode);
        this.register(new NodesGrammar1(), NodesNode);
        this.register(new NodesGrammar2(), NodesNode);
        this.register(new NodeGrammar(), NodeNode);
        this.register(new NodeNodeGrammar(), NodeNodeNode);
        this.register(new NodeBodiesGrammar1(), NodeBodiesNode);
        this.register(new NodeBodiesGrammar2(), NodeBodiesNode);
        this.register(new NodeBodyGrammar(), NodeBodyNode);
        this.register(new NodeTokenGrammar(), NodeTokenNode);
        this.register(new TokenBodiesGrammar1(), TokenBodiesNode);
        this.register(new TokenBodiesGrammar2(), TokenBodiesNode);
        this.register(new TokenBodyGrammar(), TokenBodyNode);
        this.finish(GrammarType.DICAUDA, BaseTokenNode);
    }
}
