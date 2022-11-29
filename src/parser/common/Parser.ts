import { AllGrammar, GrammarType, NameType, SimpleGrammar } from './Grammar';

class GrammarWrapper {
    froms = new Set<number>();
    constructor(readonly id: number, readonly value: AllGrammar) {}
}

class TokenWrapper {
    froms = new Set<number>();
    constructor(readonly id: number) {}
}

type Wrapper = GrammarWrapper | TokenWrapper;

export class Parser {
    private grammarList: GrammarWrapper[] = [];
    private grammars = new Map<number, GrammarWrapper[]>();
    private firsts = new Map<number, Set<GrammarWrapper>>();
    private customs = new Set<GrammarWrapper>();

    protected registerGrammar(grammar: AllGrammar) {
        let temp: GrammarWrapper[] | undefined;
        if ((temp = this.grammars.get(grammar.name)) == null) {
            temp = [];
            this.grammars.set(grammar.name, temp);
        }
        const wrapper = new GrammarWrapper(this.grammarList.length, grammar);
        temp.push(wrapper);
        this.grammarList.push(wrapper);
    }

    protected init() {
        const firsts = new Map<number, Set<number>>();
        const tokens = new Map<number, TokenWrapper>();
        this.grammars.forEach((value) =>
            value.forEach((grammar) => {
                if (grammar.value.type == GrammarType.SIMPLE) {
                    grammar.value.to.forEach((value) => {
                        if (value.type == NameType.TOKEN) {
                            const wrapper = new TokenWrapper(value.value);
                            tokens.set(value.value, wrapper);
                            wrapper.froms.add(grammar.id);
                        } else {
                            const to = this.grammarList[value.value];
                            to.froms.add(grammar.id);
                        }
                    });
                } else {
                    this.customs.add(grammar);
                }
            })
        );

        const queue: Wrapper[] = [...tokens.values()];
        while (queue.length > 0) {
            const wrapper = queue.shift() as Wrapper;
            wrapper.froms.forEach((fromId) => {
                let isFirst = false;
                const from = this.grammarList[fromId].value as SimpleGrammar;
                if (from.to[0].type == NameType.GRAMMAR && 'value' in wrapper && from.to[0].value == wrapper.id) {
                    isFirst = true;
                }
                if (from.to[0].type == NameType.TOKEN && !('value' in wrapper) && from.to[0].value == wrapper.id) {
                    isFirst = true;
                }

                if (!isFirst) {
                    return;
                }

                let temp: Set<number> | undefined;
                if ((temp = firsts.get(this.grammarList[fromId].value.name)) == null) {
                    temp = new Set();
                    firsts.set(this.grammarList[fromId].value.name, temp);
                }

                let addFrom = true;
                if (wrapper instanceof TokenWrapper) {
                    if (temp.has(wrapper.id)) {
                        addFrom = false;
                    }
                } else {
                    let allHas = true;
                    (firsts.get(wrapper.value.name) as Set<number>).forEach((id) => {
                        if (!(temp as Set<number>).has(this.grammarList[id].value.name)) {
                            allHas = false;
                        }
                    });
                    addFrom = !allHas;
                }

                if (addFrom) {
                    queue.push(this.grammarList[fromId]);
                }

                if (wrapper instanceof TokenWrapper) {
                    temp.add(wrapper.id);
                } else {
                    (firsts.get(wrapper.value.name) as Set<number>).forEach((id) =>
                        temp?.add(this.grammarList[id].value.name)
                    );
                }
            });
        }

        firsts.forEach((value, key) =>
            value.forEach((id) => {
                let temp: Set<GrammarWrapper> | undefined;
                if ((temp = this.firsts.get(id)) == null) {
                    temp = new Set();
                    this.firsts.set(id, temp);
                }
                temp.add(this.grammarList[key]);
            })
        );
    }
}
