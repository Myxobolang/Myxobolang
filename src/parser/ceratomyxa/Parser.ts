import { Parser as BaseParser } from '../common';
import {
    ArrayNode,
    BlockNode,
    BreakNode,
    CeratomyxaNode,
    FunctionDeclNode,
    FunctionNode,
    GlobalNode,
    GlobalsNode,
    IfElseNode,
    IfNode,
    Node,
    NodeType,
    ParamListNode,
    ParamNode,
    ReturnEmptyNode,
    ReturnNode,
    SentenceNode,
    SentencesNode,
    SetVarNode,
    TokenNode,
    TypeNode,
    ValNode,
    VarNode,
    WhileNode,
} from './SyntaxNode';
import {
    ArrayGrammar,
    BlockGrammar,
    BreakGrammar,
    CalGrammar,
    CeratomyxaGrammar,
    FunctionDeclGrammar,
    FunctionGrammar,
    GlobalGrammar1,
    GlobalGrammar2,
    GlobalGrammar3,
    GlobalGrammar4,
    GlobalsGrammar1,
    GlobalsGrammar2,
    GrammarType,
    IfElseGrammar,
    IfGrammar,
    ParamGrammar1,
    ParamGrammar2,
    ParamListGrammar1,
    ParamListGrammar2,
    ReturnEmptyGrammar,
    ReturnGrammar,
    SentenceGrammar1,
    SentenceGrammar2,
    SentenceGrammar3,
    SentenceGrammar4,
    SentenceGrammar5,
    SentenceGrammar6,
    SentenceGrammar7,
    SentenceGrammar8,
    SentencesGrammar1,
    SentencesGrammar2,
    SetVarGrammar1,
    SetVarGrammar2,
    TypeGrammar1,
    TypeGrammar2,
    TypeGrammar3,
    TypeGrammar4,
    TypeGrammar5,
    ValGrammar1,
    ValGrammar2,
    VarGrammar1,
    VarGrammar2,
    WhileGrammar,
} from './Grammar';
import { SyntaxTree } from './SyntaxTree';
import type { Token, TokenStream, TokenType } from '../../lexer/ceratomyxa';

export class Parser extends BaseParser<Node, GrammarType, NodeType, TokenType, Token, TokenStream, SyntaxTree> {
    constructor() {
        super(SyntaxTree);
        this.register(new CeratomyxaGrammar(), CeratomyxaNode);
        this.register(new GlobalsGrammar1(), GlobalsNode);
        this.register(new GlobalsGrammar2(), GlobalsNode);
        this.register(new GlobalGrammar1(), GlobalNode);
        this.register(new GlobalGrammar2(), GlobalNode);
        this.register(new GlobalGrammar3(), GlobalNode);
        this.register(new GlobalGrammar4(), GlobalNode);
        this.register(new FunctionDeclGrammar(), FunctionDeclNode);
        this.register(new FunctionGrammar(), FunctionNode);
        this.register(new ParamListGrammar1(), ParamListNode);
        this.register(new ParamListGrammar2(), ParamListNode);
        this.register(new ParamGrammar1(), ParamNode);
        this.register(new ParamGrammar2(), ParamNode);
        this.register(new BlockGrammar(), BlockNode);
        this.register(new SentencesGrammar1(), SentencesNode);
        this.register(new SentencesGrammar2(), SentencesNode);
        this.register(new SentenceGrammar1(), SentenceNode);
        this.register(new SentenceGrammar2(), SentenceNode);
        this.register(new SentenceGrammar3(), SentenceNode);
        this.register(new SentenceGrammar4(), SentenceNode);
        this.register(new SentenceGrammar5(), SentenceNode);
        this.register(new SentenceGrammar6(), SentenceNode);
        this.register(new SentenceGrammar7(), SentenceNode);
        this.register(new SentenceGrammar8(), SentenceNode);
        this.register(new VarGrammar1(), VarNode);
        this.register(new VarGrammar2(), VarNode);
        this.register(new ValGrammar1(), ValNode);
        this.register(new ValGrammar2(), ValNode);
        this.register(new SetVarGrammar1(), SetVarNode);
        this.register(new SetVarGrammar2(), SetVarNode);
        this.register(new IfElseGrammar(), IfElseNode);
        this.register(new IfGrammar(), IfNode);
        this.register(new WhileGrammar(), WhileNode);
        this.register(new BreakGrammar(), BreakNode);
        this.register(new ReturnGrammar(), ReturnNode);
        this.register(new ReturnEmptyGrammar(), ReturnEmptyNode);
        this.register(new TypeGrammar1(), TypeNode);
        this.register(new TypeGrammar2(), TypeNode);
        this.register(new TypeGrammar3(), TypeNode);
        this.register(new TypeGrammar4(), TypeNode);
        this.register(new TypeGrammar5(), TypeNode);
        this.register(new ArrayGrammar(), ArrayNode);
        this.register(new CalGrammar());
        this.finish(GrammarType.CERATOMYXA, TokenNode);
    }
}
