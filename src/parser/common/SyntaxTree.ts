import type { SyntaxNode } from './SyntaxNode';

export abstract class SyntaxTree {
    protected abstract language: string;
    constructor(readonly root: SyntaxNode) {}
    toDicauda() {
        let out = `{[lang][${this.language}]}`;
        out += this.toDicaudaFrom(this.root);
        return out;
    }
    toDicaudaFrom(node: SyntaxNode) {
        const nodeBody = node.dicaudaBody;
        let out = `<(node)(${node.children.length})(${nodeBody.length})${nodeBody}>`;
        const origin = node.origin;
        const originBody = origin.kudoaBody;
        out += `{[token][${origin.row}][${origin.col}][${originBody.length}]${originBody}}`;
        node.children.forEach((child) => (out += this.toDicaudaFrom(child)));
        return out;
    }
}
