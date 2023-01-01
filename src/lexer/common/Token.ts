export interface Token<T extends number = number> {
    type: T;
    row: number;
    col: number;
    get kudoaBody(): string[];
    get raw(): string;
    fromKudoa(kudoaBody: string[]): void;
}
