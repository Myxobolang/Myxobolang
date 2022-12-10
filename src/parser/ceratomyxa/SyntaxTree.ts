import { SyntaxTree as BaseTree } from '../common';

import type { Node, NodeType } from './SyntaxNode';
import type { Token, TokenType } from '../../lexer/ceratomyxa';

export class SyntaxTree extends BaseTree<Node, NodeType, TokenType, Token> {
    protected language = 'ceratomyxa';
}