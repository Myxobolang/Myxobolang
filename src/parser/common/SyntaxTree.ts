import type { Token } from '../../lexer/common';
import type { SyntaxNode } from './SyntaxNode';

export abstract class SyntaxTree<N extends number = number, T extends number = number, O extends Token<T> = Token<T>> {
    protected abstract language: string;
    constructor(readonly root: SyntaxNode<N, T, O>) {}
    toDicauda() {
        let out = `{[lang][${this.language}]}`;
        out += this.toDicaudaFrom(this.root);
        return out;
    }

    toString() {
        return this.toDicauda();
    }

    private toDicaudaFrom(node: SyntaxNode<N, T, O>) {
        const nodeBody = node.dicaudaBody;
        let nodeBodyOut = '';
        nodeBody.forEach((str) => (nodeBodyOut += `[${SyntaxTree.genString(str)}]`));
        let out = `<(node)(${node.children.length})(${nodeBody.length})${nodeBodyOut}>`;
        const origin = node.origin;
        const originBody = origin.kudoaBody;
        let originBodyOut = '';
        originBody.forEach((str) => (originBodyOut += `[${SyntaxTree.genString(str)}]`));
        out += `{[token][${origin.row}][${origin.col}][${originBody.length}]${originBodyOut}}`;
        node.children.forEach((child) => (out += this.toDicaudaFrom(child)));
        return out;
    }

    private static genString(str: string) {
        if (/^(lang)|(row)|(token)|(node)$/.test(str) || str.charAt(0) == ':') {
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
}

export interface SyntaxTreeConstructor<N extends number, T extends number, O extends Token<T>> {
    new (root: SyntaxNode<N, T, O>): SyntaxTree<N, T, O>;
}
