import { Parser as BaseParser } from '../common';
import type { Token, TokenStream, TokenType } from '../../lexer/myxobolang';
import { SyntaxTree } from './SyntaxTree';
import {
    GrammarType,
    MyxobolangGrammar,
    NamespaceGrammar,
    TokensGrammar1,
    TokensGrammar2,
    TokensGrammar3,
    TokensGrammar4,
} from './Grammar';
import { NodeType, Node, MyxobolangNode, TokensNode, NamespaceNode, TokenNode } from './SyntaxNode';

export class Parser extends BaseParser<Node, GrammarType, NodeType, TokenType, Token, TokenStream, SyntaxTree> {
    constructor() {
        super(SyntaxTree);
        this.register(new MyxobolangGrammar(), MyxobolangNode);
        this.register(new TokensGrammar1(), TokensNode);
        this.register(new TokensGrammar2(), TokensNode);
        this.register(new TokensGrammar3(), TokensNode);
        this.register(new TokensGrammar4(), TokensNode);
        this.register(new NamespaceGrammar(), NamespaceNode);
        this.finish(GrammarType.MYXOBOLANG, TokenNode);
    }
}
