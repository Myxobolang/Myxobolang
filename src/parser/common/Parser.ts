import type { Token, TokenStream } from '../../lexer/common';
import { AllGrammar, CustomGrammar, GrammarType, NameType, SimpleGrammar } from './Grammar';
import { ParserError } from './ParserError';
import type { SyntaxNode, SyntaxNodeConstructor } from './SyntaxNode';
import type { SyntaxTree, SyntaxTreeConstructor } from './SyntaxTree';

class SimpleSymbol<
    D extends SyntaxNode<D, N, T, O>,
    G extends number,
    N extends number,
    T extends number,
    O extends Token<T>,
    S extends TokenStream<O>
> {
    constructor(readonly name: G) {}
    readonly rules: Rule<D, G, N, T, O, S>[] = [];
}

class CustomSymbol<
    D extends SyntaxNode<D, N, T, O>,
    G extends number,
    N extends number,
    T extends number,
    O extends Token<T>,
    S extends TokenStream<O>
> {
    constructor(readonly name: G, readonly origin: CustomGrammar<D, G, N, T, O, S>) {}
}

class TokenSymbol<T extends number> {
    constructor(readonly name: T) {}
}

type Symbol<
    D extends SyntaxNode<D, N, T, O>,
    G extends number,
    N extends number,
    T extends number,
    O extends Token<T>,
    S extends TokenStream<O>
> = SimpleSymbol<D, G, N, T, O, S> | CustomSymbol<D, G, N, T, O, S> | TokenSymbol<T>;

class Rule<
    D extends SyntaxNode<D, N, T, O>,
    G extends number,
    N extends number,
    T extends number,
    O extends Token<T>,
    S extends TokenStream<O>
> {
    constructor(readonly node: SyntaxNodeConstructor<D, N, T, O>) {}
    to: Symbol<D, G, N, T, O, S>[] = [];
}

export abstract class Parser<
    D extends SyntaxNode<D, N, T, O>,
    G extends number = number,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>,
    S extends TokenStream<O> = TokenStream<O>,
    R extends SyntaxTree<D, N, T, O> = SyntaxTree<D, N, T, O>
> {
    private finished = false;
    private grammars: AllGrammar<D, G, N, T, O, S>[] = [];
    private rootGrammar!: G;
    private tokenNode!: SyntaxNodeConstructor<D, N, T, O>;
    private nodes: (SyntaxNodeConstructor<D, N, T, O> | null)[] = [];
    private rootSymbol = null as unknown as Symbol<D, G, N, T, O, S>;
    private simples = new Map<G, SimpleSymbol<D, G, N, T, O, S>>();
    private customs = new Map<G, CustomSymbol<D, G, N, T, O, S>>();
    private tokens = new Map<T, TokenSymbol<T>>();

    protected constructor(private tree: SyntaxTreeConstructor<D, N, T, O, R>) {}

    protected register(grammar: SimpleGrammar<G, T>, node: SyntaxNodeConstructor<D, N, T, O>): void;
    protected register(grammar: CustomGrammar<D, G, N, T, O, S>): void;

    protected register(grammar: AllGrammar<D, G, N, T, O, S>, node?: SyntaxNodeConstructor<D, N, T, O>) {
        this.grammars.push(grammar);
        if (node != null) {
            this.nodes.push(node);
        } else {
            this.nodes.push(null);
        }
        if (grammar.type == GrammarType.SIMPLE) {
            grammar.to.forEach((name) => {
                if (name.type == NameType.TOKEN && !this.tokens.has(name.value)) {
                    this.tokens.set(name.value, new TokenSymbol(name.value));
                }
            });
        }
    }

    protected finish(rootGrammar: G, tokenNode: SyntaxNodeConstructor<D, N, T, O>) {
        this.finished = true;
        this.rootGrammar = rootGrammar;
        this.tokenNode = tokenNode;
        this.init();
    }

    private init() {
        this.createSymbols();
        this.createRules();

        this.rootSymbol = this.simples.get(this.rootGrammar as G) as Symbol<D, G, N, T, O, S>;
        if (this.rootSymbol == null) {
            this.rootSymbol = this.customs.get(this.rootGrammar as G) as Symbol<D, G, N, T, O, S>;
        }
    }

    private createSymbols() {
        this.grammars.forEach((grammar) => {
            if (grammar.type == GrammarType.SIMPLE && !this.simples.has(grammar.name)) {
                const temp = new SimpleSymbol<D, G, N, T, O, S>(grammar.name);
                this.simples.set(grammar.name, temp);
                if (grammar.name == this.rootGrammar) {
                    this.rootSymbol = temp;
                }
            }
            if (grammar.type == GrammarType.CUSTOM && !this.customs.has(grammar.name)) {
                const temp = new CustomSymbol<D, G, N, T, O, S>(grammar.name, grammar);
                this.customs.set(grammar.name, temp);
                if (grammar.name == this.rootGrammar) {
                    this.rootSymbol = temp;
                }
            }
        });
    }

    private createRules() {
        this.grammars.forEach((grammar, index) => {
            if (grammar.type == GrammarType.SIMPLE) {
                const rule = new Rule<D, G, N, T, O, S>(this.nodes[index] as SyntaxNodeConstructor<D, N, T, O>);
                grammar.to.forEach((name) => {
                    let _to: Symbol<D, G, N, T, O, S> | undefined;
                    if (name.type == NameType.GRAMMAR) {
                        if ((_to = this.simples.get(name.value)) == null) {
                            _to = this.customs.get(name.value);
                        }
                    } else {
                        _to = this.tokens.get(name.value);
                    }
                    const to = _to as Symbol<D, G, N, T, O, S>;
                    rule.to.push(to);
                });
                const symbol = this.simples.get(grammar.name) as SimpleSymbol<D, G, N, T, O, S>;
                symbol.rules.push(rule);
            }
        });
    }

    private checkNext(stream: S) {
        if (stream.isEmpty()) {
            throw new ParserError(stream.get(-1));
        }
        return stream.next();
    }

    private parseFrom(symbol: Symbol<D, G, N, T, O, S>, stream: S): D {
        if (symbol instanceof TokenSymbol) {
            const strId = stream.push();
            const token = this.checkNext(stream);
            if (token.type == symbol.name) {
                return new this.tokenNode(token);
            }
            stream.pop(strId);
            throw new ParserError(token);
        } else if (symbol instanceof CustomSymbol) {
            const strId = stream.push();
            try {
                return symbol.origin.parse(stream);
            } catch (e) {
                stream.pop(strId);
                if (e instanceof ParserError) {
                    throw e;
                } else if (e instanceof Error) {
                    throw new ParserError(this.checkNext(stream), e);
                }
                throw e;
            }
        } else {
            let err: any;
            for (let i = 0; i < symbol.rules.length; i++) {
                const rule = symbol.rules[i];
                const strId = stream.push();
                try {
                    const nodes: D[] = [];
                    rule.to.forEach((to) => {
                        nodes.push(this.parseFrom(to, stream));
                    });
                    return new rule.node(...nodes);
                } catch (e) {
                    err = e;
                    stream.pop(strId);
                }
            }
            if (err instanceof ParserError) {
                throw err;
            } else if (err instanceof Error) {
                throw new ParserError(this.checkNext(stream), err);
            }
            throw err;
        }
    }

    parse(stream: S) {
        if (!this.finished) {
            throw new Error('Method finish not used in constructor');
        }

        return new this.tree(this.parseFrom(this.rootSymbol, stream));
    }
}
