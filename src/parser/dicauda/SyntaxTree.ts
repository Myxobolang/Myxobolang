import { SyntaxTree as BaseTree } from '../common';

import type { Node, NodeType } from './SyntaxNode';
import type { Token, TokenType } from '../../lexer/dicauda';
import { syntaxTree } from '../../util';

@syntaxTree('Dicauda')
export class SyntaxTree extends BaseTree<Node, NodeType, TokenType, Token> {
    protected language = 'Dicauda';
}
