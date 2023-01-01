import type { Token } from '../../lexer/common';
import type { SyntaxNode } from './SyntaxNode';

export abstract class SyntaxTree<
    D extends SyntaxNode<D, N, T, O>,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>
> {
    protected abstract language: string;
    constructor(readonly root: D) {}
    toDicauda() {
        let out = `{[lang][${this.language}]}`;
        out += this.toDicaudaFrom(this.root);
        return out;
    }

    toString() {
        return this.toDicauda();
    }

    private toDicaudaFrom(node: D) {
        const nodeBody = node.dicaudaBody;
        let nodeBodyOut = '';
        nodeBody.forEach((str) => (nodeBodyOut += `(${SyntaxTree.genString(str)})`));
        let out = `<(node)(${node.children.length})(${node.type})${nodeBodyOut}>`;
        const origin = node.origin;
        const originBody = origin.kudoaBody;
        let originBodyOut = '';
        originBody.forEach((str) => (originBodyOut += `[${SyntaxTree.genString(str)}]`));
        out += `{[token][${origin.row}][${origin.col}][${origin.type}]${originBodyOut}}`;
        node.children.forEach((child) => (out += this.toDicaudaFrom(child)));
        return out;
    }

    private static genString(str: string) {
        if (/^((lang)|(row)|(token)|(node))$/.test(str) || str.charAt(0) == ':') {
            str = `:${str}`;
        }
        return str
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/\[/g, '\\[')
            .replace(/\]/g, '\\]')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/</g, '\\<')
            .replace(/>/g, '\\>');
    }

    private toRawFrom(node: D, out: { value: string }, line: { value: string }, lineNum: { value: number }) {
        if (node.children.length == 0) {
            const token = node.origin;
            for (; lineNum.value < token.row; lineNum.value++) {
                out.value += line.value;
                out.value += '\n';
                line.value = '';
            }
            const currentCol = line.value.length;
            for (let i = currentCol; i < token.col; i++) {
                line.value += ' ';
            }
            line.value += token.raw;
        } else {
            node.children.forEach((child) => this.toRawFrom(child, out, line, lineNum));
        }
    }

    toRaw() {
        const out = { value: '' };
        const line = { value: '' };
        const lineNum = { value: 0 };
        this.toRawFrom(this.root, out, line, lineNum);
        out.value += line.value;
        out.value += '\n';
        return out.value;
    }
}

export interface SyntaxTreeConstructor<
    D extends SyntaxNode<D, N, T, O>,
    N extends number,
    T extends number,
    O extends Token<T>,
    R extends SyntaxTree<D, N, T, O>
> {
    new (root: D): R;
}
