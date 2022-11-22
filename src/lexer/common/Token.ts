export interface Token<T extends number = number> {
    type: T;
    row: number;
    col: number;
}
