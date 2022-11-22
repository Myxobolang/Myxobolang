enum State {
    INIT,
    READ_CHAR,
    READ_COLON,
    READ_T,
    READ_TO,
    READ_TOK,
    READ_TOKE,
    READ_L,
    READ_LA,
    READ_LAN,
    READ_R,
    READ_RO,
    READ_SLASH,
    ERROR,
}

class NextState {
    constructor(readonly state: State, readonly char: string) {}
}

export class StrLexerError extends Error {
    constructor(readonly char: string, readonly pos: number, message?: string) {
        super(message);
    }
}

export class StrLexer {
    static nextState(state: State, char: string) {
        switch (state) {
            case State.INIT:
                switch (char) {
                    case ':':
                        return new NextState(State.READ_COLON, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, '');
                    default:
                        return new NextState(State.READ_CHAR, char);
                }
            case State.READ_CHAR:
                switch (char) {
                    case '\\':
                        return new NextState(State.READ_SLASH, '');
                    default:
                        return new NextState(State.READ_CHAR, char);
                }
            case State.READ_COLON:
                switch (char) {
                    case ':':
                        return new NextState(State.READ_CHAR, ':');
                    case 'l':
                        return new NextState(State.READ_L, '');
                    case 'r':
                        return new NextState(State.READ_R, '');
                    case 't':
                        return new NextState(State.READ_T, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':');
                    default:
                        return new NextState(State.READ_CHAR, `:${char}`);
                }
            case State.READ_L:
                switch (char) {
                    case 'a':
                        return new NextState(State.READ_LA, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':l');
                    default:
                        return new NextState(State.READ_CHAR, `:l${char}`);
                }
            case State.READ_LA:
                switch (char) {
                    case 'n':
                        return new NextState(State.READ_LAN, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':la');
                    default:
                        return new NextState(State.READ_CHAR, `:la${char}`);
                }
            case State.READ_LAN:
                switch (char) {
                    case 'g':
                        return new NextState(State.READ_CHAR, 'lang');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':lan');
                    default:
                        return new NextState(State.READ_CHAR, `:lan${char}`);
                }
            case State.READ_R:
                switch (char) {
                    case 'o':
                        return new NextState(State.READ_RO, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':r');
                    default:
                        return new NextState(State.READ_CHAR, `:r${char}`);
                }
            case State.READ_RO:
                switch (char) {
                    case 'w':
                        return new NextState(State.READ_CHAR, 'row');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':ro');
                    default:
                        return new NextState(State.READ_CHAR, `:ro${char}`);
                }
            case State.READ_T:
                switch (char) {
                    case 'o':
                        return new NextState(State.READ_TO, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':t');
                    default:
                        return new NextState(State.READ_CHAR, `:t${char}`);
                }
            case State.READ_TO:
                switch (char) {
                    case 'k':
                        return new NextState(State.READ_TOK, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':to');
                    default:
                        return new NextState(State.READ_CHAR, `:to${char}`);
                }
            case State.READ_TOK:
                switch (char) {
                    case 'e':
                        return new NextState(State.READ_TOKE, '');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':tok');
                    default:
                        return new NextState(State.READ_CHAR, `:tok${char}`);
                }
            case State.READ_TOKE:
                switch (char) {
                    case 'n':
                        return new NextState(State.READ_CHAR, 'token');
                    case '\\':
                        return new NextState(State.READ_SLASH, ':toke');
                    default:
                        return new NextState(State.READ_CHAR, `:toke${char}`);
                }
            case State.READ_SLASH:
                switch (char) {
                    case '\\':
                        return new NextState(State.READ_CHAR, '\\');
                    case 'n':
                        return new NextState(State.READ_CHAR, '\n');
                    case '{':
                        return new NextState(State.READ_CHAR, '{');
                    case '}':
                        return new NextState(State.READ_CHAR, '}');
                    case '[':
                        return new NextState(State.READ_CHAR, '[');
                    case ']':
                        return new NextState(State.READ_CHAR, ']');
                    default:
                        return new NextState(State.ERROR, '');
                }
            default:
                throw new Error();
        }
    }

    static lex(input: string): string {
        let out = '';
        let state = State.INIT;

        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const next = this.nextState(state, char);
            state = next.state;
            out += next.char;
            if (state == State.ERROR) {
                throw new StrLexerError(char, i, `Invalid '${char}' at position ${i}`);
            }
        }

        if (state != State.READ_CHAR) {
            const i = input.length;
            const char = '';
            const next = this.nextState(state, char);
            state = next.state;
            out += next.char;
            if (state == State.ERROR) {
                throw new StrLexerError(char, i, `Invalid '${char}' at position ${i}`);
            }
        }

        return out;
    }
}
