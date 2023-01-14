export enum GrammarType {
    CERATOMYXA,
    GLOBALS,
    GLOBAL,
    FUNCTION_DECL,
    FUNCTION,
    PARAM_LIST,
    PARAM,
    BLOCK,
    SENTENCES,
    SENTENCE,
    VAR,
    VAL,
    SET_VAR,
    CAL,
    IF_ELSE,
    IF,
    WHILE,
    BREAK,
    RETURN,
    RETURN_EMPTY,
    TYPE,
    ARRAY,
}

import { NameType, SimpleGrammar, CustomGrammar, ParserError } from '../common';
import { Token, TokenStream, TokenType } from '../../lexer/ceratomyxa';
import { DoNode, FunctionUseNode, MoNode, Node, NodeType, TokenNode, UseParamNode } from './SyntaxNode';

export class CeratomyxaGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.CERATOMYXA, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.GLOBALS,
            },
        ]);
    }
}

export class GlobalsGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.GLOBALS, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.GLOBAL,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.GLOBALS,
            },
        ]);
    }
}

export class GlobalsGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.GLOBALS, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.GLOBAL,
            },
        ]);
    }
}

export class GlobalGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.GLOBAL, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.FUNCTION_DECL,
            },
        ]);
    }
}

export class GlobalGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.GLOBAL, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.FUNCTION,
            },
        ]);
    }
}

export class GlobalGrammar3 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.GLOBAL, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.VAR,
            },
        ]);
    }
}

export class GlobalGrammar4 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.GLOBAL, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.VAL,
            },
        ]);
    }
}

export class FunctionDeclGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.FUNCTION_DECL, [
            {
                type: NameType.TOKEN,
                value: TokenType.FUNCTION,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.PARAM_LIST,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class FunctionGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.FUNCTION_DECL, [
            {
                type: NameType.TOKEN,
                value: TokenType.FUNCTION,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.PARAM_LIST,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.BLOCK,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
        ]);
    }
}

export class ParamListGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.PARAM_LIST, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.PARAM,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.PARAM_LIST,
            },
        ]);
    }
}

export class ParamListGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.PARAM_LIST, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.PARAM,
            },
        ]);
    }
}

export class ParamGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.PARAM, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.COMMA,
            },
        ]);
    }
}

export class ParamGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.PARAM, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.COMMA,
            },
        ]);
    }
}

export class BlockGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.BLOCK, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.SENTENCES,
            },
        ]);
    }
}

export class SentencesGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.SENTENCE,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.SENTENCES,
            },
        ]);
    }
}

export class SentencesGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCES, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.SENTENCE,
            },
        ]);
    }
}

export class SentenceGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.VAR,
            },
        ]);
    }
}

export class SentenceGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.VAL,
            },
        ]);
    }
}

export class SentenceGrammar3 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.SET_VAR,
            },
        ]);
    }
}

export class SentenceGrammar4 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.IF_ELSE,
            },
        ]);
    }
}

export class SentenceGrammar5 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.IF,
            },
        ]);
    }
}

export class SentenceGrammar6 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.WHILE,
            },
        ]);
    }
}

export class SentenceGrammar7 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.RETURN,
            },
        ]);
    }
}

export class SentenceGrammar8 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SENTENCE, [
            {
                type: NameType.GRAMMAR,
                value: GrammarType.RETURN_EMPTY,
            },
        ]);
    }
}

export class VarGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.VAR, [
            {
                type: NameType.TOKEN,
                value: TokenType.VAR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.EQ,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.ARRAY,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class VarGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.VAR, [
            {
                type: NameType.TOKEN,
                value: TokenType.VAR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.EQ,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class ValGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.VAL, [
            {
                type: NameType.TOKEN,
                value: TokenType.VAL,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.EQ,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.ARRAY,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class ValGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.VAL, [
            {
                type: NameType.TOKEN,
                value: TokenType.VAL,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.EQ,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class SetVarGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SET_VAR, [
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.EQ,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
        ]);
    }
}

export class SetVarGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.SET_VAR, [
            {
                type: NameType.TOKEN,
                value: TokenType.MO,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.V,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.EQ,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
        ]);
    }
}

export class IfElseGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.IF_ELSE, [
            {
                type: NameType.TOKEN,
                value: TokenType.IF,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.BLOCK,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ELSE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.BLOCK,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
        ]);
    }
}

export class IfGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.IF, [
            {
                type: NameType.TOKEN,
                value: TokenType.IF,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.BLOCK,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
        ]);
    }
}

export class WhileGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.WHILE, [
            {
                type: NameType.TOKEN,
                value: TokenType.WHILE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RBR,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.LSBR,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.BLOCK,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.RSBR,
            },
        ]);
    }
}

export class BreakGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.BREAK, [
            {
                type: NameType.TOKEN,
                value: TokenType.BREAK,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class ReturnGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.RETURN, [
            {
                type: NameType.TOKEN,
                value: TokenType.RETURN,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.CAL,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class ReturnEmptyGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.RETURN_EMPTY, [
            {
                type: NameType.TOKEN,
                value: TokenType.RETURN,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.ENDS,
            },
        ]);
    }
}

export class TypeGrammar1 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TYPE, [
            {
                type: NameType.TOKEN,
                value: TokenType.MO,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
        ]);
    }
}

export class TypeGrammar2 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TYPE, [
            {
                type: NameType.TOKEN,
                value: TokenType.INT,
            },
        ]);
    }
}

export class TypeGrammar3 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TYPE, [
            {
                type: NameType.TOKEN,
                value: TokenType.FLOAT,
            },
        ]);
    }
}

export class TypeGrammar4 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TYPE, [
            {
                type: NameType.TOKEN,
                value: TokenType.CHAR,
            },
        ]);
    }
}

