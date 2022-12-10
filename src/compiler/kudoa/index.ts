import type { TokenStreamConstructor } from '../../lexer/common';
import { TokenType } from '../../lexer/kudoa';
import { NodeType, SyntaxTree } from '../../parser/kudoa';

export class KudoaCompiler {
    compile(ast: SyntaxTree, stream: TokenStreamConstructor) {
        const out = new stream();
        const root = ast.root;
        const langNode = root.children[0];
        const rowsNode = root.children[1];
        if (root.type != NodeType.KUDOA || langNode.type != NodeType.LANG || rowsNode.type != NodeType.ROWS) {
            throw new Error('Unknown error');
        }

        if (langNode.children[5].origin.type != TokenType.STR || langNode.children[5].origin.value != out.language) {
            throw new Error(`Not a kudoa of language ${out.language}`);
        }

        
    }
}
