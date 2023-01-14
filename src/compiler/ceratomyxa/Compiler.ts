import { TokenType } from '../../lexer/ceratomyxa';
import type { SyntaxTree } from '../../parser/ceratomyxa';
import { BlockNode, CalNode, CeratomyxaNode, GlobalNode, NodeType, TypeNode } from '../../parser/ceratomyxa/SyntaxNode';
import { BaseType, PtrType, SimpleType, SymbolTable, Type, VarSymbol } from './SymbolTable';

interface IntWrapper {
    value: number;
}

export class Compiler {
    compile(tree: SyntaxTree) {
        const symbolTable = new SymbolTable();

        const compileCal = (
            node: CalNode,
            id: IntWrapper,
            blockId: IntWrapper,
            functionName: string,
            tableStack: SymbolTable[]
        ) => {
            return { last: '', code: '', type: new SimpleType(BaseType.INT) };
        };

        const compileBlock = (
            block: BlockNode,
            id: IntWrapper,
            blockId: IntWrapper,
            functionName: string,
            tableStack: SymbolTable[]
        ) => {
            let bId = blockId.value++;
            let labelName = `%${this.genName(functionName)}.${bId}`;
            const firstLabel = labelName;
            let out = `br label ${labelName}\n${labelName}:\n`;
            const sL = block.sentenceAmount();
            for (let i = 0; i < sL; i++) {
                const sentence = block.sentence(i);
                if (sentence.isVal()) {
                    const source = sentence.asVal();
                    const sourceNameToken = source.valName().origin;
                    if (sourceNameToken.type != TokenType.V) {
                        throw new Error('Unknown error');
                    }
                    const sourceName = sourceNameToken.value;

                    for (let i = 0; i < tableStack.length; i++) {
                        const table = tableStack[i];
                        if (table.vals.get(sourceName)) {
                            throw new Error(`Val ${sourceName} already exists`);
                        } else if (table.vars.get(sourceName)) {
                            throw new Error(`Val ${sourceName} is a var`);
                        } else if (table.functions.get(sourceName)) {
                            throw new Error(`Var ${sourceName} is a function`);
                        }
                    }

                    const sourceTypeNode = source.valType();
                    const sourceType = this.buildType(sourceTypeNode);
                    const init = source.initialValue();
                    if (init.type == NodeType.CAL) {
                        const cal = compileCal(init, id, blockId, functionName, tableStack);
                        out += cal.code;
                        const cType = this.changeType(cal.last, cal.type, sourceType, id);
                        out += cType.code;
                        out += `%${this.genName(functionName)}.${bId}.${this.genName(sourceName)} = ${cType.last}\n`;
                    } else {
                        const lengthToken = init.arrayLength().origin;
                        if (lengthToken.type != TokenType.I) {
                            throw new Error('Array length can only be constant integer');
                        }
                        const length = lengthToken.value;
                        if (length <= 0) {
                            throw new Error('Array length must > 0');
                        }
                        const type = this.buildType(init.elementType());
                        if (!sourceType.isPtr || !type.is(sourceType.base as Type)) {
                            throw new Error('Var type does not match');
                        }
                        out += `%${this.genName(functionName)}.${bId}.${this.genName(
                            sourceName
                        )} = alloca [${length} x ${type.toLL()}]\n`;
                    }
                } else if (sentence.isVar()) {
                    const source = sentence.asVar();
                    const sourceNameToken = source.varName().origin;
                    if (sourceNameToken.type != TokenType.V) {
                        throw new Error('Unknown error');
                    }
                    const sourceName = sourceNameToken.value;

                    for (let i = 0; i < tableStack.length; i++) {
                        const table = tableStack[i];
                        if (table.vars.get(sourceName)) {
                            throw new Error(`Var ${sourceName} already exists`);
                        } else if (table.vals.get(sourceName)) {
                            throw new Error(`Var ${sourceName} is a val`);
                        } else if (table.functions.get(sourceName)) {
                            throw new Error(`Var ${sourceName} is a function`);
                        }
                    }

                    const sourceTypeNode = source.varType();
                    const sourceType = this.buildType(sourceTypeNode);
                    const init = source.initialValue();
                    if (init.type == NodeType.CAL) {
                        const cal = compileCal(init, id, blockId, functionName, tableStack);
                        out += cal.code;
                        const cType = this.changeType(cal.last, cal.type, sourceType, id);
                        out += cType.code;
                        const id1 = id.value++;
                        out += `%${id1} = ${cType.last}\n`;
                        const varName = `%${this.genName(functionName)}.${bId}.${this.genName(sourceName)}`;
                        out += `${varName} = alloca ${sourceType.toLL()}\n`;
                        out += `store ${sourceType.toLL()} %${id1}, ${sourceType.toLL()}* ${varName}\n`;
                    }
                } else if (sentence.isSetVar()) {
                    const source = sentence.asSetVar();
                    const varNameToken = source.varName().origin;
                    if (varNameToken.type != TokenType.V) {
                        throw new Error('Unknown error');
                    }
                    const varName = varNameToken.value;
                    let varSymbol: VarSymbol | undefined;
                    for (let i = 0; i < tableStack.length; i++) {
                        if ((varSymbol = tableStack[i].vars.get(varName)) != null) {
                            break;
                        }
                    }
                    if (varSymbol == null) {
                        throw new Error(`Var ${varName} is not a var`);
                    }

                    const cal = compileCal(source.newValue(), id, blockId, functionName, tableStack);
                    out += cal.code;
                    const cType = this.changeType(cal.last, cal.type, varSymbol.type, id);
                    out += cType.code;
                    const outVarName = `%${this.genName(functionName)}.${bId}.${this.genName(varName)}`;
                    out += `store ${varSymbol.type.toLL()} ${cType.last}, ${varSymbol.type.toLL()}* ${outVarName}\n`;
                } else if (sentence.isIf()) {
                    const source = sentence.asIf();
                    const cal = compileCal(source.condition(), id, blockId, functionName, tableStack);
                    out += cal.code;
                    const id1 = id.value++;
                    out += `%${id1} = icmp ne ${cal.type.toLL()} ${cal.last}, 0\n`;
                    tableStack.push(new SymbolTable());
                    const block = compileBlock(source.ifBlock(), id, blockId, functionName, tableStack);
                    tableStack.pop();
                    bId = blockId.value++;
                    labelName = `%${this.genName(functionName)}.${bId}`;
                    out += `br i1 %${id1}, label ${block.firstLabel}, label ${labelName}\n`;
                    out += `br label ${labelName}\n${labelName}:\n`;
                } else if (sentence.isIfElse()) {
                    const source = sentence.asIf();
                    const cal = compileCal(source.condition(), id, blockId, functionName, tableStack);
                    out += cal.code;
                    const id1 = id.value++;
                    out += `%${id1} = icmp ne ${cal.type.toLL()} ${cal.last}, 0\n`;
                    tableStack.push(new SymbolTable());
                    const ifBlock = compileBlock(source.ifBlock(), id, blockId, functionName, tableStack);
                    tableStack.pop();
                    tableStack.push(new SymbolTable());
                    const elseBlock = compileBlock(source.ifBlock(), id, blockId, functionName, tableStack);
                    tableStack.pop();
                    bId = blockId.value++;
                    labelName = `%${this.genName(functionName)}.${bId}`;
                    out += `br i1 %${id1}, label ${ifBlock.firstLabel}, label ${elseBlock.firstLabel}\n`;
                    out += `br label ${labelName}\n${labelName}:\n`;
                } else if (sentence.isWhile()) {
                    const source = sentence.asWhile();
                    const cal = compileCal(source.condition(), id, blockId, functionName, tableStack);
                    out += cal.code;
                    const id1 = id.value++;
                    out += `%${id1} = icmp ne ${cal.type.toLL()} ${cal.last}, 0\n`;
                } else if (sentence.isBreak()) {
                } else {
                }
            }
            return { code: out, firstLabel: firstLabel };
        };

        const compileGlobal = (global: GlobalNode) => {
            const value = global.value();
            if (value.type == NodeType.FUNCTION_DECL) {
                const nameToken = value.functionName().origin;
                if (nameToken.type != TokenType.V) {
                    throw new Error('Unknown error');
                }
                const temp = symbolTable.functions.get(nameToken.value);
                if (temp == null) {
                    const paramTypes: Type[] = [];
                    const paramAmount = value.paramAmount();
                    for (let i = 0; i < paramAmount; i++) {
                        paramTypes.push(this.buildType(value.param(i).paramType()));
                    }
                    symbolTable.functions.set(nameToken.value, {
                        name: nameToken.value,
                        returnType: this.buildType(value.returnType()),
                        paramTypes: paramTypes,
                    });
                    return '';
                } else {
                    throw new Error('Cannot declare a function multiple times!');
                }
            } else if (value.type == NodeType.FUNCTION) {
                const nameToken = value.functionName().origin;
                if (nameToken.type != TokenType.V) {
                    throw new Error('Unknown error');
                }
                const temp = symbolTable.functions.get(nameToken.value);
                if (temp == null) {
                    const paramTypes: Type[] = [];
                    const paramAmount = value.paramAmount();
                    for (let i = 0; i < paramAmount; i++) {
                        paramTypes.push(this.buildType(value.param(i).paramType()));
                    }
                    symbolTable.functions.set(nameToken.value, {
                        name: nameToken.value,
                        returnType: this.buildType(value.returnType()),
                        paramTypes: paramTypes,
                    });
                } else {
                    const paramAmount = value.paramAmount();
                    for (let i = 0; i < paramAmount; i++) {
                        const paramType = this.buildType(value.param(i).paramType());
                        if (!temp.paramTypes[i].is(paramType)) {
                            throw new Error(`Param in function ${temp.name} error`);
                        }
                    }
                }
                const idWrapper = { value: 0 };
            }
            return '';
        };

        const root = tree.root as CeratomyxaNode;
        let out = '';
        let globals = root.globalAmount();
        for (let i = 0; i < globals; i++) {
            out += compileGlobal(root.global(i)) + '\n';
        }
        return out;
    }