export class TypeGrammar5 extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.TYPE, [
            {
                type: NameType.TOKEN,
                value: TokenType.VOID,
            },
        ]);
    }
}

export class ArrayGrammar extends SimpleGrammar<GrammarType, TokenType> {
    constructor() {
        super(GrammarType.ARRAY, [
            {
                type: NameType.TOKEN,
                value: TokenType.ARRAY,
            },
            {
                type: NameType.GRAMMAR,
                value: GrammarType.TYPE,
            },
            {
                type: NameType.TOKEN,
                value: TokenType.I,
            },
        ]);
    }
}

export class CalGrammar extends CustomGrammar<Node, GrammarType, NodeType, TokenType, Token, TokenStream> {
    constructor() {
        super(GrammarType.CAL, (from) => {
            const parse = (inComma: boolean) => {
                const valueStack: Node[] = [];
                const moStack: Node[] = [];
                const doStack: Node[] = [];

                const popMoStack = () => {
                    let temp = moStack.pop();
                    if (temp == null) {
                        throw new Error('Unknown error');
                    }
                    if (temp.type == NodeType.TOKEN && temp.origin.type == TokenType.MO) {
                        throw new ParserError(temp.origin);
                    }
                    while (moStack.length > 0) {
                        const temp2 = moStack.pop();
                        if (temp2 == null) {
                            throw new Error('Unknown error');
                        }
                        temp = new MoNode(temp2, temp);
                    }
                    return temp;
                };

                const popDoStack = () => {
                    if (doStack.length == 0) {
                        if (valueStack.length > 1) {
                            throw new ParserError(valueStack[valueStack.length - 1].origin);
                        }
                        const out = valueStack.pop();
                        if (out == null) {
                            throw new Error('Unknown error');
                        }
                        return out;
                    }
                    let lTemp = valueStack.pop();
                    if (lTemp == null) {
                        throw new Error('Unknown error');
                    }
                    let doTemp = doStack.pop();
                    if (doTemp == null) {
                        throw new ParserError(lTemp.origin);
                    }
                    let rTemp = valueStack.pop();
                    if (rTemp == null) {
                        throw new ParserError(doTemp.origin);
                    }
                    rTemp = new DoNode(lTemp, doTemp, rTemp);
                    while (doStack.length > 0) {
                        doTemp = doStack.pop();
                        if (doTemp == null) {
                            throw new ParserError(rTemp.origin);
                        }
                        lTemp = valueStack.pop();
                        if (lTemp == null) {
                            throw new ParserError(doTemp.origin);
                        }
                        rTemp = new DoNode(lTemp, doTemp, rTemp);
                    }
                    return rTemp;
                };

                const parseFunctionUse = () => {
                    const funcName = from.next();
                    if (funcName.type != TokenType.V) {
                        throw new ParserError(funcName);
                    }
                    const lBr = from.next();
                    if (lBr.type != TokenType.LBR) {
                        throw new ParserError(lBr);
                    }
                    const params: Node[] = [];
                    let temp: Node;
                    for (;;) {
                        try {
                            temp = parse(false);
                        } catch (e) {
                            break;
                        }
                        const comma = from.next();
                        if (comma.type != TokenType.COMMA) {
                            throw new ParserError(comma);
                        }
                        params.push(new UseParamNode(temp, new TokenNode(comma)));
                    }
                    const rBr = from.next();
                    if (rBr.type != TokenType.RBR) {
                        throw new ParserError(rBr);
                    }

                    return new FunctionUseNode(funcName, lBr, ...params, rBr);
                };

                if (from.isEmpty()) {
                    if (inComma) {
                        throw new ParserError(from.get(-1));
                    } else {
                        if (moStack.length > 0) {
                            valueStack.push(popMoStack());
                        }
                        return popDoStack();
                    }
                }

                for (;;) {
                    const token = from.get(0);
                    if (token.type == TokenType.V) {
                        let needParseFunction = false;
                        if (from.size() > 1) {
                            const nextToken = from.get(1);
                            if (nextToken.type == TokenType.LBR) {
                                needParseFunction = true;
                                moStack.push(parseFunctionUse());
                            }
                        }
                        if (!needParseFunction) {
                            moStack.push(new TokenNode(token));
                            from.next();
                        }
                        valueStack.push(popMoStack());
                    } else if (token.type == TokenType.I || token.type == TokenType.F) {
                        moStack.push(new TokenNode(token));
                        from.next();
                        valueStack.push(popMoStack());
                    } else if (token.type == TokenType.MO) {
                        moStack.push(new TokenNode(token));
                        from.next();
                    } else if (token.type == TokenType.DO) {
                        let needPop = true;
                        if (doStack.length == 0) {
                            needPop = false;
                        } else {
                            let peak = doStack[doStack.length - 1].origin;
                            if (peak.type != TokenType.DO) {
                                throw new Error('Unknown error');
                            }
                            if (peak.priority < token.priority) {
                                needPop = false;
                            }
                        }
                        if (needPop) {
                            valueStack.push(popDoStack());
                        }
                        doStack.push(new TokenNode(token));
                        from.next();
                    } else if (token.type == TokenType.LBR) {
                        moStack.push(parse(true));
                        valueStack.push(popMoStack());
                    } else if (token.type == TokenType.RBR) {
                        if (inComma) {
                            from.next();
                            if (moStack.length > 0) {
                                valueStack.push(popMoStack());
                            }
                            return popDoStack();
                        } else {
                            throw new ParserError(token);
                        }
                    } else {
                        if (!inComma) {
                            if (moStack.length > 0) {
                                valueStack.push(popMoStack());
                            }
                            return popDoStack();
                        } else {
                            throw new ParserError(token);
                        }
                    }
                }
            };

            return parse(false);
        });
    }
}
