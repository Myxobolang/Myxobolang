import type { TokenStream } from './TokenStream';

export abstract class Lexer<T extends TokenStream = TokenStream> {
    abstract lexInput(): T;
    abstract lexFile(fileName: string): T;
    abstract lexString(str: string): T;
}
