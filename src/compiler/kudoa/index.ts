import { TokenType } from '../../lexer/kudoa';
import { NodeType, SyntaxTree } from '../../parser/kudoa';

export class KudoaCompiler {
    compile(ast: SyntaxTree) {
        const root = ast.root;
        const langNode = root.children[0];
        const rowsNode = root.children[1];
        if (root.type != NodeType.KUDOA || langNode.type != NodeType.LANG || rowsNode.type != NodeType.ROWS) {
            throw new Error('Unknown error');
        }
    }
}
