import type { SyntaxTree } from '../../parser/common';

export interface Compiler<S extends SyntaxTree<any>, T> {
    compile(ast: S): T;
}
