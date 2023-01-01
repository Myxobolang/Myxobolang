import type { SyntaxNode, SyntaxTree } from '../parser/common';

class ParserData {
    nodes = new Map<number, any>();
    tree: any = undefined;
}

const parserMap = new Map<string, ParserData>();

export function syntaxNode(language: string, nodeId: number): ClassDecorator {
    return (target) => {
        let temp: ParserData | undefined;
        if ((temp = parserMap.get(language)) == null) {
            temp = new ParserData();
            parserMap.set(language, temp);
        }
        temp.nodes.set(nodeId, target);
    };
}

export function syntaxTree(language: string): ClassDecorator {
    return (target) => {
        let temp: ParserData | undefined;
        if ((temp = parserMap.get(language)) == null) {
            temp = new ParserData();
            parserMap.set(language, temp);
        }
        temp.tree = target;
    };
}

export function getSyntaxNode(language: string, nodeId: number): new (...args: any[]) => SyntaxNode<any> {
    const temp = parserMap.get(language);
    if (temp == null) {
        throw new Error(`language ${language} does not exist`);
    }
    if (!temp.nodes.has(nodeId)) {
        throw new Error(`language ${language} does not have node ${nodeId}`);
    }
    return temp.nodes.get(nodeId);
}

export function getSyntaxTree(language: string): new (root: any) => SyntaxTree<any> {
    const temp = parserMap.get(language);
    if (temp == null) {
        throw new Error(`language ${language} does not exist`);
    }
    return temp.tree;
}
