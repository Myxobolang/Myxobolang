import type { Token, TokenStream } from '../../lexer/common';
import { AllGrammar, CustomGrammar, GrammarType, NameType, SimpleGrammar } from './Grammar';
import { ParserError } from './ParserError';
import type { SyntaxNode, SyntaxNodeConstructor } from './SyntaxNode';

class SimpleSymbol<G extends number, N extends number, T extends number, O extends Token<T>, S extends TokenStream<O>> {
    constructor(readonly name: G) {}
    readonly rules: Rule<G, N, T, O, S>[] = [];
}

class CustomSymbol<G extends number, N extends number, T extends number, O extends Token<T>, S extends TokenStream<O>> {
    constructor(readonly name: G, readonly origin: CustomGrammar<G, N, T, O, S>) {}
}

class TokenSymbol<T extends number> {
    constructor(readonly name: T) {}
}

type Symbol<G extends number, N extends number, T extends number, O extends Token<T>, S extends TokenStream<O>> =
    | SimpleSymbol<G, N, T, O, S>
    | CustomSymbol<G, N, T, O, S>
    | TokenSymbol<T>;

class Rule<G extends number, N extends number, T extends number, O extends Token<T>, S extends TokenStream<O>> {
    constructor(readonly node: SyntaxNodeConstructor<N, T, O>) {}
    to: Symbol<G, N, T, O, S>[] = [];
}

class PlaceholderNode<N extends number = number, T extends number = number, O extends Token<T> = Token<T>>
    implements SyntaxNode<N, T, O>
{
    constructor(...args: (O | SyntaxNode<N, T, O>)[]) {}
    type!: N;
    origin!: O;
    children = [];
    get dicaudaBody(): string[] {
        throw new Error('Method not implemented.');
    }
}

export class Parser<
    G extends number = number,
    N extends number = number,
    T extends number = number,
    O extends Token<T> = Token<T>,
    S extends TokenStream<O> = TokenStream<O>
> {
    private finished = false;
    private grammars: AllGrammar<G, N, T, O, S>[] = [];
    private rootGrammar!: G;
    private tokenNode!: SyntaxNodeConstructor<N, T, O>;
    private nodes: SyntaxNodeConstructor<N, T, O>[] = [];
    private rootSymbol = null as unknown as Symbol<G, N, T, O, S>;
    private simples = new Map<G, SimpleSymbol<G, N, T, O, S>>();
    private customs = new Map<G, CustomSymbol<G, N, T, O, S>>();
    private tokens = new Map<T, TokenSymbol<T>>();

    protected register(grammar: SimpleGrammar<G, T>, node: SyntaxNodeConstructor<N, T, O>): void;
    protected register(grammar: CustomGrammar<G, N, T, O, S>): void;

    protected register(grammar: AllGrammar<G, N, T, O, S>, node?: SyntaxNodeConstructor<N, T, O>) {
        this.grammars.push(grammar);
        if (node != null) {
            this.nodes.push(node);
        } else {
            this.nodes.push(PlaceholderNode<N, T, O>);
        }
        if (grammar.type == GrammarType.SIMPLE) {
            grammar.to.forEach((name) => {
                if (name.type == NameType.TOKEN && !this.tokens.has(name.value)) {
                    this.tokens.set(name.value, new TokenSymbol(name.value));
                }
            });
        }
    }

    protected finish(rootGrammar: G, tokenNode: SyntaxNodeConstructor<N, T, O>) {
        this.finished = true;
        this.rootGrammar = rootGrammar;
        this.tokenNode = tokenNode;
        this.init();
    }

    private init() {
        this.createSymbols();
        this.createRules();

        this.rootSymbol = this.simples.get(this.rootGrammar as G) as Symbol<G, N, T, O, S>;
        if (this.rootSymbol == null) {
            this.rootSymbol = this.customs.get(this.rootGrammar as G) as Symbol<G, N, T, O, S>;
        }
    }

    private createSymbols() {
        this.grammars.forEach((grammar) => {
            if (grammar.type == GrammarType.SIMPLE && !this.simples.has(grammar.name)) {
                const temp = new SimpleSymbol<G, N, T, O, S>(grammar.name);
                this.simples.set(grammar.name, temp);
                if (grammar.name == this.rootGrammar) {
                    this.rootSymbol = temp;
                }
            }
            if (grammar.type == GrammarType.CUSTOM && !this.customs.has(grammar.name)) {
                const temp = new CustomSymbol<G, N, T, O, S>(grammar.name, grammar);
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
                const rule = new Rule<G, N, T, O, S>(this.nodes[index]);
                grammar.to.forEach((name) => {
                    let _to: Symbol<G, N, T, O, S> | undefined;
                    if (name.type == NameType.GRAMMAR) {
                        if ((_to = this.simples.get(name.value)) == null) {
                            _to = this.customs.get(name.value);
                        }
                    } else {
                        _to = this.tokens.get(name.value);
                    }
                    const to = _to as Symbol<G, N, T, O, S>;
                    rule.to.push(to);
                });
                const symbol = this.simples.get(grammar.name) as SimpleSymbol<G, N, T, O, S>;
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

    private parseFrom(symbol: Symbol<G, N, T, O, S>, stream: S) {
        if (symbol instanceof TokenSymbol) {
            stream.push();
            const token = this.checkNext(stream);
            if (token.type == symbol.name) {
                return new this.tokenNode(token);
            }
            stream.pop();
            throw new ParserError(token);
        } else if (symbol instanceof CustomSymbol) {
            try {
                stream.push();
                return symbol.origin.parse(stream);
            } catch (e) {
                stream.pop();
                if (e instanceof ParserError) {
                    throw e;
                } else if (e instanceof Error) {
                    throw new ParserError(this.checkNext(stream), e);
                }
                throw e;
            }
        } else {
            let err: any;
            symbol.rules.forEach((rule) => {
                stream.push();
                try {
                    const nodes: SyntaxNode<N, T, O>[] = [];
                    rule.to.forEach((to) => {
                        nodes.push(this.parseFrom(to, stream));
                    });
                    return new rule.node(...nodes);
                } catch (e) {
                    err = e;
                    stream.pop();
                }
            });
            if (err instanceof ParserError) {
                throw err;
            } else if (err instanceof Error) {
                throw new ParserError(this.checkNext(stream), err);
            }
            throw err;
        }
    }
}
