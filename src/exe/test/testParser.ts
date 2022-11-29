import { NameType, SimpleGrammar } from '../../parser/common/Grammar';
import { Parser } from '../../parser/common/Parser';

class Test extends Parser {
    constructor() {
        super();
        this.registerGrammar(
            new SimpleGrammar(1, [
                { type: NameType.GRAMMAR, value: 2 },
                { type: NameType.GRAMMAR, value: 3 },
            ])
        );
        this.registerGrammar(
            new SimpleGrammar(2, [
                { type: NameType.TOKEN, value: -1 },
                { type: NameType.GRAMMAR, value: 2 },
            ])
        );
        this.registerGrammar(new SimpleGrammar(2, [{ type: NameType.TOKEN, value: -2 }]));
        this.registerGrammar(new SimpleGrammar(3, [{ type: NameType.TOKEN, value: -3 }]));
        this.init();
    }
}

console.log(JSON.stringify((new Test() as any).firsts));
