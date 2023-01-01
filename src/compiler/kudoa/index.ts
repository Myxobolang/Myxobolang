import type { Compiler as BaseCompiler } from '../common';
import type { Token, TokenStream } from '../../lexer/common';
import { TokenType } from '../../lexer/kudoa';
import { NodeType, SyntaxTree } from '../../parser/kudoa';
import { getToken, getTokenStream } from '../../util';

export class Compiler implements BaseCompiler<SyntaxTree, TokenStream> {
    compile(ast: SyntaxTree) {
        const root = ast.root;
        const langNode = root.children[0];
        if (root.type != NodeType.KUDOA || langNode.type != NodeType.LANG) {
            throw new Error('Unknown error');
        }

        if (langNode.children[5].origin.type != TokenType.STR) {
            throw new Error(`Unknown error`);
        }

        const language = langNode.children[5].origin.value;
        const out = new (getTokenStream(language))();

        for (let i = 1; i < root.children.length; i++) {
            const rowNode = root.children[i];
            if (rowNode.type != NodeType.ROW) {
                throw new Error('Unknown error');
            }

            const rowToken = rowNode.children[5].origin;
            if (rowToken.type != TokenType.STR) {
                throw new Error('Unknown error');
            }

            const row = parseInt(rowToken.value);

            for (let i = 8; i < rowNode.children.length; i++) {
                const tokenNode = rowNode.children[i];
                if (tokenNode.type != NodeType.TOKEN) {
                    throw new Error('Unknown error');
                }

                const col = parseInt(tokenNode.children[4].origin.raw);
                const tokenType = parseInt(tokenNode.children[5].origin.raw);
                const kudoaBody: string[] = [];

                for (let i = 6; i < tokenNode.children.length - 1; i++) {
                    kudoaBody.push(tokenNode.children[i].origin.raw);
                }

                const token = {
                    type: tokenType,
                    row: row,
                    col: col,
                } as Token;

                Reflect.setPrototypeOf(token, getToken(language, tokenType).prototype);
                token.fromKudoa(kudoaBody);
                out.add(token);
            }
        }

        return out;
    }
}