    private buildType(node: TypeNode): Type {
        if (node.isPtr()) {
            const origin = this.buildType(node.originType());
            return new PtrType(origin);
        } else {
            const base = node.children[0];
            if (base.type != NodeType.TOKEN) {
                throw new Error(`Invalid type at row ${base.origin.row}, col ${base.origin.col}`);
            }
            const token = base.origin;
            if (token.type == TokenType.INT) {
                return new SimpleType(BaseType.INT);
            } else if (token.type == TokenType.CHAR) {
                return new SimpleType(BaseType.CHAR);
            } else if (token.type == TokenType.FLOAT) {
                return new SimpleType(BaseType.FLOAT);
            } else if (token.type == TokenType.VOID) {
                return new SimpleType(BaseType.VOID);
            } else {
                throw new Error(`Invalid type at row ${token.row}, col ${token.col}`);
            }
        }
    }

    private genName(name: string) {
        return name.replace('+', '$').replace('/', '_');
    }

    private changeType(originName: string, originType: Type, targetType: Type, id: IntWrapper) {
        let out = '';
        if (originType.is(targetType)) {
            return { code: out, last: originName };
        }
        if (
            !originType.isPtr &&
            !targetType.isPtr &&
            ((originType.base as BaseType) == BaseType.VOID || (targetType.base as BaseType) == BaseType.VOID)
        ) {
            throw new Error('Cannot convert void');
        }
        if (targetType.isPtr && originType.isPtr) {
            const id1 = id.value++;
            const id2 = id.value++;
            out += `%${id1} = ptrtoint ${originType.toLL()} ${originName} to i64\n`;
            out += `%${id2} = inttoptr i64 %${id1} to ${targetType.toLL()}\n`;
            return { code: out, last: `%${id2}` };
        } else if (targetType.isPtr && (originType.base as BaseType) == BaseType.FLOAT) {
            throw new Error('Cannot convert float to ptr');
        } else if (targetType.isPtr) {
            const id1 = id.value++;
            out += `%${id1} = inttoptr ${originType.toLL()} ${originName} to ${targetType.toLL()}\n`;
            return { code: out, last: `%${id1}` };
        } else if ((targetType.base as BaseType) == BaseType.FLOAT) {
            if (originType.isPtr) {
                throw new Error('Cannot convert ptr to float');
            } else {
                const id1 = id.value++;
                out += `%${id1} = sitofp ${originType.toLL()} ${originName} to ${targetType.toLL()}\n`;
                return { code: out, last: `%${id1}` };
            }
        } else {
            if (originType.isPtr) {
                const id1 = id.value++;
                out += `%${id1} = ptrtoint ${originType.toLL()} ${originName} to ${targetType.toLL()}\n`;
                return { code: out, last: `%${id1}` };
            } else if ((originType.base as BaseType) == BaseType.FLOAT) {
                const id1 = id.value++;
                out += `%${id1} = fptosi ${originType.toLL()} ${originName} to ${targetType.toLL()}\n`;
                return { code: out, last: `%${id1}` };
            } else if ((originType.base as BaseType) == BaseType.INT) {
                const id1 = id.value++;
                out += `%${id1} = trunc ${originType.toLL()} ${originName} to ${targetType.toLL()}\n`;
                return { code: out, last: `%${id1}` };
            } else {
                const id1 = id.value++;
                out += `%${id1} = sext ${originType.toLL()} ${originName} to ${targetType.toLL()}\n`;
                return { code: out, last: `%${id1}` };
            }
        }
    }
}
